/**
 * Texas-Style Transactional Emails
 * Yee-haw personality while staying professional
 */

export const TEXAS_ORDER_CONFIRMATION = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yee-Haw! Order Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: Georgia, 'Palatino Linotype', Palatino, serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(180deg, #fef3c7 0%, #fde68a 100%);">
    <tr>
      <td style="padding: 20px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

          <!-- Header with Texas Flair -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background: linear-gradient(135deg, #d97706 0%, #92400e 100%); text-align: center; border-bottom: 6px solid #92400e;">
              <h1 style="margin: 0; font-size: 36px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🤠 Yee-Haw!</h1>
              <p style="margin: 8px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; color: #fef3c7; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;">Your Order Is Confirmed</p>
            </td>
          </tr>

          <!-- Success Banner -->
          <tr>
            <td style="padding: 32px; background-color: #d1fae5; text-align: center; border-bottom: 4px solid #10b981;">
              <p style="margin: 0 0 12px 0; font-family: Georgia, serif; font-size: 24px; font-weight: 700; color: #1c1917; letter-spacing: -0.01em;">Hot damn, partner! 🌟</p>
              <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; color: #065f46; line-height: 1.6;">
                Your premium Texas tortillas are heading your way faster than a tumbleweed in a dust storm.
              </p>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #1c1917; font-family: Georgia, serif; letter-spacing: -0.01em;">Order Details, Y'all</h2>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px; padding: 20px; background-color: #fef3c7; border-radius: 8px; border-left: 6px solid #d97706;">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <p style="margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #78716c; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">Order Number</p>
                    <p style="margin: 4px 0 0 0; font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: #92400e;">#ORDER_NUMBER</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #78716c; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">Order Date</p>
                    <p style="margin: 4px 0 0 0; font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #1c1917;">ORDER_DATE</p>
                  </td>
                </tr>
              </table>

              <!-- Items -->
              <div style="padding: 24px; background: linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%); border-radius: 8px; border: 1px solid #e7e5e4; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #1c1917; letter-spacing: -0.01em;">What's Heading Your Way:</h3>
                <p style="margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #57534e; line-height: 1.8;">
                  • ORDER_ITEMS<br>
                  Total: <strong style="color: #d97706; font-size: 18px;">TOTAL_AMOUNT</strong>
                </p>
              </div>

              <!-- Next Steps Texas Style -->
              <div style="padding: 24px; background-color: #fff7ed; border-radius: 8px; border: 2px solid #d97706;">
                <h3 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #92400e; letter-spacing: -0.01em;">🐎 What Happens Next:</h3>
                <p style="margin: 0 0 12px 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #1c1917; line-height: 1.7;">
                  <strong>1. We're wranglin' your order</strong> (1-2 business days)<br>
                  Getting those tortillas ready for their journey.
                </p>
                <p style="margin: 0 0 12px 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #1c1917; line-height: 1.7;">
                  <strong>2. Saddle up for shipping</strong><br>
                  You'll get tracking info quicker than you can say "howdy."
                </p>
                <p style="margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #1c1917; line-height: 1.7;">
                  <strong>3. Delivery to your door</strong> (3-5 business days)<br>
                  Premium Texas tortillas, delivered fresh.
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 32px; text-align: center; background: linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%);">
              <p style="margin: 0 0 20px 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 16px; color: #57534e;">Questions? We're here to help, partner.</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%); border: 3px solid #b45309; border-radius: 8px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);">
                    <a href="mailto:wholesale@lonestartortillas.com" style="display: block; padding: 18px 48px; font-family: 'Helvetica Neue', Arial, sans-serif; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 18px; letter-spacing: 0.02em;">Contact Support</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; background: linear-gradient(to bottom, transparent, #fef3c7); border-top: 3px solid #d97706; text-align: center;">
              <p style="margin: 0 0 8px 0; font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #92400e; letter-spacing: -0.01em;">Lonestar Tortillas</p>
              <p style="margin: 0 0 16px 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #78716c; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #a8a29e; line-height: 1.6;">
                <a href="https://lonestartortillas.com" style="color: #d97706; text-decoration: none; font-weight: 600;">lonestartortillas.com</a><br>
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

export const TEXAS_ORDER_SHIPPED = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ride 'Em Cowboy! Order Shipped</title>
</head>
<body style="margin: 0; padding: 0; font-family: Georgia, 'Palatino Linotype', Palatino, serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(180deg, #dbeafe 0%, #bfdbfe 100%);">
    <tr>
      <td style="padding: 20px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background: linear-gradient(135deg, #d97706 0%, #92400e 100%); text-align: center; border-bottom: 6px solid #92400e;">
              <h1 style="margin: 0; font-size: 36px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🚚💨 Ride 'Em!</h1>
              <p style="margin: 8px 0 0 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; color: #fef3c7; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;">Your Order Hit The Trail</p>
            </td>
          </tr>

          <!-- Hero Message -->
          <tr>
            <td style="padding: 32px; background-color: #dbeafe; text-align: center; border-bottom: 4px solid #2563eb;">
              <p style="margin: 0 0 12px 0; font-family: Georgia, serif; font-size: 28px; font-weight: 700; color: #1c1917; letter-spacing: -0.01em;">Giddy up! 🤠</p>
              <p style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; color: #1e40af; line-height: 1.6;">
                Your premium Texas tortillas are cruisin' down the highway headed straight to your kitchen.
              </p>
            </td>
          </tr>

          <!-- Tracking -->
          <tr>
            <td style="padding: 40px 32px;">
              <div style="padding: 32px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 3px solid #2563eb; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">
                <p style="margin: 0 0 12px 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #1e40af; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">🔍 Track Your Tortillas</p>
                <p style="margin: 0 0 24px 0; font-family: 'Courier New', monospace; font-size: 26px; font-weight: 700; color: #92400e; letter-spacing: 2px;">TRACKING_NUMBER</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                  <tr>
                    <td style="background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%); border: 3px solid #1e40af; border-radius: 8px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);">
                      <a href="TRACKING_URL" style="display: block; padding: 18px 48px; font-family: 'Helvetica Neue', Arial, sans-serif; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 18px;">Track Package →</a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Delivery Info -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 32px;">
                <tr>
                  <td style="width: 48%; padding: 20px; background: linear-gradient(180deg, #fef3c7 0%, #fde68a 100%); border-radius: 8px; border-left: 6px solid #d97706; vertical-align: top;">
                    <p style="margin: 0 0 8px 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #78716c; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">Carrier</p>
                    <p style="margin: 0; font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #92400e;">CARRIER_NAME</p>
                  </td>
                  <td style="width: 4%;"></td>
                  <td style="width: 48%; padding: 20px; background: linear-gradient(180deg, #d1fae5 0%, #a7f3d0 100%); border-radius: 8px; border-left: 6px solid #10b981; vertical-align: top;">
                    <p style="margin: 0 0 8px 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #78716c; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">Delivery</p>
                    <p style="margin: 0; font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #047857;">DELIVERY_DATE</p>
                  </td>
                </tr>
              </table>

              <!-- Texas Pro Tips -->
              <div style="margin-top: 32px; padding: 24px; background-color: #fff7ed; border-radius: 8px; border: 2px solid #d97706;">
                <h3 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; font-weight: 700; color: #92400e; letter-spacing: -0.01em;">🌟 Pro Tips While You Wait:</h3>

                <div style="margin-bottom: 16px; padding-left: 12px; border-left: 4px solid #d97706;">
                  <p style="margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #1c1917; line-height: 1.7;">
                    <strong style="color: #92400e;">Storage:</strong> Pop 'em in the fridge. They'll stay fresh for 2-3 weeks, sealed up tight.
                  </p>
                </div>

                <div style="margin-bottom: 16px; padding-left: 12px; border-left: 4px solid #d97706;">
                  <p style="margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #1c1917; line-height: 1.7;">
                    <strong style="color: #92400e;">Best Results:</strong> Warm on a griddle or comal for 30 seconds per side. That's the Texas way.
                  </p>
                </div>

                <div style="padding-left: 12px; border-left: 4px solid #d97706;">
                  <p style="margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #1c1917; line-height: 1.7;">
                    <strong style="color: #92400e;">Keep 'Em Warm:</strong> Use a tortilla warmer or wrap in a clean kitchen towel. Simple as that.
                  </p>
                </div>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 32px; text-align: center; background: linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%);">
              <p style="margin: 0 0 20px 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 16px; color: #57534e;">Got questions? Holler at us!</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #1c1917; border-radius: 8px; box-shadow: 0 4px 12px rgba(28, 25, 23, 0.3);">
                    <a href="mailto:wholesale@lonestartortillas.com" style="display: block; padding: 16px 40px; font-family: 'Helvetica Neue', Arial, sans-serif; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">Contact Support</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; background: linear-gradient(to bottom, transparent, #fef3c7); border-top: 3px solid #d97706; text-align: center;">
              <p style="margin: 0 0 8px 0; font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #92400e; letter-spacing: -0.01em;">Lonestar Tortillas</p>
              <p style="margin: 0 0 16px 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #78716c; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #a8a29e; line-height: 1.6;">
                <a href="https://lonestartortillas.com" style="color: #d97706; text-decoration: none; font-weight: 600;">lonestartortillas.com</a><br>
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
