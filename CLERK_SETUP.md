# Clerk Authentication Setup Guide

## ✅ What's Already Done

The code integration is complete! Here's what has been implemented:

### 1. Code Changes
- ✅ Installed `@clerk/nextjs` and `svix` packages
- ✅ Created `middleware.ts` to protect `/account/*` and `/admin/*` routes
- ✅ Wrapped app with `<ClerkProvider>` in `app/layout.tsx`
- ✅ Updated Prisma schema with `Customer`, `Address`, and updated `Order` models
- ✅ Created Clerk webhook endpoint at `/api/webhooks/clerk`
- ✅ Added sign-in/sign-up UI to header with `UserButton`
- ✅ Created customer portal pages:
  - `/account` - Dashboard
  - `/account/orders` - Order history
  - `/account/addresses` - Saved addresses
  - `/account/settings` - Clerk UserProfile component

### 2. Database Schema
```prisma
model Customer {
  id            String    @id @default(cuid())
  clerkUserId   String    @unique  // Links to Clerk
  email         String    @unique
  firstName     String?
  lastName      String?
  lastLoginAt   DateTime?
  signupSource  String?
  orders        Order[]
  addresses     Address[]
}

model Address {
  id          String      @id @default(cuid())
  customerId  String
  customer    Customer    @relation(fields: [customerId], references: [id])
  // ... address fields
}

model Order {
  // Added fields:
  customerId  String?
  customer    Customer?   @relation(fields: [customerId], references: [id])
}
```

---

## 🔧 What You Need To Do

### Step 1: Add Environment Variables

Your Clerk API keys have been provided. Add them to `.env.local`:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cHJvZm91bmQtd2FscnVzLTQuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_vqBPJJJqHoUvKDYEWfnLx11AXJlf8a5rI0uBYprRT7
```

### Step 2: Run Database Migration

Once your `DATABASE_URL` is set in `.env.local`, run:

```bash
npx prisma migrate dev --name add_clerk_customer_and_addresses
npx prisma generate
```

This will:
- Create `Customer`, `Address` tables
- Add `customerId` field to `Order` table
- Update database indices

### Step 3: Configure Clerk Webhook

1. Go to your Clerk Dashboard: https://dashboard.clerk.com
2. Navigate to **Webhooks** section
3. Click **Add Endpoint**
4. Enter your webhook URL:
   - **Development**: `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`
   - **Production**: `https://lonestartortillas.com/api/webhooks/clerk`
5. Select these events to subscribe to:
   - `user.created`
   - `user.updated`
   - `user.deleted`
   - `session.created`
6. Copy the **Signing Secret** (starts with `whsec_`)
7. Add to `.env.local`:
   ```bash
   CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

### Step 4: Test the Integration

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Test sign-up flow**:
   - Click the user icon in the header
   - Sign up with a test email
   - Check that a `Customer` record was created in your database

3. **Test protected routes**:
   - Try visiting `/account` while signed out (should redirect)
   - Sign in and visit `/account` (should work)

4. **Test webhook** (optional, for development):
   - Use ngrok: `ngrok http 3000`
   - Update Clerk webhook URL to your ngrok URL
   - Create a new user and verify webhook is called

---

## 📋 Next Steps (Optional)

### Update Checkout Flow to Link Orders

The checkout flow needs to be updated to link orders to customers. Here's what needs to be changed in `app/api/checkout/route.ts` or `app/api/webhook/route.ts`:

```typescript
// When creating an order in the Stripe webhook handler:
import { auth } from '@clerk/nextjs/server';

// Get authenticated user (if signed in)
const { userId } = await auth();

// Find customer by Clerk userId
const customer = userId
  ? await prisma.customer.findUnique({
      where: { clerkUserId: userId }
    })
  : null;

// Create order with customer link
await prisma.order.create({
  data: {
    // ... existing order fields
    customerId: customer?.id || null,  // Links order to customer
    // ... rest of order data
  }
});
```

This allows:
- **Signed-in users**: Orders linked to their account (appear in order history)
- **Guest users**: Orders created without customer link (guest checkout)

---

## 🎯 Features Now Available

### For Customers:
- ✅ Sign up / Sign in with email
- ✅ Social sign-in (Google, etc.) - configure in Clerk Dashboard
- ✅ View order history at `/account/orders`
- ✅ Manage saved addresses at `/account/addresses`
- ✅ Update profile at `/account/settings`
- ✅ Password reset and email verification (handled by Clerk)

### For You:
- ✅ User management in Clerk Dashboard
- ✅ Automatic user sync to database via webhooks
- ✅ Track user login activity
- ✅ User metadata for segmentation (stored in Clerk)
- ✅ Protected routes for authenticated content

---

## 🚨 Important Notes

1. **Guest Checkout**: The current setup still allows guest checkout. Orders without a `customerId` are guest orders.

2. **Webhook Reliability**: Clerk webhooks are powered by Svix and include automatic retries. If webhook delivery fails, you can replay them in the Clerk Dashboard.

3. **Development vs Production**:
   - Use separate Clerk applications for dev and prod
   - Update webhook URLs accordingly
   - Never share API keys between environments

4. **User Deletion**: When a user is deleted from Clerk, the webhook will delete their `Customer` record. Their orders are preserved with `customerId = null`.

---

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk + Next.js Guide](https://clerk.com/docs/nextjs/getting-started/quickstart)
- [Webhook Events Reference](https://clerk.com/docs/guides/development/webhooks/overview)
- [Prisma with Clerk](https://www.prisma.io/docs/guides/other/clerk)

---

## 🎉 You're All Set!

Once you've completed Steps 1-4, your Clerk authentication will be fully functional. Users can create accounts, sign in, and manage their orders and addresses through the customer portal.

If you run into any issues, check:
1. Environment variables are set correctly
2. Database migration completed successfully
3. Clerk webhook is configured and receiving events
4. Prisma client is up to date (`npx prisma generate`)
