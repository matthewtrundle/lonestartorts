import { Resend } from 'resend';

// Lazy-load Resend client to avoid build-time initialization
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

interface OrderItem {
  name: string;
  quantity: number;
  price: number; // in cents
}

interface OrderConfirmationEmailProps {
  to: string;
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number; // in cents
  shipping: number; // in cents
  tax: number; // in cents
  total: number; // in cents
  shippingAddress: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

interface OrderShippedEmailProps {
  to: string;
  orderNumber: string;
  customerName: string;
  trackingNumber: string;
  carrier: string;
  items: OrderItem[];
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(props: OrderConfirmationEmailProps) {
  const {
    to,
    orderNumber,
    customerName,
    items,
    subtotal,
    shipping,
    tax,
    total,
    shippingAddress,
  } = props;

  try {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - Lonestar Tortillas</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #faf8f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #faf8f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border-radius: 16px; overflow: hidden;">

          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 48px 40px; text-align: center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <!-- Star Logo SVG -->
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 20px;">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FEF3C7" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h1 style="margin: 0; font-size: 36px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; line-height: 1.2;">Order Confirmed</h1>
                    <p style="margin: 12px 0 0 0; font-size: 17px; color: #fed7aa; font-weight: 500;">Thank you for your order, ${customerName}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Number Banner -->
          <tr>
            <td style="padding: 32px 40px; background-color: #fef3c7; border-bottom: 1px solid #fde68a;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #92400e; text-transform: uppercase; letter-spacing: 0.08em;">Order Number</p>
                    <p style="margin: 0; font-size: 24px; font-weight: 700; color: #78350f; font-family: 'Courier New', monospace; letter-spacing: 0.02em;">${orderNumber}</p>
                    <p style="margin: 12px 0 0 0; font-size: 14px; color: #92400e;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Items Section -->
          <tr>
            <td style="padding: 40px 40px 32px 40px;">
              <h2 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 700; color: #2c2720; letter-spacing: -0.01em;">Order Details</h2>

              <!-- Items Table -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border: 1px solid #e8e3dc; border-radius: 12px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #faf8f5;">
                    <th style="text-align: left; padding: 14px 20px; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e8e3dc;">Product</th>
                    <th style="text-align: center; padding: 14px 20px; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e8e3dc;">Qty</th>
                    <th style="text-align: right; padding: 14px 20px; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e8e3dc;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map((item, index) => `
                  <tr style="${index < items.length - 1 ? 'border-bottom: 1px solid #f5f3f0;' : ''}">
                    <td style="padding: 18px 20px; font-size: 15px; color: #2c2720; font-weight: 500;">${item.name}</td>
                    <td style="padding: 18px 20px; text-align: center; font-size: 15px; color: #78716c; font-weight: 500;">${item.quantity}</td>
                    <td style="padding: 18px 20px; text-align: right; font-size: 15px; color: #2c2720; font-weight: 600;">$${((item.price * item.quantity) / 100).toFixed(2)}</td>
                  </tr>
                  `).join('')}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #faf8f5; border-radius: 12px; padding: 24px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 15px; color: #78716c;">Subtotal</td>
                  <td style="padding: 6px 0; text-align: right; font-size: 15px; color: #2c2720; font-weight: 500;">$${(subtotal / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 15px; color: #78716c;">Shipping</td>
                  <td style="padding: 6px 0; text-align: right; font-size: 15px; color: #2c2720; font-weight: 500;">$${(shipping / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0 16px 0; font-size: 15px; color: #78716c; border-bottom: 2px solid #e8e3dc;">Tax</td>
                  <td style="padding: 6px 0 16px 0; text-align: right; font-size: 15px; color: #2c2720; font-weight: 500; border-bottom: 2px solid #e8e3dc;">$${(tax / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 0 0 0; font-size: 18px; color: #2c2720; font-weight: 700;">Total</td>
                  <td style="padding: 16px 0 0 0; text-align: right; font-size: 28px; color: #ea580c; font-weight: 700;">$${(total / 100).toFixed(2)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border: 1px solid #e8e3dc; border-radius: 12px; padding: 24px; background-color: #ffffff;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #2c2720; letter-spacing: -0.01em;">Shipping Address</h3>
                    <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.7; font-weight: 500;">
                      ${customerName}<br>
                      ${shippingAddress.street || ''}<br>
                      ${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.zip || ''}<br>
                      ${shippingAddress.country || 'United States'}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's Next Section -->
          <tr>
            <td style="padding: 0 40px 48px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 28px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #78350f; letter-spacing: -0.01em;">What Happens Next</h3>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top; width: 24px;">
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #78350f; display: inline-flex; align-items: center; justify-content: center;">
                            <span style="color: #fef3c7; font-size: 12px; font-weight: 700;">✓</span>
                          </div>
                        </td>
                        <td style="padding: 8px 0 8px 12px; font-size: 15px; color: #78350f; line-height: 1.5; font-weight: 500;">Shipping confirmation within 24-48 hours</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top; width: 24px;">
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #78350f; display: inline-flex; align-items: center; justify-content: center;">
                            <span style="color: #fef3c7; font-size: 12px; font-weight: 700;">✓</span>
                          </div>
                        </td>
                        <td style="padding: 8px 0 8px 12px; font-size: 15px; color: #78350f; line-height: 1.5; font-weight: 500;">Estimated delivery in 2-3 business days</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top; width: 24px;">
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #78350f; display: inline-flex; align-items: center; justify-content: center;">
                            <span style="color: #fef3c7; font-size: 12px; font-weight: 700;">✓</span>
                          </div>
                        </td>
                        <td style="padding: 8px 0 8px 12px; font-size: 15px; color: #78350f; line-height: 1.5; font-weight: 500;">Track your order via email notifications</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #2c2720; padding: 40px; text-align: center;">
              <h3 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.01em;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #a8a29e; font-weight: 500;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #78716c; line-height: 1.6;">
                Independent reseller. Not affiliated with or endorsed by H-E-B®.<br>
                <span style="color: #a8a29e;">Made with care in Texas</span>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Order #${orderNumber} Confirmed - Lonestar Tortillas`,
      html,
    });

    if (error) {
      console.error('Failed to send order confirmation email:', error);
      return { success: false, error };
    }

    console.log('Order confirmation email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error };
  }
}

/**
 * Send order shipped email with tracking
 */
export async function sendOrderShippedEmail(props: OrderShippedEmailProps) {
  const { to, orderNumber, customerName, trackingNumber, carrier, items } = props;

  // Generate tracking URL based on carrier
  let trackingUrl = '';
  const normalizedCarrier = carrier.toLowerCase();

  if (normalizedCarrier.includes('usps')) {
    trackingUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
  } else if (normalizedCarrier.includes('ups')) {
    trackingUrl = `https://www.ups.com/track?tracknum=${trackingNumber}`;
  } else if (normalizedCarrier.includes('fedex')) {
    trackingUrl = `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
  }

  try {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #f97316;">
    <h1 style="margin: 0; font-size: 28px; color: #1a1a1a;">Lonestar Tortillas</h1>
    <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Premium Texas Tortillas</p>
  </div>

  <!-- Shipped Message -->
  <div style="background-color: #dbeafe; border: 1px solid #93c5fd; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
    <h2 style="margin: 0 0 10px 0; color: #1e40af; font-size: 24px;">Your Order Has Shipped!</h2>
    <p style="margin: 0; color: #1e3a8a; font-size: 16px;">Your tortillas are on their way, ${customerName}!</p>
  </div>

  <!-- Tracking Info -->
  <div style="margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
    <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #1a1a1a;">Tracking Information</h3>
    <p style="margin: 0 0 10px 0; color: #666;">
      <strong>Order Number:</strong> ${orderNumber}<br>
      <strong>Carrier:</strong> ${carrier}<br>
      <strong>Tracking Number:</strong> <code style="background-color: #fff; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${trackingNumber}</code>
    </p>
    ${trackingUrl ? `
    <div style="margin-top: 20px; text-align: center;">
      <a href="${trackingUrl}" style="display: inline-block; background-color: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
        Track Your Package
      </a>
    </div>
    ` : ''}
  </div>

  <!-- Items Shipped -->
  <div style="margin: 30px 0;">
    <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #1a1a1a;">Items Shipped</h3>
    <ul style="margin: 0; padding: 0; list-style: none;">
      ${items.map((item) => `
      <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #666;">
        ${item.quantity}x ${item.name}
      </li>
      `).join('')}
    </ul>
  </div>

  <!-- Delivery Info -->
  <div style="margin: 30px 0; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
    <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #92400e;">Estimated Delivery</h3>
    <p style="margin: 0; color: #78350f; font-size: 14px; line-height: 1.6;">
      Your order should arrive within <strong>2-3 business days</strong>.<br>
      You can track your package using the tracking number above.
    </p>
  </div>

  <!-- Footer -->
  <div style="margin: 40px 0 20px 0; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #666; font-size: 12px;">
    <p style="margin: 10px 0; font-size: 11px; color: #999;">
      Independent reseller. Not affiliated with or endorsed by H-E-B®.<br>
      Made with ❤️ in Texas
    </p>
  </div>

</body>
</html>
    `;

    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Your Order #${orderNumber} Has Shipped!`,
      html,
    });

    if (error) {
      console.error('Failed to send order shipped email:', error);
      return { success: false, error };
    }

    console.log('Order shipped email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending order shipped email:', error);
    return { success: false, error };
  }
}
