/**
 * Refined Transactional Emails
 * Sophisticated, compact design inspired by marketing communications
 * Professional with subtle Texas touches
 */

export const REFINED_ORDER_CONFIRMATION = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 20px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">

          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px; background-color: #ffffff; border-bottom: 1px solid #e7e5e4;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="text-align: left;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#d97706" style="vertical-align: middle; margin-right: 8px;">
                      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                    </svg>
                    <span style="font-size: 18px; font-weight: 700; color: #1c1917; vertical-align: middle;">LONESTAR TORTILLAS</span>
                  </td>
                  <td style="text-align: right;">
                    <span style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">Confirmed</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding: 0;">
              <img src="https://lonestartortillas.com/images/LeadAd.png" alt="Premium Texas Tortillas" style="width: 100%; height: auto; display: block; max-height: 200px; object-fit: cover;" />
            </td>
          </tr>

          <!-- Order Confirmed Message -->
          <tr>
            <td style="padding: 32px; text-align: center; background: linear-gradient(180deg, #fef3c7 0%, #ffffff 100%);">
              <div style="display: inline-block; width: 48px; height: 48px; background-color: #10b981; border-radius: 50%; margin-bottom: 16px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="padding: 12px;">
                  <path d="M20 6L9 17L4 12" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1c1917;">Order Confirmed!</h1>
              <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.5;">
                Thank you for your order. We're preparing your premium Texas tortillas for shipment.
              </p>
            </td>
          </tr>

          <!-- Order Details Compact -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 16px; border-bottom: 2px solid #e7e5e4;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="width: 50%; vertical-align: top;">
                          <p style="margin: 0 0 4px 0; font-size: 11px; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Order Number</p>
                          <p style="margin: 0; font-size: 16px; font-weight: 700; color: #1c1917;">#ORDER_NUMBER</p>
                        </td>
                        <td style="width: 50%; text-align: right; vertical-align: top;">
                          <p style="margin: 0 0 4px 0; font-size: 11px; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Order Date</p>
                          <p style="margin: 0; font-size: 16px; font-weight: 700; color: #1c1917;">ORDER_DATE</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Order Items Compact -->
              <div style="padding: 16px 0; border-bottom: 1px solid #e7e5e4;">
                <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Items Ordered</p>
                <!-- Replace with actual items loop -->
                <div style="margin-bottom: 8px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="width: 60%; font-size: 14px; color: #1c1917;">ORDER_ITEM_NAME</td>
                      <td style="width: 20%; text-align: right; font-size: 14px; color: #57534e;">× QTY</td>
                      <td style="width: 20%; text-align: right; font-size: 14px; font-weight: 600; color: #1c1917;">$PRICE</td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Order Summary Compact -->
              <div style="padding: 16px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 4px 0; font-size: 14px; color: #57534e;">Subtotal</td>
                    <td style="padding: 4px 0; text-align: right; font-size: 14px; color: #1c1917;">$SUBTOTAL</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 14px; color: #57534e;">Shipping</td>
                    <td style="padding: 4px 0; text-align: right; font-size: 14px; color: #1c1917;">$SHIPPING</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 14px; color: #57534e;">Tax</td>
                    <td style="padding: 4px 0; text-align: right; font-size: 14px; color: #1c1917;">$TAX</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0 0 0; border-top: 2px solid #e7e5e4; font-size: 16px; font-weight: 700; color: #1c1917;">Total</td>
                    <td style="padding: 12px 0 0 0; border-top: 2px solid #e7e5e4; text-align: right; font-size: 18px; font-weight: 700; color: #10b981;">$TOTAL</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Shipping Address Compact -->
          <tr>
            <td style="padding: 24px 32px; background-color: #ffffff;">
              <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Shipping To</p>
              <p style="margin: 0; font-size: 14px; color: #1c1917; line-height: 1.6;">
                <strong>SHIPPING_NAME</strong><br>
                SHIPPING_ADDRESS1<br>
                SHIPPING_ADDRESS2_IF_EXISTS
                SHIPPING_CITY, SHIPPING_STATE SHIPPING_ZIP<br>
                SHIPPING_COUNTRY
              </p>
            </td>
          </tr>

          <!-- Next Steps Compact -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9;">
              <p style="margin: 0 0 12px 0; font-size: 15px; font-weight: 600; color: #1c1917;">What happens next?</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="width: 32px; vertical-align: top;">
                    <div style="width: 24px; height: 24px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 24px;">
                      <span style="color: #ffffff; font-weight: 700; font-size: 12px;">1</span>
                    </div>
                  </td>
                  <td style="padding-bottom: 12px;">
                    <p style="margin: 0; font-size: 14px; color: #1c1917;"><strong>Processing:</strong> We're preparing your order (1-2 business days)</p>
                  </td>
                </tr>
                <tr>
                  <td style="width: 32px; vertical-align: top;">
                    <div style="width: 24px; height: 24px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 24px;">
                      <span style="color: #ffffff; font-weight: 700; font-size: 12px;">2</span>
                    </div>
                  </td>
                  <td style="padding-bottom: 12px;">
                    <p style="margin: 0; font-size: 14px; color: #1c1917;"><strong>Shipping:</strong> You'll receive tracking information via email</p>
                  </td>
                </tr>
                <tr>
                  <td style="width: 32px; vertical-align: top;">
                    <div style="width: 24px; height: 24px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 24px;">
                      <span style="color: #ffffff; font-weight: 700; font-size: 12px;">3</span>
                    </div>
                  </td>
                  <td>
                    <p style="margin: 0; font-size: 14px; color: #1c1917;"><strong>Delivery:</strong> Premium tortillas arrive at your door (3-5 business days)</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 24px 32px; text-align: center; background-color: #ffffff;">
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #57534e;">Questions about your order?</p>
              <a href="mailto:wholesale@lonestartortillas.com" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Contact Support</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #ffffff; border-top: 1px solid #e7e5e4; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 600; color: #1c1917;">Lonestar Tortillas</p>
              <p style="margin: 0 0 12px 0; font-size: 12px; color: #78716c;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 11px; color: #a8a29e; line-height: 1.5;">
                <a href="https://lonestartortillas.com" style="color: #d97706; text-decoration: none;">lonestartortillas.com</a> |
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #d97706; text-decoration: none;">wholesale@lonestartortillas.com</a><br>
                Independent reseller. Not affiliated with H-E-B®.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const REFINED_ORDER_SHIPPED = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 20px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">

          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px; background-color: #ffffff; border-bottom: 1px solid #e7e5e4;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="text-align: left;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#d97706" style="vertical-align: middle; margin-right: 8px;">
                      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                    </svg>
                    <span style="font-size: 18px; font-weight: 700; color: #1c1917; vertical-align: middle;">LONESTAR TORTILLAS</span>
                  </td>
                  <td style="text-align: right;">
                    <span style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">Shipped</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding: 0;">
              <img src="https://lonestartortillas.com/images/Cards/image%20(12).png" alt="Your tortillas are on the way" style="width: 100%; height: auto; display: block; max-height: 200px; object-fit: cover;" />
            </td>
          </tr>

          <!-- Shipped Message -->
          <tr>
            <td style="padding: 32px; text-align: center; background: linear-gradient(180deg, #dbeafe 0%, #ffffff 100%);">
              <div style="display: inline-block; width: 48px; height: 48px; background-color: #2563eb; border-radius: 50%; margin-bottom: 16px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="padding: 14px;">
                  <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1c1917;">Your Order Has Shipped!</h1>
              <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.5;">
                Your premium Texas tortillas are on the way to your door.
              </p>
            </td>
          </tr>

          <!-- Tracking Information -->
          <tr>
            <td style="padding: 24px 32px;">
              <div style="padding: 20px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #2563eb; border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 11px; color: #1e40af; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Tracking Number</p>
                <p style="margin: 0 0 16px 0; font-family: 'Courier New', monospace; font-size: 18px; font-weight: 700; color: #1c1917; letter-spacing: 1px;">TRACKING_NUMBER</p>
                <a href="TRACKING_URL" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Track Your Package →</a>
              </div>
            </td>
          </tr>

          <!-- Delivery Details -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="width: 48%; padding: 16px; background-color: #fafaf9; border-radius: 6px; vertical-align: top;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Carrier</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 700; color: #1c1917;">CARRIER_NAME</p>
                  </td>
                  <td style="width: 4%;"></td>
                  <td style="width: 48%; padding: 16px; background-color: #d1fae5; border-radius: 6px; vertical-align: top;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Estimated Delivery</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 700; color: #047857;">DELIVERY_DATE</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9; border-top: 1px solid #e7e5e4;">
              <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Order Summary</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="width: 50%; font-size: 13px; color: #57534e;">Order #ORDER_NUMBER</td>
                  <td style="width: 50%; text-align: right; font-size: 13px; color: #57534e;">ORDER_DATE</td>
                </tr>
              </table>
              <p style="margin: 12px 0 0 0; font-size: 13px; color: #57534e;">ORDER_ITEM_COUNT items • $ORDER_TOTAL</p>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 24px 32px; background-color: #ffffff;">
              <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Shipping To</p>
              <p style="margin: 0; font-size: 14px; color: #1c1917; line-height: 1.6;">
                <strong>SHIPPING_NAME</strong><br>
                SHIPPING_ADDRESS1<br>
                SHIPPING_ADDRESS2_IF_EXISTS
                SHIPPING_CITY, SHIPPING_STATE SHIPPING_ZIP<br>
                SHIPPING_COUNTRY
              </p>
            </td>
          </tr>

          <!-- Pro Tips -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9;">
              <p style="margin: 0 0 12px 0; font-size: 15px; font-weight: 600; color: #1c1917;">Pro Tips While You Wait</p>
              <div style="margin-bottom: 12px; padding-left: 8px; border-left: 3px solid #d97706;">
                <p style="margin: 0; font-size: 14px; color: #1c1917;"><strong>Storage:</strong> Keep refrigerated. Stays fresh for 2-3 weeks sealed.</p>
              </div>
              <div style="margin-bottom: 12px; padding-left: 8px; border-left: 3px solid #d97706;">
                <p style="margin: 0; font-size: 14px; color: #1c1917;"><strong>Best Results:</strong> Warm on griddle or comal for 30 seconds per side.</p>
              </div>
              <div style="padding-left: 8px; border-left: 3px solid #d97706;">
                <p style="margin: 0; font-size: 14px; color: #1c1917;"><strong>Keep Warm:</strong> Use a tortilla warmer or wrap in a clean kitchen towel.</p>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 24px 32px; text-align: center; background-color: #ffffff;">
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #57534e;">Questions about your shipment?</p>
              <a href="mailto:wholesale@lonestartortillas.com" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Contact Support</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #ffffff; border-top: 1px solid #e7e5e4; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 600; color: #1c1917;">Lonestar Tortillas</p>
              <p style="margin: 0 0 12px 0; font-size: 12px; color: #78716c;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 11px; color: #a8a29e; line-height: 1.5;">
                <a href="https://lonestartortillas.com" style="color: #d97706; text-decoration: none;">lonestartortillas.com</a> |
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #d97706; text-decoration: none;">wholesale@lonestartortillas.com</a><br>
                Independent reseller. Not affiliated with H-E-B®.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
