'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { LogoFull } from '@/components/ui/Logo'
import { DisclaimerBanner } from '@/components/DisclaimerBanner'
import { trackWaitlistSignup } from '@/lib/analytics'

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

      // Track the form submission in Vercel Analytics
      trackWaitlistSignup({
        interests: Object.keys(interests).filter(k => interests[k as keyof typeof interests]).join(', '),
        quantity,
      })

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
            <div className="flex justify-between items-center py-3">
              <Link href="/">
                <LogoFull className="text-charcoal-950" animated size="sm" />
              </Link>
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/pre-sale" className="text-sm font-medium tracking-wider uppercase text-sunset-600">
                  Pre-Sale
                </Link>
                <Link href="/craft" className="text-sm font-medium tracking-wider uppercase hover:text-sunset-600 transition-colors">
                  Source
                </Link>
                <Link href="/guides" className="text-sm font-medium tracking-wider uppercase hover:text-sunset-600 transition-colors">
                  Guides & Tips
                </Link>
                <Link href="/recipes" className="text-sm font-medium tracking-wider uppercase hover:text-sunset-600 transition-colors">
                  Recipes
                </Link>
                <Link href="/blog" className="text-sm font-medium tracking-wider uppercase hover:text-sunset-600 transition-colors">
                  Blog & Stories
                </Link>
                <Link href="/story" className="text-sm font-medium tracking-wider uppercase hover:text-sunset-600 transition-colors">
                  Story
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-28 pb-20 relative overflow-hidden">
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
                <div className="text-center p-12 bg-white rounded-2xl shadow-xl relative overflow-hidden">
                  {/* Success checkmark icon */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-sunset-400 to-sunset-600 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-cream-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
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
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <h2 className="text-2xl font-display font-bold mb-4 text-center">
                    Join the Pre-Sale List
                  </h2>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* Name and ZIP Code - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name (Optional)
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium mb-1">
                          ZIP Code (Optional)
                        </label>
                        <input
                          type="text"
                          id="zip"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          maxLength={5}
                          className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                          placeholder="12345"
                        />
                      </div>
                    </div>

                    {/* Product Interest */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Products of Interest (Optional)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: 'corn', label: 'Corn' },
                          { key: 'butter', label: 'Butter' },
                          { key: 'flour', label: 'Flour' },
                          { key: 'variety', label: 'Variety' },
                        ].map((product) => (
                          <button
                            key={product.key}
                            type="button"
                            onClick={() => handleInterestToggle(product.key as keyof typeof interests)}
                            className={`p-2 text-sm rounded-lg border-2 transition-all ${
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
                      <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                        Expected Monthly Orders (Optional)
                      </label>
                      <select
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      >
                        <option value="1-2">1-2 packs/month</option>
                        <option value="3-5">3-5 packs/month</option>
                        <option value="6-10">6-10 packs/month</option>
                        <option value="10+">10+ packs/month</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-sunset-500 text-cream-50 py-3 rounded-lg font-bold tracking-wide uppercase hover:bg-sunset-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                    </button>

                    <p className="text-xs text-center text-charcoal-600">
                      No payment required. We'll email you when available.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className="relative h-24 bg-gradient-to-b from-cream-100 to-charcoal-950 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 100">
            <path
              d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
              fill="rgb(14 14 14)"
              opacity="0.1"
            />
            <path
              d="M0,60 C360,90 1080,30 1440,60 L1440,100 L0,100 Z"
              fill="rgb(14 14 14)"
              opacity="0.3"
            />
            <path
              d="M0,70 C360,85 1080,55 1440,70 L1440,100 L0,100 Z"
              fill="rgb(14 14 14)"
            />
          </svg>
        </div>

        {/* Value Props */}
        <section className="py-20 bg-charcoal-950 text-cream-50 relative overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 70px)`,
            }} />
          </div>

          <div className="container mx-auto px-8 relative z-10">
            <h2 className="text-4xl font-display font-bold text-center mb-12">
              Why Join the Pre-Sale?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="group text-center p-6 rounded-xl transition-all duration-300 hover:bg-charcoal-900/50 hover:shadow-xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-sunset-400 to-sunset-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {/* Discount Tag Icon */}
                  <svg className="w-8 h-8 text-cream-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                    <path d="M14 9l2 2m0-2l-2 2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Early Bird Pricing</h3>
                <p className="text-cream-300">
                  Founding members get exclusive discounts on their first orders
                </p>
              </div>
              <div className="group text-center p-6 rounded-xl transition-all duration-300 hover:bg-charcoal-900/50 hover:shadow-xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-masa-400 to-masa-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {/* VIP Star Icon */}
                  <svg className="w-8 h-8 text-cream-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">First Access</h3>
                <p className="text-cream-300">
                  Limited first batch - waitlist members get priority ordering
                </p>
              </div>
              <div className="group text-center p-6 rounded-xl transition-all duration-300 hover:bg-charcoal-900/50 hover:shadow-xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-charcoal-600 to-charcoal-800 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {/* Shield Check Icon */}
                  <svg className="w-8 h-8 text-cream-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l-9 4v7c0 5 4 8 9 9 5-1 9-4 9-9V5l-9-4z" fill="currentColor" opacity="0.2"/>
                    <path d="M12 2l-9 4v7c0 5 4 8 9 9 5-1 9-4 9-9V5l-9-4z"/>
                    <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
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
          <div className="container mx-auto px-8">
            <div className="text-center mb-8">
              <LogoFull className="text-cream-50 mb-6 mx-auto" />
              <p className="text-sm text-cream-400 mb-4">
                Your trusted independent source for genuine H-E-B® tortillas
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
              <Link href="/shop" className="text-cream-400 hover:text-sunset-400 transition-colors">Shop</Link>
              <Link href="/locations" className="text-cream-400 hover:text-sunset-400 transition-colors">Locations</Link>
              <Link href="/guides" className="text-cream-400 hover:text-sunset-400 transition-colors">Guides</Link>
              <Link href="/recipes" className="text-cream-400 hover:text-sunset-400 transition-colors">Recipes</Link>
              <Link href="/blog" className="text-cream-400 hover:text-sunset-400 transition-colors">Blog</Link>
              <Link href="/faq" className="text-cream-400 hover:text-sunset-400 transition-colors">FAQ</Link>
              <Link href="/story" className="text-cream-400 hover:text-sunset-400 transition-colors">Our Story</Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs">
              <Link href="/restaurants/food-trucks" className="text-cream-500 hover:text-sunset-400 transition-colors">Food Trucks</Link>
              <Link href="/restaurants/bbq" className="text-cream-500 hover:text-sunset-400 transition-colors">BBQ</Link>
              <Link href="/restaurants/mexican" className="text-cream-500 hover:text-sunset-400 transition-colors">Mexican</Link>
              <Link href="/restaurants/tex-mex" className="text-cream-500 hover:text-sunset-400 transition-colors">Tex-Mex</Link>
              <Link href="/restaurants/taco-shops" className="text-cream-500 hover:text-sunset-400 transition-colors">Taco Shops</Link>
              <Link href="/restaurants/catering" className="text-cream-500 hover:text-sunset-400 transition-colors">Catering</Link>
              <Link href="/restaurants/breakfast" className="text-cream-500 hover:text-sunset-400 transition-colors">Breakfast</Link>
            </div>
            <p className="text-xs text-cream-600 tracking-wider uppercase text-center">
              Independent reseller • Not affiliated with or endorsed by H-E-B®
            </p>
          </div>
        </footer>
      </div>
    </ScrollAnimations>
  )
}