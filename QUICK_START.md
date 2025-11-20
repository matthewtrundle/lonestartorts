# Quick Start Guide - Restaurant Landing Pages

## ✅ What's Been Built

### 7 Complete Landing Pages
- `/restaurants/food-trucks` - Food Truck Operators
- `/restaurants/bbq` - BBQ Restaurants
- `/restaurants/mexican` - Mexican Restaurants
- `/restaurants/tex-mex` - Tex-Mex Restaurants
- `/restaurants/taco-shops` - Taco Shops & Taquerias
- `/restaurants/catering` - Catering Companies
- `/restaurants/breakfast` - Breakfast & Brunch Spots

### Key Features
✅ Compact header with logo "exploding" outside margin
✅ 40-50vh hero sections (vs 100vh homepage)
✅ ~60% less vertical space than homepage
✅ Restaurant-specific copy and messaging
✅ Full e-commerce integration with existing cart
✅ SEO metadata + structured data (JSON-LD)
✅ 7 email campaign templates with subject line variations
✅ Mobile-responsive design
✅ TypeScript type-safe

## 🚀 Next Steps

### Step 1: Generate Images (Required)

The pages reference 21 images that need to be generated using OpenRouter's GPT-5 Image Mini.

```bash
# Add your OpenRouter API key to .env.local
echo "OPENROUTER_API_KEY=sk-or-v1-your-key-here" >> .env.local

# Run the image generation script
npx tsx scripts/generate-restaurant-images.ts
```

**You provided the key:** `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`

This will create 21 images (3 per restaurant type):
- Hero images (1792x1024)
- Product-in-use images (1024x1024)
- Trust/credibility images (1024x1024)

### Step 2: Test Locally

```bash
# Start development server
npm run dev

# Visit the pages
open http://localhost:3000/restaurants/food-trucks
open http://localhost:3000/restaurants/bbq
open http://localhost:3000/restaurants/mexican
# ... etc
```

### Step 3: Review & Customize

All copy is in `/lib/restaurant-content.ts` - edit to match your brand voice.

### Step 4: Deploy

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy to your hosting platform
```

## 📧 Email Campaigns

Email templates are ready in `/lib/email-campaigns.ts`

Each has 3 subject line variations for A/B testing:
- **Direct**: "Your Secret Weapon for Perfect Tacos"
- **Curiosity**: "What top Texas food trucks know about tortillas"
- **Urgency**: "Ready to up your game? H-E-B tortillas delivered"

Export as HTML:
```typescript
import { getEmailCampaign, generateEmailHTML } from '@/lib/email-campaigns';

const campaign = getEmailCampaign('food-trucks');
const html = generateEmailHTML(campaign, 'direct');
```

## 🎯 Campaign Flow

1. **Email sent** to target restaurant type
2. **Clicks CTA** → Lands on `/restaurants/{type}`
3. **Sees pain points** they relate to
4. **Reads solution** with H-E-B tortillas
5. **Scrolls to products** → Adds to cart
6. **Checks out** via existing Stripe flow

## 📊 Test Checklist

- [ ] All 7 pages load without errors
- [ ] Images display correctly (after generation)
- [ ] Product cards work + add to cart
- [ ] Cart sidebar opens on add
- [ ] Compact header shows on all pages
- [ ] Mobile responsive on all breakpoints
- [ ] SEO metadata in page source
- [ ] Structured data validates (Google Rich Results Test)

## 🛠️ Customization

### Change Copy
Edit `/lib/restaurant-content.ts` - changes apply automatically

### Change Email Templates
Edit `/lib/email-campaigns.ts`

### Add New Restaurant Type
1. Add to `/lib/restaurant-content.ts`
2. Add to `/lib/email-campaigns.ts`
3. Generate 3 images
4. Done! Route auto-generates

### Modify Design
Components in `/components/restaurant/`

## 📁 Project Structure

```
├── app/restaurants/[type]/page.tsx    # Dynamic route
├── components/
│   ├── layout/CompactHeader.tsx       # Slimmer header
│   └── restaurant/                    # Page sections
│       ├── RestaurantHero.tsx
│       ├── PainPointGrid.tsx
│       ├── FeatureGrid.tsx
│       ├── TrustSignalsGrid.tsx
│       ├── TestimonialSection.tsx
│       └── FinalCTA.tsx
├── lib/
│   ├── restaurant-content.ts          # All page copy
│   ├── email-campaigns.ts             # Email templates
│   └── openrouter.ts                  # Image generation
├── scripts/
│   └── generate-restaurant-images.ts  # Image generator
└── public/images/restaurants/         # Generated images
```

## 🎨 Design Specs

### Spacing Comparison
| Element | Homepage | Restaurant Pages |
|---------|----------|------------------|
| Hero | 100vh | 40-50vh |
| Section padding | py-20 (80px) | py-8 to py-10 (32-40px) |
| Typography | 60-220px | 36-60px |
| Content gaps | gap-12 (48px) | gap-4 to gap-6 (16-24px) |
| **Total height** | **~5,000px** | **~2,150px** |

### Color Palette
- Primary: `sunset-600` (#F15A0E)
- Secondary: `masa-500` (#B58650)
- Dark: `charcoal-950` (#1A1A1A)
- Light: `cream-50` (#FEFDFB)

## 💡 Tips

1. **Image Generation**: Can take 10-15 min for all 21 images (~2-3 min each)
2. **Testing**: Use incognito to avoid cache issues
3. **Mobile**: Test on actual devices, not just DevTools
4. **Email**: Test in multiple clients (Gmail, Outlook, Apple Mail)
5. **SEO**: Submit sitemap after deployment

## 📚 Full Documentation

See `RESTAURANT_PAGES.md` for complete documentation including:
- Detailed component docs
- SEO strategy
- Email campaign best practices
- Deployment checklist
- Performance targets
- Troubleshooting guide

## 🔥 Ready to Launch?

1. ✅ Generate images with OpenRouter
2. ✅ Test all 7 pages locally
3. ✅ Review copy for brand voice
4. ✅ Build for production
5. ✅ Deploy
6. ✅ Send email campaigns
7. ✅ Monitor analytics

---

**Need help?** Check `RESTAURANT_PAGES.md` for troubleshooting.

**Campaign Theme:** "Ready to Up Your Game?"
**Target:** Food trucks, BBQ, Mexican, Tex-Mex, Taco Shops, Catering, Breakfast spots
