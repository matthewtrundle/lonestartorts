import { Resend } from 'resend';
import { generateOrderConfirmationEmail, generateOrderShippedEmail, generateFeedbackRequestEmail, generateFeedbackThankYouEmail, generateSubscriptionRenewalEmail, generateShippingApologyEmail } from './email-templates';

// Admin emails for order notifications
const ADMIN_EMAILS = [
  'matthewtrundle@gmail.com',
  'allan.henslee@gmail.com',
  'allan@partyondelivery.com',
  'howdy@lonestartortillas.com',
];

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
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  estimatedShipDate?: string;
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
    estimatedShipDate,
  } = props;

  try {
    const html = generateOrderConfirmationEmail({
      orderNumber,
      customerName,
      customerEmail: to,
      items,
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress,
      estimatedShipDate,
    });

    // Old HTML template kept as fallback - can be removed after testing
    const oldHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafaf9;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fafaf9;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background-color: #ffffff; border-bottom: 1px solid #e7e5e4;">
              <div style="width: 48px; height: 48px; background-color: #d97706; border-radius: 50%; display: inline-flex; align-items: center; justify-center; margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #1c1917; line-height: 1.2;">Order Confirmed</h1>
              <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.5;">Thank you for your order, ${customerName}. Your premium Texas tortillas are on the way.</p>
            </td>
          </tr>

          <!-- Order Number -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 500; color: #78716c;">Order Number</p>
                    <p style="margin: 0; font-size: 20px; font-weight: 700; color: #1c1917; font-family: monospace;">${orderNumber}</p>
                  </td>
                  <td style="text-align: right;">
                    <p style="margin: 0; font-size: 13px; color: #78716c;">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Summary Section -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td colspan="2" style="padding-bottom: 16px;">
                    <h2 style="margin: 0; font-size: 18px; font-weight: 600; color: #1c1917;">Order Summary</h2>
                  </td>
                </tr>
                ${items.map((item, index) => `
                <tr style="${index < items.length - 1 ? 'border-bottom: 1px solid #f5f5f4;' : ''}">
                  <td style="padding: 12px 0; font-size: 14px; color: #44403c;">
                    <div style="font-weight: 500; color: #1c1917; margin-bottom: 2px;">${item.name}</div>
                    <div style="font-size: 13px; color: #78716c;">Qty: ${item.quantity}</div>
                  </td>
                  <td style="padding: 12px 0; text-align: right; font-size: 14px; font-weight: 500; color: #1c1917;">$${((item.price * item.quantity) / 100).toFixed(2)}</td>
                </tr>
                `).join('')}
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 2px solid #e7e5e4; padding-top: 16px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #78716c;">Subtotal</td>
                  <td style="padding: 8px 0; text-align: right; font-size: 14px; color: #1c1917;">$${(subtotal / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 14px; color: #78716c;">Shipping</td>
                  <td style="padding: 8px 0; text-align: right; font-size: 14px; color: #1c1917;">$${(shipping / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0 16px 0; font-size: 14px; color: #78716c; border-bottom: 1px solid #e7e5e4;">Tax</td>
                  <td style="padding: 8px 0 16px 0; text-align: right; font-size: 14px; color: #1c1917; border-bottom: 1px solid #e7e5e4;">$${(tax / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 0 0 0; font-size: 16px; font-weight: 600; color: #1c1917;">Total</td>
                  <td style="padding: 16px 0 0 0; text-align: right; font-size: 20px; font-weight: 700; color: #d97706;">$${(total / 100).toFixed(2)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Grid -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <!-- Shipping Address -->
                <tr>
                  <td style="padding: 20px; background-color: #fafaf9; border-radius: 6px; vertical-align: top; width: 50%;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #1c1917;">Shipping Address</h3>
                    <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.6;">
                      <strong style="color: #1c1917;">${customerName}</strong><br>
                      ${shippingAddress.street || shippingAddress.address1 || ''}<br>
                      ${shippingAddress.address2 ? shippingAddress.address2 + '<br>' : ''}${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.zip || ''}<br>
                      ${shippingAddress.country || 'US'}
                    </p>
                  </td>
                  <!-- What's Next -->
                  <td style="padding: 20px; background-color: #fef3c7; border-radius: 6px; vertical-align: top; width: 50%;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #1c1917;">What Happens Next</h3>
                    <div style="margin-bottom: 8px;">
                      <div style="display: inline-block; width: 16px; height: 16px; background-color: #d97706; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></div>
                      <span style="font-size: 13px; color: #57534e;">Shipping confirmation within 24-48 hours</span>
                    </div>
                    <div style="margin-bottom: 8px;">
                      <div style="display: inline-block; width: 16px; height: 16px; background-color: #d97706; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></div>
                      <span style="font-size: 13px; color: #57534e;">Tortillas arrive in 2-3 business days</span>
                    </div>
                    <div>
                      <div style="display: inline-block; width: 16px; height: 16px; background-color: #d97706; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></div>
                      <span style="font-size: 13px; color: #57534e;">Track via email updates</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confirmation Notice -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 16px; background-color: #dbeafe; border-radius: 6px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; font-size: 14px; color: #1e40af; line-height: 1.5;">
                  A confirmation email with tracking information has been sent to <strong>${to}</strong>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #1c1917; border-top: 1px solid #e7e5e4;">
              <div style="margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#d97706" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #78716c;">
                Independent reseller • Not affiliated with or endorsed by H-E-B®
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
    const html = generateOrderShippedEmail({
      orderNumber,
      customerName,
      trackingNumber,
      carrier,
      items,
      trackingUrl,
    });

    // Old template kept as fallback
    const oldHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafaf9;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fafaf9;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background-color: #ffffff; border-bottom: 1px solid #e7e5e4;">
              <div style="width: 48px; height: 48px; background-color: #10b981; border-radius: 50%; display: inline-flex; align-items: center; justify-center; margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                </svg>
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #1c1917; line-height: 1.2;">Order Shipped</h1>
              <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.5;">Your order is on the way, ${customerName}!</p>
            </td>
          </tr>

          <!-- Tracking Info -->
          <tr>
            <td style="padding: 32px;">
              <div style="padding: 24px; background-color: #fafaf9; border-radius: 6px; border: 1px solid #e7e5e4;">
                <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Tracking Information</h2>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #78716c;">Order Number</td>
                    <td style="padding: 8px 0; text-align: right; font-size: 14px; font-weight: 500; color: #1c1917; font-family: monospace;">${orderNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #78716c;">Carrier</td>
                    <td style="padding: 8px 0; text-align: right; font-size: 14px; font-weight: 500; color: #1c1917;">${carrier}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #78716c;">Tracking Number</td>
                    <td style="padding: 8px 0; text-align: right; font-size: 14px; font-weight: 600; color: #d97706; font-family: monospace;">${trackingNumber}</td>
                  </tr>
                </table>
                ${trackingUrl ? `
                <div style="margin-top: 20px; text-align: center;">
                  <a href="${trackingUrl}" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Track Package</a>
                </div>
                ` : ''}
              </div>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1c1917;">Items Shipped</h3>
              <div style="padding: 20px; background-color: #fafaf9; border-radius: 6px;">
                ${items.map((item, index) => `
                <div style="padding: ${index > 0 ? '12px' : '0'} 0 ${index < items.length - 1 ? '12px' : '0'} 0; ${index < items.length - 1 ? 'border-bottom: 1px solid #e7e5e4;' : ''}">
                  <span style="display: inline-block; background-color: #d97706; color: #ffffff; font-weight: 600; font-size: 12px; padding: 4px 8px; border-radius: 4px; margin-right: 8px;">${item.quantity}x</span>
                  <span style="font-size: 14px; color: #1c1917; font-weight: 500;">${item.name}</span>
                </div>
                `).join('')}
              </div>
            </td>
          </tr>

          <!-- Delivery Estimate -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 20px; background-color: #fef3c7; border-radius: 6px; border-left: 4px solid #d97706;">
                <p style="margin: 0; font-size: 14px; color: #78350f; line-height: 1.6;">
                  <strong style="color: #1c1917;">Estimated Delivery:</strong> Your order should arrive within 2-3 business days. Track your package using the tracking number above.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #1c1917; border-top: 1px solid #e7e5e4;">
              <div style="margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#d97706" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #78716c;">
                Independent reseller • Not affiliated with or endorsed by H-E-B®
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
      subject: `Your Order #${orderNumber} Has Shipped!`,
      html,
    });

    if (error) {
      console.error('Failed to send order shipped email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending order shipped email:', error);
    return { success: false, error };
  }
}

/**
 * Send admin notification when a new order is placed
 */
export async function sendAdminOrderNotification(props: OrderConfirmationEmailProps) {
  const {
    to: customerEmail,
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
    const itemsList = items.map(item =>
      `• ${item.name} x${item.quantity} - $${((item.price * item.quantity) / 100).toFixed(2)}`
    ).join('\n');

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order - ${orderNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px; background-color: #22c55e; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">🎉 New Order Received!</h1>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 24px;">
                    <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #1c1917;">Order #${orderNumber}</h2>
                    <p style="margin: 0; font-size: 14px; color: #78716c;">${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                  </td>
                </tr>

                <!-- Customer Info -->
                <tr>
                  <td style="padding: 16px; background-color: #fafaf9; border-radius: 8px; margin-bottom: 16px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #1c1917; text-transform: uppercase; letter-spacing: 0.5px;">Customer</h3>
                    <p style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #1c1917;">${customerName}</p>
                    <p style="margin: 0; font-size: 14px; color: #57534e;">${customerEmail}</p>
                  </td>
                </tr>

                <!-- Shipping Address -->
                <tr>
                  <td style="padding: 16px; background-color: #fafaf9; border-radius: 8px; margin: 16px 0;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #1c1917; text-transform: uppercase; letter-spacing: 0.5px;">Ship To</h3>
                    <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.6;">
                      ${customerName}<br>
                      ${shippingAddress.street || shippingAddress.address1 || ''}<br>
                      ${shippingAddress.address2 ? shippingAddress.address2 + '<br>' : ''}
                      ${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.zip || ''}<br>
                      ${shippingAddress.country || 'US'}
                    </p>
                  </td>
                </tr>

                <!-- Items -->
                <tr>
                  <td style="padding-top: 24px;">
                    <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #1c1917; text-transform: uppercase; letter-spacing: 0.5px;">Items Ordered</h3>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${items.map((item, index) => `
                      <tr>
                        <td style="padding: 12px 0; ${index < items.length - 1 ? 'border-bottom: 1px solid #e7e5e4;' : ''}">
                          <span style="font-size: 14px; color: #1c1917; font-weight: 500;">${item.name}</span>
                          <span style="font-size: 14px; color: #78716c;"> × ${item.quantity}</span>
                        </td>
                        <td style="padding: 12px 0; text-align: right; ${index < items.length - 1 ? 'border-bottom: 1px solid #e7e5e4;' : ''}">
                          <span style="font-size: 14px; font-weight: 600; color: #1c1917;">$${((item.price * item.quantity) / 100).toFixed(2)}</span>
                        </td>
                      </tr>
                      `).join('')}
                    </table>
                  </td>
                </tr>

                <!-- Totals -->
                <tr>
                  <td style="padding-top: 16px; border-top: 2px solid #e7e5e4; margin-top: 16px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #78716c;">Subtotal</td>
                        <td style="padding: 8px 0; text-align: right; font-size: 14px; color: #1c1917;">$${(subtotal / 100).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #78716c;">Shipping</td>
                        <td style="padding: 8px 0; text-align: right; font-size: 14px; color: #1c1917;">$${(shipping / 100).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #78716c;">Tax</td>
                        <td style="padding: 8px 0; text-align: right; font-size: 14px; color: #1c1917;">$${(tax / 100).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0 0 0; font-size: 18px; font-weight: 700; color: #1c1917;">Total</td>
                        <td style="padding: 16px 0 0 0; text-align: right; font-size: 24px; font-weight: 700; color: #22c55e;">$${(total / 100).toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://lonestartortillas.com'}/admin/orders"
                 style="display: block; text-align: center; background-color: #1c1917; color: #ffffff; padding: 16px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                View Order in Admin
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9; text-align: center; border-top: 1px solid #e7e5e4;">
              <p style="margin: 0; font-size: 12px; color: #78716c;">
                Lonestar Tortillas Order Notification
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
      to: ADMIN_EMAILS,
      subject: `💰 New Order #${orderNumber} - $${(total / 100).toFixed(2)} from ${customerName}`,
      html,
    });

    if (error) {
      console.error('Failed to send admin notification email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return { success: false, error };
  }
}

/**
 * Send wholesale inquiry to admin
 */
export async function sendWholesaleInquiryEmail(props: {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  estimatedVolume: string;
  message: string;
}) {
  const { businessName, contactName, email, phone, businessType, estimatedVolume, message } = props;

  try {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wholesale Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px; background-color: #7c3aed; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">🏢 New Wholesale Inquiry</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">

                <!-- Business Info -->
                <tr>
                  <td style="padding: 16px; background-color: #fafaf9; border-radius: 8px; margin-bottom: 16px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Business Information</h3>
                    <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">${businessName}</p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #57534e;"><strong>Type:</strong> ${businessType}</p>
                    <p style="margin: 0; font-size: 14px; color: #57534e;"><strong>Est. Volume:</strong> ${estimatedVolume}</p>
                  </td>
                </tr>

                <!-- Contact Info -->
                <tr>
                  <td style="padding: 16px 0;">
                    <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Contact Person</h3>
                    <p style="margin: 0 0 4px 0; font-size: 16px; font-weight: 500; color: #1c1917;">${contactName}</p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #57534e;">
                      <a href="mailto:${email}" style="color: #7c3aed; text-decoration: none;">${email}</a>
                    </p>
                    ${phone ? `<p style="margin: 0; font-size: 14px; color: #57534e;">${phone}</p>` : ''}
                  </td>
                </tr>

                <!-- Message -->
                ${message ? `
                <tr>
                  <td style="padding: 16px; background-color: #fafaf9; border-radius: 8px; border-left: 4px solid #7c3aed;">
                    <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Additional Details</h3>
                    <p style="margin: 0; font-size: 14px; color: #1c1917; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
                ` : ''}

              </table>
            </td>
          </tr>

          <!-- Reply Button -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <a href="mailto:${email}?subject=Lonestar Tortillas Wholesale Pricing for ${encodeURIComponent(businessName)}"
                 style="display: block; text-align: center; background-color: #1c1917; color: #ffffff; padding: 16px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Reply to ${contactName}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9; text-align: center; border-top: 1px solid #e7e5e4;">
              <p style="margin: 0; font-size: 12px; color: #78716c;">
                Lonestar Tortillas Wholesale Inquiry
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
      to: ADMIN_EMAILS,
      replyTo: email,
      subject: `🏢 Wholesale Inquiry: ${businessName} (${businessType}) - ${estimatedVolume}`,
      html,
    });

    if (error) {
      console.error('Failed to send wholesale inquiry email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending wholesale inquiry email:', error);
    return { success: false, error };
  }
}

/**
 * Send contact form submission to admin
 */
export async function sendContactFormEmail(props: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = props;

  try {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px; background-color: #d97706; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">📬 New Contact Form Submission</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">

                <!-- From -->
                <tr>
                  <td style="padding: 16px; background-color: #fafaf9; border-radius: 8px; margin-bottom: 16px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">From</h3>
                    <p style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #1c1917;">${name}</p>
                    <p style="margin: 0; font-size: 14px; color: #57534e;">
                      <a href="mailto:${email}" style="color: #d97706; text-decoration: none;">${email}</a>
                    </p>
                  </td>
                </tr>

                <!-- Subject -->
                <tr>
                  <td style="padding: 16px 0;">
                    <h3 style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Subject</h3>
                    <p style="margin: 0; font-size: 16px; font-weight: 500; color: #1c1917;">${subject}</p>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding: 16px; background-color: #fafaf9; border-radius: 8px; border-left: 4px solid #d97706;">
                    <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
                    <p style="margin: 0; font-size: 14px; color: #1c1917; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Reply Button -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                 style="display: block; text-align: center; background-color: #1c1917; color: #ffffff; padding: 16px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Reply to ${name}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9; text-align: center; border-top: 1px solid #e7e5e4;">
              <p style="margin: 0; font-size: 12px; color: #78716c;">
                Lonestar Tortillas Contact Form
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
      to: ADMIN_EMAILS,
      replyTo: email,
      subject: `Contact Form: ${subject} - from ${name}`,
      html,
    });

    if (error) {
      console.error('Failed to send contact form email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return { success: false, error };
  }
}

interface PasswordResetEmailProps {
  to: string;
  customerName: string;
  resetToken: string;
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(props: PasswordResetEmailProps) {
  const { to, customerName, resetToken } = props;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lonestartortillas.com';
  const resetUrl = `${baseUrl}/account/reset-password?token=${resetToken}`;

  try {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafaf9;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fafaf9;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 40px 32px; text-align: center; border-bottom: 1px solid #e7e5e4;">
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #1c1917;">Reset Your Password</h1>
              <p style="margin: 0; font-size: 15px; color: #57534e;">Howdy ${customerName}, we received a request to reset your password.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; text-align: center;">
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #57534e; line-height: 1.6;">Click the button below to set a new password. This link expires in 1 hour.</p>
              <a href="${resetUrl}" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Reset Password</a>
              <p style="margin: 24px 0 0 0; font-size: 13px; color: #a8a29e;">If you didn't request this, you can safely ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; text-align: center; background-color: #1c1917;">
              <p style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #78716c;">Independent reseller &bull; Not affiliated with or endorsed by H-E-B&reg;</p>
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
      subject: 'Reset Your Password - Lonestar Tortillas',
      html,
    });

    if (error) {
      console.error('Failed to send password reset email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error };
  }
}

interface FeedbackRequestEmailProps {
  to: string;
  customerName: string;
  orderNumber: string;
  feedbackToken: string;
}

/**
 * Send feedback request email to customer
 */
export async function sendFeedbackRequestEmail(props: FeedbackRequestEmailProps) {
  const { to, customerName, orderNumber, feedbackToken } = props;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lonestartortillas.com';
    const feedbackUrl = `${baseUrl}/feedback?token=${feedbackToken}`;

    const html = generateFeedbackRequestEmail({
      orderNumber,
      customerName,
      feedbackUrl,
    });

    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `How were your tortillas? Share your feedback - Order #${orderNumber}`,
      html,
    });

    if (error) {
      console.error('Failed to send feedback request email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending feedback request email:', error);
    return { success: false, error };
  }
}

interface FeedbackThankYouEmailProps {
  to: string;
  customerName: string;
  orderNumber: string;
  rating: number;
  couponCode: string;
  expiresAt: Date;
}

/**
 * Send feedback thank you email with coupon code
 */
export async function sendFeedbackThankYouEmail(props: FeedbackThankYouEmailProps) {
  const { to, customerName, orderNumber, rating, couponCode, expiresAt } = props;

  try {
    const html = generateFeedbackThankYouEmail({
      orderNumber,
      customerName,
      rating,
      couponCode,
      expiresAt,
    });

    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Thank you for your feedback! Here's 10% off your next order - Lonestar Tortillas`,
      html,
    });

    if (error) {
      console.error('Failed to send feedback thank you email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending feedback thank you email:', error);
    return { success: false, error };
  }
}

interface SubscriptionRenewalEmailProps {
  to: string;
  orderNumber: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  estimatedShipDate: string;
  nextBillingDate: string;
}

/**
 * Send subscription renewal confirmation email
 */
export async function sendSubscriptionRenewalEmail(props: SubscriptionRenewalEmailProps) {
  const html = generateSubscriptionRenewalEmail({ ...props });

  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: `Lonestar Tortillas <${fromEmail}>`,
      to: [props.to],
      subject: `Your subscription order ${props.orderNumber} is confirmed!`,
      html,
    });

    if (error) {
      console.error('Failed to send subscription renewal email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending subscription renewal email:', error);
    return { success: false, error };
  }
}

interface NewSubscriptionEmailProps {
  to: string;
  customerName: string;
  subscriptionName: string;
  interval: string;
  items: Array<{ name: string; quantity: number; unitPrice: number }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  preferredShippingDay: string | null;
  nextBillingDate: string;
}

/**
 * Send welcome email to customer when they start a new subscription
 */
export async function sendNewSubscriptionEmail(props: NewSubscriptionEmailProps) {
  const { to, customerName, subscriptionName, interval, items, subtotal, tax, total, preferredShippingDay, nextBillingDate } = props;

  const shippingDayLabels: Record<string, string> = {
    '1st_tuesday': '1st Tuesday of each month',
    '2nd_tuesday': '2nd Tuesday of each month',
    '3rd_tuesday': '3rd Tuesday of each month',
    '4th_tuesday': '4th Tuesday of each month',
  };

  try {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Your Subscription - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafaf9;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fafaf9;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background-color: #d97706;">
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.2;">Welcome to Your Subscription!</h1>
              <p style="margin: 0; font-size: 15px; color: #fef3c7;">Howdy ${customerName}, you're all set for fresh tortillas on repeat.</p>
            </td>
          </tr>

          <!-- Subscription Details -->
          <tr>
            <td style="padding: 32px;">
              <div style="padding: 24px; background-color: #fafaf9; border-radius: 8px; border: 1px solid #e7e5e4;">
                <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Your ${subscriptionName}</h2>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #78716c;">Frequency</td>
                    <td style="padding: 8px 0; text-align: right; font-size: 14px; font-weight: 500; color: #1c1917;">${interval}</td>
                  </tr>
                  ${preferredShippingDay ? `
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #78716c;">Ships</td>
                    <td style="padding: 8px 0; text-align: right; font-size: 14px; font-weight: 500; color: #1c1917;">${shippingDayLabels[preferredShippingDay] || preferredShippingDay}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #78716c;">Next Billing Date</td>
                    <td style="padding: 8px 0; text-align: right; font-size: 14px; font-weight: 500; color: #1c1917;">${nextBillingDate}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #1c1917;">What You'll Receive</h3>
              ${items.map((item, index) => `
              <div style="padding: 12px 16px; ${index < items.length - 1 ? 'border-bottom: 1px solid #e7e5e4;' : ''}">
                <span style="font-size: 14px; color: #1c1917;"><strong>${item.quantity}x</strong> ${item.name}</span>
                <span style="font-size: 14px; color: #57534e; float: right;">$${((item.unitPrice * item.quantity) / 100).toFixed(2)}</span>
              </div>
              `).join('')}
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 16px; background-color: #fafaf9; border-radius: 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 4px 0; font-size: 14px; color: #78716c;">Subtotal</td>
                    <td style="padding: 4px 0; text-align: right; font-size: 14px; color: #57534e;">$${(subtotal / 100).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 14px; color: #78716c;">Shipping</td>
                    <td style="padding: 4px 0; text-align: right; font-size: 14px; color: #10b981; font-weight: 500;">FREE</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 14px; color: #78716c;">Tax</td>
                    <td style="padding: 4px 0; text-align: right; font-size: 14px; color: #57534e;">$${(tax / 100).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0 0 0; font-size: 16px; font-weight: 700; color: #1c1917; border-top: 1px solid #e7e5e4;">Total per cycle</td>
                    <td style="padding: 8px 0 0 0; text-align: right; font-size: 16px; font-weight: 700; color: #1c1917; border-top: 1px solid #e7e5e4;">$${(total / 100).toFixed(2)}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Manage CTA -->
          <tr>
            <td style="padding: 0 32px 32px 32px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://lonestartortillas.com'}/account" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Manage Your Subscription</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #1c1917;">
              <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #78716c;">
                Independent reseller &bull; Not affiliated with or endorsed by H-E-B&reg;
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
      from: `Lonestar Tortillas <${fromEmail}>`,
      to: [to],
      subject: `Welcome to your ${subscriptionName}!`,
      html,
    });

    if (error) {
      console.error('Failed to send new subscription email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending new subscription email:', error);
    return { success: false, error };
  }
}

/**
 * Send admin notification when a new subscription is created
 */
export async function sendAdminNewSubscriptionNotification(props: NewSubscriptionEmailProps & { customerEmail: string }) {
  const { customerEmail, customerName, subscriptionName, interval, items, total, preferredShippingDay, nextBillingDate } = props;

  const shippingDayLabels: Record<string, string> = {
    '1st_tuesday': '1st Tuesday',
    '2nd_tuesday': '2nd Tuesday',
    '3rd_tuesday': '3rd Tuesday',
    '4th_tuesday': '4th Tuesday',
  };

  try {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Subscription - ${customerName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px; background-color: #7c3aed; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Subscription Started!</h1>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 16px; background-color: #fafaf9; border-radius: 8px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Customer</h3>
                    <p style="margin: 0 0 4px 0; font-size: 18px; font-weight: 600; color: #1c1917;">${customerName}</p>
                    <p style="margin: 0; font-size: 14px; color: #57534e;">${customerEmail}</p>
                  </td>
                </tr>
                <tr><td style="padding: 8px 0;"></td></tr>
                <tr>
                  <td style="padding: 16px; background-color: #fafaf9; border-radius: 8px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Subscription Details</h3>
                    <p style="margin: 0 0 4px 0; font-size: 16px; font-weight: 500; color: #1c1917;">${subscriptionName}</p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #57534e;"><strong>Frequency:</strong> ${interval}</p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #57534e;"><strong>Items:</strong> ${items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #57534e;"><strong>Total/cycle:</strong> $${(total / 100).toFixed(2)}</p>
                    ${preferredShippingDay ? `<p style="margin: 0 0 4px 0; font-size: 14px; color: #57534e;"><strong>Ship Day:</strong> ${shippingDayLabels[preferredShippingDay] || preferredShippingDay}</p>` : ''}
                    <p style="margin: 0; font-size: 14px; color: #57534e;"><strong>Next Billing:</strong> ${nextBillingDate}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- View in Admin -->
          <tr>
            <td style="padding: 0 32px 32px 32px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://lonestartortillas.com'}/admin/subscriptions"
                 style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                View in Admin
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9; text-align: center; border-top: 1px solid #e7e5e4;">
              <p style="margin: 0; font-size: 12px; color: #78716c;">
                Lonestar Tortillas Subscription Notification
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
      to: ADMIN_EMAILS,
      subject: `New Subscription: ${customerName} - ${subscriptionName} ($${(total / 100).toFixed(2)}/cycle)`,
      html,
    });

    if (error) {
      console.error('Failed to send admin subscription notification:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending admin subscription notification:', error);
    return { success: false, error };
  }
}

/**
 * Send welcome email to new wholesale customers with ordering instructions
 */
export async function sendWholesaleWelcomeEmail(props: {
  to: string;
  contactName: string;
  businessName: string;
}) {
  const { to, contactName, businessName } = props;
  const firstName = contactName.split(' ')[0] || contactName;

  try {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Lonestar Tortillas Wholesale</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 32px; background: linear-gradient(135deg, #c2410c 0%, #ea580c 100%); text-align: center;">
              <h1 style="margin: 0 0 8px 0; color: #ffffff; font-size: 26px; font-weight: 700;">Welcome to Lonestar Tortillas</h1>
              <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 16px;">Your wholesale account is ready</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 32px 32px 16px 32px;">
              <p style="margin: 0; font-size: 16px; color: #1c1917; line-height: 1.6;">
                Hi ${firstName},
              </p>
              <p style="margin: 16px 0 0 0; font-size: 16px; color: #44403c; line-height: 1.6;">
                Thanks for creating your wholesale account for <strong>${businessName}</strong>. You're all set to place your first order — here's how it works.
              </p>
            </td>
          </tr>

          <!-- How to Order -->
          <tr>
            <td style="padding: 16px 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917;">How to Place Your First Order</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 12px 16px; background-color: #fff7ed; border-radius: 8px; margin-bottom: 8px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="width: 32px; vertical-align: top;">
                          <div style="width: 24px; height: 24px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-size: 13px; font-weight: 700; text-align: center; line-height: 24px;">1</div>
                        </td>
                        <td style="font-size: 14px; color: #1c1917; line-height: 1.5;">Go to <a href="https://lonestartortillas.com/wholesale" style="color: #ea580c; font-weight: 600; text-decoration: none;">lonestartortillas.com/wholesale</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: #fff7ed; border-radius: 8px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="width: 32px; vertical-align: top;">
                          <div style="width: 24px; height: 24px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-size: 13px; font-weight: 700; text-align: center; line-height: 24px;">2</div>
                        </td>
                        <td style="font-size: 14px; color: #1c1917; line-height: 1.5;">Sign in with your email and password</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: #fff7ed; border-radius: 8px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="width: 32px; vertical-align: top;">
                          <div style="width: 24px; height: 24px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-size: 13px; font-weight: 700; text-align: center; line-height: 24px;">3</div>
                        </td>
                        <td style="font-size: 14px; color: #1c1917; line-height: 1.5;">Browse tortillas and add packs to your order (minimum 16 packs)</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: #fff7ed; border-radius: 8px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="width: 32px; vertical-align: top;">
                          <div style="width: 24px; height: 24px; background-color: #ea580c; border-radius: 50%; color: #ffffff; font-size: 13px; font-weight: 700; text-align: center; line-height: 24px;">4</div>
                        </td>
                        <td style="font-size: 14px; color: #1c1917; line-height: 1.5;">Review your order and check out — done!</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Volume Pricing -->
          <tr>
            <td style="padding: 16px 32px;">
              <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 700; color: #1c1917;">Volume Pricing</h2>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #44403c;">The more you order, the bigger your discount:</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border: 1px solid #e7e5e4; border-radius: 8px; overflow: hidden;">
                <tr style="background-color: #1c1917;">
                  <td style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #ffffff; text-transform: uppercase;">Packs</td>
                  <td style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #ffffff; text-transform: uppercase; text-align: right;">Discount</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 14px; color: #1c1917; border-bottom: 1px solid #f5f5f4;">16 – 50 packs</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #ea580c; font-weight: 600; text-align: right; border-bottom: 1px solid #f5f5f4;">5% off</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 14px; color: #1c1917; border-bottom: 1px solid #f5f5f4;">51 – 100 packs</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #ea580c; font-weight: 600; text-align: right; border-bottom: 1px solid #f5f5f4;">8% off</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 14px; color: #1c1917; border-bottom: 1px solid #f5f5f4;">101 – 250 packs</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #ea580c; font-weight: 600; text-align: right; border-bottom: 1px solid #f5f5f4;">12% off</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 14px; color: #1c1917;">251+ packs</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #ea580c; font-weight: 600; text-align: right;">15% off</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping & Payment -->
          <tr>
            <td style="padding: 16px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="width: 50%; vertical-align: top; padding-right: 12px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #1c1917;">Shipping</h3>
                    <p style="margin: 0; font-size: 13px; color: #44403c; line-height: 1.6;">
                      Free shipping on all wholesale orders. We ship every <strong>Tuesday</strong> via USPS Priority Mail (2-3 day delivery). Order by Monday 9 PM CT to ship that Tuesday.
                    </p>
                  </td>
                  <td style="width: 50%; vertical-align: top; padding-left: 12px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #1c1917;">Payment Terms</h3>
                    <p style="margin: 0; font-size: 13px; color: #44403c; line-height: 1.6;">
                      First orders are paid at checkout (card or bank transfer). As you build history with us, you'll earn better terms — up to <strong>Net 30</strong>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Storage -->
          <tr>
            <td style="padding: 16px 32px;">
              <div style="padding: 16px; background-color: #fafaf9; border-radius: 8px; border-left: 4px solid #ea580c;">
                <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #1c1917;">Storage Tips</h3>
                <p style="margin: 0; font-size: 13px; color: #44403c; line-height: 1.6;">
                  Shelf-stable — no refrigeration needed. Store in a cool, dry place. Best used within 6 months of delivery.
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 24px 32px;">
              <a href="https://lonestartortillas.com/wholesale"
                 style="display: block; text-align: center; background-color: #ea580c; color: #ffffff; padding: 16px 24px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">
                Place Your First Order
              </a>
            </td>
          </tr>

          <!-- Support -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <p style="margin: 0; font-size: 14px; color: #44403c; line-height: 1.6; text-align: center;">
                Questions? Reply to this email or text Matt directly at <strong>949-734-0624</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9; text-align: center; border-top: 1px solid #e7e5e4;">
              <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #1c1917;">Lonestar Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #78716c;">Premium Texas Tortillas</p>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #a8a29e;">
                Independent reseller. Not affiliated with or endorsed by H-E-B&reg;.
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
      replyTo: 'howdy@lonestartortillas.com',
      subject: `Welcome to Lonestar Tortillas Wholesale, ${firstName}!`,
      html,
    });

    if (error) {
      console.error('Failed to send wholesale welcome email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending wholesale welcome email:', error);
    return { success: false, error };
  }
}

/**
 * Send shipping apology email for missed shipping notifications
 */
export async function sendShippingApologyEmail(props: {
  to: string;
  orderNumber: string;
  customerName: string;
  trackingNumber: string;
  carrier: string;
  deliveredDate: string;
  couponCode: string;
}) {
  const { to, orderNumber, customerName, trackingNumber, carrier, deliveredDate, couponCode } = props;

  // Generate tracking URL based on carrier
  let trackingUrl = '';
  const normalizedCarrier = carrier.toLowerCase();
  if (normalizedCarrier.includes('ups')) {
    trackingUrl = `https://www.ups.com/track?tracknum=${trackingNumber}`;
  } else if (normalizedCarrier.includes('usps')) {
    trackingUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
  } else if (normalizedCarrier.includes('fedex')) {
    trackingUrl = `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
  }

  try {
    const html = generateShippingApologyEmail({
      orderNumber,
      customerName,
      trackingNumber,
      carrier,
      deliveredDate,
      couponCode,
      trackingUrl,
    });

    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: `Maria from Lonestar Tortillas <${process.env.RESEND_FROM_EMAIL || fromEmail}>`,
      to,
      replyTo: 'howdy@lonestartortillas.com',
      subject: `An update on your order #${orderNumber} - Lonestar Tortillas`,
      html,
    });

    if (error) {
      console.error('Failed to send shipping apology email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending shipping apology email:', error);
    return { success: false, error };
  }
}
