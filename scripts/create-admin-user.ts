/**
 * Create Admin User Script
 *
 * Creates an admin user in the database with a hashed password.
 *
 * Usage:
 *   npx tsx scripts/create-admin-user.ts <email> <password> <name> [role]
 *
 * Examples:
 *   npx tsx scripts/create-admin-user.ts admin@lonestartortillas.com MySecurePass123 "Admin User"
 *   npx tsx scripts/create-admin-user.ts matt@example.com password123 "Matt Rundle" SUPER_ADMIN
 *
 * Roles: SUPER_ADMIN, ADMIN, VIEWER (default: SUPER_ADMIN)
 */

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Get arguments
    const [, , email, password, name, role = 'SUPER_ADMIN'] = process.argv;

    // Validate arguments
    if (!email || !password || !name) {
      console.error('❌ Error: Missing required arguments\n');
      console.log('Usage: npx tsx scripts/create-admin-user.ts <email> <password> <name> [role]\n');
      console.log('Examples:');
      console.log('  npx tsx scripts/create-admin-user.ts admin@lonestartortillas.com MySecurePass123 "Admin User"');
      console.log('  npx tsx scripts/create-admin-user.ts matt@example.com password123 "Matt Rundle" SUPER_ADMIN\n');
      console.log('Roles: SUPER_ADMIN, ADMIN, VIEWER (default: SUPER_ADMIN)');
      process.exit(1);
    }

    // Validate role
    const validRoles = ['SUPER_ADMIN', 'ADMIN', 'VIEWER'];
    if (!validRoles.includes(role)) {
      console.error(`❌ Error: Invalid role "${role}". Must be one of: ${validRoles.join(', ')}`);
      process.exit(1);
    }

    // Validate password strength
    if (password.length < 8) {
      console.error('❌ Error: Password must be at least 8 characters long');
      process.exit(1);
    }

    console.log('🔐 Creating admin user...\n');
    console.log(`   Email: ${email}`);
    console.log(`   Name: ${name}`);
    console.log(`   Role: ${role}\n`);

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existing) {
      console.error(`❌ Error: User with email "${email}" already exists`);
      console.log('\nTo update an existing user, delete them first or use a different email.');
      process.exit(1);
    }

    // Hash password (10 rounds)
    console.log('🔒 Hashing password...');
    const hashedPassword = await hash(password, 10);

    // Create user
    console.log('💾 Saving to database...');
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email: email.toLowerCase(),
        name,
        password: hashedPassword,
        role: role as 'SUPER_ADMIN' | 'ADMIN' | 'VIEWER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('═'.repeat(60));
    console.log('USER DETAILS');
    console.log('═'.repeat(60));
    console.log(`ID:       ${user.id}`);
    console.log(`Email:    ${user.email}`);
    console.log(`Name:     ${user.name}`);
    console.log(`Role:     ${user.role}`);
    console.log(`Created:  ${user.createdAt.toLocaleString()}`);
    console.log('═'.repeat(60));
    console.log('\n🎉 You can now log in at /admin/login\n');

  } catch (error) {
    console.error('\n❌ Error creating user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
