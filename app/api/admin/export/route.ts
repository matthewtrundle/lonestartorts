import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch all waitlist entries
    const entries = await prisma.waitlistEntry.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Create CSV content
    const headers = [
      'Email',
      'Name',
      'ZIP Code',
      'Corn Interest',
      'Butter Interest',
      'Flour Interest',
      'Variety Interest',
      'Expected Quantity',
      'Source',
      'Medium',
      'Campaign',
      'Referrer',
      'Verified',
      'Unsubscribed',
      'Created At'
    ];

    const rows = entries.map((entry: any) => [
      entry.email,
      entry.name || '',
      entry.zipCode || '',
      entry.interestCorn ? 'Yes' : 'No',
      entry.interestButter ? 'Yes' : 'No',
      entry.interestFlour ? 'Yes' : 'No',
      entry.interestVariety ? 'Yes' : 'No',
      entry.expectedQuantity || '',
      entry.source || '',
      entry.medium || '',
      entry.campaign || '',
      entry.referrer || '',
      entry.verified ? 'Yes' : 'No',
      entry.unsubscribed ? 'Yes' : 'No',
      entry.createdAt.toISOString()
    ]);

    // Escape CSV values and join
    const escapeCSV = (value: string) => {
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const csvContent = [
      headers.map(escapeCSV).join(','),
      ...rows.map((row: string[]) => row.map(escapeCSV).join(','))
    ].join('\n');

    // Return CSV file
    const response = new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="waitlist-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

    return response;
  } catch (error) {
    console.error('Error exporting waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to export waitlist' },
      { status: 500 }
    );
  }
}