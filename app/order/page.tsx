'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { LogoFull } from '@/components/ui/Logo'
import { BackgroundMusic } from '@/components/BackgroundMusic'
import { DisclaimerBanner } from '@/components/DisclaimerBanner'

export default function OrderPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const products = [
    {
      sku: 'TTC-CORN-SS',
      name: '🌽 Corn Classics',
      desc: 'Traditional corn tortillas that will make your abuela jealous',
      storage: '📦 SHELF-STABLE: Store in cool, dry place. No fridge needed!',
      price: 4.99,
      pack: '30 count bag',
      highlight: '🏆 MOST POPULAR',
    },
    {
      sku: 'TTC-FLOUR-SS',
      name: '🌾 Flour Power',
      desc: 'Soft flour tortillas smoother than a Texas two-step',
      storage: '📦 SHELF-STABLE: Pantry-ready for up to 30 days!',
      price: 5.99,
      pack: 'Family Pack (20 count)',
      highlight: '⭐ FAN FAVORITE',
    },
    {
      sku: 'TTC-VARIETY-SS',
      name: '🎉 Fiesta Pack',
      desc: 'Mix of corn and flour - because why choose?',
      storage: '📦 SHELF-STABLE: Your emergency taco kit!',
      price: 9.99,
      pack: 'Variety Pack (40 count)',
      highlight: '🔥 BEST VALUE',
    },
  ]

  const handleDirectCheckout = async (product: typeof products[0]) => {
    setIsProcessing(true)
    setSelectedProduct(product.sku)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ sku: product.sku, quantity }]
        }),
      })

      const { sessionId } = await response.json()

      if (typeof window !== 'undefined' && sessionId) {
        // In production, use Stripe.js redirectToCheckout
        alert(`🚀 Yeehaw! Taking you to checkout for ${quantity}x ${product.name}`)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Hold your horses! Checkout is getting saddled up. Try again in a moment!')
    } finally {
      setIsProcessing(false)
      setSelectedProduct(null)
    }
  }

  return (
    <ScrollAnimations>
      <div className="relative bg-cream-50 text-charcoal-950 overflow-hidden min-h-screen">
        <DisclaimerBanner />
        <BackgroundMusic />

        {/* Header */}
        <header className="shrink-header fixed top-8 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent">
          <div className="container mx-auto px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="logo-wrapper">
                <LogoFull className="text-charcoal-950" animated />
              </Link>
              <nav className="nav-items hidden md:flex items-center gap-8">
                <Link href="/shop" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Shop</span>
                </Link>
                <Link href="/craft" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Craft</span>
                </Link>
                <Link href="/story" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Story</span>
                </Link>
                <Link href="/order" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase text-sunset-600">Order</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-12">
          <div className="container mx-auto px-8 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-4 hero-title">
              LASSO YOUR TORTILLAS
            </h1>
            <p className="text-xl text-charcoal-700 mb-2">
              One-click ordering • Shelf-stable goodness • No refrigeration needed!
            </p>
            <p className="text-lg text-sunset-600 font-bold">
              🚚 FREE SHIPPING on orders over $25 • Ships in 1-2 business days
            </p>
          </div>
        </section>

        {/* Products Grid - Simple One-Click Buy */}
        <section className="pb-20">
          <div className="container mx-auto px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {products.map((product) => (
                <div key={product.sku} className="bg-white rounded-xl shadow-xl overflow-hidden hover-lift">
                  {/* Product Badge */}
                  <div className="bg-gradient-to-r from-sunset-500 to-sunset-600 text-cream-50 text-center py-2">
                    <span className="font-bold text-sm">{product.highlight}</span>
                  </div>

                  {/* Product Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-charcoal-600 mb-3">{product.desc}</p>

                    {/* Storage Info - BIG AND CLEAR */}
                    <div className="bg-lime-50 border-2 border-lime-500 rounded-lg p-3 mb-4">
                      <p className="text-sm font-bold text-lime-800">{product.storage}</p>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-3xl font-bold text-sunset-600">${product.price}</p>
                        <p className="text-sm text-charcoal-500">{product.pack}</p>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mb-4">
                      <label className="text-sm font-bold">Qty:</label>
                      <select
                        className="border-2 border-masa-400 rounded px-3 py-1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      >
                        {[1,2,3,4,5,6,12,24].map(n => (
                          <option key={n} value={n}>{n} {n > 1 ? 'bags' : 'bag'}</option>
                        ))}
                      </select>
                      <span className="ml-auto font-bold text-lg">
                        Total: ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* One-Click Buy Button */}
                    <button
                      onClick={() => handleDirectCheckout(product)}
                      disabled={isProcessing && selectedProduct === product.sku}
                      className={`w-full py-4 rounded-full font-bold text-lg tracking-wide transition-all ${
                        isProcessing && selectedProduct === product.sku
                          ? 'bg-charcoal-400 cursor-wait'
                          : 'bg-sunset-500 hover:bg-sunset-600 text-cream-50 hover-glow'
                      }`}
                    >
                      {isProcessing && selectedProduct === product.sku
                        ? '🐎 Saddling up...'
                        : '🛒 BUY NOW'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Promise */}
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="bg-masa-100 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">🚀 The Great Texas Tortilla Airlift Promise</h3>
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div>
                    <p className="font-bold mb-1">📦 Shelf-Stable Shipping</p>
                    <p className="text-sm">No ice packs, no worries! Regular mail delivery to your door.</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">🏃 Fast & Fresh</p>
                    <p className="text-sm">Ships within 1-2 business days, arrives in 3-5 days nationwide.</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">💯 Happiness Guarantee</p>
                    <p className="text-sm">Love em or we will make it right. That is the Texas way!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 text-center">
              <div className="inline-flex gap-8 items-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="text-sm font-bold">Secure Checkout</p>
                  <p className="text-xs text-charcoal-500">Powered by Stripe</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🌮</div>
                  <p className="text-sm font-bold">100% Authentic</p>
                  <p className="text-xs text-charcoal-500">Real Texas tortillas</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <p className="text-sm font-bold">No Refrigeration</p>
                  <p className="text-xs text-charcoal-500">Pantry-ready goodness</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-cream-100 to-cream-50">
          <div className="container mx-auto px-8 max-w-3xl">
            <h2 className="text-3xl font-display font-black text-center mb-12">
              🤔 FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Are these really shelf-stable?</h3>
                <p className="text-charcoal-700">You betcha! All our tortillas are shelf-stable and ship without refrigeration. Store them in your pantry just like bread!</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">How long do they last?</h3>
                <p className="text-charcoal-700">Corn tortillas: 2-3 weeks unopened. Flour tortillas: 3-4 weeks unopened. Once opened, use within a week for best quality!</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Where do you source these tortillas?</h3>
                <p className="text-charcoal-700">We are independent Texas folks who source authentic tortillas from the best producers in the Lone Star State. We are not affiliated with any particular brand - just tortilla enthusiasts!</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Do you ship to my state?</h3>
                <p className="text-charcoal-700">If you are in the USA, we got you covered! All 50 states, from sea to shining sea! 🇺🇸</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ScrollAnimations>
  )
}