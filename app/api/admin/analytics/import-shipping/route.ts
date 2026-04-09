import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
export const dynamic = 'force-dynamic';

// Typo corrections for customer names
const NAME_CORRECTIONS: Record<string, string> = {
  'Desiree Phew': 'Desiree Plew',
};

function normalizeName(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, ' ');
}

function parseDateString(raw: string): Date {
  // Remove CDT/CST timezone suffix so Date can parse it
  const cleaned = raw.replace(/\s+(CDT|CST)$/i, '').trim();
  return new Date(cleaned);
}

export async function POST(req: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Read XLSX (dynamically imported to avoid bundling 700KB+ in non-admin routes)
    const xlsxModule = await import('xlsx');
    const XLSX = xlsxModule.default || xlsxModule;
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: Record<string, string>[] = XLSX.utils.sheet_to_json(sheet, { raw: false });

    // Filter to Label rows and extract name + cost
    const labelNameRegex = /^(.+?):\s*\d+\s*Label/;
    const labelRows: { name: string; cost: number; date: Date }[] = [];

    for (const row of rows) {
      const type = (row['Type'] || '').trim();
      if (type !== 'Label') continue;

      const description = row['Description'] || row['Name'] || '';
      const match = description.match(labelNameRegex);
      if (!match) continue;

      let customerName = match[1].trim();

      // Apply typo corrections
      if (NAME_CORRECTIONS[customerName]) {
        customerName = NAME_CORRECTIONS[customerName];
      }

      // Get cost in cents (absolute value)
      const costStr = (row['Amount'] || row['Cost'] || row['Total'] || '0')
        .replace(/[^0-9.\-]/g, '');
      const costDollars = Math.abs(parseFloat(costStr) || 0);
      const costCents = Math.round(costDollars * 100);

      // Parse date
      const dateStr = row['Date'] || row['Created'] || '';
      const date = dateStr ? parseDateString(dateStr) : new Date();

      labelRows.push({ name: customerName, cost: costCents, date });
    }

    // Fetch all orders with shippingName
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        shippingName: true,
        shippingCost: true,
        createdAt: true,
      },
    });

    // Group orders by normalized name
    const ordersByName = new Map<string, typeof orders>();
    for (const order of orders) {
      if (!order.shippingName) continue;
      const key = normalizeName(order.shippingName);
      if (!ordersByName.has(key)) {
        ordersByName.set(key, []);
      }
      ordersByName.get(key)!.push(order);
    }

    // Match labels to orders
    const usedOrderIds = new Set<string>();
    let matched = 0;
    let skipped = 0;
    const unmatched: string[] = [];

    for (const label of labelRows) {
      const key = normalizeName(label.name);
      const candidates = ordersByName.get(key);

      if (!candidates || candidates.length === 0) {
        unmatched.push(label.name);
        continue;
      }

      // Filter out already-used IDs and orders that already have shipping cost
      const available = candidates.filter(
        (o) => !usedOrderIds.has(o.id) && (!o.shippingCost || o.shippingCost === 0)
      );

      if (available.length === 0) {
        skipped++;
        continue;
      }

      // Pick order closest in date
      const labelTime = label.date.getTime();
      available.sort(
        (a, b) =>
          Math.abs(a.createdAt.getTime() - labelTime) -
          Math.abs(b.createdAt.getTime() - labelTime)
      );

      const bestMatch = available[0];
      usedOrderIds.add(bestMatch.id);

      await prisma.order.update({
        where: { id: bestMatch.id },
        data: { shippingCost: label.cost },
      });

      matched++;
    }

    return NextResponse.json({
      matched,
      skipped,
      unmatched,
      total: labelRows.length,
    });
  } catch (error) {
    console.error('Error importing shipping costs:', error);
    return NextResponse.json(
      { error: 'Failed to import shipping data' },
      { status: 500 }
    );
  }
}
