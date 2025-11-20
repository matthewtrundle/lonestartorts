/**
 * Email Campaign Templates for "Up Your Game" Restaurant Campaign
 * 7 Restaurant Types with Subject Line Variations
 */

export interface EmailCampaign {
  restaurantType: string;
  displayName: string;
  subjectLines: {
    direct: string;
    curiosity: string;
    urgency: string;
  };
  preheader: string;
  body: {
    hook: string;
    painPoints: string[];
    solution: string;
    proof: string[];
    cta: string;
    ctaUrl: string;
  };
}

export const emailCampaigns: Record<string, EmailCampaign> = {
  'food-trucks': {
    restaurantType: 'food-trucks',
    displayName: 'Food Truck Operators',
    subjectLines: {
      direct: 'Your Secret Weapon for Perfect Tacos',
      curiosity: 'What top Texas food trucks know about tortillas',
      urgency: 'Ready to up your game? H-E-B tortillas delivered',
    },
    preheader: 'The same tortillas Texans line up for—delivered to your truck',
    body: {
      hook: 'Running a food truck is tough. Long lines, tight margins, and one bad review can hurt you for months.',
      painPoints: [
        'Unreliable suppliers delivering subpar tortillas that don\'t hold up',
        'Negative reviews about soggy, torn tortillas ruining your tacos',
        'Premium tortillas cost too much, but cheap ones hurt your reputation',
      ],
      solution: 'H-E-B tortillas are the answer. The same authentic Texas tortillas that locals trust—strong enough to handle loaded tacos, fresh enough to keep customers coming back.',
      proof: [
        'Holds up under pressure without tearing',
        'Authentic Texas taste customers recognize',
        'Shelf-stable with 60-day freshness',
        'Free shipping on 4+ packs',
      ],
      cta: 'See How Food Trucks Win with H-E-B Tortillas',
      ctaUrl: 'https://lonestartortillas.com/restaurants/food-trucks',
    },
  },

  bbq: {
    restaurantType: 'bbq',
    displayName: 'BBQ Restaurants',
    subjectLines: {
      direct: 'Your Brisket Deserves Better Tortillas',
      curiosity: 'The tortilla secret behind legendary BBQ tacos',
      urgency: 'Give your brisket the tortilla it deserves',
    },
    preheader: 'Match your world-class smoked meats with tortillas that can handle them',
    body: {
      hook: 'You spend hours smoking the perfect brisket. Why wrap it in generic tortillas that fall apart?',
      painPoints: [
        'Your smoked meats are world-class, but your tortillas don\'t match that quality',
        'Generic tortillas can\'t handle your rich, smoky flavors',
        'Out-of-state visitors expect authentic Texas BBQ—including the tortillas',
      ],
      solution: 'H-E-B tortillas are built for BBQ. Thick, sturdy, and ready to handle loaded brisket, pulled pork, or sausage. The subtle, authentic flavor lets your smoke and rubs shine.',
      proof: [
        'Built for loaded BBQ without blowouts',
        'Complements your flavors, doesn\'t compete',
        'The Texas standard customers expect',
        'Free shipping on 4+ packs',
      ],
      cta: 'See How BBQ Restaurants Win with H-E-B',
      ctaUrl: 'https://lonestartortillas.com/restaurants/bbq',
    },
  },

  mexican: {
    restaurantType: 'mexican',
    displayName: 'Mexican Restaurants',
    subjectLines: {
      direct: 'Tortillas Your Abuela Would Approve Of',
      curiosity: 'The tortilla secret top Mexican restaurants know',
      urgency: 'Serve authentic tortillas customers can taste',
    },
    preheader: 'Traditional flavor, reliable quality, and the authentic taste you need',
    body: {
      hook: 'Your recipes are authentic. Your ingredients are fresh. But generic tortillas undermine everything you\'ve built.',
      painPoints: [
        'Generic tortillas make customers question your authenticity',
        'Inconsistent batches that ruin your prep work',
        'Flavors that don\'t match your traditional recipes',
      ],
      solution: 'H-E-B tortillas deliver authentic Mexican flavor—soft, pliable, with that fresh-made taste. These taste like homemade tortillas, because that\'s the standard H-E-B set.',
      proof: [
        'Authentic Mexican flavor profile',
        'Perfect for traditional dishes',
        'Consistent quality every time',
        'Free shipping on 4+ packs',
      ],
      cta: 'See How Mexican Restaurants Win with H-E-B',
      ctaUrl: 'https://lonestartortillas.com/restaurants/mexican',
    },
  },

  'tex-mex': {
    restaurantType: 'tex-mex',
    displayName: 'Tex-Mex Restaurants',
    subjectLines: {
      direct: 'Fajitas That Actually Stay Together',
      curiosity: 'What busy Tex-Mex kitchens know about tortillas',
      urgency: 'Survive Friday rush with better tortillas',
    },
    preheader: 'Versatile, reliable, ready for your busiest nights',
    body: {
      hook: 'It\'s Friday at 7 PM. Your fajitas are sizzling, the line is 20 deep, and your tortillas keep tearing. There\'s a better way.',
      painPoints: [
        'Tortillas that tear during your busiest service hours',
        'High-volume challenges that slow down your kitchen',
        'Customers questioning value when tortillas are subpar',
      ],
      solution: 'H-E-B tortillas are fajita-ready. Large, pliable, and strong enough for loaded fajitas. They warm fast, serve hot, and perform perfectly when you need them most.',
      proof: [
        'Fajita-ready performance every time',
        'Built for high-volume service',
        'Premium brand recognition',
        'Free shipping on 4+ packs',
      ],
      cta: 'See How Tex-Mex Restaurants Win with H-E-B',
      ctaUrl: 'https://lonestartortillas.com/restaurants/tex-mex',
    },
  },

  'taco-shops': {
    restaurantType: 'taco-shops',
    displayName: 'Taco Shops & Taquerias',
    subjectLines: {
      direct: 'The Tortilla Is Half the Taco. Make It Count.',
      curiosity: 'Why customers choose one taco shop over another',
      urgency: 'Stand out from the competition with H-E-B',
    },
    preheader: 'Your tortilla is half the taco—make it your competitive edge',
    body: {
      hook: 'Three taco shops on your block. All sell tacos. What makes yours worth choosing?',
      painPoints: [
        'When your whole business is tacos, you can\'t afford mediocre tortillas',
        'Competition is fierce—every detail matters',
        'Customers expect perfection at $3/taco',
      ],
      solution: 'H-E-B tortillas give you differentiation that matters. Soft, flavorful, perfectly sized—these tortillas don\'t just hold ingredients, they elevate them.',
      proof: [
        'Foundation of great tacos',
        'Differentiation customers notice',
        'Reliability you can build on',
        'Free shipping on 4+ packs',
      ],
      cta: 'See How Taco Shops Win with H-E-B',
      ctaUrl: 'https://lonestartortillas.com/restaurants/taco-shops',
    },
  },

  catering: {
    restaurantType: 'catering',
    displayName: 'Catering Companies',
    subjectLines: {
      direct: 'Never Worry About Bulk Tortilla Quality Again',
      curiosity: 'What top caterers know about tortilla reliability',
      urgency: 'Lock in event success with H-E-B tortillas',
    },
    preheader: 'Reliable quality at scale with 60-day shelf life',
    body: {
      hook: 'You\'re catering 500 people tomorrow. Your tortillas arrived today. Will they still be fresh at service time?',
      painPoints: [
        'Bulk orders that arrive with unusable tortillas',
        'One bad taco bar can cost you repeat business',
        'Uncertainty about shelf life when prepping days ahead',
      ],
      solution: 'H-E-B tortillas deliver consistent quality at any scale. With 60-day shelf stability, you can order ahead and know your tortillas will be perfect when you need them.',
      proof: [
        'Consistent quality at any scale',
        '60-day extended shelf life',
        'Client-impressing quality',
        'Free shipping on 4+ packs',
      ],
      cta: 'See How Caterers Win with H-E-B',
      ctaUrl: 'https://lonestartortillas.com/restaurants/catering',
    },
  },

  breakfast: {
    restaurantType: 'breakfast',
    displayName: 'Breakfast & Brunch Spots',
    subjectLines: {
      direct: 'Breakfast Tacos Worth Waking Up For',
      curiosity: 'The breakfast taco secret Texas knows',
      urgency: 'Survive the morning rush with H-E-B tortillas',
    },
    preheader: 'Start customers\' day right with authentic Texas breakfast tacos',
    body: {
      hook: 'Saturday morning. The line is 20 deep. Everyone wants breakfast tacos. Are your tortillas slowing you down?',
      painPoints: [
        'Tortillas that tear or stick together during morning rush',
        'In Texas, breakfast tacos are serious—generic won\'t cut it',
        'Heavy eggs, bacon, and cheese need tortillas that hold up',
      ],
      solution: 'H-E-B tortillas are built for breakfast tacos. Soft, pliable, strong enough for loaded eggs, bacon, and cheese. They warm fast and perform consistently when your line is 20 deep.',
      proof: [
        'Built for breakfast taco perfection',
        'Morning rush ready',
        'The breakfast taco standard in Texas',
        'Free shipping on 4+ packs',
      ],
      cta: 'See How Breakfast Spots Win with H-E-B',
      ctaUrl: 'https://lonestartortillas.com/restaurants/breakfast',
    },
  },
};

/**
 * Get email campaign by restaurant type
 */
export function getEmailCampaign(type: string): EmailCampaign | undefined {
  return emailCampaigns[type];
}

/**
 * Get all email campaign types
 */
export function getAllEmailCampaignTypes(): string[] {
  return Object.keys(emailCampaigns);
}

/**
 * Generate HTML email template (simplified version for reference)
 */
export function generateEmailHTML(campaign: EmailCampaign, subjectLineType: 'direct' | 'curiosity' | 'urgency' = 'direct'): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${campaign.subjectLines[subjectLineType]}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FEFDFB; color: #1A1A1A;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #1A1A1A 0%, #3D3D3D 100%); text-align: center;">
              <h1 style="margin: 0; color: #FEFDFB; font-size: 28px; font-weight: bold;">Lonestar Tortillas</h1>
              <p style="margin: 10px 0 0; color: #F15A0E; font-size: 16px; font-weight: 600;">Premium Texas Tortillas</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1A1A1A; font-size: 24px; line-height: 1.3;">${campaign.displayName}, Ready to Up Your Game?</h2>

              <p style="margin: 0 0 20px; color: #3D3D3D; font-size: 16px; line-height: 1.6;">${campaign.body.hook}</p>

              <h3 style="margin: 30px 0 15px; color: #1A1A1A; font-size: 18px;">Sound familiar?</h3>
              <ul style="margin: 0 0 20px; padding-left: 20px; color: #3D3D3D; font-size: 15px; line-height: 1.8;">
                ${campaign.body.painPoints.map(point => `<li style="margin-bottom: 10px;">${point}</li>`).join('')}
              </ul>

              <p style="margin: 30px 0 20px; color: #3D3D3D; font-size: 16px; line-height: 1.6; font-weight: 600;">${campaign.body.solution}</p>

              <div style="margin: 30px 0; padding: 20px; background-color: #FDF9F3; border-left: 4px solid #F15A0E; border-radius: 4px;">
                <h4 style="margin: 0 0 10px; color: #1A1A1A; font-size: 16px;">Why Choose H-E-B Tortillas:</h4>
                <ul style="margin: 0; padding-left: 20px; color: #3D3D3D; font-size: 14px; line-height: 1.8;">
                  ${campaign.body.proof.map(point => `<li style="margin-bottom: 8px;">✓ ${point}</li>`).join('')}
                </ul>
              </div>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px auto; text-align: center;">
                <tr>
                  <td style="border-radius: 8px; background-color: #F15A0E;">
                    <a href="${campaign.body.ctaUrl}" style="display: inline-block; padding: 16px 32px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">
                      ${campaign.body.cta} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #FDF9F3; text-align: center; border-top: 1px solid #E5E5E5;">
              <p style="margin: 0 0 10px; color: #666666; font-size: 12px;">
                Lonestar Tortillas - Premium Texas Tortillas
              </p>
              <p style="margin: 0 0 15px; color: #999999; font-size: 11px;">
                Independent reseller. Not affiliated with or endorsed by H-E-B®.
              </p>
              <p style="margin: 0; color: #999999; font-size: 11px;">
                <a href="https://lonestartortillas.com" style="color: #F15A0E; text-decoration: none;">Visit Our Website</a> |
                <a href="#" style="color: #999999; text-decoration: none;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
