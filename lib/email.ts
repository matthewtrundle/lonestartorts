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

const fromEmail = process.env.RESEND_FROM_EMAIL || 'orders@lonestartortillas.com';

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
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #f97316;">
    <h1 style="margin: 0; font-size: 28px; color: #1a1a1a;">Lonestar Tortillas</h1>
    <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Premium Texas Tortillas</p>
  </div>

  <!-- Success Message -->
  <div style="background-color: #f0fdf4; border: 1px solid: #86efac; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
    <h2 style="margin: 0 0 10px 0; color: #16a34a; font-size: 24px;">Order Confirmed!</h2>
    <p style="margin: 0; color: #166534; font-size: 16px;">Thank you for your order, ${customerName}!</p>
  </div>

  <!-- Order Details -->
  <div style="margin: 30px 0;">
    <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #1a1a1a;">Order Details</h3>
    <p style="margin: 0 0 10px 0; color: #666;">
      <strong>Order Number:</strong> ${orderNumber}<br>
      <strong>Order Date:</strong> ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    </p>
  </div>

  <!-- Items -->
  <div style="margin: 30px 0;">
    <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #1a1a1a;">Order Items</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="border-bottom: 2px solid #e5e7eb;">
          <th style="text-align: left; padding: 10px 0; color: #666; font-weight: 600; font-size: 14px;">Item</th>
          <th style="text-align: center; padding: 10px 0; color: #666; font-weight: 600; font-size: 14px;">Qty</th>
          <th style="text-align: right; padding: 10px 0; color: #666; font-weight: 600; font-size: 14px;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => `
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 12px 0; color: #1a1a1a;">${item.name}</td>
          <td style="padding: 12px 0; text-align: center; color: #666;">${item.quantity}</td>
          <td style="padding: 12px 0; text-align: right; color: #1a1a1a;">$${((item.price * item.quantity) / 100).toFixed(2)}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Totals -->
  <div style="margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
    <table style="width: 100%;">
      <tr>
        <td style="padding: 5px 0; color: #666;">Subtotal:</td>
        <td style="padding: 5px 0; text-align: right; color: #1a1a1a;">$${(subtotal / 100).toFixed(2)}</td>
      </tr>
      <tr>
        <td style="padding: 5px 0; color: #666;">Shipping:</td>
        <td style="padding: 5px 0; text-align: right; color: #1a1a1a;">$${(shipping / 100).toFixed(2)}</td>
      </tr>
      <tr>
        <td style="padding: 5px 0; color: #666;">Tax:</td>
        <td style="padding: 5px 0; text-align: right; color: #1a1a1a;">$${(tax / 100).toFixed(2)}</td>
      </tr>
      <tr style="border-top: 2px solid #e5e7eb;">
        <td style="padding: 10px 0 0 0; color: #1a1a1a; font-weight: 700; font-size: 18px;">Total:</td>
        <td style="padding: 10px 0 0 0; text-align: right; color: #f97316; font-weight: 700; font-size: 18px;">$${(total / 100).toFixed(2)}</td>
      </tr>
    </table>
  </div>

  <!-- Shipping Address -->
  <div style="margin: 30px 0;">
    <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #1a1a1a;">Shipping Address</h3>
    <p style="margin: 0; color: #666; line-height: 1.8;">
      ${customerName}<br>
      ${shippingAddress.street || ''}<br>
      ${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.zip || ''}<br>
      ${shippingAddress.country || 'United States'}
    </p>
  </div>

  <!-- What's Next -->
  <div style="margin: 30px 0; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
    <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #92400e;">What's Next?</h3>
    <p style="margin: 0; color: #78350f; font-size: 14px; line-height: 1.6;">
      • You'll receive a shipping confirmation within 24-48 hours<br>
      • Estimated delivery: 2-3 business days after shipping<br>
      • Track your order using the link in your shipping email
    </p>
  </div>

  <!-- Footer -->
  <div style="margin: 40px 0 20px 0; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #666; font-size: 12px;">
    <p style="margin: 0 0 10px 0;">
      Questions? Email us at <a href="mailto:orders@lonestartortillas.com" style="color: #f97316; text-decoration: none;">orders@lonestartortillas.com</a>
    </p>
    <p style="margin: 10px 0; font-size: 11px; color: #999;">
      Independent reseller. Not affiliated with or endorsed by H-E-B®.
    </p>
  </div>

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
    <p style="margin: 0 0 10px 0;">
      Questions? Email us at <a href="mailto:orders@lonestartortillas.com" style="color: #f97316; text-decoration: none;">orders@lonestartortillas.com</a>
    </p>
    <p style="margin: 10px 0; font-size: 11px; color: #999;">
      Independent reseller. Not affiliated with or endorsed by H-E-B®.
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
