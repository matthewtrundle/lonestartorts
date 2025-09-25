'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { LogoFull } from '@/components/ui/Logo'
import { DisclaimerBanner } from '@/components/DisclaimerBanner'

export default function PreSalePage() {
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
  const [signupCount, setSignupCount] = useState(247) // Start with seed number

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          zipCode,
          interests,
          expectedQuantity: quantity,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setSubmitted(true)
      setSignupCount(prev => prev + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join waitlist')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterestToggle = (product: keyof typeof interests) => {
    setInterests(prev => ({ ...prev, [product]: !prev[product] }))
  }

  return (
    <ScrollAnimations>
      <div className="relative bg-cream-50 text-charcoal-950 min-h-screen">
        {/* Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Header */}
        <header className="fixed top-12 left-0 right-0 z-50 bg-cream-50/80 backdrop-blur-md border-b border-charcoal-200/10">
          <div className="container mx-auto px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/">
                <LogoFull className="text-charcoal-950" animated />
              </Link>
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/pre-sale" className="text-sm font-medium tracking-wider uppercase text-sunset-600">
                  Pre-Sale
                </Link>
                <Link href="/craft" className="text-sm font-medium tracking-wider uppercase hover:text-sunset-600 transition-colors">
                  Source
                </Link>
                <Link href="/story" className="text-sm font-medium tracking-wider uppercase hover:text-sunset-600 transition-colors">
                  Story
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-sunset-200/30 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-masa-200/30 to-transparent blur-3xl" />
          </div>

          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 inline-block">
                <span className="bg-sunset-500 text-cream-50 px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase">
                  Coming Soon - Limited First Batch
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 leading-tight">
                Be First to Get
                <span className="block text-gradient mt-2">H-E-B® Tortillas</span>
              </h1>

              <p className="text-xl md:text-2xl text-charcoal-700 mb-8">
                Those who know, know. Join {signupCount.toLocaleString()} other H-E-B® enthusiasts
                waiting for nationwide delivery of genuine H-E-B® tortillas.
              </p>

              <div className="flex flex-wrap gap-6 justify-center text-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sunset-500">✓</span>
                  <span>Early Bird Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sunset-500">✓</span>
                  <span>First Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sunset-500">✓</span>
                  <span>Founding Member Status</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20 bg-gradient-to-b from-cream-50 to-cream-100">
          <div className="container mx-auto px-8">
            <div className="max-w-2xl mx-auto">
              {submitted ? (
                <div className="text-center p-12 bg-white rounded-2xl shadow-xl">
                  <div className="text-6xl mb-6">🎉</div>
                  <h2 className="text-3xl font-display font-bold mb-4">You're on the List!</h2>
                  <p className="text-lg text-charcoal-700 mb-8">
                    We'll email you as soon as H-E-B® tortillas are available for order.
                    You'll get exclusive early access and special founding member pricing.
                  </p>
                  <div className="space-y-4">
                    <p className="text-sm text-charcoal-600">
                      Share with fellow H-E-B® enthusiasts:
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => {
                          const text = "I just joined the waitlist for H-E-B® tortillas delivered nationwide! 🌮"
                          const url = window.location.origin
                          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
                        }}
                        className="px-6 py-3 bg-charcoal-950 text-cream-50 rounded-full hover:bg-charcoal-800 transition-colors"
                      >
                        Share on X
                      </button>
                      <Link href="/" className="px-6 py-3 border-2 border-charcoal-950 text-charcoal-950 rounded-full hover:bg-charcoal-950 hover:text-cream-50 transition-colors">
                        Back to Home
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                  <h2 className="text-3xl font-display font-bold mb-8 text-center">
                    Join the Pre-Sale List
                  </h2>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {error}
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>

                    {/* ZIP Code */}
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium mb-2">
                        ZIP Code (Optional)
                      </label>
                      <input
                        type="text"
                        id="zip"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        maxLength={5}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                        placeholder="12345"
                      />
                      <p className="text-xs text-charcoal-600 mt-1">
                        Helps us plan shipping logistics
                      </p>
                    </div>

                    {/* Product Interest */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Which H-E-B® products interest you? (Optional)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { key: 'corn', label: 'Mi Tienda Corn Tortillas' },
                          { key: 'butter', label: 'Butter Tortillas' },
                          { key: 'flour', label: 'Flour Tortillas' },
                          { key: 'variety', label: 'Variety Pack' },
                        ].map((product) => (
                          <button
                            key={product.key}
                            type="button"
                            onClick={() => handleInterestToggle(product.key as keyof typeof interests)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              interests[product.key as keyof typeof interests]
                                ? 'border-sunset-500 bg-sunset-50 text-sunset-700'
                                : 'border-charcoal-200 hover:border-charcoal-400'
                            }`}
                          >
                            {product.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Expected Quantity */}
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                        Expected Monthly Orders (Optional)
                      </label>
                      <select
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      >
                        <option value="1-2">1-2 packs per month</option>
                        <option value="3-5">3-5 packs per month</option>
                        <option value="6-10">6-10 packs per month</option>
                        <option value="10+">10+ packs per month</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-sunset-500 text-cream-50 py-4 rounded-lg font-bold text-lg tracking-wide uppercase hover:bg-sunset-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                    </button>

                    <p className="text-xs text-center text-charcoal-600">
                      No payment required. We'll email you when H-E-B® tortillas are available.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-20 bg-charcoal-950 text-cream-50">
          <div className="container mx-auto px-8">
            <h2 className="text-4xl font-display font-bold text-center mb-12">
              Why Join the Pre-Sale?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-2">Early Bird Pricing</h3>
                <p className="text-cream-300">
                  Founding members get exclusive discounts on their first orders
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">First Access</h3>
                <p className="text-cream-300">
                  Limited first batch - waitlist members get priority ordering
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-xl font-bold mb-2">Guaranteed Stock</h3>
                <p className="text-cream-300">
                  Reserve your spot for genuine H-E-B® products before they sell out
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-charcoal-900 py-12 text-cream-50">
          <div className="container mx-auto px-8 text-center">
            <LogoFull className="text-cream-50 mb-6 mx-auto" />
            <p className="text-sm text-cream-400 mb-4">
              Your trusted independent source for genuine H-E-B® tortillas
            </p>
            <p className="text-xs text-cream-600 tracking-wider uppercase">
              Independent reseller • Not affiliated with or endorsed by H-E-B®
            </p>
          </div>
        </footer>
      </div>
    </ScrollAnimations>
  )
}