# Restaurant Landing Pages - "Up Your Game" Campaign

## Overview

7 targeted landing pages with matching email campaigns for restaurant types:
- Food Trucks (`/restaurants/food-trucks`)
- BBQ Restaurants (`/restaurants/bbq`)
- Mexican Restaurants (`/restaurants/mexican`)
- Tex-Mex Restaurants (`/restaurants/tex-mex`)
- Taco Shops & Taquerias (`/restaurants/taco-shops`)
- Catering Companies (`/restaurants/catering`)
- Breakfast & Brunch Spots (`/restaurants/breakfast`)

## Features

### Design System
- **Compact Layout**: 40-50vh hero (vs 100vh homepage)
- **Tighter Spacing**: py-8 to py-10 sections (vs py-20)
- **CompactHeader**: Slimmer header with logo "exploding" outside margin
- **Smaller Typography**: 36-60px headers (vs 100-220px)
- **Efficient Grids**: 2-3 columns with tight gaps
- **Total Page Height**: ~2,150px (vs ~5,000px homepage)

### Page Structure
1. **Compact Hero** (40vh) - Restaurant-specific headline and image
2. **Pain Points Grid** - 3 challenges in 1-row or 3-column grid
3. **Solution/Features** - 3 value props + product-in-use image
4. **Product Showcase** - 3 tortilla products with add-to-cart
5. **Trust Signals** - 2x3 grid of credibility points
6. **Testimonials** - 2 customer quotes
7. **Final CTA** - Strong call-to-action with scroll to products

### Components Created
```
/components/layout/CompactHeader.tsx       - Slimmer header with negative margin logo
/components/restaurant/RestaurantHero.tsx  - 40vh compact hero
/components/restaurant/PainPointGrid.tsx   - Problem section
/components/restaurant/FeatureGrid.tsx     - Solution with image
/components/restaurant/TrustSignalsGrid.tsx - 2x3 credibility grid
/components/restaurant/TestimonialSection.tsx - Customer quotes
/components/restaurant/FinalCTA.tsx        - Bottom call-to-action
```

### Configuration Files
```
/lib/restaurant-content.ts   - All copy for 7 landing pages
/lib/email-campaigns.ts      - Email templates with subject line variations
/lib/openrouter.ts          - Image generation utilities
```

### Routes
```
/app/restaurants/[type]/page.tsx - Dynamic route with SEO metadata
```

## Image Generation

### Prerequisites
1. Get OpenRouter API key from https://openrouter.ai/keys
2. Add to `.env.local`:
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
   ```

### Generate All Images
Run the image generation script to create 21 images (3 per restaurant type):

```bash
OPENROUTER_API_KEY=sk-or-v1-... npx tsx scripts/generate-restaurant-images.ts
```

This will create:
- **Hero images** (1792x1024): Restaurant environment with tortillas
- **Product in use** (1024x1024): Dishes being made with H-E-B tortillas
- **Trust/credibility** (1024x1024): Quality, authenticity, Texas heritage

Images saved to: `public/images/restaurants/`

### Image Naming Convention
```
{restaurant-type}-hero.png
{restaurant-type}-product-in-use.png
{restaurant-type}-trust.png
```

Example:
```
food-trucks-hero.png
food-trucks-product-in-use.png
food-trucks-trust.png
```

## Testing Locally

### Start Development Server
```bash
npm run dev
```

### Test URLs
- http://localhost:3000/restaurants/food-trucks
- http://localhost:3000/restaurants/bbq
- http://localhost:3000/restaurants/mexican
- http://localhost:3000/restaurants/tex-mex
- http://localhost:3000/restaurants/taco-shops
- http://localhost:3000/restaurants/catering
- http://localhost:3000/restaurants/breakfast

### What to Test
- [x] Compact header with logo extending outside margin
- [x] Hero section (40vh, not full screen)
- [x] All copy displays correctly for each restaurant type
- [x] Pain points section (3 items)
- [x] Features section with side-by-side layout
- [x] Product cards with add-to-cart functionality
- [x] Cart sidebar opens when adding products
- [x] Trust signals grid (2x3 layout)
- [x] Testimonials section (2 quotes)
- [x] Final CTA scrolls to products section
- [x] Mobile responsiveness
- [x] Footer and disclaimer banner

## Email Campaigns

### Access Email Templates
```typescript
import { getEmailCampaign, generateEmailHTML } from '@/lib/email-campaigns';

const campaign = getEmailCampaign('food-trucks');
const html = generateEmailHTML(campaign, 'direct'); // or 'curiosity' or 'urgency'
```

### Subject Line Variations (A/B Testing)
Each restaurant type has 3 subject line options:
- **Direct**: Straightforward benefit ("Your Secret Weapon for Perfect Tacos")
- **Curiosity**: Intrigue-based ("What top Texas food trucks know about tortillas")
- **Urgency**: Time/action-focused ("Ready to up your game? H-E-B tortillas delivered")

### Email Components
- Hook (pain point intro)
- 3 pain points (bulleted)
- Solution paragraph
- 4 proof points (benefits)
- CTA linking to landing page
- Professional footer with disclaimer

## SEO & Metadata

### Implemented
- [x] Unique meta titles and descriptions per restaurant type
- [x] OpenGraph tags for social sharing
- [x] Structured data (JSON-LD) for search engines
- [x] Semantic HTML structure
- [x] Optimized keywords per page
- [x] Image alt tags

### Example Metadata
```typescript
{
  title: 'Premium H-E-B Tortillas for Food Trucks | Lonestar Tortillas',
  description: 'Elevate your food truck menu with authentic H-E-B tortillas...',
  keywords: ['food truck tortillas', 'HEB tortillas wholesale', ...],
}
```

## Content Strategy

### "Up Your Game" Theme
- Headline: "{Restaurant Type}, Ready to Up Your Game?"
- Subhead: "H-E-B® Tortillas Are Your Edge"
- Focus: Competitive advantage, quality differentiation

### Pain Point → Solution Framework
1. Identify 3 specific pain points for each restaurant type
2. Present H-E-B tortillas as the solution
3. Provide social proof and trust signals
4. Clear path to purchase

### Restaurant-Specific Messaging
- **Food Trucks**: Speed, consistency, customer satisfaction
- **BBQ**: Authentic Texas experience, brisket taco complement
- **Mexican**: Authenticity, traditional flavor profiles
- **Tex-Mex**: Versatility, fajita-ready, volume
- **Taco Shops**: Core product quality, differentiation
- **Catering**: Reliability, bulk availability, crowd-pleasers
- **Breakfast/Brunch**: Breakfast taco perfection, morning rush readiness

## Deployment Checklist

### Pre-Launch
- [ ] Generate all 21 images using OpenRouter script
- [ ] Review all images for quality and relevance
- [ ] Test all 7 landing pages on mobile and desktop
- [ ] Verify cart functionality on each page
- [ ] Check SEO metadata in page source
- [ ] Test email templates in email client
- [ ] Validate all internal links

### Launch
- [ ] Build production: `npm run build`
- [ ] Deploy to hosting platform
- [ ] Verify all routes are accessible
- [ ] Submit sitemap to Google Search Console
- [ ] Set up email campaign in marketing platform
- [ ] Test conversion tracking

### Post-Launch
- [ ] Monitor analytics for each restaurant type
- [ ] A/B test email subject lines
- [ ] Track conversion rates by source
- [ ] Collect customer feedback
- [ ] Optimize based on performance data

## Performance Targets

### Page Speed
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1

### Conversion Goals
- Email open rate: > 25%
- Email click-through rate: > 5%
- Landing page bounce rate: < 60%
- Add-to-cart rate: > 10%
- Checkout completion: > 3%

## Customization

### Add New Restaurant Type
1. Add entry to `/lib/restaurant-content.ts`
2. Add entry to `/lib/email-campaigns.ts`
3. Generate 3 images for new type
4. Test new route: `/restaurants/{new-type}`
5. Build and deploy

### Modify Existing Content
Edit `/lib/restaurant-content.ts` - all changes propagate automatically to:
- Landing page hero, pain points, features, testimonials, CTA
- SEO metadata
- No code changes needed

### Update Email Templates
Edit `/lib/email-campaigns.ts` - modify:
- Subject lines
- Body copy
- Proof points
- CTA text and links

## Troubleshooting

### Images Not Loading
1. Verify images exist in `public/images/restaurants/`
2. Check image naming matches config (e.g., `food-trucks-hero.png`)
3. Run image generation script if missing
4. Check Next.js console for 404 errors

### Cart Not Opening
1. Verify `useCart` context is available
2. Check `CompactHeader` is imported correctly
3. Test cart sidebar component separately
4. Check browser console for JavaScript errors

### Email Templates Not Rendering
1. Verify email client supports HTML emails
2. Test in multiple clients (Gmail, Outlook, Apple Mail)
3. Use inline CSS (already implemented)
4. Check for broken image links

## File Structure
```
/app/restaurants/[type]/
  └── page.tsx                    # Dynamic route page

/components/layout/
  └── CompactHeader.tsx           # Slimmer header

/components/restaurant/
  ├── RestaurantHero.tsx
  ├── PainPointGrid.tsx
  ├── FeatureGrid.tsx
  ├── TrustSignalsGrid.tsx
  ├── TestimonialSection.tsx
  └── FinalCTA.tsx

/lib/
  ├── restaurant-content.ts       # Landing page copy
  ├── email-campaigns.ts          # Email templates
  └── openrouter.ts              # Image generation

/scripts/
  └── generate-restaurant-images.ts

/public/images/restaurants/
  ├── food-trucks-hero.png
  ├── food-trucks-product-in-use.png
  ├── food-trucks-trust.png
  ├── bbq-hero.png
  └── ... (21 total images)
```

## Support

For questions or issues:
1. Check this documentation
2. Review Next.js console for errors
3. Test in incognito mode (clear cache)
4. Verify environment variables are set
5. Check git status for uncommitted changes

## Next Steps

1. **Generate Images**: Run OpenRouter script with your API key
2. **Test Locally**: Visit all 7 landing pages and test cart flow
3. **Review Copy**: Check all messaging for your brand voice
4. **Set Up Email**: Import templates to your email platform
5. **Deploy**: Build and deploy when ready
6. **Launch Campaign**: Send emails with landing page links
7. **Monitor**: Track performance and optimize

---

Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.
Campaign theme: "Ready to Up Your Game?"
