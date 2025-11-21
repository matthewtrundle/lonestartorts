/**
 * Delete User Script
 *
 * Deletes a user from the database by email.
 *
 * Usage:
 *   npx tsx scripts/delete-user.ts <email>
 *
 * Example:
 *   npx tsx scripts/delete-user.ts matthewtrundle
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteUser() {
  try {
    const [, , email] = process.argv;

    if (!email) {
      console.error('❌ Error: Email required\n');
      console.log('Usage: npx tsx scripts/delete-user.ts <email>\n');
      console.log('Example:');
      console.log('  npx tsx scripts/delete-user.ts matthewtrundle');
      process.exit(1);
    }

    console.log(`🔍 Looking for user: ${email}\n`);

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      console.error(`❌ Error: User "${email}" not found`);
      process.exit(1);
    }

    console.log('Found user:');
    console.log(`  ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Name: ${user.name}`);
    console.log(`  Role: ${user.role}\n`);

    await prisma.user.delete({
      where: { email: email.toLowerCase() }
    });

    console.log('✅ User deleted successfully!\n');

  } catch (error) {
    console.error('\n❌ Error deleting user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

deleteUser();
