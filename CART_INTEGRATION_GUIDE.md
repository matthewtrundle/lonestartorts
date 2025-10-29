# Shopping Cart Integration Guide for Lonestar Tortillas

**Purpose**: Guide for seamlessly integrating shopping cart functionality into the existing Lonestar Tortillas e-commerce platform

**Audience**: Developers implementing cart features  
**Status**: Pre-development guide  
**Date**: 2025-10-26

---

## Current System Architecture

### Data Flow Diagram

```
┌─────────────────┐
│   Homepage      │
│   /page.tsx     │
└────────┬────────┘
         │
         ├─→ ProductCard Component
         │   - Renders product with "Add to Order" button
         │   - Calls onAddToOrder(sku) callback
         │   - Currently no handler implemented
         │
         └─→ Pre-sale Page
             /pre-sale/page.tsx
             - Waitlist signup form
             - No product purchase flow

         
┌──────────────────────┐
│   Cart Context       │  ← NEEDS TO BE CREATED
│   (Zustand/Context)  │
└──────┬───────────────┘
       │
       ├─→ Add to Cart
       ├─→ Remove from Cart
       ├─→ Update Quantity
       └─→ Clear Cart

              ↓
              
┌──────────────────────┐
│   Checkout Page      │  ← NEEDS TO BE CREATED
│   /checkout/page.tsx │
└──────┬───────────────┘
       │
       ├─→ Cart Review
       ├─→ Shipping Info
       ├─→ Payment (Stripe)
       │
       └─→ POST /api/checkout
           - Current API exists but needs cart integration
           - Creates Stripe session
           - Validates products
           
              ↓
              
┌──────────────────────┐
│   Stripe Checkout    │
│   Popup/Redirect     │
└──────┬───────────────┘
       │
       └─→ Payment Processing
           ↓
           
┌──────────────────────┐
│   Stripe Webhook     │
│   /api/webhook       │
└──────┬───────────────┘
       │
       ├─→ Save Order to DB (Prisma)
       ├─→ Send Confirmation Email
       └─→ Redirect to /success
           
              ↓
              
┌──────────────────────┐
│   Success Page       │
│   /success/page.tsx  │
│   (Already exists)   │
└──────────────────────┘
```

---

## Key Files to Modify/Create

### PHASE 1: Cart State Management

#### File: `lib/cart-context.tsx` (NEW)

```typescript
'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface CartItem {
  sku: string
  name: string
  price: number // in cents
  quantity: number
  image?: string
}

export interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (sku: string) => void
  updateQuantity: (sku: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved cart:', e)
      }
    }
    setIsInitialized(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, isInitialized])

  const addToCart = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(item => item.sku === newItem.sku)
      if (existing) {
        return prev.map(item =>
          item.sku === newItem.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((sku: string) => {
    setItems(prev => prev.filter(item => item.sku !== sku))
  }, [])

  const updateQuantity = useCallback((sku: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sku)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.sku === sku ? { ...item, quantity } : item
      )
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
```

#### File: `app/layout.tsx` (MODIFY)

Wrap the app with CartProvider:

```typescript
import { CartProvider } from '@/lib/cart-context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ... existing head content ... */}
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <CartProvider>
          {/* ... existing body content ... */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
```

---

### PHASE 2: Cart UI Components

#### File: `components/cart/CartSidebar.tsx` (NEW)

```typescript
'use client'

import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { X, Minus, Plus, Trash2 } from 'lucide-react'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-charcoal-100">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-cream-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <p className="text-center text-charcoal-600">Your cart is empty</p>
            ) : (
              items.map(item => (
                <div
                  key={item.sku}
                  className="flex gap-4 pb-4 border-b border-charcoal-100"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-charcoal-600">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                        className="p-1 hover:bg-cream-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                        className="p-1 hover:bg-cream-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.sku)}
                        className="ml-auto p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-charcoal-100 p-6 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Subtotal:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <Link
              href="/checkout"
              className="block w-full text-center bg-sunset-500 text-white font-semibold py-3 rounded-lg hover:bg-sunset-600 transition"
              onClick={onClose}
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => {
                clearCart()
                onClose()
              }}
              className="w-full text-center text-charcoal-600 hover:text-charcoal-900 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
```

---

### PHASE 3: Checkout Page

#### File: `app/checkout/page.tsx` (NEW)

```typescript
'use client'

import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { trackBeginCheckout } from '@/lib/analytics'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <Link href="/" className="text-sunset-600 hover:text-sunset-700">
            Continue Shopping →
          </Link>
        </div>
      </div>
    )
  }

  async function handleCheckout() {
    setIsLoading(true)
    setError(null)

    try {
      // Track checkout initiation
      trackBeginCheckout(totalPrice, items.map(item => ({
        item_id: item.sku,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price / 100,
      })))

      // Call checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            sku: item.sku,
            quantity: item.quantity,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()

      // Redirect to Stripe checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      if (!stripe) throw new Error('Stripe failed to load')

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })
      if (stripeError) throw stripeError
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12">Review Your Order</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              {items.map(item => (
                <div key={item.sku} className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-charcoal-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-8">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(799)}</span> {/* $7.99 */}
              </div>
              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(totalPrice + 799)}</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-sunset-500 text-white font-semibold py-3 rounded-lg hover:bg-sunset-600 transition disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Pay with Stripe'}
            </button>

            <Link href="/" className="block text-center text-charcoal-600 hover:text-charcoal-900 mt-4">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

### PHASE 4: Update Existing Components

#### File: `components/product/ProductCard.tsx` (MODIFY)

```typescript
'use client'

import React from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'
import { trackAddToCart } from '@/lib/analytics'

interface ProductCardProps {
  sku: string
  name: string
  price: number
  image: string
  description: string
  storage: 'shelf_stable' | 'refrigerated'
}

export const ProductCard: React.FC<ProductCardProps> = ({
  sku,
  name,
  price,
  image,
  description,
  storage,
}) => {
  const { addToCart } = useCart()
  const storageLabel = storage === 'shelf_stable'
    ? 'Shelf Stable'
    : 'Keep Refrigerated'

  const handleAddToCart = () => {
    addToCart({
      sku,
      name,
      price,
      image,
    })

    // Track GA event
    trackAddToCart({
      id: sku,
      name,
      price: price / 100,
      quantity: 1,
    })

    // Show toast notification
    // (You may want to add a toast library like Sonner)
  }

  return (
    <div className="group relative bg-white">
      <div className="aspect-[4/5] relative overflow-hidden bg-light-gray">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className="px-8 py-3 border-2 border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="pt-6 pb-2">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-medium leading-snug mb-1">{name}</h3>
            <p className="text-xs font-light tracking-widest uppercase text-gray-dark">
              {storageLabel}
            </p>
          </div>
          <span className="text-xl font-light">
            {formatPrice(price / 100)}
          </span>
        </div>

        <p className="text-sm font-light text-gray-dark leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
```

---

### PHASE 5: Update Checkout API

#### File: `app/api/checkout/route.ts` (MODIFY)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY
const stripe = stripeKey ? new Stripe(stripeKey, {
  apiVersion: '2025-02-24.acacia',
}) : null

// Product catalog - should be database-driven in production
const productCatalog: Record<string, { name: string; price: number; description: string }> = {
  'TTC-MT-CORN-SS': {
    name: 'Mi Tienda-style Corn Tortillas (Shelf-Stable)',
    price: 499, // $4.99
    description: 'Authentic Texas corn tortillas',
  },
  'TTC-BUTTER-FLOUR': {
    name: 'Butter Flour Tortillas (Family Pack)',
    price: 599, // $5.99
    description: 'Soft, buttery flour tortillas',
  },
  'TTC-SPECIALTY': {
    name: 'Specialty Tortilla Variety Pack',
    price: 799, // $7.99
    description: 'Mix of different types',
  },
  'TTC-BULK-CORN': {
    name: 'Bulk Corn Tortillas (5-pack)',
    price: 2299, // $22.99
    description: 'Perfect for families',
  },
}

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      console.warn('Stripe not configured')
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 503 }
      )
    }

    const { items } = await req.json()

    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Build line items
    const lineItems = items.map((item: { sku: string; quantity: number }) => {
      const product = productCatalog[item.sku]
      if (!product) {
        throw new Error(`Invalid product SKU: ${item.sku}`)
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            metadata: { sku: item.sku },
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      }
    })

    // Add shipping
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Standard Shipping (2-3 days)',
          description: 'Fast shipping to anywhere in the US',
        },
        unit_amount: 799, // $7.99
      },
      quantity: 1,
    })

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      metadata: {
        disclaimer: 'Independent reseller. Not affiliated with or endorsed by H-E-B®.',
      },
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Unable to create checkout session' },
      { status: 500 }
    )
  }
}
```

---

## Integration Checklist

### Prerequisites
- [ ] Stripe API keys configured in `.env.local`
- [ ] Database (PostgreSQL) connected and migrations run
- [ ] Product catalog API endpoint created (or use hardcoded catalog)

### Phase 1: Cart State
- [ ] Create `lib/cart-context.tsx`
- [ ] Update `app/layout.tsx` to wrap with CartProvider
- [ ] Test localStorage persistence

### Phase 2: UI Components
- [ ] Create `components/cart/CartSidebar.tsx`
- [ ] Add cart sidebar to header/layout
- [ ] Create cart icon button to toggle sidebar
- [ ] Test sidebar open/close functionality

### Phase 3: Checkout Page
- [ ] Create `app/checkout/page.tsx`
- [ ] Implement checkout flow
- [ ] Test with Stripe test mode

### Phase 4: Update Components
- [ ] Update `components/product/ProductCard.tsx`
- [ ] Wire up "Add to Cart" buttons
- [ ] Test add to cart functionality
- [ ] Verify GA tracking

### Phase 5: API Updates
- [ ] Update `/app/api/checkout/route.ts`
- [ ] Test checkout with multiple items
- [ ] Verify Stripe webhook processing

### Phase 6: Testing
- [ ] Unit tests for cart context
- [ ] E2E tests for checkout flow
- [ ] Test with Stripe test cards
- [ ] Verify GA events are firing

### Phase 7: Production
- [ ] Configure Stripe webhook endpoint
- [ ] Update `/api/webhook/route.ts` to save orders to Prisma
- [ ] Set up email notifications
- [ ] Deploy and test in staging

---

## Additional Improvements (Future)

1. **Product Catalog Database**
   - Create Product model in Prisma
   - Create `/api/products` endpoint
   - Update checkout to fetch from database

2. **Inventory Management**
   - Add stock tracking to Product model
   - Validate stock availability before checkout

3. **Toast Notifications**
   - Add Sonner or similar library
   - Show feedback when items added to cart

4. **Cart Abandonment Email**
   - Track abandoned carts in database
   - Send reminder emails after 24 hours

5. **Wishlist/Save for Later**
   - Add to cart context
   - Sync with user account

6. **Coupon/Promo Code Support**
   - Add discount logic to checkout
   - Integrate with Stripe discount codes

---

## Testing Commands

```bash
# Unit tests
npm test -- lib/cart-context.test.tsx

# E2E tests
npx playwright test e2e/checkout.spec.ts

# Build
npm run build

# Type checking
npx tsc --noEmit
```

---

## Files Summary

**New Files to Create**:
- `lib/cart-context.tsx` - Cart state management
- `components/cart/CartSidebar.tsx` - Cart UI
- `app/checkout/page.tsx` - Checkout page

**Files to Modify**:
- `app/layout.tsx` - Add CartProvider
- `components/product/ProductCard.tsx` - Add cart integration
- `app/api/checkout/route.ts` - Update for cart items
- `app/api/webhook/route.ts` - Save to Prisma (Phase 6)

**Dependencies to Add**:
- `@stripe/react-stripe-js` (if not already present)
- Optional: `sonner` for toast notifications

