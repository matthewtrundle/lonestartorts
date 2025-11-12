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
    address1?: string;
    address2?: string;
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

    console.log('Order shipped email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending order shipped email:', error);
    return { success: false, error };
  }
}
