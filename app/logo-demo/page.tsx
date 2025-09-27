'use client'

import { Logo, LogoFull, LogoBadge } from '@/components/ui/Logo'

export default function LogoDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal-950 mb-4">
            Lonestar Tortillas Logo System
          </h1>
          <p className="text-lg text-charcoal-700">
            Modern implementation of the new branding
          </p>
          <p className="text-sm text-charcoal-600 mt-2">
            Independent reseller. Not affiliated with or endorsed by H-E-B®.
          </p>
        </div>

        {/* Logo Icon Variants */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-charcoal-950 mb-6">Logo Icon</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4 p-8 bg-cream-50 rounded-lg">
                <Logo size="sm" className="text-charcoal-950" animated />
              </div>
              <p className="text-sm text-charcoal-600">Small</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4 p-8 bg-cream-50 rounded-lg">
                <Logo size="md" className="text-charcoal-950" animated />
              </div>
              <p className="text-sm text-charcoal-600">Medium</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4 p-8 bg-cream-50 rounded-lg">
                <Logo size="lg" className="text-charcoal-950" animated />
              </div>
              <p className="text-sm text-charcoal-600">Large</p>
            </div>
          </div>
        </section>

        {/* Full Logo Variants */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-charcoal-950 mb-6">Full Logo</h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-center mb-4 p-8 bg-cream-50 rounded-lg">
                <LogoFull size="lg" className="text-charcoal-950" animated />
              </div>
              <p className="text-center text-sm text-charcoal-600">Standard</p>
            </div>
            <div>
              <div className="flex justify-center mb-4 p-8 bg-cream-50 rounded-lg">
                <LogoFull size="lg" className="text-charcoal-950" animated showTagline />
              </div>
              <p className="text-center text-sm text-charcoal-600">With Tagline & Disclaimer</p>
            </div>
          </div>
        </section>

        {/* Logo Badge with Wood Background */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-charcoal-950 mb-6">Logo Badge</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <LogoBadge size="sm" animated />
              </div>
              <p className="text-sm text-charcoal-600">Small Badge</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <LogoBadge size="md" animated />
              </div>
              <p className="text-sm text-charcoal-600">Medium Badge</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <LogoBadge size="lg" animated />
              </div>
              <p className="text-sm text-charcoal-600">Large Badge</p>
            </div>
          </div>
        </section>

        {/* Color Variations */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-charcoal-950 mb-6">Color Applications</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="flex justify-center mb-4 p-8 bg-charcoal-950 rounded-lg">
                <LogoFull size="md" className="text-cream-50" animated />
              </div>
              <p className="text-center text-sm text-charcoal-600">On Dark Background</p>
            </div>
            <div>
              <div className="flex justify-center mb-4 p-8 bg-gradient-to-br from-sunset-500 to-sunset-600 rounded-lg">
                <LogoFull size="md" className="text-white" animated />
              </div>
              <p className="text-center text-sm text-charcoal-600">On Brand Color</p>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-charcoal-950 mb-6">Implementation Notes</h2>
          <div className="prose max-w-none">
            <ul className="space-y-2 text-charcoal-700">
              <li>SVG-based star with integrated wheat design for scalability</li>
              <li>Responsive sizing system (sm, md, lg)</li>
              <li>Optional animation support with Framer Motion</li>
              <li>Wood grain texture variant available for special applications</li>
              <li>Tagline includes mandatory compliance disclaimer</li>
              <li>Color-adaptive design works on any background</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}