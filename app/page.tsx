'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { LogoFull } from '@/components/ui/Logo'
import { BackgroundMusic } from '@/components/BackgroundMusic'
import { DisclaimerBanner } from '@/components/DisclaimerBanner'

export default function Home() {
  return (
    <ScrollAnimations>
      <div className="relative bg-cream-50 text-charcoal-950 overflow-hidden">
        {/* Prominent Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Background Music Player */}
        <BackgroundMusic />
        {/* Artistic background gradients */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-sunset-300/20 to-transparent blur-3xl" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-masa-400/20 to-transparent blur-3xl" />
        </div>

        {/* Premium Header with Glass Effect */}
        <header className="shrink-header fixed top-8 left-0 right-0 z-[100] transition-all duration-500 border-b border-transparent">
          <div className="container mx-auto px-8">
            <div className="flex justify-between items-center py-4">
              <div className="logo-wrapper">
                <LogoFull className="text-charcoal-950" animated />
              </div>
              <nav className="nav-items hidden md:flex items-center gap-8">
                <Link href="/shop" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Shop</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sunset-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>
                <Link href="/craft" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Craft</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sunset-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>
                <Link href="/story" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Story</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sunset-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>
                <Link href="/order" className="magnetic-area">
                  <span className="magnetic-content inline-block bg-sunset-500 text-cream-50 px-6 py-3 rounded-full font-medium text-sm tracking-wider uppercase hover:bg-sunset-600 transition-colors shadow-sunset">
                    Order Now
                  </span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section with Editorial Design */}
        <section className="min-h-screen relative flex items-center justify-center overflow-hidden spotlight">
          {/* Parallax Background Layers */}
          <div className="absolute inset-0 parallax-img" data-speed="0.3" data-rotation="2">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-50/50 to-cream-50" />
            <Image
              src="/images/texas-field.webp"
              alt="Texas Sunset"
              fill
              className="object-cover opacity-60 mix-blend-multiply"
              priority
            />
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 float-element">
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-sunset-300/30">
              <circle cx="40" cy="40" r="35" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-10 float-element" style={{ animationDelay: '1s' }}>
            <svg width="120" height="120" viewBox="0 0 120 120" className="text-masa-300/20">
              <rect x="20" y="20" width="80" height="80" fill="currentColor" transform="rotate(45 60 60)" />
            </svg>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-8 pt-20">

            <div className="max-w-6xl mx-auto">
              {/* Main Hero Typography - MASSIVE IMPACT */}
              <div className="text-center">
                {/* Small Quality Badge */}
                <div className="mb-8 reveal-text">
                  <span className="text-xs font-bold tracking-[0.4em] uppercase text-masa-600">
                    Premium • Quality • Authentic
                  </span>
                </div>

                {/* Main Title - MASSIVE ARTISTIC IMPACT */}
                <h1 className="hero-title mb-8 relative">
                  {/* Artistic background effects for text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-[150%] h-[150%] bg-gradient-radial from-sunset-200/20 via-transparent to-transparent blur-3xl animate-pulse"></div>
                  </div>
                  <span className="block text-[140px] md:text-[280px] lg:text-[380px] font-black leading-[0.7] tracking-[-0.04em] mb-0 relative text-transparent bg-clip-text bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-masa-700 drop-shadow-2xl">
                    LONE STAR
                  </span>
                  <span className="block text-[90px] md:text-[160px] lg:text-[200px] font-extralight leading-[0.85] tracking-[0.12em] text-charcoal-800/90 mt-[-30px] md:mt-[-60px] lg:mt-[-80px] relative mix-blend-multiply">
                    TORTILLA CO.
                  </span>
                  {/* Artistic underline decoration */}
                  <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[80%] h-[3px] bg-gradient-to-r from-transparent via-sunset-500 to-transparent opacity-60"></div>
                </h1>

                {/* Divider with Badge */}
                <div className="flex items-center justify-center gap-6 my-10">
                  <span className="block w-20 h-px bg-charcoal-300"></span>
                  <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-charcoal-500">
                    Est. 2020 • Texas
                  </span>
                  <span className="block w-20 h-px bg-charcoal-300"></span>
                </div>

                {/* Tagline - Bold Statement */}
                <div className="slide-left max-w-4xl mx-auto">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-black tracking-wide text-charcoal-950 mb-4 uppercase">
                    Authentic Texas Tortillas
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-light tracking-wider text-masa-700 italic">
                    only the best, delivered nationwide
                  </p>
                </div>
              </div>

              {/* CTA Buttons - Premium Minimal */}
              <div className="flex flex-wrap gap-6 justify-center mt-16 scale-in">
                <Link href="/order" className="group relative bg-charcoal-950 text-cream-50 px-14 py-5 text-xs font-bold tracking-[0.25em] uppercase transition-all hover:bg-charcoal-800">
                  <span className="relative z-10">SHOP COLLECTION</span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-sunset-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                </Link>
                <Link href="/story" className="group relative border border-charcoal-400 text-charcoal-950 px-14 py-5 text-xs font-bold tracking-[0.25em] uppercase transition-all hover:border-charcoal-950 hover:bg-charcoal-950 hover:text-cream-50">
                  OUR STORY
                </Link>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-charcoal-500 mt-8 tracking-wider uppercase">
                Independent reseller • Not affiliated with or endorsed by H-E-B
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 reveal-text">
              <p className="text-xs tracking-widest uppercase text-charcoal-600 opacity-60">Scroll to explore</p>
              <div className="relative w-6 h-10 border-2 border-charcoal-400/30 rounded-full">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-charcoal-600 rounded-full animate-scroll-down" />
              </div>
            </div>
          </div>

          {/* Decorative bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-20 text-cream-50">
              <path fill="currentColor" d="M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,90.7C672,96,768,96,864,90.7C960,85,1056,75,1152,74.7C1248,75,1344,85,1392,90.7L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
            </svg>
          </div>
        </section>

        {/* Magazine Typography Section */}
        <section className="relative py-20 bg-gradient-to-b from-cream-50 to-cream-100 overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
              {/* Left Column - Large Typography */}
              <div className="lg:col-span-7 space-y-4">
                <h2 className="magazine-text">
                  <span className="block text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.8] text-gradient">
                    TASTE
                  </span>
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-display font-light mt-3">
                    the difference
                  </span>
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[0.9] mt-4">
                    TRADITION
                  </span>
                  <span className="block text-3xl md:text-4xl lg:text-5xl font-display italic font-light text-masa-600 mt-3">
                    makes
                  </span>
                </h2>
              </div>

              {/* Right Column - Editorial Text */}
              <div className="lg:col-span-5 space-y-6 slide-right">
                <div className="flex items-center gap-4">
                  <span className="text-sunset-500 text-6xl">✦</span>
                  <div>
                    <p className="text-sm font-medium tracking-mega uppercase text-masa-700">Est. 2020</p>
                    <p className="text-2xl font-display">Texas Excellence</p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-charcoal-700">
                  From the heart of Texas comes a tradition of quality that spans generations.
                  Each tortilla carries the authentic taste that has made Texas tortillas legendary.
                </p>
                <blockquote className="border-l-4 border-sunset-500 pl-6 py-2">
                  <p className="text-xl font-display italic text-charcoal-800">
                    "Every bite tells a story of Texas pride and culinary heritage"
                  </p>
                  <cite className="text-sm text-charcoal-600 mt-2 block">— Maria Rodriguez, Founder</cite>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Background texture */}
          <div className="absolute inset-0 noise-subtle pointer-events-none" />
        </section>

        {/* Product Showcase with Horizontal Scroll */}
        <section className="horizontal-scroll min-h-screen relative bg-gradient-to-b from-charcoal-950 to-charcoal-900 text-cream-50 z-10">
          <div className="absolute inset-0 animated-gradient opacity-10" />

          <div className="horizontal-wrapper flex items-center">
            {[
              {
                title: 'FLOUR',
                subtitle: 'Soft & Versatile',
                desc: 'Butter Flour Tortillas',
                color: 'from-sunset-400 to-sunset-600',
                img: '/images/product-hero.webp'
              },
              {
                title: 'CORN',
                subtitle: 'Authentic & Traditional',
                desc: 'Traditional Corn Tortillas',
                color: 'from-masa-400 to-masa-600',
                img: '/images/fresh-ingredients.webp'
              },
              {
                title: 'WHOLE WHEAT',
                subtitle: 'Healthy & Hearty',
                desc: 'Whole Grain Tortillas',
                color: 'from-cream-400 to-cream-600',
                img: '/images/artisan-hands.webp'
              },
              {
                title: 'SPECIALTY',
                subtitle: 'Fresh & Flavorful',
                desc: 'Spinach & Herb Tortillas',
                color: 'from-lime-500 to-lime-700',
                img: '/images/heritage-kitchen.webp'
              },
            ].map((product, i) => (
              <div key={i} className="horizontal-item flex-shrink-0 flex items-center justify-center px-16 perspective-1000" style={{ width: '90vw' }}>
                <div className="text-center space-y-6 preserve-3d max-w-2xl">
                  {/* Product Image with artistic treatment */}
                  <div className="relative mx-auto group">
                    {/* Floating accent shapes */}
                    <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-cream-200/20 to-transparent blur-xl animate-pulse" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-sunset-300/20 to-transparent blur-xl animate-pulse" style={{ animationDelay: '1s' }} />

                    {/* Main product image */}
                    <div className="relative w-[350px] h-[350px] mx-auto">
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-40 rounded-full blur-2xl scale-110 group-hover:scale-125 transition-transform duration-1000`} />
                      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cream-200/10 shadow-2xl">
                        <Image
                          src={product.img}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* Product Info - Enhanced Typography */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-7xl md:text-8xl font-display font-black tracking-tighter leading-none">{product.title}</h3>
                      <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cream-200 to-transparent" />
                    </div>
                    <p className="text-2xl font-light tracking-wide text-cream-100 uppercase">{product.subtitle}</p>
                    <p className="text-lg text-cream-300 italic font-display opacity-80">{product.desc}</p>

                    {/* Decorative element instead of button */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                      <span className="inline-block w-16 h-px bg-gradient-to-r from-transparent to-sunset-400" />
                      <span className="text-sunset-400 text-2xl">✦</span>
                      <span className="inline-block w-16 h-px bg-gradient-to-l from-transparent to-sunset-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Split Screen Editorial */}
        <section className="min-h-screen flex flex-col lg:flex-row">
          {/* Left Side - Quote */}
          <div className="lg:w-1/2 bg-masa-100 flex items-center justify-center p-16 lg:p-24 relative overflow-hidden">
            <div className="absolute inset-0 noise-subtle" />
            <div className="relative z-10 slide-right">
              <span className="text-9xl font-display text-masa-300 leading-none">"</span>
              <h3 className="text-4xl lg:text-5xl font-display leading-tight mt-6 mb-8 text-charcoal-900">
                The most<br />
                <span className="text-gradient-masa">authentically</span><br />
                pleasing<br />
                <span className="font-black">Texas selection</span>
              </h3>
              <div className="space-y-2 text-charcoal-700">
                <p className="font-semibold text-lg">Maria Rodriguez</p>
                <p className="text-sm tracking-mega uppercase">Founder & CEO</p>
                <p className="text-sm italic">Lone Star Tortilla Co.</p>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2 relative h-[500px] lg:h-auto overflow-hidden">
            <div className="absolute inset-0 parallax-img" data-speed="0.2">
              <Image
                src="/images/artisan-hands.webp"
                alt="Artisan Craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-charcoal-950/20" />
            </div>
          </div>
        </section>

        {/* Feature Grid with Artistic Treatment */}
        <section className="py-20 bg-gradient-to-b from-charcoal-950 to-charcoal-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-sunset-500/10 to-transparent blur-3xl" />
          </div>

          <div className="container mx-auto px-8 relative z-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-7xl font-display font-black text-cream-50 mb-4 reveal-text relative z-30">
                WHY CHOOSE
              </h2>
              <p className="text-2xl lg:text-3xl font-display italic text-gradient relative z-30">Lone Star Tortilla</p>
            </div>

            <div className="stagger-container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  ),
                  title: 'AUTHENTIC',
                  desc: 'Real Texas tortillas, not some impostor nonsense',
                  gradient: 'from-sunset-400 to-sunset-600'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13"/>
                      <path d="M16 8h4l3 3v5h-7V8z"/>
                      <circle cx="5.5" cy="18.5" r="2.5"/>
                      <circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  ),
                  title: 'NATIONWIDE DELIVERY',
                  desc: 'Shelf-stable goodness shipped to all 50 states',
                  gradient: 'from-masa-400 to-masa-600'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4"/>
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                    </svg>
                  ),
                  title: 'CURATED SELECTION',
                  desc: 'Only the best tortillas make the cut, partner',
                  gradient: 'from-lime-500 to-lime-700'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ),
                  title: 'PREMIUM VALUE',
                  desc: 'Big flavor, fair prices, no bull',
                  gradient: 'from-sunset-500 to-masa-500'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  ),
                  title: 'SHELF-STABLE',
                  desc: 'No refrigeration needed - pantry-ready!',
                  gradient: 'from-cream-400 to-cream-600'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  ),
                  title: 'HAPPINESS GUARANTEE',
                  desc: 'Love em or we will make it right',
                  gradient: 'from-charcoal-600 to-charcoal-400'
                },
              ].map((feature, i) => (
                <div key={i} className="stagger-item group">
                  <div className="relative bg-charcoal-800/50 backdrop-blur-sm border border-cream-200/10 p-8 hover:bg-charcoal-800/70 transition-all duration-500 hover-lift">
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`} />

                    {/* Icon */}
                    <div className={`text-6xl mb-6 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-cream-50 mb-3 tracking-wide">{feature.title}</h3>
                    <p className="text-cream-300 leading-relaxed">{feature.desc}</p>

                    {/* Hover gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Cards with Premium Design */}
        <section className="py-16 bg-gradient-to-b from-cream-50 via-cream-100 to-masa-50 relative overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="mb-16">
              <h2 className="text-7xl lg:text-8xl font-display font-black text-charcoal-950 reveal-text">
                OUR TREASURES
              </h2>
              <p className="text-2xl text-charcoal-700 mt-4 slide-left">Shelf-stable Texas gold, ready for your pantry</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {[
                {
                  name: 'CORN CLASSICS',
                  type: 'Traditional Corn Tortillas',
                  style: 'Shelf-Stable • No Refrigeration',
                  badge: 'Pantry Ready',
                  gradient: 'bg-gradient-to-br from-sunset-100 to-sunset-200',
                  accent: 'text-sunset-600',
                  shadow: 'shadow-sunset'
                },
                {
                  name: 'FLOUR POWER',
                  type: 'Soft Flour Tortillas',
                  style: 'Shelf-Stable • 30-Day Fresh',
                  badge: 'Best Seller',
                  gradient: 'bg-gradient-to-br from-masa-100 to-masa-200',
                  accent: 'text-masa-600',
                  shadow: 'shadow-masa'
                },
                {
                  name: 'WILD CARDS',
                  type: 'Specialty Varieties',
                  style: 'Shelf-Stable • Limited Edition',
                  badge: 'Coming Soon',
                  gradient: 'bg-gradient-to-br from-lime-100 to-lime-200',
                  accent: 'text-lime-700',
                  shadow: 'shadow-xl'
                }
              ].map((product, i) => (
                <div key={i} className="scale-in group">
                  <div className={`relative ${product.gradient} p-12 h-80 flex flex-col justify-between overflow-hidden hover-lift ${product.shadow} transition-all duration-500`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 border-8 border-current rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 border-8 border-current rounded-full translate-y-1/2 -translate-x-1/2" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <p className={`text-4xl font-display font-bold mb-2 ${product.accent}`}>{product.name}</p>
                      <p className="text-xl text-charcoal-700">{product.type}</p>
                    </div>

                    <div className="relative z-10">
                      <p className="text-charcoal-600">{product.style}</p>
                      <p className="text-sm mt-2 font-medium tracking-wider uppercase opacity-60">{product.badge}</p>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-charcoal-950 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden bg-charcoal-950">
          <div className="absolute inset-0 parallax-img" data-speed="0.5">
            <Image
              src="/images/masa-preparation.webp"
              alt="Masa Preparation"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/80 to-transparent" />
          </div>

          <div className="relative z-10 min-h-[60vh] flex items-center justify-center">
            <div className="text-center space-y-6 px-8 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-cream-50 split-text leading-tight">
                READY TO TASTE TEXAS?
              </h2>

              <p className="text-xl lg:text-2xl text-cream-200 font-light slide-left">
                Order authentic Texas tortillas delivered fresh to your door
              </p>

              <div className="flex flex-wrap gap-6 justify-center mt-12 scale-in">
                <Link href="/shop" className="group relative overflow-hidden bg-sunset-500 text-cream-50 px-12 py-6 text-xl font-bold tracking-wide uppercase hover-glow">
                  <span className="relative z-10">Shop Texas Selection</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-sunset-600 to-sunset-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </Link>

                <Link href="/story" className="border-2 border-cream-50 text-cream-50 px-12 py-6 text-xl font-bold tracking-wide uppercase hover:bg-cream-50 hover:text-charcoal-950 transition-all duration-300">
                  Our Story
                </Link>
              </div>

              <p className="text-sm text-cream-400 mt-12 tracking-wider uppercase">
                Independent reseller • Not affiliated with or endorsed by H-E-B
              </p>
            </div>
          </div>
        </section>

        {/* Premium Footer */}
        <footer className="bg-charcoal-950 border-t border-masa-800/20 py-16 relative overflow-hidden">
          <div className="absolute inset-0 noise-subtle opacity-20" />

          <div className="container mx-auto px-8 relative z-10">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Logo and Description */}
              <div className="md:col-span-2">
                <LogoFull className="text-cream-50 mb-6" />
                <p className="text-cream-300 leading-relaxed">
                  Bringing authentic tortillas from the heart of Texas to tables across America.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-cream-50 font-bold text-sm tracking-mega uppercase mb-4">Quick Links</h4>
                <div className="space-y-3">
                  <Link href="/shop" className="block text-cream-400 hover:text-sunset-400 transition-colors">Shop</Link>
                  <Link href="/craft" className="block text-cream-400 hover:text-sunset-400 transition-colors">Our Craft</Link>
                  <Link href="/story" className="block text-cream-400 hover:text-sunset-400 transition-colors">Our Story</Link>
                  <Link href="/order" className="block text-cream-400 hover:text-sunset-400 transition-colors">Track Order</Link>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-cream-50 font-bold text-sm tracking-mega uppercase mb-4">Contact</h4>
                <div className="space-y-3 text-cream-400">
                  <p>hello@lonestartortilla.com</p>
                  <p>1-800-TORTILLA</p>
                  <p>Austin, Texas</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-masa-800/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-cream-500">© 2024 Lone Star Tortilla Co. All rights reserved.</p>
              <p className="text-xs text-cream-600 tracking-wider uppercase text-center">
                Independent Texas retailer • We source authentic tortillas • Not affiliated with or endorsed by H-E-B
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ScrollAnimations>
  )
}