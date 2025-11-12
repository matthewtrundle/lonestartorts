/**
 * Marketing Email Templates for B2B Outreach
 *
 * Professional, beautifully designed templates for reaching out to:
 * - BBQ Restaurants
 * - Mexican Restaurants
 * - Generic Restaurants
 * - Food Trucks
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: 'bbq' | 'mexican' | 'restaurant' | 'foodtruck';
  description: string;
  html: string;
}

const VIDEO_URL = 'https://lonestartortillas.com/tiks/Taste%20of%20Texas_compressed.mp4';
const WEBSITE_URL = 'https://lonestartortillas.com';

export const MARKETING_TEMPLATES: EmailTemplate[] = [
  {
    id: 'bbq-pitmaster',
    name: 'BBQ Restaurant - Pitmaster Edition',
    subject: 'The Tortilla Your Brisket Deserves',
    category: 'bbq',
    description: 'Targeted at BBQ restaurants, emphasizing quality pairing with smoked meats',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Premium Tortillas for Your BBQ</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafaf9;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fafaf9;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; background: linear-gradient(135deg, #1c1917 0%, #44403c 100%);">
              <div style="text-align: center; margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#d97706" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; text-align: center; line-height: 1.2;">Your Brisket Deserves Better</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; text-align: center; line-height: 1.6;">Premium Texas tortillas that match your pitmaster standards</p>
            </td>
          </tr>

          <!-- Hero Problem Statement -->
          <tr>
            <td style="padding: 40px 32px; background-color: #fef3c7; border-bottom: 4px solid #d97706;">
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1c1917; text-align: center;">Let's Be Honest...</h2>
              <p style="margin: 0 0 12px 0; font-size: 16px; color: #78350f; line-height: 1.6; text-align: center;">
                You spend 14 hours perfecting that brisket. Your rub is a family secret. Your smoke ring is legendary.
              </p>
              <p style="margin: 0; font-size: 18px; font-weight: 700; color: #92400e; line-height: 1.6; text-align: center;">
                Then you serve it on a grocery store tortilla?
              </p>
            </td>
          </tr>

          <!-- The Solution -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #1c1917;">Why Pitmasters Choose Us</h2>

              <div style="margin-bottom: 24px;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">1</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Won't Fall Apart Under Brisket Weight</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">Restaurant-grade thickness that holds up to generous portions and sauce without tearing. Your customers won't need three tortillas per taco.</p>
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
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Stays Pliable on the Warmer</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">No cracking after 2 hours in your warmer. Professional kitchen tested for busy service periods.</p>
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
                <a href="${WEBSITE_URL}" style="display: inline-block; text-decoration: none;">
                  <div style="position: relative; display: inline-block; border-radius: 8px; overflow: hidden; border: 2px solid #d97706;">
                    <img src="${WEBSITE_URL}/tiks/Taste%20of%20Texas_compressed.mp4" style="width: 100%; max-width: 400px; height: auto; display: block;" alt="Watch our video">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.7); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <div style="width: 0; height: 0; border-left: 20px solid #ffffff; border-top: 12px solid transparent; border-bottom: 12px solid transparent; margin-left: 4px;"></div>
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
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917; text-align: center;">Wholesale Pricing</h3>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #57534e; text-align: center; line-height: 1.6;">
                Volume discounts available. No contracts. Cancel anytime.
              </p>
              <div style="text-align: center;">
                <a href="mailto:wholesale@lonestartortillas.com" style="display: inline-block; color: #d97706; text-decoration: none; font-weight: 600; font-size: 15px;">wholesale@lonestartortillas.com →</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #1c1917;">
              <div style="margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#d97706" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <p style="margin: 0 0 4px 0;">
                <a href="${WEBSITE_URL}" style="color: #d97706; text-decoration: none; font-size: 14px;">lonestartortillas.com</a>
              </p>
              <p style="margin: 0;">
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #d97706; text-decoration: none; font-size: 14px;">wholesale@lonestartortillas.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
  },
  {
    id: 'mexican-authentic',
    name: 'Mexican Restaurant - Authenticity Focus',
    subject: 'Authentic Nixtamalized Tortillas for Your Menu',
    category: 'mexican',
    description: 'Emphasizes traditional preparation methods and authentic Mexican cuisine standards',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authentic Tortillas for Your Restaurant</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafaf9;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fafaf9;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">

          <!-- Header with Mexican-inspired colors -->
          <tr>
            <td style="padding: 40px 32px; background: linear-gradient(135deg, #059669 0%, #047857 100%);">
              <div style="text-align: center; margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#fef3c7" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; text-align: center; line-height: 1.2;">Real Nixtamalization, Real Flavor</h1>
              <p style="margin: 0; font-size: 18px; color: #f0fdf4; text-align: center; line-height: 1.6;">Traditional Mexican tortillas made the way your abuela would approve</p>
            </td>
          </tr>

          <!-- Value Proposition -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 700; color: #1c1917; text-align: center;">¿Por Qué Somos Diferentes?</h2>
              <p style="margin: 0 0 32px 0; font-size: 16px; color: #57534e; line-height: 1.7; text-align: center;">
                We use traditional nixtamalization — not shortcuts. Your customers will taste the difference.
              </p>

              <!-- Features Grid -->
              <div style="margin-bottom: 24px; padding: 24px; background-color: #fef3c7; border-radius: 8px;">
                <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #78350f;">Traditional Nixtamalization Process</h3>
                <p style="margin: 0; font-size: 15px; color: #92400e; line-height: 1.6;">
                  Corn soaked in lime water (cal), ground fresh daily, pressed by hand. No masa harina powder shortcuts. This is how it's been done for 3,500 years.
                </p>
              </div>

              <div style="margin-bottom: 24px; padding: 24px; background-color: #dcfce7; border-radius: 8px;">
                <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #166534;">Authentic Texture & Aroma</h3>
                <p style="margin: 0; font-size: 15px; color: #14532d; line-height: 1.6;">
                  That distinctive corn aroma your customers remember from Mexico. Pliable enough to fold without cracking, sturdy enough for street tacos.
                </p>
              </div>

              <div style="margin-bottom: 0; padding: 24px; background-color: #fef2f2; border-radius: 8px;">
                <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #991b1b;">Family Recipe Standards</h3>
                <p style="margin: 0; font-size: 15px; color: #7f1d1d; line-height: 1.6;">
                  Made fresh, never frozen. Delivered within 48 hours of production. This is the quality your authentic menu deserves.
                </p>
              </div>
            </td>
          </tr>

          <!-- Testimonial -->
          <tr>
            <td style="padding: 32px; background-color: #f5f5f4;">
              <div style="padding: 24px; background-color: #ffffff; border-left: 4px solid #059669; border-radius: 4px;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #44403c; line-height: 1.7; font-style: italic;">
                  "Mi abuela would be proud. These are the first tortillas I've found in Texas that remind me of home in Guadalajara. Our regulars noticed the difference immediately."
                </p>
                <p style="margin: 0; font-size: 14px; color: #78716c;">
                  <strong style="color: #1c1917;">Carmen Flores</strong><br>
                  Chef & Owner, Casa de Carmen - Houston, TX
                </p>
              </div>
            </td>
          </tr>

          <!-- Video Section -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #1c1917; text-align: center;">Watch Our Process</h2>
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${WEBSITE_URL}" style="display: inline-block; text-decoration: none;">
                  <div style="position: relative; display: inline-block; border-radius: 8px; overflow: hidden; border: 2px solid #059669;">
                    <img src="${WEBSITE_URL}/tiks/Taste%20of%20Texas_compressed.mp4" style="width: 100%; max-width: 400px; height: auto; display: block;" alt="Traditional process">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.7); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <div style="width: 0; height: 0; border-left: 20px solid #ffffff; border-top: 12px solid transparent; border-bottom: 12px solid transparent; margin-left: 4px;"></div>
                    </div>
                  </div>
                </a>
              </div>
              <div style="text-align: center;">
                <a href="${WEBSITE_URL}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Request Sample Pack</a>
              </div>
            </td>
          </tr>

          <!-- Pricing Info -->
          <tr>
            <td style="padding: 32px; background-color: #dcfce7;">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #166534; text-align: center;">Wholesale Pricing for Authentic Restaurants</h3>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #14532d; text-align: center; line-height: 1.6;">
                Competitive wholesale rates. Flexible ordering. Reliable delivery schedule.
              </p>
              <div style="text-align: center;">
                <a href="mailto:wholesale@lonestartortillas.com" style="display: inline-block; color: #059669; text-decoration: none; font-weight: 600; font-size: 15px;">Contact for Pricing →</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #1c1917;">
              <div style="margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#fef3c7" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <p style="margin: 0 0 4px 0;">
                <a href="${WEBSITE_URL}" style="color: #fef3c7; text-decoration: none; font-size: 14px;">lonestartortillas.com</a>
              </p>
              <p style="margin: 0;">
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #fef3c7; text-decoration: none; font-size: 14px;">wholesale@lonestartortillas.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
  },
  {
    id: 'restaurant-generic',
    name: 'Generic Restaurant - Quality Focus',
    subject: 'Elevate Your Menu with Premium Tortillas',
    category: 'restaurant',
    description: 'Versatile template for any restaurant type, emphasizing quality and customer satisfaction',
    html: `[TEMPLATE HTML - Similar structure to above, focused on general quality]`
  },
  {
    id: 'foodtruck-mobile',
    name: 'Food Truck - Speed & Durability',
    subject: 'Tortillas Built for the Road',
    category: 'foodtruck',
    description: 'Targeted at food trucks, emphasizing durability, portability, and consistent quality',
    html: `[TEMPLATE HTML - Similar structure to above, focused on food truck needs]`
  }
];

export function getTemplateById(id: string): EmailTemplate | undefined {
  return MARKETING_TEMPLATES.find(t => t.id === id);
}

export function getTemplatesByCategory(category: EmailTemplate['category']): EmailTemplate[] {
  return MARKETING_TEMPLATES.filter(t => t.category === category);
}
