# Google Tag Manager & GA4 Setup Guide
## Lonestar Tortillas Analytics Configuration

**Status:** ✅ Code Implementation Complete | ⏳ Configuration Needed

---

## 🎯 Overview

Your website already has **complete GTM and GA4 tracking implemented**. You just need to configure the environment variables with your tracking IDs.

### What's Already Implemented

✅ **Google Tag Manager (GTM)**
- GTM container script in head
- NoScript fallback for non-JS browsers
- dataLayer initialization

✅ **Google Analytics 4 (GA4)**
- GA4 tracking script
- Automatic page view tracking
- Custom event tracking

✅ **Comprehensive Event Tracking**
- E-commerce events (add_to_cart, begin_checkout, purchase)
- Product view tracking
- Form submission tracking
- CTA click tracking
- Outbound link tracking
- Search query tracking

---

## 📋 Setup Steps

### Step 1: Create Google Tag Manager Account

1. Go to https://tagmanager.google.com
2. Click "Create Account"
3. **Account Name:** Lonestar Tortillas
4. **Container Name:** lonestartortillas.com
5. **Target Platform:** Web
6. Click "Create"
7. **Copy your GTM ID** (format: `GTM-XXXXXXX`)

### Step 2: Create Google Analytics 4 Property

1. Go to https://analytics.google.com
2. Click "Admin" (gear icon in bottom left)
3. Click "Create Property"
4. **Property Name:** Lonestar Tortillas
5. **Reporting Time Zone:** Your timezone
6. **Currency:** USD
7. Click "Next" and complete setup wizard
8. Select "Web" platform
9. **Website URL:** https://lonestartortillas.com
10. **Stream name:** Lonestar Tortillas Web
11. Click "Create Stream"
12. **Copy your Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Link GA4 to GTM (Recommended)

1. In GTM, click "Add a new tag"
2. **Tag Type:** Google Analytics: GA4 Configuration
3. **Measurement ID:** Paste your GA4 Measurement ID
4. **Triggering:** All Pages
5. Click "Save"
6. Click "Submit" → "Publish"

### Step 4: Configure Environment Variables

Add these variables to `/lonestartorts/.env.local`:

```bash
# Analytics & Tracking
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

**Replace:**
- `G-XXXXXXXXXX` with your actual GA4 Measurement ID
- `GTM-XXXXXXX` with your actual GTM Container ID

### Step 5: Restart Development Server

```bash
npm run dev
```

### Step 6: Verify Installation

1. **Test Locally:**
   - Open your site in browser
   - Open browser DevTools → Console
   - You should see GTM loading messages
   - Check Network tab for:
     - `gtm.js` requests
     - `analytics.js` or `gtag/js` requests

2. **GTM Preview Mode:**
   - In GTM, click "Preview"
   - Enter your site URL
   - Verify tags are firing

3. **GA4 Real-Time Reports:**
   - Go to GA4 → Reports → Realtime
   - Browse your site
   - You should see yourself as an active user

---

## 🎨 Implemented Events

### Automatic Events
✅ Page views (tracked on every route change)
✅ Scroll depth (GA4 enhanced measurement)
✅ Outbound clicks (GA4 enhanced measurement)
✅ Video engagement (GA4 enhanced measurement)
✅ File downloads (GA4 enhanced measurement)

### Custom E-commerce Events

**Product View:**
```typescript
import { trackViewProduct } from '@/lib/analytics';

trackViewProduct({
  id: 'corn-tortillas-1pack',
  name: 'Corn Tortillas - 1 Pack',
  category: 'Tortillas',
  price: 9.99
});
```

**Add to Cart:**
```typescript
import { trackAddToCart } from '@/lib/analytics';

trackAddToCart({
  id: 'corn-tortillas-1pack',
  name: 'Corn Tortillas - 1 Pack',
  price: 9.99,
  quantity: 2
});
```

**Begin Checkout:**
```typescript
import { trackBeginCheckout } from '@/lib/analytics';

trackBeginCheckout(totalValue, cartItems);
```

**Purchase:**
```typescript
import { trackPurchase } from '@/lib/analytics';

trackPurchase({
  transaction_id: 'ORDER-12345',
  value: 29.99,
  currency: 'USD',
  items: [
    {
      item_id: 'corn-tortillas-1pack',
      item_name: 'Corn Tortillas - 1 Pack',
      quantity: 2,
      price: 9.99
    }
  ]
});
```

### Other Custom Events

**CTA Clicks:**
```typescript
import { trackCTAClick } from '@/lib/analytics';

trackCTAClick('Shop Now', 'Hero Section');
```

**Form Submissions:**
```typescript
import { trackFormSubmission } from '@/lib/analytics';

trackFormSubmission('Newsletter Signup');
```

**Search:**
```typescript
import { trackSearch } from '@/lib/analytics';

trackSearch('breakfast tacos recipe');
```

**Outbound Links:**
```typescript
import { trackOutboundLink } from '@/lib/analytics';

trackOutboundLink('https://external-site.com');
```

---

## 🔍 Recommended GTM Tags to Create

Once GTM is configured, consider adding these tags in GTM:

### 1. Facebook Pixel (if using Facebook Ads)
- Tag Type: Custom HTML
- Trigger: All Pages

### 2. LinkedIn Insight Tag (if using LinkedIn Ads)
- Tag Type: Custom HTML
- Trigger: All Pages

### 3. Conversion Tracking Tags
- Tag Type: Google Ads Conversion Tracking
- Trigger: Purchase event

### 4. Enhanced E-commerce Tracking
- Already implemented via GA4 events!

---

## 🎯 Key Metrics to Track

Once analytics is live, monitor these metrics in GA4:

### Traffic Metrics
- Users (new vs returning)
- Sessions
- Page views
- Bounce rate
- Average session duration

### E-commerce Metrics
- Product views
- Add to cart rate
- Cart abandonment rate
- Transactions
- Revenue
- Average order value

### Content Metrics
- Top landing pages
- Top recipes viewed
- Top guides viewed
- Top blog posts viewed
- Site search queries

### Conversion Metrics
- Checkout initiated
- Checkout completed
- Newsletter signups
- Email clicks
- CTA clicks

---

## 📊 GA4 Reports to Set Up

### Custom Explorations
1. **Recipe Engagement Report**
   - Dimensions: Page path, Page title
   - Metrics: Views, Engaged sessions, Average engagement time
   - Filter: Pages containing `/recipes/`

2. **Product Performance Report**
   - Dimensions: Item name, Item ID
   - Metrics: Item views, Add to cart, Purchases
   - Filter: E-commerce events only

3. **City Landing Page Performance**
   - Dimensions: Page path
   - Metrics: Sessions, Conversions, Revenue
   - Filter: Pages containing city names

### Custom Audiences
1. **Recipe Viewers** - Engaged with 3+ recipes
2. **Cart Abandoners** - Added to cart but didn't purchase
3. **High-Value Customers** - Purchase value > $50

---

## 🚨 Troubleshooting

### Analytics Not Working?

**Check 1: Environment Variables**
```bash
# Verify variables are set
echo $NEXT_PUBLIC_ENABLE_ANALYTICS  # Should output: true
echo $NEXT_PUBLIC_GTM_ID           # Should output: GTM-XXXXXXX
echo $NEXT_PUBLIC_GA_MEASUREMENT_ID # Should output: G-XXXXXXXXXX
```

**Check 2: Browser Console**
- Open DevTools → Console
- Look for GTM initialization messages
- Check for any error messages

**Check 3: Network Tab**
- Open DevTools → Network tab
- Filter by "gtm" or "analytics"
- Should see requests to Google servers

**Check 4: Tag Assistant**
- Install Google Tag Assistant Chrome extension
- Click the extension icon on your site
- Verify GTM and GA4 tags are detected

### Still Not Working?

1. **Clear browser cache** and restart
2. **Check if NEXT_PUBLIC_ENABLE_ANALYTICS is exactly** `"true"` (string, lowercase)
3. **Verify GTM ID format** is `GTM-XXXXXXX` (7 characters after GTM-)
4. **Verify GA4 ID format** is `G-XXXXXXXXXX` (10 characters after G-)
5. **Restart Next.js dev server** after changing .env.local

---

## ✅ Post-Setup Checklist

- [ ] GTM account created and Container ID obtained
- [ ] GA4 property created and Measurement ID obtained
- [ ] GA4 tag configured in GTM (optional but recommended)
- [ ] Environment variables added to `.env.local`
- [ ] Development server restarted
- [ ] GTM tags visible in browser DevTools
- [ ] GA4 real-time reports showing data
- [ ] E-commerce tracking tested with test purchase
- [ ] GTM preview mode verified all tags fire correctly
- [ ] Production environment variables configured in Vercel

---

## 🚀 Production Deployment

Before deploying to production, ensure:

1. **Vercel Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add the same 3 variables:
     - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
     - `NEXT_PUBLIC_GTM_ID`
     - `NEXT_PUBLIC_ENABLE_ANALYTICS=true`
   - Set scope to: Production, Preview, Development

2. **Test in Preview:**
   - Deploy to preview environment
   - Test analytics before production

3. **Monitor After Launch:**
   - Check GA4 real-time reports
   - Verify e-commerce events are tracking
   - Monitor for any JavaScript errors

---

## 📞 Support

If you encounter issues:
- **GA4 Help:** https://support.google.com/analytics
- **GTM Help:** https://support.google.com/tagmanager
- **Next.js Analytics:** https://nextjs.org/docs/app/building-your-application/optimizing/analytics

---

**Generated:** 2025-11-04
**Implementation Status:** Complete - Configuration Required
