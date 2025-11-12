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
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@600;700;800;900&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(180deg, #1a1410 0%, #2c2418 100%);">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(180deg, #1a1410 0%, #2c2418 100%);">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4); border-radius: 0; overflow: hidden; border: 4px solid #8B4513;">

          <!-- Epic Texas Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%); padding: 0; position: relative;">
              <!-- Top accent border -->
              <div style="height: 8px; background: linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);"></div>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 50px 40px; text-align: center; background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4='); background-size: 40px 40px;">

                    <!-- Texas Star Logo -->
                    <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 24px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">
                      <!-- Outer star glow -->
                      <path d="M50 10L61.8 38.2L92 43.1L71 63.2L76.4 93.8L50 78.5L23.6 93.8L29 63.2L8 43.1L38.2 38.2L50 10Z" fill="#FFD700" opacity="0.3"/>
                      <!-- Main star -->
                      <path d="M50 15L60.3 40.8L88 45.1L69 63.5L73.6 91.2L50 77.8L26.4 91.2L31 63.5L12 45.1L39.7 40.8L50 15Z" fill="#FFD700" stroke="#FFFFFF" stroke-width="2.5"/>
                      <!-- Inner details -->
                      <circle cx="50" cy="50" r="12" fill="#8B4513" stroke="#FFD700" stroke-width="2"/>
                      <text x="50" y="56" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#FFD700" text-anchor="middle">★</text>
                    </svg>

                    <h1 style="margin: 0 0 12px 0; font-family: 'Poppins', Arial, sans-serif; font-size: 48px; font-weight: 900; color: #FFD700; text-transform: uppercase; letter-spacing: 0.05em; text-shadow: 3px 3px 6px rgba(0,0,0,0.5), 0 0 20px rgba(255,215,0,0.3); line-height: 1;">SADDLE UP!</h1>
                    <p style="margin: 0 0 8px 0; font-size: 20px; color: #FFD7AA; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Your Order's Ready to Ride</p>
                    <p style="margin: 0; font-size: 16px; color: #FFDEAD; font-weight: 500; font-style: italic;">Howdy, ${customerName}!</p>
                  </td>
                </tr>
              </table>

              <!-- Bottom accent border -->
              <div style="height: 6px; background: linear-gradient(90deg, #004080 0%, #FFFFFF 25%, #CC0000 50%, #FFFFFF 75%, #004080 100%);"></div>
            </td>
          </tr>

          <!-- Personal Note from Maria -->
          <tr>
            <td style="padding: 0; background: linear-gradient(135deg, #8B4513 0%, #6B3410 100%);">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 36px 40px; border-top: 3px dashed #FFD700; border-bottom: 3px dashed #FFD700;">
                    <div style="font-family: 'Poppins', Arial, sans-serif; font-size: 18px; color: #FFDEAD; line-height: 1.7; font-style: italic; text-align: center;">
                      <p style="margin: 0 0 20px 0; font-size: 14px; color: #FFD700; text-transform: uppercase; letter-spacing: 0.15em; font-style: normal; font-weight: 700;">✦ A Personal Note ✦</p>
                      <p style="margin: 0 0 16px 0; font-size: 18px;">"${customerName}, thank you for choosing us! Every tortilla we send is made with the same love and tradition my abuela taught me. You're not just getting tortillas – you're getting a piece of authentic Texas heritage."</p>
                      <p style="margin: 0; font-size: 16px; color: #FFD7AA;">
                        <span style="font-weight: 700; color: #FFD700;">— Maria Rodriguez</span><br>
                        <span style="font-size: 13px; color: #D4A574;">Chief Abuela, Lonestar Tortillas</span>
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Number Banner -->
          <tr>
            <td style="padding: 36px 40px; background: linear-gradient(135deg, #FFF8DC 0%, #FFEAA7 100%); border-bottom: 4px solid #8B4513;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #8B4513; text-transform: uppercase; letter-spacing: 0.12em;">⭐ Order Number ⭐</p>
                    <p style="margin: 0 0 8px 0; font-size: 32px; font-weight: 900; color: #8B4513; font-family: 'Courier New', monospace; letter-spacing: 0.05em; text-shadow: 2px 2px 0px rgba(0,0,0,0.1);">${orderNumber}</p>
                    <p style="margin: 0; font-size: 15px; color: #A0522D; font-weight: 600;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Items Section -->
          <tr>
            <td style="padding: 44px 40px 36px 40px; background-color: #FFFEF5;">
              <h2 style="margin: 0 0 28px 0; font-family: 'Poppins', Arial, sans-serif; font-size: 28px; font-weight: 900; color: #8B4513; text-transform: uppercase; letter-spacing: 0.03em; text-align: center; text-shadow: 1px 1px 0px rgba(0,0,0,0.05);">🌟 Your Texas Haul 🌟</h2>

              <!-- Items Table -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border: 4px solid #8B4513; background-color: #FFFFFF; box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);">
                <thead>
                  <tr style="background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);">
                    <th style="text-align: left; padding: 18px 20px; font-size: 13px; font-weight: 800; color: #FFD700; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 2px solid #FFD700;">Product</th>
                    <th style="text-align: center; padding: 18px 20px; font-size: 13px; font-weight: 800; color: #FFD700; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 2px solid #FFD700;">Qty</th>
                    <th style="text-align: right; padding: 18px 20px; font-size: 13px; font-weight: 800; color: #FFD700; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 2px solid #FFD700;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map((item, index) => `
                  <tr style="${index < items.length - 1 ? 'border-bottom: 2px dashed #DEB887;' : ''}">
                    <td style="padding: 20px; font-size: 16px; color: #2c2720; font-weight: 600; background-color: ${index % 2 === 0 ? '#FFF8DC' : '#FFFFFF'};">${item.name}</td>
                    <td style="padding: 20px; text-align: center; font-size: 18px; color: #8B4513; font-weight: 700; background-color: ${index % 2 === 0 ? '#FFF8DC' : '#FFFFFF'};">${item.quantity}</td>
                    <td style="padding: 20px; text-align: right; font-size: 18px; color: #8B4513; font-weight: 800; background-color: ${index % 2 === 0 ? '#FFF8DC' : '#FFFFFF'};">$${((item.price * item.quantity) / 100).toFixed(2)}</td>
                  </tr>
                  `).join('')}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 0 40px 44px 40px; background-color: #FFFEF5;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #FFF8DC 0%, #FFEAA7 100%); border: 4px double #8B4513; padding: 28px; box-shadow: 0 6px 16px rgba(139, 69, 19, 0.25);">
                <tr>
                  <td style="padding: 10px 0; font-size: 17px; color: #6B3410; font-weight: 600;">Subtotal</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 17px; color: #8B4513; font-weight: 700;">$${(subtotal / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 17px; color: #6B3410; font-weight: 600;">Shipping</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 17px; color: #8B4513; font-weight: 700;">$${(shipping / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0 20px 0; font-size: 17px; color: #6B3410; font-weight: 600; border-bottom: 3px solid #8B4513;">Tax</td>
                  <td style="padding: 10px 0 20px 0; text-align: right; font-size: 17px; color: #8B4513; font-weight: 700; border-bottom: 3px solid #8B4513;">$${(tax / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 20px 0 0 0; font-family: 'Bitter', Georgia, serif; font-size: 24px; color: #6B3410; font-weight: 900; text-transform: uppercase;">Total Owed</td>
                  <td style="padding: 20px 0 0 0; text-align: right; font-family: 'Bitter', Georgia, serif; font-size: 38px; color: #CC0000; font-weight: 900; text-shadow: 2px 2px 0px rgba(0,0,0,0.1);">$${(total / 100).toFixed(2)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 0 40px 44px 40px; background-color: #FFFEF5;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border: 4px solid #8B4513; padding: 28px; background: linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 100%); box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 20px 0; font-family: 'Poppins', Arial, sans-serif; font-size: 22px; font-weight: 900; color: #8B4513; text-transform: uppercase; letter-spacing: 0.05em;">📦 Delivery Destination</h3>
                    <p style="margin: 0; font-size: 17px; color: #6B3410; line-height: 1.9; font-weight: 600;">
                      ${customerName}<br>
                      ${shippingAddress.street || shippingAddress.address1 || ''}<br>
                      ${shippingAddress.address2 ? shippingAddress.address2 + '<br>' : ''}${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.zip || ''}<br>
                      ${shippingAddress.country || 'United States'}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's Next Section -->
          <tr>
            <td style="padding: 0 40px 48px 40px; background-color: #FFFEF5;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%); border: 4px solid #FFD700; padding: 32px; box-shadow: 0 8px 20px rgba(139, 69, 19, 0.4);">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 24px 0; font-family: 'Poppins', Arial, sans-serif; font-size: 26px; font-weight: 900; color: #FFD700; text-transform: uppercase; letter-spacing: 0.05em; text-align: center; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">⚡ What Happens Next ⚡</h3>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0; vertical-align: top; width: 32px;">
                          <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #FFD700; border: 3px solid #FFFFFF; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
                            <span style="color: #8B4513; font-size: 16px; font-weight: 900;">✓</span>
                          </div>
                        </td>
                        <td style="padding: 12px 0 12px 16px; font-size: 17px; color: #FFF8DC; line-height: 1.6; font-weight: 700;">Shipping confirmation within 24-48 hours</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; vertical-align: top; width: 32px;">
                          <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #FFD700; border: 3px solid #FFFFFF; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
                            <span style="color: #8B4513; font-size: 16px; font-weight: 900;">✓</span>
                          </div>
                        </td>
                        <td style="padding: 12px 0 12px 16px; font-size: 17px; color: #FFF8DC; line-height: 1.6; font-weight: 700;">Tortillas arrive fresh in 2-3 business days</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; vertical-align: top; width: 32px;">
                          <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #FFD700; border: 3px solid #FFFFFF; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
                            <span style="color: #8B4513; font-size: 16px; font-weight: 900;">✓</span>
                          </div>
                        </td>
                        <td style="padding: 12px 0 12px 16px; font-size: 17px; color: #FFF8DC; line-height: 1.6; font-weight: 700;">Track your package via email updates</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Epic Texas Footer -->
          <tr>
            <td style="background: linear-gradient(180deg, #1a1410 0%, #2c2418 100%); padding: 0;">
              <!-- Top border -->
              <div style="height: 8px; background: linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);"></div>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 48px 40px; text-align: center;">
                    <!-- Texas Star -->
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 20px;">
                      <path d="M50 15L60.3 40.8L88 45.1L69 63.5L73.6 91.2L50 77.8L26.4 91.2L31 63.5L12 45.1L39.7 40.8L50 15Z" fill="#FFD700"/>
                    </svg>

                    <h3 style="margin: 0 0 8px 0; font-family: 'Poppins', Arial, sans-serif; font-size: 32px; font-weight: 900; color: #FFD700; text-transform: uppercase; letter-spacing: 0.08em; text-shadow: 3px 3px 6px rgba(0,0,0,0.5);">Lonestar Tortillas</h3>
                    <p style="margin: 0 0 28px 0; font-size: 16px; color: #D4A574; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">Premium Texas Tortillas</p>

                    <!-- Divider -->
                    <div style="width: 120px; height: 3px; background: linear-gradient(90deg, transparent 0%, #FFD700 50%, transparent 100%); margin: 0 auto 28px auto;"></div>

                    <p style="margin: 0 0 16px 0; font-size: 13px; color: #A0522D; line-height: 1.8; font-weight: 600;">
                      Independent reseller. Not affiliated with or endorsed by H-E-B®.
                    </p>
                    <p style="margin: 0; font-size: 16px; color: #D4A574; font-weight: 700; font-style: italic;">
                      Made with Texas Pride 🤠
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Bottom Texas Flag Border -->
              <div style="height: 12px; background: linear-gradient(90deg, #004080 0%, #FFFFFF 33%, #CC0000 66%, #FFFFFF 100%);"></div>
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
