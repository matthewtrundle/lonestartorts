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
              <img src="https://lonestartortillas.com/images/LeadAd.png" alt="Texas cowgirl with authentic H-E-B tortillas" style="width: 100%; height: auto; display: block;" />
            </td>
          </tr>

          <!-- Problem Statement -->
          <tr>
            <td style="padding: 40px 32px; background-color: #fef3c7; border-bottom: 4px solid #d97706;">
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1c1917; text-align: center;">Let's Talk Straight, Y'all</h2>
              <p style="margin: 0 0 12px 0; font-size: 16px; color: #78350f; line-height: 1.6; text-align: center;">
                You spend 14 hours perfecting that brisket. Your rub is a family secret passed down three generations. Your smoke ring is legendary across three counties.
              </p>
              <p style="margin: 0; font-size: 18px; font-weight: 700; color: #92400e; line-height: 1.6; text-align: center;">
                Then you serve it on a flimsy grocery store tortilla? That just won't do.
              </p>
            </td>
          </tr>

          <!-- The Solution -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #1c1917;">Why Texas Pitmasters Choose Us</h2>

              <div style="margin-bottom: 24px;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">1</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Holds Up to Texas-Sized Portions</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">Restaurant-grade thickness that holds up to generous portions and sauce without tearing. Because when you load on a half-pound of brisket, that tortilla better not quit on you.</p>
                </div>
              </div>

              <div style="margin-bottom: 24px;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">2</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Authentic Texas Flavor Profile</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">Subtle corn sweetness that complements smoke flavor, not competes with it. Made using traditional nixtamalization process.</p>
                </div>
              </div>

              <div style="margin-bottom: 0;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">3</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Stays Pliable on the Warmer (Even During Rush)</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">No cracking after 2 hours in your warmer. Tested in real Texas kitchens during the Saturday lunch rush.</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- Social Proof -->
          <tr>
            <td style="padding: 32px; background-color: #fafaf9;">
              <div style="padding: 24px; background-color: #ffffff; border-left: 4px solid #d97706; border-radius: 4px;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #44403c; line-height: 1.7; font-style: italic;">
                  "We tested 6 different suppliers. Lonestar's are the only ones that don't tear under a half-pound of brisket. Our Google reviews mention the tortillas now."
                </p>
                <p style="margin: 0; font-size: 14px; color: #78716c;">
                  <strong style="color: #1c1917;">Mike Rodriguez</strong><br>
                  Pitmaster, Smokin' Oak BBQ - Austin, TX
                </p>
              </div>
            </td>
          </tr>

          <!-- Video CTA -->
          <tr>
            <td style="padding: 40px 32px; background-color: #ffffff;">
              <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #1c1917; text-align: center;">See The Difference</h2>
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${VIDEO_PAGE_URL}" style="display: inline-block; text-decoration: none;">
                  <div style="position: relative; display: inline-block; border-radius: 8px; overflow: hidden; border: 2px solid #d97706;">
                    <img src="${VIDEO_THUMBNAIL_URL}" style="width: 100%; max-width: 500px; height: auto; display: block;" alt="Watch Maria's story">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(217, 119, 6, 0.9); width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);">
                      <div style="width: 0; height: 0; border-left: 24px solid #ffffff; border-top: 14px solid transparent; border-bottom: 14px solid transparent; margin-left: 6px;"></div>
                    </div>
                  </div>
                </a>
              </div>
              <div style="text-align: center;">
                <a href="${WEBSITE_URL}" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Request Samples</a>
              </div>
            </td>
          </tr>

          <!-- Simple Pricing -->
          <tr>
            <td style="padding: 32px; background-color: #f5f5f4;">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917; text-align: center;">Wholesale Pricing That Makes Sense</h3>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #57534e; text-align: center; line-height: 1.6;">
                Volume discounts available. No long-term contracts. We keep it simple, Texas-style.
              </p>
              <div style="text-align: center;">
                <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">View Wholesale Pricing</a>
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
              <img src="https://lonestartortillas.com/images/image%20(14).png" alt="Texas cowgirl with authentic tortillas" style="width: 100%; height: auto; display: block;" />
            </td>
          </tr>

          <!-- Problem Statement -->
          <tr>
            <td style="padding: 40px 32px; background-color: #fef3c7; border-bottom: 4px solid #d97706;">
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1c1917; text-align: center;">The Real Deal</h2>
              <p style="margin: 0 0 12px 0; font-size: 16px; color: #78350f; line-height: 1.6; text-align: center;">
                Your customers can tell the difference between authentic and mass-produced. They grew up with real tortillas—the kind their abuelas made, the kind that tastes like home.
              </p>
              <p style="margin: 0; font-size: 18px; font-weight: 700; color: #92400e; line-height: 1.6; text-align: center;">
                Don't let your tacos down with anything less than authentic Texas quality.
              </p>
            </td>
          </tr>

          <!-- The Solution -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #1c1917;">Why Mexican Restaurants Choose Us</h2>

              <div style="margin-bottom: 24px;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">1</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Traditional Nixtamalization Process</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">Made the authentic way—soaking corn in lime water to unlock nutrients and develop that distinctive flavor your customers expect. Not shortcuts, not mass production. The real thing.</p>
                </div>
              </div>

              <div style="margin-bottom: 24px;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">2</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Authentic Flavor Your Customers Recognize</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">That unmistakable taste of real Mexican tortillas. The kind that makes your customers say "Just like home." Because it is.</p>
                </div>
              </div>

              <div style="margin-bottom: 0;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">3</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Trusted by Texas Families for Generations</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">These are the same H-E-B® tortillas that Texas families have counted on for decades. Now available for your restaurant, wherever you are.</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- Social Proof -->
          <tr>
            <td style="padding: 32px; background-color: #fafaf9;">
              <div style="padding: 24px; background-color: #ffffff; border-left: 4px solid #d97706; border-radius: 4px;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #44403c; line-height: 1.7; font-style: italic;">
                  "My abuela would approve. These taste just like the tortillas from back home in San Antonio. Customers notice the difference immediately—we've had people ask where we get them."
                </p>
                <p style="margin: 0; font-size: 14px; color: #78716c;">
                  <strong style="color: #1c1917;">Maria Gonzalez</strong><br>
                  Owner, Casa Gonzalez - Phoenix, AZ
                </p>
              </div>
            </td>
          </tr>

          <!-- Video CTA -->
          <tr>
            <td style="padding: 40px 32px; background-color: #ffffff;">
              <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #1c1917; text-align: center;">Meet Maria Rodriguez, Our Founder</h2>
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${VIDEO_PAGE_URL}" style="display: inline-block; text-decoration: none;">
                  <div style="position: relative; display: inline-block; border-radius: 8px; overflow: hidden; border: 2px solid #d97706;">
                    <img src="${VIDEO_THUMBNAIL_URL}" style="width: 100%; max-width: 500px; height: auto; display: block;" alt="Watch Maria's story">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(217, 119, 6, 0.9); width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);">
                      <div style="width: 0; height: 0; border-left: 24px solid #ffffff; border-top: 14px solid transparent; border-bottom: 14px solid transparent; margin-left: 6px;"></div>
                    </div>
                  </div>
                </a>
              </div>
              <div style="text-align: center;">
                <a href="${WEBSITE_URL}" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Request Samples</a>
              </div>
            </td>
          </tr>

          <!-- Simple Pricing -->
          <tr>
            <td style="padding: 32px; background-color: #f5f5f4;">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917; text-align: center;">Wholesale Pricing for Authentic Quality</h3>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #57534e; text-align: center; line-height: 1.6;">
                Volume discounts available. Flexible ordering. Texas delivery nationwide.
              </p>
              <div style="text-align: center;">
                <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">View Wholesale Pricing</a>
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
