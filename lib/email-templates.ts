/**
 * Lonestar Tortillas - Transactional Email Templates
 *
 * Production-ready HTML email templates following Lonestar brand guidelines:
 * - Table-based layout for maximum email client compatibility
 * - Inline styles only (no CSS classes)
 * - Brand colors: #111827, #292524, #d97706, #ea580c, #facc15, #fbbf24
 * - Max width: 600px, centered on #f5f5f4 background
 */

interface OrderItem {
  name: string;
  quantity: number;
  price: number; // in cents
}

interface ShippingAddress {
  street?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

interface OrderConfirmationData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number; // in cents
  shipping: number; // in cents
  tax: number; // in cents
  total: number; // in cents
  shippingAddress: ShippingAddress;
}

interface OrderShippedData {
  orderNumber: string;
  customerName: string;
  trackingNumber: string;
  carrier: string;
  items: OrderItem[];
  trackingUrl?: string;
}

/**
 * Generate Order Confirmation Email HTML
 */
export function generateOrderConfirmationEmail(data: OrderConfirmationData): string {
  const {
    orderNumber,
    customerName,
    customerEmail,
    items,
    subtotal,
    shipping,
    tax,
    total,
    shippingAddress,
  } = data;

  const orderDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.15);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #111827 0%, #292524 100%);">
              <div style="margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">Howdy, ${customerName}! Order Confirmed!</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">Your premium Texas tortillas are headed your way. Get ready for some seriously good eats.</p>
            </td>
          </tr>

          <!-- Order Number & Date -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background-color: #fef3c7; border-bottom: 4px solid #d97706;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align: top;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</p>
                    <p style="margin: 0; font-size: 24px; font-weight: 700; color: #1c1917; font-family: monospace; letter-spacing: 1px;">${orderNumber}</p>
                  </td>
                  <td style="text-align: right; vertical-align: top;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px;">Order Date</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1c1917;">${orderDate}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 700; color: #111827;">Order Summary</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${items.map((item, index) => `
                <tr style="${index < items.length - 1 ? 'border-bottom: 1px solid #f5f5f4;' : ''}">
                  <td style="padding: 16px 0;">
                    <div style="font-weight: 600; font-size: 16px; color: #1c1917; margin-bottom: 4px;">${item.name}</div>
                    <div style="font-size: 14px; color: #57534e;">Quantity: ${item.quantity}</div>
                  </td>
                  <td style="padding: 16px 0; text-align: right; font-size: 16px; font-weight: 600; color: #1c1917; white-space: nowrap;">$${((item.price * item.quantity) / 100).toFixed(2)}</td>
                </tr>
                `).join('')}
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 2px solid #e7e5e4; padding-top: 20px;">
                <tr>
                  <td style="padding: 10px 0; font-size: 15px; color: #57534e;">Subtotal</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 15px; color: #1c1917; font-weight: 500;">$${(subtotal / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 15px; color: #57534e;">Shipping</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 15px; color: #1c1917; font-weight: 500;">$${(shipping / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0 20px 0; font-size: 15px; color: #57534e; border-bottom: 2px solid #e7e5e4;">Tax</td>
                  <td style="padding: 10px 0 20px 0; text-align: right; font-size: 15px; color: #1c1917; font-weight: 500; border-bottom: 2px solid #e7e5e4;">$${(tax / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 20px 0 0 0; font-size: 18px; font-weight: 700; color: #111827;">Total</td>
                  <td style="padding: 20px 0 0 0; text-align: right; font-size: 24px; font-weight: 700; color: #d97706;">$${(total / 100).toFixed(2)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping & What's Next -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="width: 48%; vertical-align: top;">
                    <div style="padding: 24px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #d97706;">
                      <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #111827;">Shipping Address</h3>
                      <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.7;">
                        <strong style="color: #1c1917;">${customerName}</strong><br>
                        ${shippingAddress.street || shippingAddress.address1 || ''}<br>
                        ${shippingAddress.address2 ? shippingAddress.address2 + '<br>' : ''}${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.zip || ''}<br>
                        ${shippingAddress.country || 'US'}
                      </p>
                    </div>
                  </td>
                  <td style="width: 4%;"></td>
                  <td style="width: 48%; vertical-align: top;">
                    <div style="padding: 24px; background-color: #fff7ed; border-radius: 8px; border-left: 4px solid #ea580c;">
                      <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #111827;">What Happens Next</h3>
                      <div style="margin-bottom: 12px;">
                        <div style="display: inline-block; width: 20px; height: 20px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 8px; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: 700; font-size: 11px;">✓</span>
                        </div>
                        <span style="font-size: 14px; color: #57534e; line-height: 1.6;">Shipping update within 24-48 hours</span>
                      </div>
                      <div style="margin-bottom: 12px;">
                        <div style="display: inline-block; width: 20px; height: 20px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 8px; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: 700; font-size: 11px;">✓</span>
                        </div>
                        <span style="font-size: 14px; color: #57534e; line-height: 1.6;">Arrives in 2-3 business days</span>
                      </div>
                      <div>
                        <div style="display: inline-block; width: 20px; height: 20px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 8px; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: 700; font-size: 11px;">✓</span>
                        </div>
                        <span style="font-size: 14px; color: #57534e; line-height: 1.6;">Track every step of the way</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #111827;">
              <div style="margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 16px auto;">
                <tr>
                  <td style="background-color: #d97706; border-radius: 6px;">
                    <a href="https://lonestartortillas.com/contact" style="display: inline-block; padding: 12px 24px; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600;">Questions? Contact Us</a>
                  </td>
                </tr>
              </table>
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
</html>`;
}

/**
 * Generate Order Shipped Email HTML
 */
export function generateOrderShippedEmail(data: OrderShippedData): string {
  const { orderNumber, customerName, trackingNumber, carrier, items, trackingUrl } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.15);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #111827 0%, #292524 100%);">
              <div style="margin-bottom: 24px;">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block;">
                  <path d="M16 3h5v5M21 3l-7 7M4 20h5v-5M4 20l7-7"/>
                  <path d="M1 1l6 6M17 1l6 6M17 23l6-6M1 23l6-6"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">Yeehaw! Your Order Has Shipped!</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">Great news, ${customerName}! Your tortillas are riding their way to you right now.</p>
            </td>
          </tr>

          <!-- Tracking Hero -->
          <tr>
            <td style="padding: 40px 32px; background-color: #fef3c7;">
              <div style="text-align: center;">
                <h2 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #111827;">Track Your Package</h2>
                <div style="padding: 24px; background-color: #ffffff; border-radius: 8px; border: 2px solid #d97706; margin-bottom: 24px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="padding: 12px 0; text-align: left;">
                        <span style="font-size: 14px; font-weight: 600; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</span>
                      </td>
                      <td style="padding: 12px 0; text-align: right;">
                        <span style="font-size: 16px; font-weight: 700; color: #1c1917; font-family: monospace; letter-spacing: 1px;">${orderNumber}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" style="padding: 8px 0; border-top: 1px solid #fef3c7;"></td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; text-align: left;">
                        <span style="font-size: 14px; font-weight: 600; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px;">Carrier</span>
                      </td>
                      <td style="padding: 12px 0; text-align: right;">
                        <span style="font-size: 16px; font-weight: 600; color: #1c1917;">${carrier}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" style="padding: 8px 0; border-top: 1px solid #fef3c7;"></td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; text-align: left;">
                        <span style="font-size: 14px; font-weight: 600; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px;">Tracking Number</span>
                      </td>
                      <td style="padding: 12px 0; text-align: right;">
                        <span style="font-size: 18px; font-weight: 700; color: #d97706; font-family: monospace; letter-spacing: 1px;">${trackingNumber}</span>
                      </td>
                    </tr>
                  </table>
                </div>
                ${trackingUrl ? `
                <div style="margin-bottom: 0;">
                  <a href="${trackingUrl}" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(17, 24, 39, 0.2);">Track Package →</a>
                </div>
                ` : ''}
              </div>
            </td>
          </tr>

          <!-- Items Shipped -->
          <tr>
            <td style="padding: 32px;">
              <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700; color: #111827;">Items in This Shipment</h3>
              <div style="padding: 24px; background-color: #f9fafb; border-radius: 8px;">
                ${items.map((item, index) => `
                <div style="padding: ${index > 0 ? '16px' : '0'} 0 ${index < items.length - 1 ? '16px' : '0'} 0; ${index < items.length - 1 ? 'border-bottom: 1px solid #e7e5e4;' : ''}">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="vertical-align: middle;">
                        <span style="display: inline-block; background-color: #d97706; color: #ffffff; font-weight: 700; font-size: 14px; padding: 6px 12px; border-radius: 6px; margin-right: 12px;">${item.quantity}x</span>
                        <span style="font-size: 16px; color: #1c1917; font-weight: 600;">${item.name}</span>
                      </td>
                    </tr>
                  </table>
                </div>
                `).join('')}
              </div>
            </td>
          </tr>

          <!-- Delivery Estimate -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 24px; background-color: #fff7ed; border-radius: 8px; border-left: 4px solid #ea580c;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #111827;">When Will It Arrive?</h3>
                <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.7;">
                  Your tortillas should arrive within <strong style="color: #1c1917;">2-3 business days</strong>. Track your package anytime using the tracking number above — we'll get 'em to you safe and sound.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #111827;">
              <div style="margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 16px auto;">
                <tr>
                  <td style="background-color: #d97706; border-radius: 6px;">
                    <a href="https://lonestartortillas.com/contact" style="display: inline-block; padding: 12px 24px; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600;">Questions? Contact Us</a>
                  </td>
                </tr>
              </table>
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
</html>`;
}

interface FeedbackRequestData {
  orderNumber: string;
  customerName: string;
  feedbackUrl: string; // Base URL like https://lonestartortillas.com/feedback?token=xxx
}

/**
 * Generate Feedback Request Email HTML
 * Each star is a clickable link that takes the customer to the feedback page
 */
export function generateFeedbackRequestEmail(data: FeedbackRequestData): string {
  const { orderNumber, customerName, feedbackUrl } = data;

  // Generate star links - each star links to feedback page with rating pre-selected
  const generateStarLink = (rating: number) => {
    const url = `${feedbackUrl}&rating=${rating}`;
    return `<a href="${url}" style="display: inline-block; padding: 12px 16px; margin: 0 4px; background-color: #fef3c7; border-radius: 8px; text-decoration: none; font-size: 24px; color: #d97706; border: 2px solid #fcd34d;" title="Rate ${rating} star${rating > 1 ? 's' : ''}">${rating}</a>`;
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>How were your tortillas? - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.15);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #111827 0%, #292524 100%);">
              <div style="margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.2;">How Were Your Tortillas?</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">We'd love to hear what you think, ${customerName}!</p>
            </td>
          </tr>

          <!-- Order Reference -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fef3c7; border-bottom: 4px solid #d97706; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 600; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px;">Order</p>
              <p style="margin: 0; font-size: 20px; font-weight: 700; color: #1c1917; font-family: monospace; letter-spacing: 1px;">${orderNumber}</p>
            </td>
          </tr>

          <!-- Rating Request -->
          <tr>
            <td style="padding: 40px 32px; text-align: center;">
              <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #111827;">Rate Your Experience</h2>
              <p style="margin: 0 0 32px 0; font-size: 16px; color: #57534e; line-height: 1.6;">Click a number to rate your tortillas (1 = Poor, 5 = Excellent)</p>

              <!-- Star Rating Links -->
              <div style="margin: 0 0 32px 0;">
                ${generateStarLink(1)}
                ${generateStarLink(2)}
                ${generateStarLink(3)}
                ${generateStarLink(4)}
                ${generateStarLink(5)}
              </div>

              <p style="margin: 0; font-size: 14px; color: #78716c;">Just click a number above — it takes less than 10 seconds!</p>
            </td>
          </tr>

          <!-- Reward Banner -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 24px; background: linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%); border-radius: 12px; border: 2px dashed #d97706; text-align: center;">
                <div style="font-size: 32px; margin-bottom: 12px;">&#127873;</div>
                <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #92400e;">Thank You Reward</h3>
                <p style="margin: 0; font-size: 16px; color: #78350f; line-height: 1.5;">
                  Share your feedback and get a <strong style="color: #d97706;">10% discount code</strong> for your next order!
                </p>
              </div>
            </td>
          </tr>

          <!-- Why Feedback Matters -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 24px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #d97706;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #111827;">Why Your Feedback Matters</h3>
                <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.7;">
                  We're a small Texas tortilla company, and every bit of feedback helps us improve. Your honest opinion — whether it's praise or suggestions — helps us make the best tortillas possible.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #111827;">
              <div style="margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 16px auto;">
                <tr>
                  <td style="background-color: #d97706; border-radius: 6px;">
                    <a href="https://lonestartortillas.com/contact" style="display: inline-block; padding: 12px 24px; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600;">Questions? Contact Us</a>
                  </td>
                </tr>
              </table>
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
</html>`;
}
