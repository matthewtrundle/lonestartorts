import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { detectCarrier } from '@/lib/shipping';
import { sendOrderShippedEmail } from '@/lib/email';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

// Parse CSV text properly, handling quoted fields
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
  }
  result.push(current.trim());
  return result;
}

// Parse file into rows (supports both CSV and XLSX)
async function parseFile(file: File): Promise<{ headers: string[]; rows: Record<string, string>[] }> {
  const fileName = file.name.toLowerCase();
  const isXlsx = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');

  if (isXlsx) {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonRows: Record<string, string>[] = XLSX.utils.sheet_to_json(sheet, { raw: false });
    const headers = jsonRows.length > 0 ? Object.keys(jsonRows[0]) : [];
    return { headers, rows: jsonRows };
  }

  // CSV parsing
  const text = await file.text();
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) {
    return { headers: [], rows: [] };
  }

  const headers = parseCSVLine(lines[0]);
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] || '';
    });
    rows.push(row);
  }
  return { headers, rows };
}

// Find column index by checking for keywords
function findColumn(headers: string[], keywords: string[]): string | null {
  const normalized = headers.map((h) => h.toLowerCase().trim());
  for (const keyword of keywords) {
    const match = normalized.findIndex((h) => h.includes(keyword));
    if (match !== -1) return headers[match];
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const sendEmails = formData.get('sendEmails') === 'true';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('[import-tracking] File received:', {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    const { headers, rows } = await parseFile(file);

    console.log('[import-tracking] Parsed file:', {
      headerCount: headers.length,
      headers,
      rowCount: rows.length,
      sampleRow: rows[0] || null,
    });

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'File must have a header row and at least one data row' },
        { status: 400 }
      );
    }

    // Find relevant columns
    const orderCol = findColumn(headers, ['order']);
    const trackingCol = findColumn(headers, ['tracking']);
    const carrierCol = findColumn(headers, ['carrier']);

    console.log('[import-tracking] Column mapping:', {
      orderCol,
      trackingCol,
      carrierCol,
      allHeaders: headers,
    });

    if (!orderCol || !trackingCol) {
      return NextResponse.json(
        {
          error: `Could not find required columns. Need "Order" and "Tracking" columns. Found headers: [${headers.join(', ')}]`,
        },
        { status: 400 }
      );
    }

    const results: {
      updated: number;
      errors: { orderNumber: string; error: string }[];
      skipped: number;
      debug: { parsedRows: { orderNumber: string; trackingNumber: string; carrier: string }[] };
    } = {
      updated: 0,
      errors: [],
      skipped: 0,
      debug: { parsedRows: [] },
    };

    for (const row of rows) {
      const orderNumber = (row[orderCol!] || '').trim();
      const trackingNumber = (row[trackingCol!] || '').trim();
      const csvCarrier = carrierCol ? (row[carrierCol] || '').trim() : '';

      // Store parsed row for debug output
      results.debug.parsedRows.push({ orderNumber, trackingNumber, carrier: csvCarrier || 'auto-detect' });

      if (!orderNumber || !trackingNumber) {
        console.log('[import-tracking] Skipping row - missing data:', { orderNumber, trackingNumber, rawRow: row });
        results.skipped++;
        continue;
      }

      const carrier = csvCarrier || detectCarrier(trackingNumber) || 'USPS';
      console.log('[import-tracking] Processing row:', { orderNumber, trackingNumber, carrier });

      try {
        if (orderNumber.startsWith('WS-')) {
          // Wholesale order
          const order = await prisma.wholesaleOrder.findUnique({
            where: { orderNumber },
            include: { items: true, client: true },
          });

          if (!order) {
            console.log('[import-tracking] Wholesale order not found:', { orderNumber });
            results.errors.push({ orderNumber, error: 'Wholesale order not found in database' });
            continue;
          }

          await prisma.wholesaleOrder.update({
            where: { orderNumber },
            data: {
              orderStatus: 'SHIPPED',
              trackingNumber,
              carrier,
              shippedAt: new Date(),
            },
          });

          if (sendEmails && order.client.email) {
            await sendOrderShippedEmail({
              to: order.client.email,
              orderNumber: order.orderNumber,
              customerName: order.client.contactName,
              trackingNumber,
              carrier,
              items: order.items
                .filter((item) => item.sku !== 'SHIPPING')
                .map((item) => ({ name: item.name, quantity: item.quantity, price: item.unitPrice })),
            });
          }

          results.updated++;
        } else {
          // Retail order
          const order = await prisma.order.findUnique({
            where: { orderNumber },
            include: { OrderItem: true },
          });

          if (!order) {
            console.log('[import-tracking] Retail order not found:', { orderNumber });
            results.errors.push({ orderNumber, error: 'Retail order not found in database' });
            continue;
          }

          await prisma.order.update({
            where: { orderNumber },
            data: {
              status: 'SHIPPED',
              trackingNumber,
              carrier,
              shippedAt: new Date(),
            },
          });

          if (sendEmails) {
            await sendOrderShippedEmail({
              to: order.email,
              orderNumber: order.orderNumber,
              customerName: order.shippingName || 'Customer',
              trackingNumber,
              carrier,
              items: order.OrderItem.filter((item) => item.sku !== 'SHIPPING'),
            });
          }

          results.updated++;
        }
      } catch (err: any) {
        results.errors.push({ orderNumber, error: err.message || 'Unknown error' });
      }
    }

    console.log('[import-tracking] Import complete:', {
      updated: results.updated,
      errors: results.errors.length,
      skipped: results.skipped,
      totalRows: rows.length,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('[import-tracking] Fatal error:', error);
    return NextResponse.json({ error: 'Failed to import tracking data' }, { status: 500 });
  }
}
