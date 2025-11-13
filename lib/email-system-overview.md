# Lonestar Tortillas Email System

## Overview
Complete email marketing and transactional system for B2B tortilla sales.

## File Structure

### 1. **marketing-templates.ts** (Existing)
- 4 HTML marketing emails (BBQ, Mexican, Restaurant, Food Truck)
- 2 transactional emails (Order Confirmation, Order Shipped)
- Rich HTML with inline CSS for email client compatibility
- **Status**: Needs design enhancement (Phase 1-4 from original spec)

### 2. **cold-emails.ts** (NEW)
- 4 plain-text cold outreach emails
- Direct, conversational tone
- Minimal formatting for high deliverability
- Easy to personalize with [PLACEHOLDERS]

#### Cold Email Categories:
- **BBQ**: Focus on durability, portion handling
- **Mexican**: Focus on authenticity, traditional process
- **Restaurant**: Focus on quality, consistency
- **Food Truck**: Focus on durability, reliability

### 3. **transactional-emails-texas.ts** (NEW)
- Texas-flavored order confirmation
- Texas-flavored shipping notification
- Enhanced typography and color palette
- "Yee-haw" personality while staying professional
- Gradient backgrounds, elevated design

### 4. **nurture-flow.ts** (NEW)
- 90-day email sequence (40 emails)
- 3 emails per week (M/W/F pattern)
- Mix of education, social proof, offers, stories

#### Nurture Flow Breakdown:
- **Week 1-3**: Education & problem awareness (9 emails)
- **Week 4**: First soft offer (3 emails)
- **Week 5-6**: More education & social proof (6 emails)
- **Week 7-8**: Product focus & second offer (6 emails)
- **Week 9-10**: Community & urgency building (6 emails)
- **Week 11-12**: Re-engagement & final push (6 emails)
- **Week 13**: Last chance sequence (4 emails)

#### Email Types Distribution:
- Education: 12 emails
- Social Proof: 8 emails
- Offers: 8 emails
- Product: 4 emails
- Story: 4 emails
- CTA: 4 emails

## Usage

### Cold Emails
```typescript
import { COLD_EMAIL_TEMPLATES, replaceColdEmailPlaceholders } from '@/lib/cold-emails';

const bbqEmail = COLD_EMAIL_TEMPLATES.find(t => t.category === 'bbq');
const personalized = replaceColdEmailPlaceholders(bbqEmail.body, {
  firstName: 'Mike',
  restaurantName: 'Smokin\' Oak BBQ'
});
```

### Transactional Emails
```typescript
import { TEXAS_ORDER_CONFIRMATION, TEXAS_ORDER_SHIPPED } from '@/lib/transactional-emails-texas';

// Replace placeholders:
// - ORDER_NUMBER, ORDER_DATE, TOTAL_AMOUNT
// - TRACKING_NUMBER, TRACKING_URL, CARRIER_NAME, DELIVERY_DATE
// - CUSTOMER_NAME, SHIPPING_ADDRESS_*
```

### Nurture Flow
```typescript
import { NURTURE_FLOW, getEmailsByWeek, getNurtureStats } from '@/lib/nurture-flow';

// Get all emails for week 4
const week4Emails = getEmailsByWeek(4);

// Get stats
const stats = getNurtureStats();
console.log(`Total: ${stats.totalEmails} over ${stats.duration} days`);
```

## Implementation Priorities

### Phase 1: Cold Emails (Ready Now)
- ✅ 4 plain-text cold emails created
- Import into CRM or email tool
- Set up personalization fields
- Start outreach immediately

### Phase 2: Texas Transactional Emails (Ready Now)
- ✅ Enhanced order confirmation
- ✅ Enhanced shipping notification
- Replace existing transactional templates
- Update email service integration

### Phase 3: Marketing HTML Enhancement (TODO)
- Apply Phase 1-4 design enhancements to marketing-templates.ts
- New typography (Georgia/Helvetica Neue)
- Unified color palette (Texas amber theme)
- Elevated components (gradient buttons, shadow cards)
- Gradient backgrounds

### Phase 4: Nurture Flow Implementation (Later)
- ✅ 40-email sequence designed
- TODO: Write full HTML/text for each email
- TODO: Set up automation in ESP (Resend, Mailchimp, etc.)
- TODO: Create segmentation logic
- TODO: Set up tracking and analytics

## Technical Notes

### Email Client Compatibility
- All HTML uses table-based layouts (not CSS Grid/Flexbox)
- Inline CSS only (no external stylesheets)
- No JavaScript
- Fallback fonts specified
- Gradient support with solid color fallbacks for Outlook

### Color Palette (Texas Heritage)
- Primary: `#d97706` (Texas amber)
- Primary Dark: `#92400e` (burnt orange)
- Primary Light: `#fef3c7` (light amber)
- Secondary: `#1c1917` (deep charcoal)
- Secondary Light: `#78716c` (muted gray)
- Success: `#10b981` (green for transactional)
- Background: `#f5f5f4` (warm off-white)
- Border: `#e7e5e4` (subtle warm gray)

### Typography
- Headers: `Georgia, 'Palatino Linotype', Palatino, serif`
- Body: `'Helvetica Neue', Helvetica, Arial, sans-serif`
- Scale: H1 (28-36px), H2 (22px), H3 (18px), Body (16px), Small (14px), Tiny (12px)
- Letter-spacing: Headers (-0.01em to -0.02em), Labels (0.08em)

## Metrics to Track

### Cold Emails
- Reply rate
- Meeting booking rate
- Sample request rate
- Unsubscribe rate

### Transactional
- Open rate (should be 80%+)
- Click-through on tracking links
- Support inquiry rate

### Nurture Flow
- Open rate by email position
- Click-through rate
- Conversion by week
- Unsubscribe points
- Offer performance

## Next Steps

1. **Immediate**: Deploy cold emails and Texas transactional templates
2. **This Week**: Enhance marketing HTML templates (Phase 1-4)
3. **Next Month**: Write full nurture flow emails
4. **Ongoing**: A/B test, optimize, refine based on metrics
