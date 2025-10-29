# Lonestar Tortillas E-Commerce Codebase Analysis

**Generated**: 2025-10-26  
**Analysis Depth**: Medium Thoroughness  
**Project**: Lonestar Tortillas DTC E-Commerce Platform  
**Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Stripe, Prisma, Resend

---

## 1. Current Project Structure (Next.js App Router Layout)

### Root Directory
```
/Users/matthewrundle/Documents/Lonestar/lonestartorts/
├── app/                          # Next.js 14 App Router
├── components/                   # React components
├── lib/                          # Utility functions and helpers
├── prisma/                       # Database schema
├── public/                       # Static assets
├── hooks/                        # Custom React hooks
├── package.json                  # Dependencies
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── .env.local                   # Environment variables (local)
```

### App Directory Structure
```
app/
├── layout.tsx                   # Root layout with metadata & SEO
├── page.tsx                     # Homepage (pre-sale landing)
├── globals.css                  # Global styles
├── loading.tsx                  # Loading UI
│
├── api/
│   ├── checkout/route.ts        # Stripe checkout session creation
│   ├── webhook/route.ts         # Stripe webhook handler
│   ├── waitlist/route.ts        # Pre-sale waitlist signup
│   ├── admin/                   # Admin endpoints
│   └── generate-image/          # Image generation
│
├── products/                    # Product category pages
│   ├── corn-tortillas/page.tsx
│   ├── flour-tortillas/page.tsx
│   ├── butter-tortillas/page.tsx
│   └── specialty-tortillas/page.tsx
│
├── pre-sale/page.tsx           # Pre-sale registration page
├── shop/page.tsx               # Redirects to pre-sale
├── track/page.tsx              # Order tracking page
├── success/page.tsx            # Post-purchase success page
│
├── guides/                     # Educational content (14 pages)
├── recipes/                    # Recipe pages (14 pages)
├── blog/                       # Blog articles (3 pages)
└── story/                      # Brand story pages
```

---

## 2. Existing Components and Organization

### Component Directory Structure
```
components/
├── Analytics.tsx               # Google Analytics integration
├── BackgroundMusic.tsx         # Audio player component
├── Breadcrumbs.tsx            # Navigation breadcrumbs
├── DisclaimerBanner.tsx       # H-E-B® compliance disclaimer
├── GoogleTagManager.tsx       # GTM integration
├── GuideCard.tsx              # Guide/article card component
├── HeroInteractions.tsx       # Interactive hero elements
├── RecipeCard.tsx             # Recipe display card
├── ResourcesDropdown.tsx      # Resources navigation dropdown
├── ScrollAnimations.tsx       # Scroll-triggered animations
├── SEO.tsx                    # SEO metadata component
├── TrackedButton.tsx          # Button with GA tracking
├── TrackedLink.tsx            # Link with GA tracking
│
├── layout/
│   └── DisclaimerBanner.tsx   # Header disclaimer
│
├── product/
│   └── ProductCard.tsx        # Product display card
│
├── ui/
│   ├── AnimatedSection.tsx    # Framer Motion wrapper
│   ├── badge.tsx              # Badge component
│   ├── button.tsx             # Button component
│   ├── Icons.tsx              # Icon library
│   ├── LoadingScreen.tsx      # Loading state UI
│   └── Logo.tsx               # Logo component (animated)
│
└── seo/
    └── WebVitalsMonitor.tsx   # Performance monitoring
```

### Key Component: ProductCard.tsx
**Location**: `/components/product/ProductCard.tsx`

```typescript
interface ProductCardProps {
  sku: string;
  name: string;
  price: number;
  image: string;
  description: string;
  storage: 'shelf_stable' | 'refrigerated';
  onAddToOrder: (sku: string) => void;
}
```

**Features**:
- Responsive image with hover zoom
- Storage type label (Shelf Stable/Refrigerated)
- "Add to Order" overlay button
- Price display with `formatPrice()` utility

**Note**: Currently calls `onAddToOrder()` callback but no cart implementation exists yet.

---

## 3. Stripe Checkout Implementation

### File: `/app/api/checkout/route.ts`

**Current State**: Basic implementation ready

**Product Catalog** (hardcoded):
```typescript
const productCatalog = {
  'TTC-MT-CORN-SS': {
    name: 'Mi Tienda-style Corn Tortillas (Shelf-Stable)',
    price: 499, // $4.99 (in cents)
  },
  'TTC-BUTTER-FLOUR': {
    name: 'Butter Flour Tortillas (Family Pack)',
    price: 599, // $5.99 (in cents)
  },
};
```

**Checkout Flow**:
1. Receives POST request with `{ items: [{ sku, quantity }] }`
2. Validates SKUs against catalog
3. Creates Stripe checkout session with:
   - Line items for products
   - Fixed $7.99 shipping cost
   - 2-3 day delivery estimate
   - US-only shipping (zip code validation)
   - Custom metadata with compliance disclaimer

**Important Notes**:
- Shipping is added as a line item (not calculated)
- Success/cancel URLs redirect with session_id
- No tax calculation currently implemented
- No dynamic product pricing based on quantity discounts

**Issues to Address**:
- Product catalog is hardcoded (should be database-driven)
- Shipping cost is fixed (should be calculated)
- No support for product variants or options
- No inventory tracking

---

## 4. Webhook Handler Implementation

### File: `/app/api/webhook/route.ts`

**Current State**: Partial implementation

**POST Handler** (Stripe webhook processing):
```typescript
// Processes:
- checkout.session.completed: Creates order record
- payment_intent.payment_failed: Logs failure

// Creates order with:
{
  id: session.id,
  customerEmail: session.customer_details?.email,
  customerName: session.customer_details?.name,
  shippingAddress: session.shipping_details?.address,
  amountTotal: session.amount_total,
  status: 'confirmed',
  createdAt: timestamp
}
```

**GET Handler** (Order tracking):
- Accepts `?id=<orderId>` query parameter
- Returns order details or 404 if not found

**Critical Issues**:
- Orders stored in-memory Map (not in database!)
- Will lose data on server restart
- No email notifications sent
- No fulfillment integration
- Signature verification implemented but minimal error handling

**Migration Path**: Must update to use Prisma for persistent storage

---

## 5. Prisma Schema Analysis

### File: `/prisma/schema.prisma`

**Database**: PostgreSQL

**Key Models**:

#### WaitlistEntry
```typescript
model WaitlistEntry {
  id               String    @id @default(cuid())
  email            String    @unique
  name             String?
  zipCode          String?
  
  // Product interests (boolean flags)
  interestCorn     Boolean   @default(false)
  interestButter   Boolean   @default(false)
  interestFlour    Boolean   @default(false)
  interestVariety  Boolean   @default(false)
  
  expectedQuantity String?   // "1-2", "3-5", "6-10", "10+"
  
  // Tracking fields (UTM parameters)
  source           String?   // utm_source
  medium           String?   // utm_medium
  campaign         String?   // utm_campaign
  referrer         String?
  
  // Status
  verified         Boolean   @default(false)
  unsubscribed     Boolean   @default(false)
  
  // Timestamps
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  
  // Relations
  notes            Note[]
  emailLogs        EmailLog[]
  
  // Indexes for performance
  @@index([email])
  @@index([createdAt])
  @@index([zipCode])
}
```

#### Order (Most Important)
```typescript
model Order {
  id               String    @id @default(cuid())
  orderNumber      String    @unique
  email            String
  
  // Customer details
  customerName     String
  shippingAddress  Json      // Structured address data
  billingAddress   Json
  
  // Order details
  items            Json      // Array of { sku, quantity, price }
  subtotal         Int       // In cents
  shipping         Int       // In cents
  tax              Int       // In cents
  total            Int       // In cents
  
  // Payment
  stripePaymentId  String?   // Stripe charge/payment ID
  paymentStatus    PaymentStatus @default(PENDING)
  
  // Fulfillment
  status           OrderStatus   @default(PENDING)
  trackingNumber   String?
  carrier          String?   // "UPS", "FedEx", "USPS"
  
  // Timestamps
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  shippedAt        DateTime?
  deliveredAt      DateTime?
  
  // Indexes
  @@index([email])
  @@index([orderNumber])
  @@index([status])
}
```

**Enums**:
- `PaymentStatus`: PENDING, PROCESSING, SUCCEEDED, FAILED, REFUNDED
- `OrderStatus`: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED

#### Additional Models
- **User**: Admin user management (SUPER_ADMIN, ADMIN, VIEWER roles)
- **Session**: Session tokens for admin authentication
- **Note**: Comments on waitlist entries
- **EmailLog**: Email activity tracking (WELCOME, UPDATE, LAUNCH, MARKETING)

**Schema Strengths**:
- Well-designed for pre-sale and order tracking
- Proper relationships and indexing
- Good separation of concerns
- Email activity logging

**Schema Gaps for Cart**:
- No Product catalog table
- No CartItem model
- No inventory tracking
- No product variants/options
- Items stored as JSON (not normalized)

---

## 6. Current Product Data Structure

### Pre-Sale Waitlist Page (`/app/pre-sale/page.tsx`)

**Current Products** (from form):
```typescript
interests = {
  corn: false,
  butter: false,
  flour: false,
  variety: false,
}

expectedQuantity = "1-2" | "3-5" | "6-10" | "10+"
```

### Checkout API Products

**Hardcoded Catalog**:
```typescript
{
  'TTC-MT-CORN-SS': { name: '...', price: 499 },
  'TTC-BUTTER-FLOUR': { name: '...', price: 599 }
}
```

### Product Pages (Category Pages)

**Corn Tortillas Page** (`/products/corn-tortillas/page.tsx`):
- Server-rendered static product information
- Includes JSON-LD schema for SEO
- Product metadata: size, quantity, weight, storage, nutrition
- No dynamic pricing or inventory
- Pre-order buttons link to `/pre-sale`

**Other Product Pages**:
- Flour Tortillas
- Butter Tortillas
- Specialty Tortillas

**Product Information Stored In**:
- Page metadata (title, description)
- JSON-LD schema (Product, BreadcrumbList, FAQPage)
- Hardcoded in component text and structured data

**Gap**: No centralized product database or API

---

## 7. State Management and Context Providers

### Current State Management

**No Existing Cart/Redux/Zustand Implementation Found**

#### What Currently Exists:

1. **Client-Side Component State** (React `useState`)
   - Used in `/app/pre-sale/page.tsx` for form handling
   - Temporary local state only, not shared

2. **Google Analytics Tracking**
   - File: `/lib/analytics.ts`
   - Functions: `trackAddToCart()`, `trackBeginCheckout()`, `trackPurchase()`
   - Integrated with window.gtag()
   - Type-safe event definitions

3. **No Context Providers**
   - Layout doesn't have any context wrappers
   - No Apollo, React Query, or SWR
   - No authentication context

### Analytics Module (`/lib/analytics.ts`)

**Available Functions**:
```typescript
// E-commerce tracking
trackAddToCart(product)           // GA: add_to_cart event
trackBeginCheckout(value, items)  // GA: begin_checkout event
trackPurchase(...)                // GA: purchase event
trackViewProduct(product)         // GA: view_item event

// General tracking
event(action, category, label, value)    // Custom events
pageview(url)                             // Page views
trackFormSubmission(formName)             // Form submissions
trackSearch(searchTerm)                   // Search tracking
trackCTAClick(buttonName, location)       // CTA clicks
trackOutboundLink(url)                    // External links
```

**Integration Point**: Already configured to handle cart operations tracking

---

## 8. Pre-Sale Waitlist Implementation

### Waitlist Page (`/app/pre-sale/page.tsx`)

**Status**: Fully functional pre-sale registration

**Form Fields**:
- Email (required, unique)
- Name (optional)
- ZIP Code (optional)
- Product Interests (4 checkboxes)
- Expected Monthly Orders (dropdown)

**Form State Management**:
```typescript
const [email, setEmail] = useState('')
const [name, setName] = useState('')
const [zipCode, setZipCode] = useState('')
const [interests, setInterests] = useState({
  corn: false,
  butter: false,
  flour: false,
  variety: false,
})
const [quantity, setQuantity] = useState('1-2')
const [isSubmitting, setIsSubmitting] = useState(false)
const [submitted, setSubmitted] = useState(false)
const [error, setError] = useState('')
const [signupCount, setSignupCount] = useState(247) // Seeded count
```

**Submission Handler**:
1. POST to `/api/waitlist` with form data
2. Returns success response with waitlist position
3. Shows success message with social share options
4. Increments visible signup counter
5. Tracks GA events:
   - `trackFormSubmission('Waitlist Signup')`
   - Custom event with product interests

### Waitlist API (`/app/api/waitlist/route.ts`)

**POST Handler**:

1. **Validation**:
   - Email required and valid
   - Check for duplicates (unique constraint)

2. **Data Capture**:
   - Stores in `WaitlistEntry` Prisma model
   - Captures UTM parameters
   - Captures HTTP referer
   - Logs product interests as booleans

3. **Email Notifications**:
   - **User Welcome Email**: Sent via Resend
     - Confirms signup
     - Shows waitlist position
     - Lists selected interests
     - Sets expectations
   
   - **Admin Notification**: Sent to `ADMIN_EMAIL`
     - New signup alert
     - Contact information
     - Product interests
     - Total signup count
     - UTM source data

4. **Database Logging**:
   - Creates `EmailLog` entries for tracking
   - Records email type (WELCOME)
   - Tracks success/failure status

**GET Handler** (Admin stats):
- Requires bearer token auth
- Returns:
  ```typescript
  {
    total: number,
    recentSignups: WaitlistEntry[],
    productInterest: { corn, butter, flour, variety },
    quantityDistribution: { "1-2": X, "3-5": Y, ... },
    dailySignups: { "2025-10-20": 15, ... }
  }
  ```

**Issues/Gaps**:
- No unsubscribe mechanism
- No email verification
- No verification codes
- No campaign tracking for launch emails
- Limited filtering/querying capabilities

---

## 9. Additional Implementation Details

### Layout and Metadata (`/app/layout.tsx`)

**SEO Features**:
- Comprehensive metadata (title, description, keywords)
- Open Graph and Twitter Card configuration
- JSON-LD structured data (Organization + Product schema)
- Geo-targeting meta tags
- Google Search Console validation

**Tracking Integration**:
- Google Tag Manager implementation
- Google Analytics 4 setup
- Custom events support
- No-script fallback

**Font Loading**:
- Inter (sans-serif, 400/600/700)
- Playfair Display (serif, 400/700/900)
- Optimized font loading with Next.js

**Global Styles**:
- Tailwind CSS (26KB in globals.css)
- Custom color utilities (sunset, masa, charcoal, cream)
- Animation classes
- Print styles

### Custom Hooks (`/hooks/`)

**useLenis.ts**:
- Smooth scrolling library integration
- Automatic initialization on mount
- Cleanup on unmount

**useScrollAnimation.ts**:
- Scroll trigger animations
- Intersection Observer based

### Utilities (`/lib/`)

**analytics.ts**: Event tracking (covered above)

**utils.ts**:
```typescript
cn()            // Classname merger (clsx + tailwind-merge)
formatPrice()   // Currency formatter (USD)
```

**prisma.ts**:
```typescript
// Singleton pattern for Prisma client
export const prisma = global.prisma || new PrismaClient()
```

### Utilities for Image Generation

**lib/image-generation.ts**: 11KB utility for AI image generation
- Integrates with external image generation API
- Supports product image creation

---

## 10. Key Environment Variables

```env
# Stripe
STRIPE_SECRET_KEY=                          # Server-side only
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=         # Client-side
STRIPE_WEBHOOK_SECRET=                      # Webhook validation

# Database
DATABASE_URL=postgresql://...               # Prisma connection

# Email
RESEND_API_KEY=                             # Resend email service
ADMIN_EMAIL=                                # Admin notification email

# Admin Authentication
ADMIN_TOKEN=                                # Bearer token for admin endpoints

# Configuration
ALLOW_REFRIGERATED=false                    # H-E-B compliance
NEXT_PUBLIC_BASE_URL=http://localhost:3000 # App URL for redirects
NEXT_PUBLIC_ENABLE_ANALYTICS=true          # GA/GTM toggle
NEXT_PUBLIC_GA_MEASUREMENT_ID=              # GA4 ID
```

---

## 11. Design System & Colors

**Tailwind Configuration** uses custom colors:

```
- cream (light background): 50-950
- sunset (primary, orange): 500-600
- masa (corn yellow): 200-600
- rust (accent): browns/oranges
- charcoal (dark text): 950 primary
```

**Fonts**:
- Display: Playfair Display (serif)
- Body: Inter (sans-serif)

---

## 12. Integration Points Ready for Cart

### What's Already Connected:

1. **Analytics Ready**: `trackAddToCart()`, `trackBeginCheckout()` functions exist
2. **Checkout API**: `/api/checkout` expects `{ items: [{ sku, quantity }] }`
3. **Webhook Handler**: Ready to process Stripe sessions
4. **Success Page**: Configured to fetch and display order details
5. **Product Cards**: Have `onAddToOrder()` callback ready
6. **Order Model**: Designed to store cart items as JSON
7. **Database**: Connected and ready for orders

### What Needs to Be Built:

1. **Cart State Management**: No provider/store exists
2. **Cart UI Component**: No cart sidebar/modal
3. **Product Catalog Service**: Products hardcoded, no API
4. **Product Detail Pages**: No ability to select quantities/variants
5. **Checkout Page**: No dedicated checkout flow
6. **Cart Persistence**: No localStorage/session storage
7. **Inventory Management**: No stock tracking

---

## 13. Technology Stack Summary

**Frontend**:
- React 18.3.1
- Next.js 14.2.21 (App Router)
- TypeScript 5.7.3
- Tailwind CSS 3.4.0
- Framer Motion 11.14.0
- Radix UI components

**Backend**:
- Next.js API Routes
- Node.js runtime
- Stripe API integration
- Resend email service

**Database**:
- PostgreSQL
- Prisma ORM 5.22.0

**DevTools**:
- ESLint
- Playwright (E2E testing)
- Lighthouse (performance)

**Deployment**:
- Vercel (configured via vercel.json)
- Next.js Sitemap generation

---

## 14. Compliance & Branding

### H-E-B® Compliance
- Mandatory disclaimer: "Independent reseller. Not affiliated with or endorsed by H-E-B®."
- No H-E-B logos or visual assets
- Appears in:
  - DisclaimerBanner component
  - Footer of pages
  - Success page
  - Email templates

### Brand Voice
- Warm, Texas-focused
- Educational about tortilla quality
- Community-oriented
- Premium positioning

---

## Summary for Cart Integration

**Ready**: API routes, database schema, analytics, checkout flow  
**Partial**: Product data (hardcoded, needs API), order management (in-memory, needs DB)  
**Missing**: Cart state management, cart UI, product catalog service, inventory  

**Recommended Next Steps**:
1. Create CartContext or Zustand store
2. Build cart UI components (sidebar, drawer)
3. Implement product catalog API
4. Migrate webhook orders to Prisma
5. Add inventory tracking
6. Implement persistent storage (localStorage/Redis)

