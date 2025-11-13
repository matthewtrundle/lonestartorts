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
              <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #1c1917; text-align: center;">Meet Maria Rodriguez</h2>
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${VIDEO_PAGE_URL}" style="display: inline-block; text-decoration: none;">
                  <div style="position: relative; display: inline-block; border-radius: 8px; overflow: hidden; border: 2px solid #059669;">
                    <img src="${VIDEO_THUMBNAIL_URL}" style="width: 100%; max-width: 500px; height: auto; display: block;" alt="Watch Maria's story - A Taste of Texas">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(5, 150, 105, 0.9); width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);">
                      <div style="width: 0; height: 0; border-left: 24px solid #ffffff; border-top: 14px solid transparent; border-bottom: 14px solid transparent; margin-left: 6px;"></div>
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
  },
  {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    subject: 'Order #LS-12345 Confirmed - Lonestar Tortillas',
    category: 'transactional',
    description: 'Sent immediately after customer completes checkout with order details and next steps',
    html: `<!DOCTYPE html>
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
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #111827 0%, #292524 100%);">
              <div style="margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">Order Confirmed!</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">Thank you, John. Your premium Texas tortillas are on the way.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 32px 24px 32px; background-color: #fef3c7; border-bottom: 4px solid #d97706;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align: top;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</p>
                    <p style="margin: 0; font-size: 24px; font-weight: 700; color: #1c1917; font-family: monospace; letter-spacing: 1px;">LS-12345</p>
                  </td>
                  <td style="text-align: right; vertical-align: top;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px;">Order Date</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1c1917;">Nov 12, 2025</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 700; color: #111827;">Order Summary</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr style="border-bottom: 1px solid #f5f5f4;">
                  <td style="padding: 16px 0;">
                    <div style="font-weight: 600; font-size: 16px; color: #1c1917; margin-bottom: 4px;">Corn Tortillas (10-Pack)</div>
                    <div style="font-size: 14px; color: #57534e;">Quantity: 2</div>
                  </td>
                  <td style="padding: 16px 0; text-align: right; font-size: 16px; font-weight: 600; color: #1c1917; white-space: nowrap;">$169.98</td>
                </tr>
                <tr>
                  <td style="padding: 16px 0;">
                    <div style="font-weight: 600; font-size: 16px; color: #1c1917; margin-bottom: 4px;">Flour Tortillas (4-Pack)</div>
                    <div style="font-size: 14px; color: #57534e;">Quantity: 1</div>
                  </td>
                  <td style="padding: 16px 0; text-align: right; font-size: 16px; font-weight: 600; color: #1c1917; white-space: nowrap;">$47.99</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 2px solid #e7e5e4; padding-top: 20px;">
                <tr>
                  <td style="padding: 10px 0; font-size: 15px; color: #57534e;">Subtotal</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 15px; color: #1c1917; font-weight: 500;">$217.97</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 15px; color: #57534e;">Shipping</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 15px; color: #1c1917; font-weight: 500;">$12.99</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0 20px 0; font-size: 15px; color: #57534e; border-bottom: 2px solid #e7e5e4;">Tax</td>
                  <td style="padding: 10px 0 20px 0; text-align: right; font-size: 15px; color: #1c1917; font-weight: 500; border-bottom: 2px solid #e7e5e4;">$17.89</td>
                </tr>
                <tr>
                  <td style="padding: 20px 0 0 0; font-size: 18px; font-weight: 700; color: #111827;">Total</td>
                  <td style="padding: 20px 0 0 0; text-align: right; font-size: 24px; font-weight: 700; color: #d97706;">$248.85</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="width: 48%; vertical-align: top;">
                    <div style="padding: 24px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #d97706;">
                      <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #111827;">Shipping Address</h3>
                      <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.7;">
                        <strong style="color: #1c1917;">John Doe</strong><br>
                        123 Main Street<br>
                        Austin, TX 78701<br>
                        US
                      </p>
                    </div>
                  </td>
                  <td style="width: 4%;"></td>
                  <td style="width: 48%; vertical-align: top;">
                    <div style="padding: 24px; background-color: #fff7ed; border-radius: 8px; border-left: 4px solid #ea580c;">
                      <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #111827;">What's Next</h3>
                      <div style="margin-bottom: 12px;">
                        <div style="display: inline-block; width: 20px; height: 20px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 8px; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: 700; font-size: 11px;">✓</span>
                        </div>
                        <span style="font-size: 14px; color: #57534e; line-height: 1.6;">Shipping email within 24-48h</span>
                      </div>
                      <div style="margin-bottom: 12px;">
                        <div style="display: inline-block; width: 20px; height: 20px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 8px; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: 700; font-size: 11px;">✓</span>
                        </div>
                        <span style="font-size: 14px; color: #57534e; line-height: 1.6;">Delivery in 2-3 business days</span>
                      </div>
                      <div>
                        <div style="display: inline-block; width: 20px; height: 20px; background-color: #d97706; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 8px; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: 700; font-size: 11px;">✓</span>
                        </div>
                        <span style="font-size: 14px; color: #57534e; line-height: 1.6;">Track your package via email</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #111827;">
              <div style="margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <p style="margin: 0 0 4px 0;">
                <a href="https://lonestartortillas.com" style="color: #fbbf24; text-decoration: none; font-size: 14px;">lonestartortillas.com</a>
              </p>
              <p style="margin: 0 0 16px 0;">
                <a href="mailto:support@lonestartortillas.com" style="color: #fbbf24; text-decoration: none; font-size: 14px;">support@lonestartortillas.com</a>
              </p>
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
</html>`
  },
  {
    id: 'order-shipped',
    name: 'Order Shipped & Tracking',
    subject: 'Your Order #LS-12345 Has Shipped!',
    category: 'transactional',
    description: 'Sent when order ships with tracking information and delivery estimate',
    html: `<!DOCTYPE html>
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
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #111827 0%, #292524 100%);">
              <div style="margin-bottom: 24px;">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block;">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">Your Order Has Shipped!</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">Great news, John! Your tortillas are on their way to you.</p>
            </td>
          </tr>
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
                        <span style="font-size: 16px; font-weight: 700; color: #1c1917; font-family: monospace; letter-spacing: 1px;">LS-12345</span>
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
                        <span style="font-size: 16px; font-weight: 600; color: #1c1917;">USPS Priority Mail</span>
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
                        <span style="font-size: 18px; font-weight: 700; color: #d97706; font-family: monospace; letter-spacing: 1px;">9400111899562894756789</span>
                      </td>
                    </tr>
                  </table>
                </div>
                <div style="margin-bottom: 0;">
                  <a href="https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899562894756789" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(17, 24, 39, 0.2);">Track Package →</a>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700; color: #111827;">Items in This Shipment</h3>
              <div style="padding: 24px; background-color: #f9fafb; border-radius: 8px;">
                <div style="padding: 0 0 16px 0; border-bottom: 1px solid #e7e5e4;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="vertical-align: middle;">
                        <span style="display: inline-block; background-color: #d97706; color: #ffffff; font-weight: 700; font-size: 14px; padding: 6px 12px; border-radius: 6px; margin-right: 12px;">2x</span>
                        <span style="font-size: 16px; color: #1c1917; font-weight: 600;">Corn Tortillas (10-Pack)</span>
                      </td>
                    </tr>
                  </table>
                </div>
                <div style="padding: 16px 0 0 0;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="vertical-align: middle;">
                        <span style="display: inline-block; background-color: #d97706; color: #ffffff; font-weight: 700; font-size: 14px; padding: 6px 12px; border-radius: 6px; margin-right: 12px;">1x</span>
                        <span style="font-size: 16px; color: #1c1917; font-weight: 600;">Flour Tortillas (4-Pack)</span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="padding: 24px; background-color: #fff7ed; border-radius: 8px; border-left: 4px solid #ea580c;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #111827;">Estimated Delivery</h3>
                <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.7;">
                  Your order should arrive within <strong style="color: #1c1917;">2-3 business days</strong>. You can track your package anytime using the tracking number above.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #111827;">
              <div style="margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <p style="margin: 0 0 4px 0;">
                <a href="https://lonestartortillas.com" style="color: #fbbf24; text-decoration: none; font-size: 14px;">lonestartortillas.com</a>
              </p>
              <p style="margin: 0 0 16px 0;">
                <a href="mailto:support@lonestartortillas.com" style="color: #fbbf24; text-decoration: none; font-size: 14px;">support@lonestartortillas.com</a>
              </p>
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
</html>`
  }
];

export function getTemplateById(id: string): EmailTemplate | undefined {
  return MARKETING_TEMPLATES.find(t => t.id === id);
}

export function getTemplatesByCategory(category: EmailTemplate['category']): EmailTemplate[] {
  return MARKETING_TEMPLATES.filter(t => t.category === category);
}
