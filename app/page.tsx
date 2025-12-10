'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { LogoFull } from '@/components/ui/Logo'
import { BackgroundMusic } from '@/components/BackgroundMusic'
import { DisclaimerBanner } from '@/components/DisclaimerBanner'
import { Header } from '@/components/layout/Header'
import { HeroInteractions } from '@/components/HeroInteractions'
import { ContactForm } from '@/components/ContactForm'
import { trackVideoPlay } from '@/lib/analytics'

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    { src: '/tiks/Taste of Texas_compressed.mp4', title: 'Taste of Texas' },
    { src: '/tiks/H-E-B Tortillas_ Ride With Us_compressed.mp4', title: 'Ride With Us' },
    { src: '/tiks/Texan Tortilla Secret_compressed.mp4', title: 'Texan Secret' }
  ];

  // Track video play and switch video
  const handleVideoChange = (index: number) => {
    trackVideoPlay({ videoTitle: videos[index].title });
    setCurrentVideo(index);
  };

  return (
    <ScrollAnimations>
      <div className="relative bg-cream-50 text-charcoal-950 overflow-hidden">
        {/* Prominent Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Background Music Player - Removed for now */}
        {/* <BackgroundMusic /> */}

        {/* Hero Interactions Handler */}
        <HeroInteractions />
        {/* Artistic background gradients */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-sunset-300/20 to-transparent blur-3xl" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-masa-400/20 to-transparent blur-3xl" />
        </div>

        {/* Shared Header with Clerk integration */}
        <Header />

        {/* Artistic Floating Navigation - Shows on scroll */}
        <div className="fixed-nav-artistic fixed right-8 top-1/2 -translate-y-1/2 z-[150] opacity-0 pointer-events-none transition-all duration-700" id="floating-nav">
          {/* Vertical navigation dots */}
          <div className="flex flex-col items-center gap-6">
            {/* Decorative line */}
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-charcoal-400/30 to-transparent" />

            {/* Navigation items */}
            <Link href="/shop" className="group relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-charcoal-300/30 group-hover:border-sunset-500/60 transition-all duration-300" />
              <div className="w-2 h-2 rounded-full bg-charcoal-600 group-hover:bg-sunset-500 group-hover:scale-150 transition-all duration-300" />
              <span className="absolute right-16 whitespace-nowrap text-sm font-medium tracking-wider uppercase text-charcoal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Shop</span>
            </Link>

            <Link href="/craft" className="group relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-charcoal-300/30 group-hover:border-sunset-500/60 transition-all duration-300" />
              <div className="w-2 h-2 rounded-full bg-charcoal-600 group-hover:bg-sunset-500 group-hover:scale-150 transition-all duration-300" />
              <span className="absolute right-16 whitespace-nowrap text-sm font-medium tracking-wider uppercase text-charcoal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Source</span>
            </Link>

            <Link href="/story" className="group relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-charcoal-300/30 group-hover:border-sunset-500/60 transition-all duration-300" />
              <div className="w-2 h-2 rounded-full bg-charcoal-600 group-hover:bg-sunset-500 group-hover:scale-150 transition-all duration-300" />
              <span className="absolute right-16 whitespace-nowrap text-sm font-medium tracking-wider uppercase text-charcoal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Story</span>
            </Link>

            {/* Decorative line */}
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-charcoal-400/30 to-transparent" />

            {/* Shop button - emphasized */}
            <Link href="/shop" className="group relative">
              <div className="relative">
                {/* Pulsing background */}
                <div className="absolute inset-0 rounded-full bg-sunset-500 animate-pulse-slow blur-xl opacity-40" />
                {/* Main button */}
                <div className="relative bg-gradient-to-br from-sunset-500 to-sunset-600 text-cream-50 px-5 py-3 rounded-full font-bold text-sm tracking-wider uppercase shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                  <span className="relative z-10">Shop</span>
                  {/* Rotating border effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-sunset-300/30 animate-spin-slow" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Floating Logo removed - main header logo now scales on scroll instead */}

        {/* Hero Section with Editorial Design */}
        <section className="min-h-screen relative flex items-center justify-center overflow-x-hidden overflow-y-hidden spotlight" id="hero-section">
          {/* Multi-layer Parallax Background System */}
          <div className="absolute inset-0 hero-background-system">
            {/* Layer 1: Deep background with texture */}
            <div className="absolute inset-0 parallax-layer" data-speed="0.1">
              <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100/80 to-masa-50" />
              <div className="absolute inset-0 premium-grain-texture" />
            </div>

            {/* Layer 2: Atmospheric gradients */}
            <div className="absolute inset-0 parallax-layer" data-speed="0.2">
              <div className="absolute top-[-50%] left-[-25%] w-[150%] h-[150%] bg-gradient-radial from-sunset-200/30 via-sunset-100/10 to-transparent blur-[100px] animate-float-slow" />
              <div className="absolute bottom-[-50%] right-[-25%] w-[150%] h-[150%] bg-gradient-radial from-masa-200/20 via-masa-100/10 to-transparent blur-[120px] animate-float-slow-reverse" />
            </div>

            {/* Layer 3: Background Video */}
            <div className="absolute inset-0 parallax-layer" data-speed="0.3" data-rotation="2">
              {/* Background Video */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              >
                <source src="/hero-background_compressed.mp4" type="video/mp4" />
              </video>

              {/* Overlay gradients for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-50/40 to-cream-50/95" />
              <div className="absolute inset-0 bg-gradient-to-t from-cream-50/50 via-transparent to-transparent" />
              <div className="absolute inset-0 backdrop-blur-[0.5px]" />
            </div>

            {/* Layer 4: Animated light rays */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="light-ray light-ray-1" />
              <div className="light-ray light-ray-2" />
              <div className="light-ray light-ray-3" />
            </div>
          </div>

          {/* Floating Premium Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating particles */}
            <div className="particle particle-1" />
            <div className="particle particle-2" />
            <div className="particle particle-3" />
            <div className="particle particle-4" />
            <div className="particle particle-5" />

            {/* Geometric decorations with animation */}
            <div className="absolute top-[15%] left-[10%] float-element opacity-20">
              <svg width="100" height="100" viewBox="0 0 100 100" className="text-sunset-300 rotate-slow">
                <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            <div className="absolute top-[25%] right-[8%] float-element opacity-15" style={{ animationDelay: '2s' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" className="text-masa-400">
                <circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 10" />
              </svg>
            </div>
            <div className="absolute bottom-[20%] left-[5%] float-element opacity-10" style={{ animationDelay: '1s' }}>
              <svg width="120" height="120" viewBox="0 0 120 120" className="text-charcoal-300">
                <rect x="30" y="30" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(30 60 60)" />
              </svg>
            </div>
            <div className="absolute bottom-[35%] right-[15%] float-element opacity-20" style={{ animationDelay: '3s' }}>
              <svg width="60" height="60" viewBox="0 0 60 60" className="text-sunset-400">
                <path d="M30 10 L50 30 L30 50 L10 30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-40">

            <div className="w-full">
              {/* Main Hero Typography - MASSIVE IMPACT */}
              <div className="text-center">
                {/* Small Quality Badge */}
                <div className="mb-8 reveal-text">
                  <span className="text-xs font-bold tracking-[0.4em] uppercase text-masa-600">
                    Premium • Quality • Authentic
                  </span>
                </div>

                {/* Main Title - MASSIVE ARTISTIC IMPACT */}
                <div className="mb-8 relative magnetic-text" data-magnetic-strength="20">
                  {/* Premium text background effects */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-[200%] h-[200%] bg-gradient-radial from-sunset-200/20 via-transparent to-transparent blur-[150px] animate-glow-pulse"></div>
                    <div className="absolute w-[150%] h-[150%] bg-gradient-radial from-masa-300/15 via-transparent to-transparent blur-[100px] animate-glow-pulse-delayed"></div>
                  </div>

                  {/* Main Hero Text - SEO-Optimized H1 (visually styled) */}
                  <h1 className="w-full">
                    {/* Visual "LONESTAR" - Part of H1 */}
                    <span className="block text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] xl:text-[220px] font-black leading-[0.8] tracking-[-0.02em] text-charcoal-950 whitespace-nowrap">
                      LONESTAR
                    </span>

                    {/* Visual "TORTILLAS" - Part of H1 */}
                    <span className="block text-[40px] sm:text-[70px] md:text-[100px] lg:text-[130px] xl:text-[160px] font-light leading-[0.8] tracking-[0.03em] text-sunset-600 -mt-2 sm:-mt-4 md:-mt-8 lg:-mt-12 whitespace-nowrap">
                      TORTILLAS
                    </span>

                    {/* SEO Text - Hidden but read by search engines */}
                    <span className="sr-only">- Authentic H-E-B® Tortillas Delivered Nationwide</span>
                  </h1>

                  {/* Premium decorative elements */}
                  <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[90%]">
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-sunset-500 to-transparent animate-shimmer-slow" />
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-masa-400 to-transparent mt-[4px] animate-shimmer-slow-reverse" />
                  </div>

                  {/* Invisible interaction area for magnetic effect */}
                  <div className="absolute inset-0 magnetic-area pointer-events-auto" />
                </div>

                {/* Divider with Badge */}
                <div className="flex items-center justify-center gap-6 my-10">
                  <span className="block w-20 h-px bg-charcoal-300"></span>
                  <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-charcoal-500">
                    Est. 2020 • Texas
                  </span>
                  <span className="block w-20 h-px bg-charcoal-300"></span>
                </div>

                {/* Tagline - Bold Statement */}
                <div className="mt-8 mb-12 max-w-4xl mx-auto text-center">
                  <p className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-charcoal-950 mb-4 uppercase">
                    AUTHENTIC TEXAS TORTILLAS
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-light tracking-wider text-masa-700 italic">
                    only the best, delivered nationwide
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
                <Link href="/shop" className="bg-sunset-500 hover:bg-sunset-600 text-cream-50 px-12 py-4 text-lg font-bold tracking-wider uppercase transition-colors shadow-lg hover:shadow-xl">
                  SHOP NOW
                </Link>
                <Link href="/story" className="border-2 border-charcoal-950 text-charcoal-950 hover:bg-charcoal-950 hover:text-cream-50 px-12 py-4 text-lg font-bold tracking-wider uppercase transition-colors">
                  OUR STORY
                </Link>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-charcoal-500 mt-8 tracking-wider uppercase">
                Independent reseller • Not affiliated with or endorsed by H-E-B
              </p>
            </div>

          </div>

          {/* Decorative bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-20 text-cream-50">
              <path fill="currentColor" d="M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,90.7C672,96,768,96,864,90.7C960,85,1056,75,1152,74.7C1248,75,1344,85,1392,90.7L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
            </svg>
          </div>
        </section>

        {/* Featured Video Section - Maria's Story */}
        <section className="relative py-20 bg-gradient-to-b from-cream-50 to-masa-50 overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

              {/* Left Side - Text Content */}
              <div className="space-y-8">
                <div>
                  <span className="text-sunset-500 text-sm font-bold tracking-wider uppercase">Meet Our Founder</span>
                  <h2 className="text-5xl lg:text-6xl font-display font-black text-charcoal-950 mt-3 mb-6">
                    Maria Rodriguez
                  </h2>
                  <p className="text-2xl font-light text-charcoal-700 leading-relaxed">
                    Third-generation Texan bringing authentic H-E-B® tortillas to families nationwide
                  </p>
                </div>

                <blockquote className="relative">
                  <span className="absolute -top-4 -left-4 text-8xl text-sunset-200 font-serif">"</span>
                  <p className="relative text-xl italic text-charcoal-700 pl-8 leading-relaxed">
                    Those who know tortillas, know H-E-B®. Growing up in San Antonio, these tortillas were on our table every single day. Now I'm proud to share that same authentic Texas taste with families across America.
                  </p>
                  <cite className="block mt-4 text-sm font-medium text-charcoal-600 pl-8">
                    — Maria Rodriguez, Founder & CEO
                  </cite>
                </blockquote>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      const video = document.getElementById('maria-video') as HTMLVideoElement;
                      if (video) {
                        trackVideoPlay({ videoTitle: "Maria's Story - A Taste of Texas" });
                        video.play();
                        video.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="group flex items-center gap-4 bg-sunset-500 hover:bg-sunset-600 text-cream-50 px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span className="font-bold text-lg">Watch Maria's Story</span>
                  </button>

                  <p className="text-xs text-charcoal-500 uppercase tracking-wider">
                    Independent reseller • Not affiliated with or endorsed by H-E-B®
                  </p>
                </div>
              </div>

              {/* Right Side - Portrait Video */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[400px] lg:max-w-[450px]">
                  {/* Phone Frame Effect */}
                  <div className="relative rounded-[3rem] overflow-hidden bg-charcoal-950 p-2 shadow-2xl">
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-charcoal-900">
                      {/* Video Container - Portrait Style */}
                      <div className="relative aspect-[9/16] bg-charcoal-950">
                        <video
                          id="maria-video"
                          className="absolute inset-0 w-full h-full object-cover"
                          controls
                          poster="/images/lonestar-logo.webp"
                          preload="metadata"
                          playsInline
                        >
                          <source src="/Taste of Texas_compressed.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>

                        {/* Custom Play Button Overlay */}
                        <div
                          id="video-play-overlay"
                          className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-transparent cursor-pointer transition-opacity duration-300"
                          onClick={() => {
                            const video = document.getElementById('maria-video') as HTMLVideoElement;
                            const overlay = document.getElementById('video-play-overlay');
                            if (video && overlay) {
                              trackVideoPlay({ videoTitle: "Maria's Story - A Taste of Texas" });
                              video.play();
                              overlay.style.opacity = '0';
                              overlay.style.pointerEvents = 'none';
                            }
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: [0.9, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-cream-50/90 backdrop-blur rounded-full p-6 shadow-2xl"
                          >
                            <svg className="w-12 h-12 text-charcoal-950 ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </motion.div>

                          {/* Video Title Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-cream-50">
                            <p className="font-bold text-lg">A Taste of Texas</p>
                            <p className="text-sm opacity-80">Maria Rodriguez, Founder</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-sunset-200 rounded-full blur-3xl opacity-30 animate-pulse" />
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-masa-300 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Section - About Our Service */}
        <section className="relative py-20 bg-gradient-to-b from-cream-50 to-cream-100 overflow-hidden">
          <div className="container mx-auto px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Main Content */}
              <div className="space-y-6">
                <div>
                  <span className="text-sunset-500 text-sm font-bold tracking-wider uppercase">About Lonestar Tortillas</span>
                  <h2 className="text-4xl lg:text-5xl font-display font-black text-charcoal-950 mt-3 mb-6">
                    Bringing Authentic Texas Tortillas to Your Table
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none text-charcoal-800 space-y-4">
                  <p className="leading-relaxed">
                    At Lonestar Tortillas, we're proud to be your independent source for authentic <strong>H-E-B tortillas delivered nationwide</strong>. Those who know tortillas know H-E-B—and now families across all 50 states can enjoy the same premium Texas tortillas that Texans have trusted for generations.
                  </p>

                  <p className="leading-relaxed">
                    Whether you're in <strong>Austin, Houston, Dallas, San Antonio</strong>, or anywhere else in America, you can now order genuine H-E-B tortillas online and have them shipped directly to your door. Our shelf-stable tortillas require no refrigeration, making them perfect for your pantry and easy to ship anywhere in the country.
                  </p>

                  <p className="leading-relaxed">
                    We specialize in sourcing premium <strong>flour tortillas, corn tortillas, and butter tortillas</strong>—the same authentic products you'd find in H-E-B stores throughout Texas. Every order is carefully packed and shipped fresh, maintaining the quality and taste that H-E-B is known for.
                  </p>
                </div>
              </div>

              {/* Right Column - Key Benefits */}
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-sunset-500">
                  <h3 className="text-2xl font-bold text-charcoal-950 mb-4">Why Choose Lonestar?</h3>
                  <ul className="space-y-3 text-charcoal-700">
                    <li className="flex items-start gap-3">
                      <span className="text-sunset-500 text-xl mt-1">✓</span>
                      <span><strong>Genuine H-E-B Products:</strong> We source authentic H-E-B tortillas, the same products Texas families trust</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-sunset-500 text-xl mt-1">✓</span>
                      <span><strong>Nationwide Delivery:</strong> Serving all 50 states with reliable, fast shipping</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-sunset-500 text-xl mt-1">✓</span>
                      <span><strong>Shelf-Stable Quality:</strong> No refrigeration needed—our tortillas stay fresh in your pantry</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-sunset-500 text-xl mt-1">✓</span>
                      <span><strong>Texas Authentic:</strong> Real Texas taste, traditional recipes, premium ingredients</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-masa-50 p-6 rounded-lg">
                  <p className="text-charcoal-700 leading-relaxed">
                    Our mission is simple: make authentic Texas tortillas accessible to everyone, no matter where you live. From breakfast tacos in New York to fajita night in California, Lonestar brings the taste of Texas to your kitchen.
                  </p>
                </div>

                <p className="text-xs text-charcoal-500 uppercase tracking-wider">
                  Independent reseller • Not affiliated with or endorsed by H-E-B®
                </p>
              </div>
            </div>

            {/* Additional SEO Content - How It Works */}
            <div className="mt-16 pt-16 border-t border-charcoal-200">
              <h3 className="text-3xl font-bold text-charcoal-950 mb-8 text-center">How Lonestar Tortilla Delivery Works</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-sunset-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-sunset-600">1</span>
                  </div>
                  <h4 className="text-xl font-bold text-charcoal-950 mb-3">Order Online</h4>
                  <p className="text-charcoal-700">
                    Browse our selection of authentic H-E-B corn, flour, and butter tortillas. Choose your favorites and place your order.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-sunset-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-sunset-600">2</span>
                  </div>
                  <h4 className="text-xl font-bold text-charcoal-950 mb-3">We Source & Pack</h4>
                  <p className="text-charcoal-700">
                    We carefully source your tortillas from H-E-B and pack them securely for shipping. All products are shelf-stable and ship fresh.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-sunset-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-sunset-600">3</span>
                  </div>
                  <h4 className="text-xl font-bold text-charcoal-950 mb-3">Delivered to You</h4>
                  <p className="text-charcoal-700">
                    Your tortillas arrive at your door, ready for your pantry. No refrigeration needed—just authentic Texas taste whenever you want it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Magazine Typography Section */}
        <section className="relative py-20 bg-gradient-to-b from-masa-50 to-cream-100 overflow-hidden">
          {/* Background Video - Same as hero */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          >
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>

          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-masa-50/80 to-cream-100/90" />

          <div className="container mx-auto px-8 relative z-10">
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
                  Those who know tortillas know H-E-B®. We're your trusted independent source
                  for genuine H-E-B® products, delivering the tortillas Texas loves to connoisseurs nationwide.
                </p>
                <blockquote className="border-l-4 border-sunset-500 pl-6 py-2">
                  <p className="text-xl font-display italic text-charcoal-800">
                    "If you know tortillas, you know H-E-B®. We deliver."
                  </p>
                  <cite className="text-sm text-charcoal-600 mt-2 block">— Maria Rodriguez, Founder</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase with Horizontal Scroll */}
        <section className="horizontal-scroll min-h-[80vh] relative bg-gradient-to-b from-charcoal-950 to-charcoal-900 text-cream-50 z-10 pt-20">
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
                title: 'WHEAT',
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
                    <div className="relative w-[280px] h-[280px] mx-auto">
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
                      <h3 className="text-6xl md:text-7xl font-display font-black tracking-tighter leading-none">{product.title}</h3>
                      <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cream-200 to-transparent" />
                    </div>
                    <p className="text-xl font-light tracking-wide text-cream-100 uppercase">{product.subtitle}</p>
                    <p className="text-base text-cream-300 italic font-display opacity-80">{product.desc}</p>

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

        {/* Split Screen Editorial with Video */}
        <section className="min-h-screen flex flex-col lg:flex-row">
          {/* Left Side - Quote */}
          <div className="lg:w-1/2 bg-masa-100 flex items-center justify-center p-16 lg:p-24 relative overflow-hidden">
            <div className="absolute inset-0 noise-subtle" />
            <div className="relative z-10 slide-right">
              <span className="text-9xl font-display text-masa-300 leading-none">"</span>
              <h3 className="text-4xl lg:text-5xl font-display leading-tight mt-6 mb-8 text-charcoal-900">
                Those who<br />
                <span className="text-gradient-masa">know quality</span><br />
                choose<br />
                <span className="font-black">H-E-B® Tortillas</span>
              </h3>
            </div>
          </div>

          {/* Right Side - Video Carousel */}
          <div className="lg:w-1/2 relative h-[600px] lg:h-auto bg-charcoal-950 flex items-center justify-center p-8">
            <div className="relative w-full max-w-md mx-auto">
              {/* Video Container */}
              <div className="relative aspect-[9/16] bg-charcoal-900 rounded-2xl overflow-hidden shadow-2xl">
                <video
                  key={currentVideo}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={videos[currentVideo].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Title Overlay */}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-charcoal-950/80 to-transparent">
                  <p className="text-cream-50 font-bold text-lg">{videos[currentVideo].title}</p>
                  <p className="text-cream-200 text-sm opacity-80">@lonestartortillas</p>
                </div>

                {/* Video Navigation Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleVideoChange(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentVideo === index
                          ? 'w-8 bg-cream-50'
                          : 'bg-cream-50/50 hover:bg-cream-50/70'
                      }`}
                      aria-label={`Go to video ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Side Navigation Arrows */}
                <button
                  onClick={() => {
                    const prevIndex = (currentVideo - 1 + videos.length) % videos.length;
                    handleVideoChange(prevIndex);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream-50/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-cream-50/30 transition-colors"
                  aria-label="Previous video"
                >
                  <svg className="w-5 h-5 text-cream-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    const nextIndex = (currentVideo + 1) % videos.length;
                    handleVideoChange(nextIndex);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream-50/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-cream-50/30 transition-colors"
                  aria-label="Next video"
                >
                  <svg className="w-5 h-5 text-cream-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Video Thumbnails Below */}
              <div className="flex gap-4 mt-6 justify-center">
                {videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => handleVideoChange(index)}
                    className={`relative w-20 h-32 rounded-lg overflow-hidden transition-all duration-300 ${
                      currentVideo === index
                        ? 'ring-2 ring-sunset-500 scale-105'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <video
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent" />
                    <p className="absolute bottom-1 left-0 right-0 text-[10px] text-cream-50 text-center px-1 truncate">
                      {video.title}
                    </p>
                  </button>
                ))}
              </div>
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
              <p className="text-2xl lg:text-3xl font-display italic text-gradient relative z-30">Lonestar Tortillas</p>
            </div>

            <div className="stagger-container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  ),
                  title: 'GENUINE H-E-B®',
                  desc: 'The same products Texas trusts, sourced and delivered',
                  gradient: 'from-sunset-400 to-sunset-600',
                  bgImage: '/images/Cards/image (8).png'
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
                  gradient: 'from-masa-400 to-masa-600',
                  bgImage: '/images/Cards/image (9).png'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4"/>
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                    </svg>
                  ),
                  title: 'EXPERT SOURCING',
                  desc: 'We know H-E-B® quality and deliver it nationwide',
                  gradient: 'from-lime-500 to-lime-700',
                  bgImage: '/images/Cards/image (10).png'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ),
                  title: 'PREMIUM VALUE',
                  desc: 'Big flavor, fair prices, no bull',
                  gradient: 'from-sunset-500 to-masa-500',
                  bgImage: '/images/Cards/image (11).png'
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
                  gradient: 'from-cream-400 to-cream-600',
                  bgImage: '/images/Cards/image (12).png'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  ),
                  title: 'HAPPINESS GUARANTEE',
                  desc: 'Love em or we will make it right',
                  gradient: 'from-charcoal-600 to-charcoal-400',
                  bgImage: '/images/Cards/image (13).png'
                },
              ].map((feature, i) => (
                <div key={i} className="stagger-item group">
                  <div className="relative bg-charcoal-800/50 backdrop-blur-sm border border-cream-200/10 overflow-hidden hover:bg-charcoal-800/70 transition-all duration-500 hover-lift">
                    {/* Background image - subtle and opaque */}
                    <div
                      className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                      style={{
                        backgroundImage: `url('${feature.bgImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(0.5px)'
                      }}
                    />

                    {/* Content Container with padding */}
                    <div className="relative z-10 p-8">
                      {/* Gradient accent */}
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`} />

                      {/* Icon */}
                      <div className={`text-6xl mb-6 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        {feature.icon}
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-cream-50 mb-3 tracking-wide">{feature.title}</h3>
                      <p className="text-cream-300 leading-relaxed">{feature.desc}</p>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
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

        {/* Guides & Tips Section */}
        <section className="py-20 bg-gradient-to-b from-masa-50 to-cream-50 relative overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-6xl lg:text-7xl font-display font-black text-charcoal-950 mb-6 reveal-text">
                GUIDES & TIPS
              </h2>
              <p className="text-2xl text-charcoal-700 max-w-3xl mx-auto slide-left">
                Master the art of tortillas with our expert guides
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                <Link href="/guides/how-to-store-tortillas" className="block">
                  <div className="p-8">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-sunset-100 text-sunset-600 group-hover:bg-sunset-600 group-hover:text-white transition-all duration-300">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal-950 mb-4 group-hover:text-sunset-600 transition-colors">
                      How to Store Tortillas
                    </h3>
                    <p className="text-charcoal-700 leading-relaxed mb-6">
                      Keep your tortillas fresh for weeks with proper storage. Learn room temperature, refrigeration, and freezing methods.
                    </p>
                    <span className="text-sunset-600 font-semibold group-hover:translate-x-2 inline-flex items-center gap-2 transition-transform">
                      Read Guide
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-sunset-500 to-masa-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </div>

              <div className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                <Link href="/guides/how-to-reheat-tortillas" className="block">
                  <div className="p-8">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-masa-100 text-masa-600 group-hover:bg-masa-600 group-hover:text-white transition-all duration-300">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal-950 mb-4 group-hover:text-masa-600 transition-colors">
                      How to Reheat Tortillas
                    </h3>
                    <p className="text-charcoal-700 leading-relaxed mb-6">
                      Warm tortillas to perfection every time. Master stovetop, microwave, and oven techniques for soft, pliable results.
                    </p>
                    <span className="text-masa-600 font-semibold group-hover:translate-x-2 inline-flex items-center gap-2 transition-transform">
                      Read Guide
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-masa-500 to-rust-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </div>

              <div className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                <Link href="/guides/corn-vs-flour-tortillas" className="block">
                  <div className="p-8">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-rust-100 text-rust-600 group-hover:bg-rust-600 group-hover:text-white transition-all duration-300">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal-950 mb-4 group-hover:text-rust-600 transition-colors">
                      Corn vs Flour Tortillas
                    </h3>
                    <p className="text-charcoal-700 leading-relaxed mb-6">
                      Which tortilla is right for you? Compare taste, texture, nutrition, and best uses for each type.
                    </p>
                    <span className="text-rust-600 font-semibold group-hover:translate-x-2 inline-flex items-center gap-2 transition-transform">
                      Read Guide
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-rust-500 to-sunset-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/guides"
                className="inline-block bg-charcoal-950 hover:bg-charcoal-800 text-cream-50 px-10 py-4 rounded-lg font-bold text-lg tracking-wide uppercase transition-colors shadow-xl"
              >
                View All Guides
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Recipe Section */}
        <section className="py-20 bg-gradient-to-b from-cream-50 to-sunset-50 relative overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-6xl lg:text-7xl font-display font-black text-charcoal-950 mb-6 reveal-text">
                FROM OUR KITCHEN
              </h2>
              <p className="text-2xl text-charcoal-700 max-w-3xl mx-auto slide-left">
                Authentic Texas recipes that showcase quality tortillas
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Link href="/recipes/breakfast-tacos" className="group block">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                  <div className="grid md:grid-cols-2">
                    {/* Image Side */}
                    <div className="relative h-80 md:h-auto bg-gradient-to-br from-sunset-200 via-masa-200 to-rust-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white/60">
                          <svg className="w-32 h-32 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <p className="text-lg font-medium">Recipe Image</p>
                        </div>
                      </div>
                      <div className="absolute top-6 right-6 bg-sunset-600 text-white px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg">
                        Featured Recipe
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-10 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="inline-block bg-sunrise-100 text-sunrise-700 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                          Breakfast
                        </span>
                      </div>

                      <h3 className="text-4xl font-bold text-charcoal-950 mb-4 group-hover:text-sunset-600 transition-colors">
                        Texas-Style Breakfast Tacos
                      </h3>

                      <p className="text-lg text-charcoal-700 leading-relaxed mb-6">
                        Authentic Texas breakfast tacos with fluffy scrambled eggs, crispy bacon, melted cheese,
                        and fresh tortillas. Ready in just 15 minutes!
                      </p>

                      <div className="flex flex-wrap gap-4 mb-8 text-charcoal-600">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">15 minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="font-medium">4 servings</span>
                        </div>
                        <div>
                          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                            Easy
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sunset-600 font-bold text-lg group-hover:translate-x-2 inline-flex items-center gap-2 transition-transform">
                          View Full Recipe
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-sunset-500 via-masa-500 to-rust-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>

              <div className="text-center mt-12">
                <Link
                  href="/recipes"
                  className="inline-block bg-charcoal-950 hover:bg-charcoal-800 text-cream-50 px-10 py-4 rounded-lg font-bold text-lg tracking-wide uppercase transition-colors shadow-xl"
                >
                  More Recipes Coming Soon
                </Link>
              </div>
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
                Genuine H-E-B® tortillas delivered nationwide - now available!
              </p>

              <div className="flex flex-wrap gap-6 justify-center mt-12 scale-in">
                <Link href="/shop" className="group relative overflow-hidden bg-sunset-500 text-cream-50 px-12 py-6 text-xl font-bold tracking-wide uppercase hover-glow">
                  <span className="relative z-10">Shop Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-sunset-600 to-sunset-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </Link>

                <Link href="/story" className="border-2 border-cream-50 text-cream-50 px-12 py-6 text-xl font-bold tracking-wide uppercase hover:bg-cream-50 hover:text-charcoal-950 transition-all duration-300">
                  Our Story
                </Link>
              </div>

              <p className="text-sm text-cream-400 mt-12 tracking-wider uppercase">
                Independent reseller • Not affiliated with or endorsed by H-E-B®
              </p>
            </div>
          </div>
        </section>

        {/* Premium Footer */}
        <footer className="bg-charcoal-950 border-t border-masa-800/20 py-16 relative overflow-hidden">
          <div className="absolute inset-0 noise-subtle opacity-20" />

          <div className="container mx-auto px-8 relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Logo and Description */}
              <div>
                <LogoFull className="text-cream-50 mb-6" />
                <p className="text-cream-300 leading-relaxed mb-4">
                  Your trusted independent source for genuine H-E-B® tortillas, delivered nationwide.
                </p>
                <div className="space-y-2 text-cream-400 text-sm">
                  <p>howdy@lonestartortilla.com</p>
                  <p>Austin, Texas</p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-cream-50 font-bold text-sm tracking-wider uppercase mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <Link href="/shop" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Shop All Products</Link>
                  <Link href="/locations" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Delivery Locations</Link>
                  <Link href="/guides" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Guides & Tips</Link>
                  <Link href="/recipes" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Recipes</Link>
                  <Link href="/blog" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Blog</Link>
                  <Link href="/track" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Track Order</Link>
                  <Link href="/faq" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">FAQ</Link>
                  <Link href="/story" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Our Story</Link>
                  <Link href="/craft" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Our Source</Link>
                </div>
                <h4 className="text-cream-50 font-bold text-sm tracking-wider uppercase mb-4 mt-6">Popular Cities</h4>
                <div className="space-y-2">
                  <Link href="/los-angeles" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Los Angeles</Link>
                  <Link href="/new-york" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">New York</Link>
                  <Link href="/seattle" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Seattle</Link>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-cream-50 font-bold text-sm tracking-wider uppercase mb-4">Products</h4>
                <div className="space-y-2">
                  <Link href="/products/corn-tortillas" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Corn Tortillas</Link>
                  <Link href="/products/flour-tortillas" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Flour Tortillas</Link>
                  <Link href="/products/butter-tortillas" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Butter Tortillas</Link>
                  <Link href="/products/specialty-tortillas" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Specialty Varieties</Link>
                </div>
                <h4 className="text-cream-50 font-bold text-sm tracking-wider uppercase mb-4 mt-6">For Restaurants</h4>
                <div className="space-y-2">
                  <Link href="/restaurants/food-trucks" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Food Trucks</Link>
                  <Link href="/restaurants/bbq" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">BBQ Restaurants</Link>
                  <Link href="/restaurants/mexican" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Mexican Restaurants</Link>
                  <Link href="/restaurants/tex-mex" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Tex-Mex</Link>
                  <Link href="/restaurants/taco-shops" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Taco Shops</Link>
                  <Link href="/restaurants/catering" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Catering</Link>
                  <Link href="/restaurants/breakfast" className="block text-cream-400 hover:text-sunset-400 transition-colors text-sm">Breakfast &amp; Brunch</Link>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h4 className="text-cream-50 font-bold text-sm tracking-wider uppercase mb-4">Contact Us</h4>
                <ContactForm />
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-masa-800/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-cream-500">© 2025 Lonestar Tortillas. All rights reserved.</p>
              <p className="text-xs text-cream-600 tracking-wider uppercase text-center">
                Independent reseller • Not affiliated with or endorsed by H-E-B®
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ScrollAnimations>
  )
}