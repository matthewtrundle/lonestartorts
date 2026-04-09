/**
 * "Oops! Free Tortillas" Email Campaign
 *
 * Sends a fun, on-brand email to customers who accidentally received
 * a duplicate shipment of tortillas.
 *
 * Usage:
 *   npx tsx scripts/send-oops-email.ts --test     # Send test to matthewtrundle@gmail.com
 *   npx tsx scripts/send-oops-email.ts --send      # Send to all recipients
 */

import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || 'orders@lonestartortillas.com';

// Recipients who received the accidental duplicate shipment (7 highlighted from pick sheet)
const RECIPIENTS = [
  { name: 'Elizabeth', fullName: 'Elizabeth Hursey', email: 'eahursey@gmail.com', orderNumber: 'LST-877229OF', tracking: '1Z106BD40306944363' },
  { name: 'Alejandro', fullName: 'Alejandro Lara', email: 'sadarapsagrev@gmail.com', orderNumber: 'LST-203433BJ', tracking: '1Z106BD40337209966' },
  { name: 'TauShaun', fullName: 'TauShaun Casasola', email: 'trinityfredericks4@gmail.com', orderNumber: 'LST-599601PH', tracking: '1Z106BD40327961199' },
  { name: 'Christian', fullName: 'Christian T Palmer', email: 'christianpalmer22@gmail.com', orderNumber: 'LST-038423HO', tracking: '1Z106BD40335930028' },
  { name: 'Maxwell', fullName: 'Maxwell Heiden', email: 'max@catalystios.com', orderNumber: 'LST-529068F0', tracking: '1Z106BD40308960387' },
  { name: 'Theresa', fullName: 'Theresa Skrien', email: 'mackeyatc@gmail.com', orderNumber: 'LST-49852305', tracking: '1Z106BD40326112385' },
  { name: 'Cindy', fullName: 'Cindy Dawn Hutzler', email: 'cynthiadawn@aol.com', orderNumber: 'LST-377003J6', tracking: '1Z106BD40313440401' },
];

function generateOopsEmailHTML(firstName: string, orderNumber: string, trackingNumber: string): string {
  const trackingUrl = `https://www.ups.com/track?loc=en_US&tracknum=${trackingNumber}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Oops! A Happy Accident - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.15);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #111827 0%, #292524 100%);">
              <div style="margin-bottom: 16px; font-size: 48px;">
                &#127790;
              </div>
              <h1 style="margin: 0 0 12px 0; font-size: 30px; font-weight: 700; color: #ffffff; line-height: 1.2;">Oops... We Did It Again!</h1>
              <p style="margin: 0; font-size: 16px; color: #fbbf24; font-weight: 600;">A Happy Accident from Lonestar Tortillas</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 32px 16px 32px;">
              <p style="margin: 0 0 20px 0; font-size: 18px; color: #1c1917; line-height: 1.6;">Howdy, ${firstName}!</p>

              <p style="margin: 0 0 20px 0; font-size: 16px; color: #44403c; line-height: 1.7;">Well, this is a little embarrassing. Remember your recent order <strong style="color: #1c1917;">${orderNumber}</strong>? Turns out our team got a little overzealous, and we accidentally processed and shipped your order <em>twice</em>.</p>

              <p style="margin: 0 0 8px 0; font-size: 16px; color: #44403c; line-height: 1.7;">That means you've got a bonus batch of premium H-E-B tortillas heading your way &mdash; <strong style="color: #ea580c;">completely on us!</strong></p>
            </td>
          </tr>

          <!-- Fun Highlight Box -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #d97706;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px;">What this means for you:</p>
                    <p style="margin: 12px 0 0 0; font-size: 16px; color: #1c1917; line-height: 1.7;">Your original order is arriving as expected. And so is a second one &mdash; same items, same address, zero extra charge. Consider it a gift from us for being a valued customer.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Tracking Section -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 0.5px;">Track Your Bonus Shipment</p>
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #1e3a5f; line-height: 1.5;">Your extra tortillas are on their way via UPS:</p>
                    <p style="margin: 0;">
                      <a href="${trackingUrl}" style="display: inline-block; padding: 8px 16px; background-color: #1e40af; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 6px; font-family: monospace;">${trackingNumber}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pro Tips Section -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917;">Pro Tip: Got Extra Tortillas?</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 12px 16px; background-color: #f0fdf4; border-radius: 6px; margin-bottom: 8px;">
                    <p style="margin: 0; font-size: 15px; color: #166534; line-height: 1.6;"><strong>Freeze them!</strong> &mdash; H-E-B tortillas freeze beautifully. Just pop them in a freezer bag, and they'll stay fresh for months. Thaw at room temperature when ready to use.</p>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: #f0fdf4; border-radius: 6px;">
                    <p style="margin: 0; font-size: 15px; color: #166534; line-height: 1.6;"><strong>Share the love!</strong> &mdash; Surprise a neighbor, bring them to a potluck, or have an impromptu taco night. Everyone loves free tortillas.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Section -->
          <tr>
            <td style="padding: 0 32px 40px 32px; text-align: center;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #44403c; line-height: 1.7;">We truly appreciate your business, ${firstName}. Mistakes happen, but we like to think this one worked out in your favor.</p>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="border-radius: 8px; background-color: #ea580c;">
                    <a href="https://lonestartortillas.com/shop" style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px;">Shop Lonestar Tortillas</a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0; font-size: 14px; color: #78716c; line-height: 1.6;">Questions about your order? Just reply to this email &mdash; we're always happy to help.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9; border-top: 1px solid #e7e5e4; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #78716c;">Lonestar Tortillas</p>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #a8a29e;">Premium Texas Tortillas &mdash; Shipped Fresh Every Tuesday</p>
              <p style="margin: 0 0 12px 0; font-size: 11px; color: #d6d3d1;">Independent reseller. Not affiliated with or endorsed by H-E-B&reg;.</p>
              <p style="margin: 0; font-size: 11px; color: #d6d3d1;">
                <a href="https://lonestartortillas.com" style="color: #ea580c; text-decoration: none;">lonestartortillas.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendEmail(to: string, firstName: string, orderNumber: string, tracking: string) {
  const html = generateOopsEmailHTML(firstName, orderNumber, tracking);

  const { data, error } = await resend.emails.send({
    from: `Maria at Lonestar Tortillas <${fromEmail}>`,
    to: [to],
    subject: "Oops! You're Getting Free Tortillas 🌮",
    html,
  });

  if (error) {
    console.error(`Failed to send to ${to}:`, error);
    return false;
  }
  console.log(`Sent to ${to} (${firstName}) - ID: ${data?.id}`);
  return true;
}

async function main() {
  const mode = process.argv[2];

  if (!mode || (mode !== '--test' && mode !== '--send')) {
    console.log('Usage:');
    console.log('  npx tsx scripts/send-oops-email.ts --test   # Send test to matthewtrundle@gmail.com');
    console.log('  npx tsx scripts/send-oops-email.ts --send    # Send to all 7 recipients');
    process.exit(1);
  }

  if (mode === '--test') {
    console.log('Sending test email to matthewtrundle@gmail.com...\n');

    // Send one sample for each recipient so you can review all personalized versions
    for (const r of RECIPIENTS) {
      console.log(`Sending preview for ${r.fullName}...`);
      await sendEmail('matthewtrundle@gmail.com', r.name, r.orderNumber, r.tracking);
    }

    console.log('\nDone! Check matthewtrundle@gmail.com for 7 test emails (one per recipient).');
  }

  if (mode === '--send') {
    console.log('Sending to all 7 recipients...\n');
    let sent = 0;
    let failed = 0;

    for (const r of RECIPIENTS) {
      const ok = await sendEmail(r.email, r.name, r.orderNumber, r.tracking);
      if (ok) sent++;
      else failed++;
      // Small delay between sends
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`\nDone! Sent: ${sent}, Failed: ${failed}`);
  }
}

main().catch(console.error);
