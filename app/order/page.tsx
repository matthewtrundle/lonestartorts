'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { LogoFull } from '@/components/ui/Logo'
import { BackgroundMusic } from '@/components/BackgroundMusic'

export default function OrderPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'TTC-MT-CORN-SS': 0,
    'TTC-BUTTER-FLOUR': 0,
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const products = [
    {
      sku: 'TTC-MT-CORN-SS',
      name: 'Mi Tienda Corn Tortillas',
      desc: 'Authentic Texas corn tortillas with perfect texture',
      price: 4.99,
      pack: '30 count',
      highlight: 'Most Popular',
    },
    {
      sku: 'TTC-BUTTER-FLOUR',
      name: 'Butter Flour Tortillas',
      desc: 'Soft, buttery flour tortillas for the whole family',
      price: 5.99,
      pack: 'Family Pack (20 count)',
      highlight: 'Customer Favorite',
    },
  ]

  const subtotal = products.reduce((sum, product) =>
    sum + (quantities[product.sku] * product.price), 0
  )
  const shipping = subtotal > 0 ? 7.99 : 0
  const total = subtotal + shipping

  const handleCheckout = async () => {
    setIsProcessing(true)

    const items = products
      .filter(p => quantities[p.sku] > 0)
      .map(p => ({ sku: p.sku, quantity: quantities[p.sku] }))

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      if (typeof window !== 'undefined' && sessionId) {
        // In production, you'd use Stripe.js here
        window.location.href = `/track?session=${sessionId}`
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout is currently in test mode. Please contact us to place an order.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <ScrollAnimations>
      <div className="relative bg-cream-50 text-charcoal-950 overflow-hidden min-h-screen">
        <BackgroundMusic />

        {/* Header */}
        <header className="shrink-header fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent">
          <div className="container mx-auto px-8">
            <div className="flex justify-between items-center py-6">
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

        {/* Order Form Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-4 hero-title">
                ORDER NOW
              </h1>
              <p className="text-xl text-charcoal-700">
                Select your tortillas and we'll deliver them fresh to your door
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
              {/* Products Column */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold mb-4">Select Your Tortillas</h2>

                {products.map((product) => (
                  <div key={product.sku} className="bg-white rounded-xl p-6 shadow-lg hover-lift">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{product.name}</h3>
                          {product.highlight && (
                            <span className="bg-sunset-500 text-cream-50 text-xs px-2 py-1 rounded-full">
                              {product.highlight}
                            </span>
                          )}
                        </div>
                        <p className="text-charcoal-600 mb-1">{product.desc}</p>
                        <p className="text-sm text-masa-600">{product.pack}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-sunset-600">${product.price}</p>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setQuantities(prev => ({
                            ...prev,
                            [product.sku]: Math.max(0, prev[product.sku] - 1)
                          }))}
                          className="w-10 h-10 rounded-full border-2 border-masa-400 text-masa-600 hover:bg-masa-100 transition-colors"
                          disabled={quantities[product.sku] === 0}
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-bold text-lg">
                          {quantities[product.sku]}
                        </span>
                        <button
                          onClick={() => setQuantities(prev => ({
                            ...prev,
                            [product.sku]: prev[product.sku] + 1
                          }))}
                          className="w-10 h-10 rounded-full bg-sunset-500 text-cream-50 hover:bg-sunset-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-bold">
                        ${(quantities[product.sku] * product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Shipping Info */}
                <div className="bg-masa-100 rounded-xl p-6">
                  <h3 className="font-bold mb-2">📦 Shipping Information</h3>
                  <ul className="text-sm text-charcoal-700 space-y-1">
                    <li>• Ships within 1-2 business days</li>
                    <li>• Delivered fresh in 2-3 days via refrigerated shipping</li>
                    <li>• Free shipping on orders over $50</li>
                    <li>• Currently shipping to all 50 states</li>
                  </ul>
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="lg:col-span-1">
                <div className="bg-charcoal-950 text-cream-50 rounded-xl p-6 sticky top-32">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    {products.map(product =>
                      quantities[product.sku] > 0 && (
                        <div key={product.sku} className="flex justify-between text-sm">
                          <span>{product.name} x{quantities[product.sku]}</span>
                          <span>${(quantities[product.sku] * product.price).toFixed(2)}</span>
                        </div>
                      )
                    )}
                  </div>

                  <div className="border-t border-cream-200/20 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="border-t border-cream-200/20 pt-2">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-sunset-400">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={subtotal === 0 || isProcessing}
                    className={`w-full mt-6 py-4 rounded-full font-bold tracking-wide uppercase transition-all ${
                      subtotal > 0 && !isProcessing
                        ? 'bg-sunset-500 hover:bg-sunset-600 hover-glow'
                        : 'bg-charcoal-700 cursor-not-allowed'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : subtotal === 0 ? 'Select Items' : 'Checkout'}
                  </button>

                  <p className="text-xs text-cream-400 mt-4 text-center">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-center mt-12">
              <p className="text-sm text-charcoal-500 tracking-wider uppercase">
                Independent reseller • Not affiliated with or endorsed by H-E-B
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-b from-cream-100 to-cream-50">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-display font-black text-center mb-12">
              WHY ORDER FROM US
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: '🚚', title: 'Fast Shipping', desc: '2-3 day delivery' },
                { icon: '❄️', title: 'Fresh Guaranteed', desc: 'Temperature controlled' },
                { icon: '✓', title: '100% Authentic', desc: 'Genuine H-E-B products' },
                { icon: '💯', title: 'Satisfaction', desc: 'Money-back guarantee' },
              ].map((benefit, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h3 className="font-bold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-charcoal-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ScrollAnimations>
  )
}