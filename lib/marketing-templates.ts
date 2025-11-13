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

          <!-- Primary CTA -->
          <tr>
            <td style="padding: 32px; background-color: #ffffff; text-align: center;">
              <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 18px 48px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);">Shop H-E-B® Tortillas Now →</a>
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

          <!-- BBQ Resources -->
          <tr>
            <td style="padding: 40px 32px; background-color: #fafaf9;">
              <h2 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 700; color: #1c1917; text-align: center;">Learn From Texas BBQ Experts</h2>

              <!-- Blog Card 1 -->
              <div style="margin-bottom: 20px; padding: 20px; background-color: #ffffff; border-left: 4px solid #d97706; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/blog/bbq-meets-tortillas" style="color: #1c1917; text-decoration: none;">When Texas BBQ Meets H-E-B® Tortillas</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  Discover why authentic H-E-B® tortillas are essential for Texas BBQ culture. From brisket tacos to pulled pork wraps.
                </p>
                <a href="${WEBSITE_URL}/blog/bbq-meets-tortillas" style="font-size: 14px; color: #d97706; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>

              <!-- Blog Card 2 -->
              <div style="margin-bottom: 20px; padding: 20px; background-color: #ffffff; border-left: 4px solid #d97706; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/blog/why-pitmasters-refuse-store-tortillas" style="color: #1c1917; text-decoration: none;">Why Pitmasters Refuse Store-Bought Tortillas</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  Real stories of business losses and customer complaints—and the day they switched to H-E-B® tortillas.
                </p>
                <a href="${WEBSITE_URL}/blog/why-pitmasters-refuse-store-tortillas" style="font-size: 14px; color: #d97706; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>

              <!-- Blog Card 3 -->
              <div style="padding: 20px; background-color: #ffffff; border-left: 4px solid #d97706; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/guides/bbq-tortillas-guide" style="color: #1c1917; text-decoration: none;">The Complete BBQ & Tortillas Guide</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  Master the art of pairing Texas BBQ with authentic H-E-B® tortillas. From brisket tacos to pulled pork wraps.
                </p>
                <a href="${WEBSITE_URL}/guides/bbq-tortillas-guide" style="font-size: 14px; color: #d97706; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>
            </td>
          </tr>

          <!-- Simple Pricing -->
          <tr>
            <td style="padding: 32px; background-color: #f5f5f4;">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917; text-align: center;">Wholesale Pricing for Your Restaurant</h3>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #57534e; text-align: center; line-height: 1.6;">
                <strong>Buy authentic H-E-B® tortillas in bulk.</strong> Volume discounts available. Fast nationwide shipping. Order today.
              </p>
              <div style="text-align: center;">
                <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">Order Wholesale Now</a>
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

          <!-- Primary CTA -->
          <tr>
            <td style="padding: 32px; background-color: #ffffff; text-align: center;">
              <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 18px 48px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);">Shop H-E-B® Tortillas Now →</a>
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

          <!-- Authenticity Resources -->
          <tr>
            <td style="padding: 40px 32px; background-color: #fafaf9;">
              <h2 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 700; color: #1c1917; text-align: center;">Learn About Authentic Tortilla Traditions</h2>

              <!-- Blog Card 1 -->
              <div style="margin-bottom: 20px; padding: 20px; background-color: #ffffff; border-left: 4px solid #d97706; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/blog/texas-tortilla-traditions" style="color: #1c1917; text-decoration: none;">Texas Tortilla Traditions</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  From San Antonio to El Paso, explore how Texas shaped its own tortilla identity through Mexican heritage and Tex-Mex innovation.
                </p>
                <a href="${WEBSITE_URL}/blog/texas-tortilla-traditions" style="font-size: 14px; color: #d97706; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>

              <!-- Blog Card 2 -->
              <div style="margin-bottom: 20px; padding: 20px; background-color: #ffffff; border-left: 4px solid #d97706; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/blog/nixtamalization-science" style="color: #1c1917; text-decoration: none;">The Science of Nixtamalization</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  Discover the 3,500-year-old process that transforms corn into masa. How lime treatment unlocks nutrition and authentic flavor.
                </p>
                <a href="${WEBSITE_URL}/blog/nixtamalization-science" style="font-size: 14px; color: #d97706; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>

              <!-- Blog Card 3 -->
              <div style="padding: 20px; background-color: #ffffff; border-left: 4px solid #d97706; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/guides/corn-vs-flour-tortillas" style="color: #1c1917; text-decoration: none;">Corn vs Flour Tortillas: Complete Guide</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  Compare taste, texture, nutrition, and best uses. Learn which tortilla is right for tacos, burritos, and quesadillas.
                </p>
                <a href="${WEBSITE_URL}/guides/corn-vs-flour-tortillas" style="font-size: 14px; color: #d97706; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>
            </td>
          </tr>

          <!-- Simple Pricing -->
          <tr>
            <td style="padding: 32px; background-color: #f5f5f4;">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917; text-align: center;">Buy H-E-B® Tortillas in Bulk for Your Restaurant</h3>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #57534e; text-align: center; line-height: 1.6;">
                <strong>Order authentic H-E-B® tortillas today.</strong> Wholesale pricing with volume discounts. Nationwide delivery from Texas.
              </p>
              <div style="text-align: center;">
                <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">Order Wholesale Now</a>
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
    id: 'restaurant-generic',
    name: 'Generic Restaurant - Quality Focus',
    subject: 'Premium Tortillas That Elevate Every Dish',
    category: 'restaurant',
    description: 'Versatile template for any restaurant type, emphasizing quality and customer satisfaction',
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
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#2563eb" style="vertical-align: middle; margin-right: 8px;">
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
              <img src="https://lonestartortillas.com/images/Cards/image%20(10).png" alt="Premium restaurant dishes with H-E-B tortillas" style="width: 100%; height: auto; display: block;" />
            </td>
          </tr>

          <!-- Problem Statement -->
          <tr>
            <td style="padding: 40px 32px; background-color: #dbeafe; border-bottom: 4px solid #2563eb;">
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1c1917; text-align: center;">Your Menu Deserves Better</h2>
              <p style="margin: 0 0 12px 0; font-size: 16px; color: #1e3a8a; line-height: 1.6; text-align: center;">
                You source the best ingredients. You train your staff to perfection. Your plating is Instagram-worthy.
              </p>
              <p style="margin: 0; font-size: 18px; font-weight: 700; color: #1e40af; line-height: 1.6; text-align: center;">
                Why compromise on the foundation of your best dishes?
              </p>
            </td>
          </tr>

          <!-- Primary CTA -->
          <tr>
            <td style="padding: 32px; background-color: #ffffff; text-align: center;">
              <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 18px 48px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);">Shop H-E-B® Tortillas Now →</a>
            </td>
          </tr>

          <!-- The Solution -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #1c1917;">Why Restaurants Choose Our H-E-B® Tortillas</h2>

              <div style="margin-bottom: 24px;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">1</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Restaurant-Grade Consistency</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">Every tortilla performs the same way, every time. No more surprises during service. Your kitchen staff will thank you.</p>
                </div>
              </div>

              <div style="margin-bottom: 24px;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">2</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Versatile Across Your Entire Menu</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">From breakfast burritos to dinner tacos to late-night quesadillas. One supplier, multiple menu applications. Simplify your ordering.</p>
                </div>
              </div>

              <div style="margin-bottom: 0;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">3</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Customers Notice the Quality</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">Premium texture and authentic flavor that guests recognize and remember. The kind of quality that earns repeat visits and 5-star reviews.</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- Social Proof -->
          <tr>
            <td style="padding: 32px; background-color: #fafaf9;">
              <div style="padding: 24px; background-color: #ffffff; border-left: 4px solid #2563eb; border-radius: 4px;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #44403c; line-height: 1.7; font-style: italic;">
                  "We switched to Lonestar six months ago and haven't looked back. Our Yelp reviews started mentioning 'authentic tortillas' and 'high-quality ingredients.' That tells you everything."
                </p>
                <p style="margin: 0; font-size: 14px; color: #78716c;">
                  <strong style="color: #1c1917;">Sarah Chen</strong><br>
                  Owner, The Corner Bistro - Denver, CO
                </p>
              </div>
            </td>
          </tr>

          <!-- Restaurant Resources -->
          <tr>
            <td style="padding: 40px 32px; background-color: #fafaf9;">
              <h2 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 700; color: #1c1917; text-align: center;">Essential Guides for Your Restaurant</h2>

              <!-- Blog Card 1 -->
              <div style="margin-bottom: 20px; padding: 20px; background-color: #ffffff; border-left: 4px solid #2563eb; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/guides/best-tortillas-for-every-dish" style="color: #1c1917; text-decoration: none;">Best Tortillas for Every Dish</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  Learn which tortilla type to use for tacos, burritos, enchiladas, quesadillas, and more. Complete guide for every menu item.
                </p>
                <a href="${WEBSITE_URL}/guides/best-tortillas-for-every-dish" style="font-size: 14px; color: #2563eb; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>

              <!-- Blog Card 2 -->
              <div style="margin-bottom: 20px; padding: 20px; background-color: #ffffff; border-left: 4px solid #2563eb; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/guides/how-to-store-tortillas" style="color: #1c1917; text-decoration: none;">How to Store Tortillas Properly</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  Master proper storage techniques to keep tortillas fresh for weeks. Essential tips for restaurant operations.
                </p>
                <a href="${WEBSITE_URL}/guides/how-to-store-tortillas" style="font-size: 14px; color: #2563eb; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>

              <!-- Blog Card 3 -->
              <div style="padding: 20px; background-color: #ffffff; border-left: 4px solid #2563eb; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/guides/how-to-reheat-tortillas" style="color: #1c1917; text-decoration: none;">How to Reheat Tortillas for Service</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  Professional techniques for warming tortillas perfectly during service. Keep them pliable and delicious all shift long.
                </p>
                <a href="${WEBSITE_URL}/guides/how-to-reheat-tortillas" style="font-size: 14px; color: #2563eb; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>
            </td>
          </tr>

          <!-- Simple Pricing -->
          <tr>
            <td style="padding: 32px; background-color: #f5f5f4;">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917; text-align: center;">Wholesale Pricing for Restaurants</h3>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #57534e; text-align: center; line-height: 1.6;">
                <strong>Order authentic H-E-B® tortillas in bulk.</strong> Volume discounts available. Reliable nationwide delivery from Texas.
              </p>
              <div style="text-align: center;">
                <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">Order Wholesale Now</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #ffffff; border-top: 1px solid #e7e5e4; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1c1917;">Lonestar Tortillas</p>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #78716c;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #a8a29e;">
                <a href="${WEBSITE_URL}" style="color: #2563eb; text-decoration: none;">lonestartortillas.com</a> |
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #2563eb; text-decoration: none;">wholesale@lonestartortillas.com</a>
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
    subject: 'Tortillas Built for Life on the Road',
    category: 'foodtruck',
    description: 'Targeted at food trucks, emphasizing durability, portability, and consistent quality under mobile conditions',
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
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#7c3aed" style="vertical-align: middle; margin-right: 8px;">
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
              <img src="https://lonestartortillas.com/images/Cards/image%20(12).png" alt="Food truck dining with H-E-B tortillas" style="width: 100%; height: auto; display: block;" />
            </td>
          </tr>

          <!-- Problem Statement -->
          <tr>
            <td style="padding: 40px 32px; background-color: #f3e8ff; border-bottom: 4px solid #7c3aed;">
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1c1917; text-align: center;">Running a Food Truck Is Hard Enough</h2>
              <p style="margin: 0 0 12px 0; font-size: 16px; color: #5b21b6; line-height: 1.6; text-align: center;">
                You're battling weather, finding spots, managing tight space, and serving customers through a window. Your margins are thin and your pace is fast.
              </p>
              <p style="margin: 0; font-size: 18px; font-weight: 700; color: #6b21a8; line-height: 1.6; text-align: center;">
                Your tortillas shouldn't be another thing to worry about.
              </p>
            </td>
          </tr>

          <!-- Primary CTA -->
          <tr>
            <td style="padding: 32px; background-color: #ffffff; text-align: center;">
              <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 18px 48px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 18px; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);">Shop H-E-B® Tortillas Now →</a>
            </td>
          </tr>

          <!-- The Solution -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #1c1917;">Why Food Trucks Choose Our H-E-B® Tortillas</h2>

              <div style="margin-bottom: 24px;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #7c3aed; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">1</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Won't Crack When Space Is Tight</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">Stays pliable even when stacked in limited storage. Flexible enough to handle without breaking, sturdy enough to hold up during rush hour. Built for mobile kitchens.</p>
                </div>
              </div>

              <div style="margin-bottom: 24px;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #7c3aed; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">2</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Consistent Quality, Every Single Order</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">No more "these feel different than last week." Every package performs exactly the same. When you're serving 200 tacos in 3 hours, consistency matters.</p>
                </div>
              </div>

              <div style="margin-bottom: 0;">
                <div style="display: inline-block; width: 40px; height: 40px; background-color: #7c3aed; border-radius: 50%; text-align: center; line-height: 40px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 18px;">3</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 60px); vertical-align: top;">
                  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1c1917;">Reliable Delivery on Your Schedule</h3>
                  <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">Delivered when you need them, where you need them. No more last-minute runs to restaurant supply stores between lunch and dinner service.</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- Social Proof -->
          <tr>
            <td style="padding: 32px; background-color: #fafaf9;">
              <div style="padding: 24px; background-color: #ffffff; border-left: 4px solid #7c3aed; border-radius: 4px;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #44403c; line-height: 1.7; font-style: italic;">
                  "We park in 5 different locations every week. These tortillas survive the road, the heat, and the rush without falling apart. Finally found a supplier that gets what food trucks need."
                </p>
                <p style="margin: 0; font-size: 14px; color: #78716c;">
                  <strong style="color: #1c1917;">Marcus Johnson</strong><br>
                  Owner, Taco Nomad - Portland, OR
                </p>
              </div>
            </td>
          </tr>

          <!-- Mobile Kitchen Resources -->
          <tr>
            <td style="padding: 40px 32px; background-color: #fafaf9;">
              <h2 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 700; color: #1c1917; text-align: center;">Essential Tips for Mobile Kitchens</h2>

              <!-- Blog Card 1 -->
              <div style="margin-bottom: 20px; padding: 20px; background-color: #ffffff; border-left: 4px solid #7c3aed; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/guides/how-to-store-tortillas" style="color: #1c1917; text-decoration: none;">How to Store Tortillas in Tight Spaces</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  Master proper storage techniques for limited food truck space. Keep tortillas fresh for weeks without taking up precious room.
                </p>
                <a href="${WEBSITE_URL}/guides/how-to-store-tortillas" style="font-size: 14px; color: #7c3aed; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>

              <!-- Blog Card 2 -->
              <div style="margin-bottom: 20px; padding: 20px; background-color: #ffffff; border-left: 4px solid #7c3aed; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/guides/how-to-reheat-tortillas" style="color: #1c1917; text-decoration: none;">Quick Reheating for Rush Hour</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  Professional techniques for warming tortillas perfectly during busy service. Keep them pliable when speed matters most.
                </p>
                <a href="${WEBSITE_URL}/guides/how-to-reheat-tortillas" style="font-size: 14px; color: #7c3aed; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>

              <!-- Blog Card 3 -->
              <div style="padding: 20px; background-color: #ffffff; border-left: 4px solid #7c3aed; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #1c1917;">
                  <a href="${WEBSITE_URL}/guides/best-tortillas-for-every-dish" style="color: #1c1917; text-decoration: none;">Best Tortillas for Your Menu</a>
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #57534e; line-height: 1.5;">
                  Learn which tortilla type works best for your signature dishes. Optimize your menu with the right tortilla choices.
                </p>
                <a href="${WEBSITE_URL}/guides/best-tortillas-for-every-dish" style="font-size: 14px; color: #7c3aed; text-decoration: none; font-weight: 600;">Read More →</a>
              </div>
            </td>
          </tr>

          <!-- Simple Pricing -->
          <tr>
            <td style="padding: 32px; background-color: #f5f5f4;">
              <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917; text-align: center;">Wholesale Pricing for Food Trucks</h3>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #57534e; text-align: center; line-height: 1.6;">
                <strong>Buy authentic H-E-B® tortillas in quantities that work for your truck.</strong> Flexible ordering. Reliable delivery. Order today.
              </p>
              <div style="text-align: center;">
                <a href="${WEBSITE_URL}/shop" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">Order Wholesale Now</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #ffffff; border-top: 1px solid #e7e5e4; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1c1917;">Lonestar Tortillas</p>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #78716c;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #a8a29e;">
                <a href="${WEBSITE_URL}" style="color: #7c3aed; text-decoration: none;">lonestartortillas.com</a> |
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #7c3aed; text-decoration: none;">wholesale@lonestartortillas.com</a>
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
    subject: 'Order Confirmed - Thank You for Your Purchase!',
    category: 'transactional',
    description: 'Transactional email confirming customer order details and next steps',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
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
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#10b981" style="vertical-align: middle; margin-right: 8px;">
                      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                    </svg>
                    <span style="font-size: 18px; font-weight: 700; color: #1c1917; vertical-align: middle;">LONESTAR TORTILLAS</span>
                  </td>
                  <td style="text-align: right;">
                    <a href="${WEBSITE_URL}" style="color: #57534e; text-decoration: none; font-size: 13px;">View Order</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Success Banner -->
          <tr>
            <td style="padding: 32px 32px; background-color: #d1fae5; text-align: center;">
              <div style="display: inline-block; width: 60px; height: 60px; background-color: #10b981; border-radius: 50%; margin-bottom: 16px;">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" style="padding: 15px;">
                  <path d="M20 6L9 17L4 12" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #1c1917;">Order Confirmed!</h1>
              <p style="margin: 0; font-size: 16px; color: #065f46; line-height: 1.5;">
                Thank you for your order. We're getting your tortillas ready to ship.
              </p>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 2px solid #e7e5e4;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: left;">
                          <p style="margin: 0; font-size: 13px; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</p>
                          <p style="margin: 4px 0 0 0; font-size: 18px; font-weight: 700; color: #1c1917;">#ORDER_NUMBER</p>
                        </td>
                        <td style="text-align: right;">
                          <p style="margin: 0; font-size: 13px; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Order Date</p>
                          <p style="margin: 4px 0 0 0; font-size: 18px; font-weight: 700; color: #1c1917;">ORDER_DATE</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Order Items -->
              <div style="padding: 24px 0; border-bottom: 1px solid #e7e5e4;">
                <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700; color: #1c1917;">Order Items</h2>

                <!-- Sample Item - Replace with actual order items -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                  <tr>
                    <td style="width: 60%; vertical-align: top;">
                      <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 600; color: #1c1917;">H-E-B® Flour Tortillas - 4-Pack</p>
                      <p style="margin: 0; font-size: 13px; color: #78716c;">80 tortillas (4 packs × 20 per pack)</p>
                    </td>
                    <td style="width: 20%; text-align: right; vertical-align: top;">
                      <p style="margin: 0; font-size: 15px; color: #57534e;">× 4</p>
                    </td>
                    <td style="width: 20%; text-align: right; vertical-align: top;">
                      <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1c1917;">$47.99</p>
                    </td>
                  </tr>
                </table>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="width: 60%; vertical-align: top;">
                      <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 600; color: #1c1917;">H-E-B® Corn Tortillas - 2-Pack</p>
                      <p style="margin: 0; font-size: 13px; color: #78716c;">40 tortillas (2 packs × 20 per pack)</p>
                    </td>
                    <td style="width: 20%; text-align: right; vertical-align: top;">
                      <p style="margin: 0; font-size: 15px; color: #57534e;">× 2</p>
                    </td>
                    <td style="width: 20%; text-align: right; vertical-align: top;">
                      <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1c1917;">$18.99</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Order Summary -->
              <div style="padding: 20px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; text-align: left;">
                      <p style="margin: 0; font-size: 15px; color: #57534e;">Subtotal</p>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <p style="margin: 0; font-size: 15px; color: #1c1917;">$66.98</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; text-align: left;">
                      <p style="margin: 0; font-size: 15px; color: #57534e;">Shipping</p>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <p style="margin: 0; font-size: 15px; color: #1c1917;">$12.99</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; text-align: left;">
                      <p style="margin: 0; font-size: 15px; color: #57534e;">Tax</p>
                    </td>
                    <td style="padding: 8px 0; text-align: right;">
                      <p style="margin: 0; font-size: 15px; color: #1c1917;">$5.36</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0 0 0; border-top: 2px solid #e7e5e4; text-align: left;">
                      <p style="margin: 0; font-size: 18px; font-weight: 700; color: #1c1917;">Total</p>
                    </td>
                    <td style="padding: 16px 0 0 0; border-top: 2px solid #e7e5e4; text-align: right;">
                      <p style="margin: 0; font-size: 18px; font-weight: 700; color: #10b981;">$85.33</p>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 32px; background-color: #fafaf9;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917;">Shipping Address</h2>
              <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">
                <strong style="color: #1c1917;">CUSTOMER_NAME</strong><br>
                SHIPPING_ADDRESS_LINE_1<br>
                SHIPPING_ADDRESS_LINE_2<br>
                CITY, STATE ZIP
              </p>
            </td>
          </tr>

          <!-- What's Next -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917;">What Happens Next?</h2>
              <div style="margin-bottom: 20px;">
                <div style="display: inline-block; width: 32px; height: 32px; background-color: #10b981; border-radius: 50%; text-align: center; line-height: 32px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 14px;">1</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 50px); vertical-align: top;">
                  <p style="margin: 0; font-size: 15px; color: #1c1917; line-height: 1.6;"><strong>Processing:</strong> We're preparing your order (1-2 business days)</p>
                </div>
              </div>
              <div style="margin-bottom: 20px;">
                <div style="display: inline-block; width: 32px; height: 32px; background-color: #10b981; border-radius: 50%; text-align: center; line-height: 32px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 14px;">2</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 50px); vertical-align: top;">
                  <p style="margin: 0; font-size: 15px; color: #1c1917; line-height: 1.6;"><strong>Shipping:</strong> You'll receive tracking info via email</p>
                </div>
              </div>
              <div>
                <div style="display: inline-block; width: 32px; height: 32px; background-color: #10b981; border-radius: 50%; text-align: center; line-height: 32px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 14px;">3</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 50px); vertical-align: top;">
                  <p style="margin: 0; font-size: 15px; color: #1c1917; line-height: 1.6;"><strong>Delivery:</strong> Premium tortillas arrive at your door (3-5 business days)</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f5f5f4; text-align: center;">
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #57534e;">Questions about your order?</p>
              <a href="mailto:wholesale@lonestartortillas.com" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">Contact Support</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #ffffff; border-top: 1px solid #e7e5e4; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1c1917;">Lonestar Tortillas</p>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #78716c;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #a8a29e;">
                <a href="${WEBSITE_URL}" style="color: #10b981; text-decoration: none;">lonestartortillas.com</a> |
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #10b981; text-decoration: none;">wholesale@lonestartortillas.com</a>
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
    name: 'Order Shipped',
    subject: 'Your Order Is On Its Way! 📦',
    category: 'transactional',
    description: 'Transactional email notifying customer of shipment with tracking information',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped</title>
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
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#2563eb" style="vertical-align: middle; margin-right: 8px;">
                      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
                    </svg>
                    <span style="font-size: 18px; font-weight: 700; color: #1c1917; vertical-align: middle;">LONESTAR TORTILLAS</span>
                  </td>
                  <td style="text-align: right;">
                    <a href="${WEBSITE_URL}" style="color: #57534e; text-decoration: none; font-size: 13px;">View Order</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipped Banner -->
          <tr>
            <td style="padding: 32px 32px; background-color: #dbeafe; text-align: center;">
              <div style="display: inline-block; width: 60px; height: 60px; background-color: #2563eb; border-radius: 50%; margin-bottom: 16px;">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" style="padding: 18px;">
                  <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #1c1917;">Your Order Has Shipped!</h1>
              <p style="margin: 0; font-size: 16px; color: #1e40af; line-height: 1.5;">
                Your premium tortillas are on the way to your door.
              </p>
            </td>
          </tr>

          <!-- Tracking Info -->
          <tr>
            <td style="padding: 32px;">
              <div style="padding: 24px; background-color: #f0f9ff; border: 2px solid #2563eb; border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #1e40af; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Tracking Number</p>
                <p style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #1c1917; letter-spacing: 1px;">TRACKING_NUMBER</p>
                <a href="TRACKING_URL" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);">Track Your Package →</a>
              </div>
            </td>
          </tr>

          <!-- Shipment Details -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="width: 50%; padding: 16px; background-color: #fafaf9; border-radius: 6px; vertical-align: top;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Carrier</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 700; color: #1c1917;">CARRIER_NAME</p>
                  </td>
                  <td style="width: 10px;"></td>
                  <td style="width: 50%; padding: 16px; background-color: #fafaf9; border-radius: 6px; vertical-align: top;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Estimated Delivery</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 700; color: #2563eb;">DELIVERY_DATE</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 32px; background-color: #fafaf9; border-top: 1px solid #e7e5e4; border-bottom: 1px solid #e7e5e4;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917;">Order Summary</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: left;">
                          <p style="margin: 0; font-size: 13px; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</p>
                          <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 700; color: #1c1917;">#ORDER_NUMBER</p>
                        </td>
                        <td style="text-align: right;">
                          <p style="margin: 0; font-size: 13px; color: #78716c; text-transform: uppercase; letter-spacing: 0.5px;">Order Date</p>
                          <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 700; color: #1c1917;">ORDER_DATE</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px; border-top: 1px solid #e7e5e4;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #57534e;">Items Shipped:</p>
                    <p style="margin: 0; font-size: 14px; color: #78716c; line-height: 1.6;">
                      • H-E-B® Flour Tortillas - 4-Pack (80 tortillas)<br>
                      • H-E-B® Corn Tortillas - 2-Pack (40 tortillas)
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917;">Shipping To</h2>
              <p style="margin: 0; font-size: 15px; color: #57534e; line-height: 1.6;">
                <strong style="color: #1c1917;">CUSTOMER_NAME</strong><br>
                SHIPPING_ADDRESS_LINE_1<br>
                SHIPPING_ADDRESS_LINE_2<br>
                CITY, STATE ZIP
              </p>
            </td>
          </tr>

          <!-- Preparation Tips -->
          <tr>
            <td style="padding: 32px; background-color: #f0f9ff;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #1c1917;">While You Wait: Pro Tips</h2>
              <div style="margin-bottom: 16px;">
                <div style="display: inline-block; width: 32px; height: 32px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 32px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 14px;">1</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 50px); vertical-align: top;">
                  <p style="margin: 0; font-size: 15px; color: #1c1917; line-height: 1.6;"><strong>Storage:</strong> Keep refrigerated. Tortillas stay fresh for 2-3 weeks sealed.</p>
                </div>
              </div>
              <div style="margin-bottom: 16px;">
                <div style="display: inline-block; width: 32px; height: 32px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 32px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 14px;">2</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 50px); vertical-align: top;">
                  <p style="margin: 0; font-size: 15px; color: #1c1917; line-height: 1.6;"><strong>Best Results:</strong> Warm on griddle or comal for 30 seconds per side before serving.</p>
                </div>
              </div>
              <div>
                <div style="display: inline-block; width: 32px; height: 32px; background-color: #2563eb; border-radius: 50%; text-align: center; line-height: 32px; margin-right: 12px; vertical-align: top;">
                  <span style="color: #ffffff; font-weight: 700; font-size: 14px;">3</span>
                </div>
                <div style="display: inline-block; width: calc(100% - 50px); vertical-align: top;">
                  <p style="margin: 0; font-size: 15px; color: #1c1917; line-height: 1.6;"><strong>Pro Tip:</strong> Keep warm in a tortilla warmer or wrapped in a clean kitchen towel.</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- Support CTA -->
          <tr>
            <td style="padding: 24px 32px; background-color: #ffffff; text-align: center;">
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #57534e;">Questions or concerns about your shipment?</p>
              <a href="mailto:wholesale@lonestartortillas.com" style="display: inline-block; background-color: #1c1917; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">Contact Support</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #ffffff; border-top: 1px solid #e7e5e4; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1c1917;">Lonestar Tortillas</p>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #78716c;">Premium Texas Tortillas</p>
              <p style="margin: 0; font-size: 12px; color: #a8a29e;">
                <a href="${WEBSITE_URL}" style="color: #2563eb; text-decoration: none;">lonestartortillas.com</a> |
                <a href="mailto:wholesale@lonestartortillas.com" style="color: #2563eb; text-decoration: none;">wholesale@lonestartortillas.com</a>
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
