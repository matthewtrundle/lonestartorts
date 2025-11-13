/**
 * Marketing Email Templates for B2B Outreach
 * Redesigned in Curate Health style with lifestyle imagery
 *
 * Professional, beautifully designed templates for reaching out to:
 * - BBQ Restaurants
 * - Mexican Restaurants
 * - Generic Restaurants
 * - Food Trucks
 * - Transactional emails (Order Confirmation, Shipping)
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: 'bbq' | 'mexican' | 'restaurant' | 'foodtruck' | 'transactional';
  description: string;
  html: string;
}

const VIDEO_PAGE_URL = 'https://lonestartortillas.com/maria-story';
const VIDEO_THUMBNAIL_URL = 'https://lonestartortillas.com/tiks/taste-of-texas-thumbnail.jpg';
const WEBSITE_URL = 'https://lonestartortillas.com';

export const MARKETING_TEMPLATES: EmailTemplate[] = [
  {
    id: 'bbq-pitmaster',
    name: 'BBQ Restaurant - Pitmaster Edition',
    subject: 'The Tortilla Your Brisket Deserves',
    category: 'bbq',
    description: 'Targeted at BBQ restaurants, emphasizing quality pairing with smoked meats',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 20px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">

          <!-- Simple Header -->
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
                    <a href="${WEBSITE_URL}" style="color: #57534e; text-decoration: none; font-size: 13px;">View Online</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding: 0;">
              <img src="${WEBSITE_URL}/images/Cards/image (13).png" alt="Texas family dinner with tortillas" style="width: 100%; height: auto; display: block;" />
            </td>
          </tr>

          <!-- Greeting & Welcome -->
          <tr>
            <td style="padding: 48px 40px 32px 40px; background-color: #ffffff;">
              <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 1px;">GREETINGS, PARTNER!</p>
              <h1 style="margin: 0 0 20px 0; font-size: 42px; font-weight: 700; color: #1c1917; line-height: 1.1;">
                Welcome to<br><span style="color: #d97706;">Lonestar</span>
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #57534e; line-height: 1.7;">
                Your BBQ deserves better than grocery store tortillas. We're bringing you the same premium H-E-B® tortillas that generations of Texas families have trusted—now available for your smokehouse, wherever you are.
              </p>
              <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 15px;">
                Start Your Free Consultation →
              </a>
            </td>
          </tr>

          <!-- What We Offer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #fafaf9;">
              <p style="margin: 0 0 20px 0; font-size: 12px; font-weight: 700; color: #78716c; text-transform: uppercase; letter-spacing: 1px;">LONESTAR OFFERS:</p>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <span style="font-size: 20px; margin-right: 12px;">①</span>
                    <span style="font-size: 15px; color: #1c1917; font-weight: 500;">Restaurant-Grade Tortillas That Hold Up</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <span style="font-size: 20px; margin-right: 12px;">②</span>
                    <span style="font-size: 15px; color: #1c1917; font-weight: 500;">Nationwide Delivery from Texas to Your Door</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="font-size: 20px; margin-right: 12px;">③</span>
                    <span style="font-size: 15px; color: #1c1917; font-weight: 500;">Texas-Tested, Pitmaster-Approved Quality</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's Coming -->
          <tr>
            <td style="padding: 40px 40px 32px 40px; background-color: #ffffff;">
              <h2 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 700; color: #1c1917; line-height: 1.2;">
                Over the next week, we'll be <span style="background: linear-gradient(90deg, #fbbf24 0%, #d97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">sending you advice on:</span>
              </h2>

              <ul style="margin: 0; padding: 0; list-style: none;">
                <li style="padding: 8px 0; font-size: 15px; color: #44403c; line-height: 1.6;">
                  <span style="color: #d97706; margin-right: 8px;">·</span> Why Texas pitmasters choose H-E-B® tortillas
                </li>
                <li style="padding: 8px 0; font-size: 15px; color: #44403c; line-height: 1.6;">
                  <span style="color: #d97706; margin-right: 8px;">·</span> How to pair tortillas with your signature smoked meats
                </li>
                <li style="padding: 8px 0; font-size: 15px; color: #44403c; line-height: 1.6;">
                  <span style="color: #d97706; margin-right: 8px;">·</span> Cost-per-serving calculations that make sense
                </li>
                <li style="padding: 8px 0; font-size: 15px; color: #44403c; line-height: 1.6;">
                  <span style="color: #d97706; margin-right: 8px;">·</span> What to expect from your first wholesale order
                </li>
                <li style="padding: 8px 0; font-size: 15px; color: #44403c; line-height: 1.6;">
                  <span style="color: #d97706; margin-right: 8px;">·</span> Answers to your most common questions
                </li>
              </ul>
            </td>
          </tr>

          <!-- Testimonials -->
          <tr>
            <td style="padding: 48px 40px; background-color: #fafaf9;">
              <h2 style="margin: 0 0 8px 0; font-size: 32px; font-weight: 700; color: #1c1917; line-height: 1.2;">
                Real pitmasters,
              </h2>
              <h2 style="margin: 0 0 32px 0; font-size: 32px; font-weight: 700; line-height: 1.2;">
                <span style="color: #d97706;">real transformations</span>
              </h2>

              <!-- Testimonial 1 -->
              <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #e7e5e4;">
                <p style="margin: 0 0 16px 0; font-size: 15px; color: #44403c; line-height: 1.7; font-style: italic;">
                  "We tested 6 different suppliers. Lonestar's are the only ones that don't tear under a half-pound of brisket. Our Google reviews mention the tortillas now—that's when you know you've got something special."
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #1c1917;">— MIKE RODRIGUEZ, AUSTIN, TX</p>
                <div style="margin: 0;">
                  <span style="color: #d97706; font-size: 16px;">★★★★★</span>
                </div>
              </div>

              <!-- Testimonial 2 -->
              <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e7e5e4;">
                <p style="margin: 0 0 16px 0; font-size: 15px; color: #44403c; line-height: 1.7; font-style: italic;">
                  "I've been smoking meat for 20 years. Finding a tortilla that can handle my brisket and not fall apart? Game changer. These stay pliable even after sitting on the warmer for hours during Saturday rush."
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #1c1917;">— JAMES PETERSON, DALLAS, TX</p>
                <div style="margin: 0;">
                  <span style="color: #d97706; font-size: 16px;">★★★★★</span>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #ffffff; border-top: 1px solid #e7e5e4; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1c1917;">Lonestar Tortillas</p>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #78716c;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #a8a29e;">
                <a href="${WEBSITE_URL}" style="color: #d97706; text-decoration: none;">lonestartortillas.com</a> |
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #d97706; text-decoration: none;">wholesale@lonestartortillas.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  },
  {
    id: 'mexican-authentic',
    name: 'Mexican Restaurant - Authenticity',
    subject: 'The Authentic Tortilla Your Customers Crave',
    category: 'mexican',
    description: 'Targeted at Mexican restaurants, emphasizing authentic Texas flavor and tradition',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 20px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">

          <!-- Simple Header -->
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
                    <a href="${WEBSITE_URL}" style="color: #57534e; text-decoration: none; font-size: 13px;">View Online</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding: 0;">
              <img src="${WEBSITE_URL}/images/Cards/image (10).png" alt="Authentic Mexican food spread" style="width: 100%; height: auto; display: block;" />
            </td>
          </tr>

          <!-- Greeting & Welcome -->
          <tr>
            <td style="padding: 48px 40px 32px 40px; background-color: #ffffff;">
              <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 1px;">GREETINGS, AMIGO!</p>
              <h1 style="margin: 0 0 20px 0; font-size: 42px; font-weight: 700; color: #1c1917; line-height: 1.1;">
                Welcome to<br><span style="color: #d97706;">Lonestar</span>
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #57534e; line-height: 1.7;">
                Your customers know authentic when they taste it. Give them the same premium H-E-B® tortillas that Texas families have trusted for generations—the foundation of every great Mexican meal.
              </p>
              <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 15px;">
                Start Your Free Consultation →
              </a>
            </td>
          </tr>

          <!-- What We Offer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #fafaf9;">
              <p style="margin: 0 0 20px 0; font-size: 12px; font-weight: 700; color: #78716c; text-transform: uppercase; letter-spacing: 1px;">LONESTAR OFFERS:</p>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <span style="font-size: 20px; margin-right: 12px;">①</span>
                    <span style="font-size: 15px; color: #1c1917; font-weight: 500;">Traditional Nixtamalization Process</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <span style="font-size: 20px; margin-right: 12px;">②</span>
                    <span style="font-size: 15px; color: #1c1917; font-weight: 500;">Authentic Flavor Your Customers Recognize</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="font-size: 20px; margin-right: 12px;">③</span>
                    <span style="font-size: 15px; color: #1c1917; font-weight: 500;">Trusted by Texas Families for Generations</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's Coming -->
          <tr>
            <td style="padding: 40px 40px 32px 40px; background-color: #ffffff;">
              <h2 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 700; color: #1c1917; line-height: 1.2;">
                Over the next week, we'll be <span style="background: linear-gradient(90deg, #fbbf24 0%, #d97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">sending you advice on:</span>
              </h2>

              <ul style="margin: 0; padding: 0; list-style: none;">
                <li style="padding: 8px 0; font-size: 15px; color: #44403c; line-height: 1.6;">
                  <span style="color: #d97706; margin-right: 8px;">·</span> What makes H-E-B® tortillas authentic
                </li>
                <li style="padding: 8px 0; font-size: 15px; color: #44403c; line-height: 1.6;">
                  <span style="color: #d97706; margin-right: 8px;">·</span> How to choose between corn and flour for your menu
                </li>
                <li style="padding: 8px 0; font-size: 15px; color: #44403c; line-height: 1.6;">
                  <span style="color: #d97706; margin-right: 8px;">·</span> Storage tips for maintaining freshness
                </li>
                <li style="padding: 8px 0; font-size: 15px; color: #44403c; line-height: 1.6;">
                  <span style="color: #d97706; margin-right: 8px;">·</span> Wholesale pricing that works for your restaurant
                </li>
                <li style="padding: 8px 0; font-size: 15px; color: #44403c; line-height: 1.6;">
                  <span style="color: #d97706; margin-right: 8px;">·</span> Answers to your questions about delivery and ordering
                </li>
              </ul>
            </td>
          </tr>

          <!-- Testimonials -->
          <tr>
            <td style="padding: 48px 40px; background-color: #fafaf9;">
              <h2 style="margin: 0 0 8px 0; font-size: 32px; font-weight: 700; color: #1c1917; line-height: 1.2;">
                Real restaurants,
              </h2>
              <h2 style="margin: 0 0 32px 0; font-size: 32px; font-weight: 700; line-height: 1.2;">
                <span style="color: #d97706;">real results</span>
              </h2>

              <!-- Testimonial 1 -->
              <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #e7e5e4;">
                <p style="margin: 0 0 16px 0; font-size: 15px; color: #44403c; line-height: 1.7; font-style: italic;">
                  "My abuela would approve. These taste just like the tortillas from back home in San Antonio. Customers notice the difference immediately—we've had people ask where we get them."
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #1c1917;">— MARIA GONZALEZ, PHOENIX, AZ</p>
                <div style="margin: 0;">
                  <span style="color: #d97706; font-size: 16px;">★★★★★</span>
                </div>
              </div>

              <!-- Testimonial 2 -->
              <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e7e5e4;">
                <p style="margin: 0 0 16px 0; font-size: 15px; color: #44403c; line-height: 1.7; font-style: italic;">
                  "We tried three different suppliers before finding Lonestar. The authentic flavor and consistent quality have been game-changing for our taqueria. Worth every penny."
                </p>
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #1c1917;">— CARLOS MENDEZ, DENVER, CO</p>
                <div style="margin: 0;">
                  <span style="color: #d97706; font-size: 16px;">★★★★★</span>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #ffffff; border-top: 1px solid #e7e5e4; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1c1917;">Lonestar Tortillas</p>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #78716c;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #a8a29e;">
                <a href="${WEBSITE_URL}" style="color: #d97706; text-decoration: none;">lonestartortillas.com</a> |
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #d97706; text-decoration: none;">wholesale@lonestartortillas.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }
];
