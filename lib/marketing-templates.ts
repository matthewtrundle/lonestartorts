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
                We use traditional nixtamalization — not shortcuts, not masa harina powder. Your customers will taste the difference, and they'll be back for more.
              </p>

              <!-- Features Grid -->
              <div style="margin-bottom: 24px; padding: 24px; background-color: #fef3c7; border-radius: 8px;">
                <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #78350f;">Traditional Nixtamalization (The Real Deal)</h3>
                <p style="margin: 0; font-size: 15px; color: #92400e; line-height: 1.6;">
                  Corn soaked in lime water (cal), ground fresh daily, pressed by hand. No masa harina powder shortcuts. This is how it's been done for 3,500 years — and how it's still done right in Texas.
                </p>
              </div>

              <div style="margin-bottom: 24px; padding: 24px; background-color: #dcfce7; border-radius: 8px;">
                <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #166534;">Authentic Texture & Aroma (Just Like Home)</h3>
                <p style="margin: 0; font-size: 15px; color: #14532d; line-height: 1.6;">
                  That distinctive corn aroma your customers remember from abuela's kitchen. Pliable enough to fold without cracking, sturdy enough for loaded street tacos.
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
                  "Mi abuela would be proud. These are the first tortillas I've found in Texas that remind me of home in Guadalajara. Our regulars noticed the difference immediately — and now they bring their friends."
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
                Competitive wholesale rates. Flexible ordering. Reliable Texas delivery.
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
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Premium Tortillas for Your Restaurant</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafaf9;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fafaf9;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 32px; background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);">
              <div style="text-align: center; margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#fbbf24" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; text-align: center; line-height: 1.2;">Your Guests Deserve Better</h1>
              <p style="margin: 0; font-size: 18px; color: #dbeafe; text-align: center; line-height: 1.6;">Premium Texas tortillas that elevate every dish on your menu</p>
            </td>
          </tr>

          <!-- Value Proposition -->
          <tr>
            <td style="padding: 40px 32px; background-color: #eff6ff; border-bottom: 4px solid #3b82f6;">
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1c1917; text-align: center;">What Sets Your Restaurant Apart?</h2>
              <p style="margin: 0; font-size: 16px; color: #1e40af; line-height: 1.6; text-align: center;">
                Great restaurants know that quality matters in every detail. Your guests notice when you serve something exceptional — and they come back for it.
              </p>
            </td>
          </tr>

          <!-- Benefits -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #1c1917;">Why Leading Restaurants Choose Us</h2>

              <div style="margin-bottom: 24px; padding: 24px; background-color: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 700; color: #1c1917;">Guests Notice the Difference</h3>
                <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.6;">
                  Premium taste and texture that customers rave about in reviews. When your tortillas are this good, people talk about it — on Google, Yelp, and to their friends.
                </p>
              </div>

              <div style="margin-bottom: 24px; padding: 24px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 700; color: #1c1917;">Consistent Quality, Every Order</h3>
                <p style="margin: 0; font-size: 15px; color: #78350f; line-height: 1.6;">
                  No more disappointing batches or torn tortillas during service. Professional-grade consistency you can count on, order after order.
                </p>
              </div>

              <div style="margin-bottom: 0; padding: 24px; background-color: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">
                <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 700; color: #1c1917;">Competitive Advantage</h3>
                <p style="margin: 0; font-size: 15px; color: #166534; line-height: 1.6;">
                  Stand out from competitors serving generic grocery store tortillas. Quality ingredients attract quality-minded customers willing to pay premium prices.
                </p>
              </div>
            </td>
          </tr>

          <!-- Social Proof -->
          <tr>
            <td style="padding: 32px; background-color: #fafaf9;">
              <div style="padding: 24px; background-color: #ffffff; border-left: 4px solid #3b82f6; border-radius: 4px;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #44403c; line-height: 1.7; font-style: italic;">
                  "We switched to Lonestar six months ago and our online reviews specifically mention how good our tacos are now. The tortillas made that much difference. Our food costs went up slightly, but our average ticket went up more."
                </p>
                <p style="margin: 0; font-size: 14px; color: #78716c;">
                  <strong style="color: #1c1917;">James Chen</strong><br>
                  Owner, Meridian Kitchen - Denver, CO
                </p>
              </div>
            </td>
          </tr>

          <!-- Video CTA -->
          <tr>
            <td style="padding: 40px 32px; background-color: #ffffff;">
              <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 700; color: #1c1917; text-align: center;">Meet Our Founder</h2>
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${VIDEO_PAGE_URL}" style="display: inline-block; text-decoration: none;">
                  <div style="position: relative; display: inline-block; border-radius: 8px; overflow: hidden; border: 2px solid #3b82f6;">
                    <img src="${VIDEO_THUMBNAIL_URL}" style="width: 100%; max-width: 500px; height: auto; display: block;" alt="Watch Maria's story">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(59, 130, 246, 0.9); width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);">
                      <div style="width: 0; height: 0; border-left: 24px solid #ffffff; border-top: 14px solid transparent; border-bottom: 14px solid transparent; margin-left: 6px;"></div>
                    </div>
                  </div>
                </a>
              </div>
              <div style="text-align: center;">
                <a href="${WEBSITE_URL}" style="display: inline-block; background-color: #1e40af; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Request Sample Pack</a>
              </div>
            </td>
          </tr>

          <!-- Pricing -->
          <tr>
            <td style="padding: 32px; background-color: #eff6ff;">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917; text-align: center;">Wholesale Pricing for Quality-Focused Restaurants</h3>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #1e40af; text-align: center; line-height: 1.6;">
                Competitive rates. Flexible delivery schedule. No long-term contracts required.
              </p>
              <div style="text-align: center;">
                <a href="mailto:wholesale@lonestartortillas.com" style="display: inline-block; color: #1e40af; text-decoration: none; font-weight: 600; font-size: 15px;">wholesale@lonestartortillas.com →</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #1c1917;">
              <div style="margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#fbbf24" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #ffffff;">Lonestar Tortillas</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <p style="margin: 0 0 4px 0;">
                <a href="${WEBSITE_URL}" style="color: #fbbf24; text-decoration: none; font-size: 14px;">lonestartortillas.com</a>
              </p>
              <p style="margin: 0;">
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #fbbf24; text-decoration: none; font-size: 14px;">wholesale@lonestartortillas.com</a>
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
    id: 'foodtruck-mobile',
    name: 'Food Truck - Speed & Durability',
    subject: 'Tortillas Built for the Road',
    category: 'foodtruck',
    description: 'Targeted at food trucks, emphasizing durability, portability, and consistent quality',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tortillas Built for the Road - Lonestar Tortillas</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f4;">
    <tr>
      <td style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.15);">

          <!-- Purple Gradient Header -->
          <tr>
            <td style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #7e22ce 0%, #581c87 100%);">
              <div style="margin-bottom: 24px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#facc15" style="display: inline-block;">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">Tortillas Built for the Road, Partner</h1>
              <p style="margin: 0; font-size: 18px; color: #f3e8ff; line-height: 1.6;">When you're slinging tacos from a truck, you need tortillas that can handle the heat. Literally.</p>
            </td>
          </tr>

          <!-- Hero Section -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3;">Food Trucks Operate on Speed & Durability</h2>
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #44403c; line-height: 1.6;">Y'all know the deal—limited space, no time for reprep, and tortillas that need to hold up under heat lamps during the lunch rush. Our H-E-B® tortillas are built Texas-tough, staying flexible and flavorful even when things get hectic.</p>
              <p style="margin: 0; font-size: 16px; color: #44403c; line-height: 1.6;"><strong>These aren't grocery store afterthoughts.</strong> They're the same premium tortillas that Texas families have trusted for generations—now available for your mobile kitchen, wherever the road takes you.</p>
            </td>
          </tr>

          <!-- Benefits Grid -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="width: 50%; padding-right: 8px; vertical-align: top;">
                    <div style="background-color: #faf5ff; border-left: 4px solid #7e22ce; padding: 20px; margin-bottom: 16px; border-radius: 6px;">
                      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #111827;">Won't Crack Under Pressure</h3>
                      <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.5;">Stays pliable even after sitting under heat lamps. No mid-service cracking when you're slammed with orders.</p>
                    </div>
                  </td>
                  <td style="width: 50%; padding-left: 8px; vertical-align: top;">
                    <div style="background-color: #faf5ff; border-left: 4px solid #7e22ce; padding: 20px; margin-bottom: 16px; border-radius: 6px;">
                      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #111827;">Handles the Heat</h3>
                      <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.5;">Consistent performance on your flat-top, in your steamer, or straight out of the warmer. Texas-tested, road-proven.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 50%; padding-right: 8px; vertical-align: top;">
                    <div style="background-color: #faf5ff; border-left: 4px solid #7e22ce; padding: 20px; border-radius: 6px;">
                      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #111827;">Fast Service, Zero Drama</h3>
                      <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.5;">Customers notice when their taco holds together. These tortillas deliver the quality your reputation rides on.</p>
                    </div>
                  </td>
                  <td style="width: 50%; padding-left: 8px; vertical-align: top;">
                    <div style="background-color: #faf5ff; border-left: 4px solid #7e22ce; padding: 20px; border-radius: 6px;">
                      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #111827;">Portion Consistency</h3>
                      <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.5;">Same size, same thickness, every single time. Makes portioning and cost control dead simple.</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Testimonial -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 24px; border-radius: 8px; border: 2px solid #7e22ce;">
                <p style="margin: 0 0 16px 0; font-size: 16px; font-style: italic; color: #1c1917; line-height: 1.6;">"Switched to Lonestar Tortillas six months ago and haven't looked back. They hold up through our Friday night rushes without breaking a sweat. Customers keep asking what we changed—that's how noticeable the quality jump is."</p>
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #44403c;">— Marcus Lopez, Owner, Taco Fury Food Truck - Portland, OR</p>
              </div>
            </td>
          </tr>

          <!-- Video Section -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <h2 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 700; color: #111827; text-align: center;">Meet Maria Rodriguez, Our Founder</h2>
              <div style="text-align: center;">
                <a href="${VIDEO_PAGE_URL}" style="display: inline-block; text-decoration: none;">
                  <div style="position: relative; display: inline-block; border-radius: 8px; overflow: hidden; border: 2px solid #7e22ce;">
                    <img src="${VIDEO_THUMBNAIL_URL}" style="width: 100%; max-width: 500px; height: auto; display: block;" alt="Watch Maria's story">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(126, 34, 206, 0.9); width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <div style="width: 0; height: 0; border-top: 12px solid transparent; border-bottom: 12px solid transparent; border-left: 20px solid #ffffff; margin-left: 4px;"></div>
                    </div>
                  </div>
                </a>
              </div>
              <p style="margin: 16px 0 0 0; font-size: 14px; color: #57534e; text-align: center; line-height: 1.5;">Watch Maria share why she started Lonestar Tortillas and what makes these tortillas special.</p>
            </td>
          </tr>

          <!-- Why Food Trucks Choose Us -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <h2 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 700; color: #111827;">Why Mobile Operators Choose Lonestar</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <div style="display: flex; align-items: flex-start;">
                      <div style="background-color: #7e22ce; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0; margin-right: 16px;">1</div>
                      <div>
                        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #111827;">Direct to Your Location</h3>
                        <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.5;">We ship anywhere in the continental U.S. Whether you're parked in Portland or Phoenix, we've got you covered.</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <div style="display: flex; align-items: flex-start;">
                      <div style="background-color: #7e22ce; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0; margin-right: 16px;">2</div>
                      <div>
                        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #111827;">Flexible Order Quantities</h3>
                        <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.5;">Buy what you need, when you need it. No massive minimums, no vendor pressure. Just real Texas quality on your terms.</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="display: flex; align-items: flex-start;">
                      <div style="background-color: #7e22ce; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0; margin-right: 16px;">3</div>
                      <div>
                        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #111827;">Proven Road Warriors</h3>
                        <p style="margin: 0; font-size: 14px; color: #57534e; line-height: 1.5;">These are the same H-E-B® tortillas that Texas families have trusted for generations. Now you can bring that authentic Texas taste to your customers, wherever you roll.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 32px 40px 32px; text-align: center;">
              <a href="${WEBSITE_URL}/shop" style="display: inline-block; background: linear-gradient(135deg, #7e22ce 0%, #581c87 100%); color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; padding: 16px 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(126, 34, 206, 0.3);">
                Get Started Today
              </a>
              <p style="margin: 16px 0 0 0; font-size: 14px; color: #78716c; line-height: 1.5;">Questions? Email us at <a href="mailto:wholesale@lonestartortillas.com" style="color: #7e22ce; text-decoration: underline;">wholesale@lonestartortillas.com</a></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center; background-color: #fafaf9; border-top: 1px solid #e7e5e4;">
              <p style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917;">Lonestar Tortillas</p>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #a8a29e;">Premium Texas Tortillas</p>
              <p style="margin: 0 0 4px 0;">
                <a href="${WEBSITE_URL}" style="color: #7e22ce; text-decoration: none; font-size: 14px;">lonestartortillas.com</a>
              </p>
              <p style="margin: 0;">
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #7e22ce; text-decoration: none; font-size: 14px;">wholesale@lonestartortillas.com</a>
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
              <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">Howdy, John! Order Confirmed!</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">Your premium Texas tortillas are headed your way. Get ready for some seriously good eats.</p>
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
              <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">Yeehaw! Your Order Has Shipped!</h1>
              <p style="margin: 0; font-size: 18px; color: #fafaf9; line-height: 1.6;">Great news, John! Your tortillas are riding their way to you right now.</p>
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
