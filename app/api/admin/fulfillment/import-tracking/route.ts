import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { detectCarrier } from '@/lib/shipping';
import { sendOrderShippedEmail } from '@/lib/email';
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
    const xlsxModule = await import('xlsx');
    const XLSX = xlsxModule.default || xlsxModule;
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

// Find column by checking for keywords
function findColumn(headers: string[], keywords: string[]): string | null {
  const normalized = headers.map((h) => h.toLowerCase().trim());
  for (const keyword of keywords) {
    const match = normalized.findIndex((h) => h.includes(keyword));
    if (match !== -1) return headers[match];
  }
  return null;
}

// Detect if file is a Pirate Ship export (has Recipient + Tracking Number but no Order Number)
function isPirateShipFormat(headers: string[]): boolean {
  const lower = headers.map((h) => h.toLowerCase().trim());
  const hasRecipient = lower.some((h) => h === 'recipient');
  const hasTracking = lower.some((h) => h.includes('tracking'));
  const hasOrder = lower.some((h) => h.includes('order'));
  return hasRecipient && hasTracking && !hasOrder;
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

    const isPirateShip = isPirateShipFormat(headers);
    console.log('[import-tracking] Format detected:', isPirateShip ? 'Pirate Ship' : 'Standard CSV');

    // Find relevant columns
    const trackingCol = findColumn(headers, ['tracking number', 'tracking']);
    const carrierCol = findColumn(headers, ['carrier']);

    if (!trackingCol) {
      return NextResponse.json(
        { error: `Could not find "Tracking Number" column. Found headers: [${headers.join(', ')}]` },
        { status: 400 }
      );
    }

    const results: {
      updated: number;
      errors: { orderNumber: string; error: string }[];
      skipped: number;
      debug: {
        format: string;
        parsedRows: { identifier: string; trackingNumber: string; carrier: string; matchedOrder?: string }[];
      };
    } = {
      updated: 0,
      errors: [],
      skipped: 0,
      debug: { format: isPirateShip ? 'pirate-ship' : 'standard', parsedRows: [] },
    };

    if (isPirateShip) {
      // Pirate Ship format: match by email against unfulfilled orders
      const emailCol = findColumn(headers, ['email']);
      const recipientCol = findColumn(headers, ['recipient']);

      console.log('[import-tracking] Pirate Ship columns:', { trackingCol, carrierCol, emailCol, recipientCol });

      if (!emailCol) {
        return NextResponse.json(
          { error: `Pirate Ship format detected but no "Email" column found. Headers: [${headers.join(', ')}]` },
          { status: 400 }
        );
      }

      // Fetch all unfulfilled retail orders
      const unfulfilledOrders = await prisma.order.findMany({
        where: {
          status: { in: ['PENDING', 'PROCESSING'] },
          paymentStatus: 'SUCCEEDED',
        },
        include: { OrderItem: true },
      });

      // Fetch all unfulfilled wholesale orders
      const unfulfilledWholesale = await prisma.wholesaleOrder.findMany({
        where: {
          orderStatus: { in: ['PENDING', 'PROCESSING', 'READY'] },
        },
        include: { items: true, client: true },
      });

      console.log('[import-tracking] Unfulfilled orders loaded:', {
        retail: unfulfilledOrders.length,
        wholesale: unfulfilledWholesale.length,
      });

      // Index by email (lowercase) for matching
      const retailByEmail = new Map<string, typeof unfulfilledOrders>();
      for (const order of unfulfilledOrders) {
        const key = order.email.toLowerCase().trim();
        if (!retailByEmail.has(key)) retailByEmail.set(key, []);
        retailByEmail.get(key)!.push(order);
      }

      const wholesaleByEmail = new Map<string, typeof unfulfilledWholesale>();
      for (const order of unfulfilledWholesale) {
        const key = order.client.email.toLowerCase().trim();
        if (!wholesaleByEmail.has(key)) wholesaleByEmail.set(key, []);
        wholesaleByEmail.get(key)!.push(order);
      }

      const usedOrderIds = new Set<string>();

      for (const row of rows) {
        const email = (row[emailCol] || '').trim().toLowerCase();
        const trackingNumber = (row[trackingCol] || '').trim();
        const recipient = recipientCol ? (row[recipientCol] || '').trim() : '';
        const csvCarrier = carrierCol ? (row[carrierCol] || '').trim() : '';
        const carrier = csvCarrier || detectCarrier(trackingNumber) || 'USPS';
        const identifier = recipient || email;

        const debugRow: typeof results.debug.parsedRows[0] = {
          identifier,
          trackingNumber,
          carrier,
        };

        if (!email || !trackingNumber) {
          console.log('[import-tracking] Skipping row - missing data:', { email, trackingNumber, recipient });
          results.skipped++;
          results.debug.parsedRows.push(debugRow);
          continue;
        }

        console.log('[import-tracking] Processing:', { email, recipient, trackingNumber, carrier });

        // Try retail orders first
        const retailCandidates = (retailByEmail.get(email) || []).filter((o) => !usedOrderIds.has(o.id));

        if (retailCandidates.length > 0) {
          // If multiple orders for same email, pick the oldest unfulfilled one
          retailCandidates.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
          const order = retailCandidates[0];
          usedOrderIds.add(order.id);

          try {
            await prisma.order.update({
              where: { id: order.id },
              data: {
                status: 'SHIPPED',
                trackingNumber,
                carrier,
                shippedAt: new Date(),
              },
            });

            if (sendEmails) {
              try {
                await sendOrderShippedEmail({
                  to: order.email,
                  orderNumber: order.orderNumber,
                  customerName: order.shippingName || 'Customer',
                  trackingNumber,
                  carrier,
                  items: order.OrderItem.filter((item) => item.sku !== 'SHIPPING'),
                });
                await prisma.order.update({
                  where: { id: order.id },
                  data: { shippedEmailSentAt: new Date() },
                });
              } catch (emailErr) {
                console.error(
                  `[import-tracking] Failed to send shipping email for ${order.orderNumber}:`,
                  emailErr
                );
              }
            }

            console.log('[import-tracking] Matched retail order:', { email, orderNumber: order.orderNumber });
            debugRow.matchedOrder = order.orderNumber;
            results.updated++;
          } catch (err: any) {
            results.errors.push({ orderNumber: order.orderNumber, error: err.message });
          }

          results.debug.parsedRows.push(debugRow);
          continue;
        }

        // Try wholesale orders
        const wholesaleCandidates = (wholesaleByEmail.get(email) || []).filter((o) => !usedOrderIds.has(o.id));

        if (wholesaleCandidates.length > 0) {
          wholesaleCandidates.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
          const order = wholesaleCandidates[0];
          usedOrderIds.add(order.id);

          try {
            await prisma.wholesaleOrder.update({
              where: { id: order.id },
              data: {
                orderStatus: 'SHIPPED',
                trackingNumber,
                carrier,
                shippedAt: new Date(),
              },
            });

            if (sendEmails && order.client.email) {
              try {
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
                await prisma.wholesaleOrder.update({
                  where: { id: order.id },
                  data: { shippedEmailSentAt: new Date() },
                });
              } catch (emailErr) {
                console.error(
                  `[import-tracking] Failed to send wholesale shipping email for ${order.orderNumber}:`,
                  emailErr
                );
              }
            }

            console.log('[import-tracking] Matched wholesale order:', { email, orderNumber: order.orderNumber });
            debugRow.matchedOrder = order.orderNumber;
            results.updated++;
          } catch (err: any) {
            results.errors.push({ orderNumber: order.orderNumber, error: err.message });
          }

          results.debug.parsedRows.push(debugRow);
          continue;
        }

        // No match found
        console.log('[import-tracking] No unfulfilled order found for:', { email, recipient });
        results.errors.push({ orderNumber: identifier, error: `No unfulfilled order found for email: ${email}` });
        results.debug.parsedRows.push(debugRow);
      }
    } else {
      // Standard format: match by Order Number column
      const orderCol = findColumn(headers, ['order']);

      if (!orderCol) {
        return NextResponse.json(
          { error: `Could not find "Order Number" column. Found headers: [${headers.join(', ')}]` },
          { status: 400 }
        );
      }

      console.log('[import-tracking] Standard columns:', { orderCol, trackingCol, carrierCol });

      for (const row of rows) {
        const orderNumber = (row[orderCol] || '').trim();
        const trackingNumber = (row[trackingCol] || '').trim();
        const csvCarrier = carrierCol ? (row[carrierCol] || '').trim() : '';

        results.debug.parsedRows.push({ identifier: orderNumber, trackingNumber, carrier: csvCarrier || 'auto-detect' });

        if (!orderNumber || !trackingNumber) {
          console.log('[import-tracking] Skipping row - missing data:', { orderNumber, trackingNumber });
          results.skipped++;
          continue;
        }

        const carrier = csvCarrier || detectCarrier(trackingNumber) || 'USPS';
        console.log('[import-tracking] Processing row:', { orderNumber, trackingNumber, carrier });

        try {
          if (orderNumber.startsWith('WS-')) {
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
              try {
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
                await prisma.wholesaleOrder.update({
                  where: { orderNumber },
                  data: { shippedEmailSentAt: new Date() },
                });
              } catch (emailErr) {
                console.error(
                  `[import-tracking] Failed to send wholesale shipping email for ${orderNumber}:`,
                  emailErr
                );
              }
            }

            results.updated++;
          } else {
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
              try {
                await sendOrderShippedEmail({
                  to: order.email,
                  orderNumber: order.orderNumber,
                  customerName: order.shippingName || 'Customer',
                  trackingNumber,
                  carrier,
                  items: order.OrderItem.filter((item) => item.sku !== 'SHIPPING'),
                });
                await prisma.order.update({
                  where: { orderNumber },
                  data: { shippedEmailSentAt: new Date() },
                });
              } catch (emailErr) {
                console.error(
                  `[import-tracking] Failed to send retail shipping email for ${orderNumber}:`,
                  emailErr
                );
              }
            }

            results.updated++;
          }
        } catch (err: any) {
          results.errors.push({ orderNumber, error: err.message || 'Unknown error' });
        }
      }
    }

    console.log('[import-tracking] Import complete:', {
      format: results.debug.format,
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
