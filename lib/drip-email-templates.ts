/**
 * Lonestar Tortillas - Drip Campaign Email Templates
 *
 * 6-email sequence for spin-to-win leads who haven't converted
 * Schedule: Day 1, 3, 5, 12, 18, 30
 *
 * Following Lonestar brand guidelines:
 * - Table-based layout for maximum email client compatibility
 * - Inline styles only (no CSS classes)
 * - Brand colors: #111827, #292524, #d97706, #ea580c, #facc15, #fbbf24
 * - Max width: 600px, centered on #f5f5f4 background
 */

export interface DripEmailData {
  email: string;
  originalPrize: string;
  originalCode: string;
  discountCode?: string; // For emails 4-6
  trackingPixelUrl: string;
  unsubscribeUrl: string;
  shopUrl: string;
}

// Prize display names
const PRIZE_NAMES: Record<string, string> = {
  'five_off': '$5 Off',
  'free_shipping': 'Free Shipping',
  'bonus_tortillas': '10 Free Tortillas',
  'free_sauce': 'Free H-E-B Green Sauce',
  'ten_percent': '10% Off',
  'jackpot': 'Jackpot Prize',
};

// Get prize display name
function getPrizeName(prize: string): string {
  return PRIZE_NAMES[prize] || prize;
}

// Get first name from email (fallback)
function getNameFromEmail(email: string): string {
  const localPart = email.split('@')[0];
  // Capitalize first letter
  return localPart.charAt(0).toUpperCase() + localPart.slice(1).split(/[._-]/)[0];
}

// Common footer with unsubscribe and tracking
function generateFooter(data: DripEmailData): string {
  return `
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
              <p style="margin: 0 0 16px 0; font-size: 12px; color: #78716c;">
                Independent reseller • Not affiliated with or endorsed by H-E-B®
              </p>
              <p style="margin: 0; font-size: 12px; color: #57534e;">
                <a href="${data.unsubscribeUrl}" style="color: #a8a29e; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>

          <!-- Tracking Pixel -->
          <tr>
            <td>
              <img src="${data.trackingPixelUrl}" width="1" height="1" alt="" style="display: block; width: 1px; height: 1px; border: 0;" />
            </td>
          </tr>`;
}

// Common email wrapper
function wrapEmail(title: string, content: string, footer: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.15);">
${content}
${footer}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Email 1 - Day 1: Prize Reminder
 * "Your [prize] is waiting!"
 */
export function generateDripEmail1(data: DripEmailData): { subject: string; html: string } {
  const name = getNameFromEmail(data.email);
  const prizeName = getPrizeName(data.originalPrize);

  const subject = `Your ${prizeName} is waiting!`;

  const content = `
          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #111827 0%, #292524 100%);">
              <div style="margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.2;">Howdy, ${name}!</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">Don't forget about your prize!</p>
            </td>
          </tr>

          <!-- Prize Reminder -->
          <tr>
            <td style="padding: 40px 32px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 16px;">&#127873;</div>
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #111827;">You Won ${prizeName}!</h2>
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #57534e; line-height: 1.6;">
                Remember when you spun our wheel? Your prize is ready to use on the most delicious Texas tortillas you've ever tasted.
              </p>

              <!-- Code Box -->
              <div style="padding: 20px 32px; background: linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%); border-radius: 12px; border: 2px dashed #d97706; display: inline-block; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px;">Your Code</p>
                <p style="margin: 0; font-size: 24px; font-weight: 700; color: #d97706; font-family: monospace; letter-spacing: 2px;">${data.originalCode}</p>
              </div>

              <div>
                <a href="${data.shopUrl}" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);">Claim Your Prize Now</a>
              </div>
            </td>
          </tr>

          <!-- What You're Missing -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 24px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #d97706;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #111827;">Why Texas Loves Our Tortillas</h3>
                <ul style="margin: 0; padding-left: 20px; font-size: 15px; color: #57534e; line-height: 1.8;">
                  <li>Authentic H-E-B tortillas shipped fresh</li>
                  <li>The same tortillas top Texas restaurants use</li>
                  <li>Perfect for tacos, quesadillas, and more</li>
                </ul>
              </div>
            </td>
          </tr>`;

  return { subject, html: wrapEmail(subject, content, generateFooter(data)) };
}

/**
 * Email 2 - Day 3: Value Proposition
 * "Why Texans love our tortillas"
 */
export function generateDripEmail2(data: DripEmailData): { subject: string; html: string } {
  const name = getNameFromEmail(data.email);

  const subject = "Why Texans love our tortillas";

  const content = `
          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #111827 0%, #292524 100%);">
              <div style="margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.2;">The Secret to Great Tex-Mex</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">It all starts with the tortilla, ${name}.</p>
            </td>
          </tr>

          <!-- Value Props -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #111827; text-align: center;">Not All Tortillas Are Created Equal</h2>

              <!-- Feature 1 -->
              <div style="margin-bottom: 24px; padding: 20px; background-color: #fff7ed; border-radius: 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="width: 50px; vertical-align: top;">
                      <div style="font-size: 32px;">&#129473;</div>
                    </td>
                    <td>
                      <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #111827;">Restaurant Quality</h3>
                      <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.6;">The same tortillas used by top Texas taco joints and Tex-Mex restaurants.</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Feature 2 -->
              <div style="margin-bottom: 24px; padding: 20px; background-color: #fef3c7; border-radius: 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="width: 50px; vertical-align: top;">
                      <div style="font-size: 32px;">&#128230;</div>
                    </td>
                    <td>
                      <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #111827;">Ships Nationwide</h3>
                      <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.6;">No matter where you live, we'll get authentic Texas tortillas to your door.</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Feature 3 -->
              <div style="margin-bottom: 24px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="width: 50px; vertical-align: top;">
                      <div style="font-size: 32px;">&#11088;</div>
                    </td>
                    <td>
                      <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #111827;">Premium H-E-B Tortillas</h3>
                      <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.6;">The legendary tortillas Texans have trusted for generations.</p>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="text-align: center;">
                <a href="${data.shopUrl}" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">Shop Tortillas</a>
              </div>
            </td>
          </tr>

          <!-- Prize Reminder -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 20px; background: linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%); border-radius: 8px; border: 2px dashed #d97706; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #78350f;">
                  <strong>Remember:</strong> You still have your <strong>${getPrizeName(data.originalPrize)}</strong> waiting!
                  <br>Code: <span style="font-family: monospace; color: #d97706;">${data.originalCode}</span>
                </p>
              </div>
            </td>
          </tr>`;

  return { subject, html: wrapEmail(subject, content, generateFooter(data)) };
}

/**
 * Email 3 - Day 5: Social Proof
 * "See what customers are saying"
 */
export function generateDripEmail3(data: DripEmailData): { subject: string; html: string } {
  const name = getNameFromEmail(data.email);

  const subject = "See what customers are saying";

  const content = `
          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #111827 0%, #292524 100%);">
              <div style="margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.2;">Don't Take Our Word For It</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">See why customers keep coming back, ${name}.</p>
            </td>
          </tr>

          <!-- Testimonials -->
          <tr>
            <td style="padding: 40px 32px;">

              <!-- Testimonial 1 -->
              <div style="margin-bottom: 24px; padding: 24px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #d97706;">
                <div style="margin-bottom: 12px; color: #d97706; font-size: 20px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #1c1917; line-height: 1.6; font-style: italic;">
                  "I moved from Austin to Colorado and missed H-E-B tortillas SO much. These are the real deal. My tacos finally taste like home again!"
                </p>
                <p style="margin: 0; font-size: 14px; color: #78716c; font-weight: 600;">- Sarah M., Denver</p>
              </div>

              <!-- Testimonial 2 -->
              <div style="margin-bottom: 24px; padding: 24px; background-color: #fff7ed; border-radius: 8px; border-left: 4px solid #ea580c;">
                <div style="margin-bottom: 12px; color: #d97706; font-size: 20px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #1c1917; line-height: 1.6; font-style: italic;">
                  "Fast shipping and fresh tortillas. My family dinner went from meh to amazing. The flour tortillas are perfect for breakfast tacos."
                </p>
                <p style="margin: 0; font-size: 14px; color: #78716c; font-weight: 600;">- Mike T., Chicago</p>
              </div>

              <!-- Testimonial 3 -->
              <div style="margin-bottom: 32px; padding: 24px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #facc15;">
                <div style="margin-bottom: 12px; color: #d97706; font-size: 20px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #1c1917; line-height: 1.6; font-style: italic;">
                  "Game changer! I threw a Taco Tuesday party and everyone asked where I got the tortillas. Now I'm the taco hero of my friend group."
                </p>
                <p style="margin: 0; font-size: 14px; color: #78716c; font-weight: 600;">- Jessica R., Phoenix</p>
              </div>

              <div style="text-align: center;">
                <a href="${data.shopUrl}" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">Join Happy Customers</a>
              </div>
            </td>
          </tr>

          <!-- Prize Reminder -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 20px; background: linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%); border-radius: 8px; border: 2px dashed #d97706; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #78350f;">
                  <strong>Your prize is still waiting:</strong> ${getPrizeName(data.originalPrize)}
                </p>
              </div>
            </td>
          </tr>`;

  return { subject, html: wrapEmail(subject, content, generateFooter(data)) };
}

/**
 * Email 4 - Day 12: New Offer
 * "We saved something for you: [NEW CODE]"
 */
export function generateDripEmail4(data: DripEmailData): { subject: string; html: string } {
  const name = getNameFromEmail(data.email);
  const newCode = data.discountCode || 'COMEBACK10';

  const subject = "We saved something special for you";

  const content = `
          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #111827 0%, #292524 100%);">
              <div style="margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.2;">Hey ${name}, We Miss You!</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">We've got a fresh deal just for you.</p>
            </td>
          </tr>

          <!-- New Offer -->
          <tr>
            <td style="padding: 40px 32px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 16px;">&#127881;</div>
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #111827;">Fresh Discount, Just For You!</h2>
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #57534e; line-height: 1.6;">
                We noticed you haven't tried our tortillas yet. Let's fix that with a special offer.
              </p>

              <!-- New Code Box -->
              <div style="padding: 24px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; display: inline-block; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #d1fae5; text-transform: uppercase; letter-spacing: 0.5px;">Your Fresh Discount Code</p>
                <p style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; font-family: monospace; letter-spacing: 3px;">${newCode}</p>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #d1fae5;">10% off your entire order</p>
              </div>

              <div>
                <a href="${data.shopUrl}" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);">Shop With Your Discount</a>
              </div>
            </td>
          </tr>

          <!-- Why Now -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 24px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #10b981;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #111827;">Why Try Now?</h3>
                <ul style="margin: 0; padding-left: 20px; font-size: 15px; color: #57534e; line-height: 1.8;">
                  <li>Taco Tuesday is always around the corner</li>
                  <li>These tortillas freeze beautifully for later</li>
                  <li>Free shipping on orders over $80</li>
                  <li>This code won't last forever!</li>
                </ul>
              </div>
            </td>
          </tr>`;

  return { subject, html: wrapEmail(subject, content, generateFooter(data)) };
}

/**
 * Email 5 - Day 18: Brand Story
 * "From our Texas kitchen to yours"
 */
export function generateDripEmail5(data: DripEmailData): { subject: string; html: string } {
  const name = getNameFromEmail(data.email);
  const discountCode = data.discountCode || 'TEXAS10';

  const subject = "From our Texas kitchen to yours";

  const content = `
          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #111827 0%, #292524 100%);">
              <div style="margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.2;">A Little Story, ${name}</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">Why we ship tortillas across America.</p>
            </td>
          </tr>

          <!-- Story -->
          <tr>
            <td style="padding: 40px 32px;">
              <div style="padding: 32px; background-color: #f9fafb; border-radius: 12px; margin-bottom: 32px;">
                <p style="margin: 0 0 16px 0; font-size: 16px; color: #1c1917; line-height: 1.8;">
                  <strong>It started with a craving.</strong>
                </p>
                <p style="margin: 0 0 16px 0; font-size: 16px; color: #57534e; line-height: 1.8;">
                  We're Texans who moved away and realized something: you can't find good tortillas outside of Texas. Not the real ones. Not the H-E-B tortillas that make breakfast tacos taste like Saturday mornings in San Antonio.
                </p>
                <p style="margin: 0 0 16px 0; font-size: 16px; color: #57534e; line-height: 1.8;">
                  So we started shipping them to ourselves. Then to friends. Then to their friends. Now we're here, making sure nobody has to suffer through sad, cardboard tortillas ever again.
                </p>
                <p style="margin: 0; font-size: 16px; color: #1c1917; line-height: 1.8;">
                  <strong>That's our mission: Real Texas tortillas, anywhere in America.</strong>
                </p>
              </div>

              <!-- Values -->
              <div style="margin-bottom: 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="width: 33%; padding: 16px; text-align: center; vertical-align: top;">
                      <div style="font-size: 32px; margin-bottom: 8px;">&#129473;</div>
                      <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">Quality First</p>
                    </td>
                    <td style="width: 33%; padding: 16px; text-align: center; vertical-align: top;">
                      <div style="font-size: 32px; margin-bottom: 8px;">&#128588;</div>
                      <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">Fast Shipping</p>
                    </td>
                    <td style="width: 33%; padding: 16px; text-align: center; vertical-align: top;">
                      <div style="font-size: 32px; margin-bottom: 8px;">&#10084;&#65039;</div>
                      <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111827;">Made with Love</p>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="text-align: center;">
                <a href="${data.shopUrl}" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">Taste the Difference</a>
              </div>
            </td>
          </tr>

          <!-- Discount Reminder -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 20px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #ffffff;">
                  <strong>Your 10% discount is still active:</strong>
                  <span style="font-family: monospace; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; margin-left: 8px;">${discountCode}</span>
                </p>
              </div>
            </td>
          </tr>`;

  return { subject, html: wrapEmail(subject, content, generateFooter(data)) };
}

/**
 * Email 6 - Day 30: Last Chance
 * "Final call: Your exclusive deal expires soon"
 */
export function generateDripEmail6(data: DripEmailData): { subject: string; html: string } {
  const name = getNameFromEmail(data.email);
  const discountCode = data.discountCode || 'LASTCHANCE';

  const subject = "Final call: Your exclusive deal expires soon";

  const content = `
          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);">
              <div style="margin-bottom: 24px;">
                <div style="font-size: 48px;">&#9200;</div>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.2;">Last Chance, ${name}!</h1>
              <p style="margin: 0; font-size: 18px; color: #fecaca; line-height: 1.6;">Your special offer is about to expire.</p>
            </td>
          </tr>

          <!-- Final Offer -->
          <tr>
            <td style="padding: 40px 32px; text-align: center;">
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #111827;">This Is It!</h2>
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #57534e; line-height: 1.6;">
                We've been saving this deal for you, but we can't hold it forever. This is your last reminder to grab authentic Texas tortillas at a discount.
              </p>

              <!-- Urgent Code Box -->
              <div style="padding: 24px 32px; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 12px; display: inline-block; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #fecaca; text-transform: uppercase; letter-spacing: 0.5px;">Final Offer - 10% Off</p>
                <p style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; font-family: monospace; letter-spacing: 3px;">${discountCode}</p>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #fecaca;">Expires in 48 hours</p>
              </div>

              <div>
                <a href="${data.shopUrl}" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 18px 48px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 12px rgba(17, 24, 39, 0.3);">Get Your Tortillas Now</a>
              </div>
            </td>
          </tr>

          <!-- What You'll Get -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 24px; background-color: #fef3c7; border-radius: 8px;">
                <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #111827; text-align: center;">What You're Missing Out On:</h3>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #10b981; font-weight: bold;">&#10003;</span>
                      <span style="margin-left: 8px; font-size: 15px; color: #1c1917;">Premium H-E-B tortillas shipped to your door</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #10b981; font-weight: bold;">&#10003;</span>
                      <span style="margin-left: 8px; font-size: 15px; color: #1c1917;">Restaurant-quality taste at home</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #10b981; font-weight: bold;">&#10003;</span>
                      <span style="margin-left: 8px; font-size: 15px; color: #1c1917;">Free shipping on orders over $80</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #10b981; font-weight: bold;">&#10003;</span>
                      <span style="margin-left: 8px; font-size: 15px; color: #1c1917;">10% off with your exclusive code</span>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Goodbye Message -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 24px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">
                  If tortillas aren't your thing, no worries! This will be our last email.
                  <br>But if you ever want to experience real Texas tortillas, you know where to find us.
                </p>
              </div>
            </td>
          </tr>`;

  return { subject, html: wrapEmail(subject, content, generateFooter(data)) };
}

// Export all email generators in an array for easy iteration
export const DRIP_EMAIL_GENERATORS = [
  generateDripEmail1,
  generateDripEmail2,
  generateDripEmail3,
  generateDripEmail4,
  generateDripEmail5,
  generateDripEmail6,
];

// Day schedule for each email (1-indexed)
export const DRIP_SCHEDULE_DAYS = [1, 3, 5, 12, 18, 30];

/**
 * Get the appropriate email generator for a given step
 */
export function getDripEmailForStep(step: number): typeof generateDripEmail1 | null {
  if (step < 1 || step > 6) return null;
  return DRIP_EMAIL_GENERATORS[step - 1];
}
