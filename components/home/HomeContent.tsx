'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import {
  TortillaStackIcon,
  ComalIcon,
  WheatIcon,
  ShipBoxIcon,
  TexasStarIcon,
  CalendarTuesdayIcon,
  RouteIcon,
} from '@/components/ui/Icons'
import { DisclaimerBanner } from '@/components/DisclaimerBanner'
import { trackVideoPlay } from '@/lib/analytics'
import { useLanguage } from '@/lib/language-context'

/** Safely renders text that may contain <strong> tags without dangerouslySetInnerHTML */
function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(<strong>.*?<\/strong>)/g);
  return (
    <p className={className}>
      {parts.map((part, i) => {
        const match = part.match(/^<strong>(.*?)<\/strong>$/);
        if (match) {
          return <strong key={i}>{match[1]}</strong>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </p>
  );
}

// Lazy-load heavy animation components - not needed for initial render
const ScrollAnimations = dynamic(
  () => import('@/components/ScrollAnimations').then(mod => ({ default: mod.ScrollAnimations })),
  { ssr: false }
)

export default function HomeContent() {
  const { t } = useLanguage();
  const [currentVideo, setCurrentVideo] = useState(0);

  // Respect prefers-reduced-motion for all autoplaying media
  const [reducedMotion, setReducedMotion] = useState(false);

  const heroSectionRef = useRef<HTMLElement>(null);

  // Video carousel: only play while the section is in view (and motion is OK)
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselVideoRef = useRef<HTMLVideoElement>(null);
  const [carouselInView, setCarouselInView] = useState(false);

  // Maria's Story video: autoplay muted while in view, pause out of view
  const mariaFrameRef = useRef<HTMLDivElement>(null);
  const mariaVideoRef = useRef<HTMLVideoElement>(null);
  const [mariaInView, setMariaInView] = useState(false);
  const mariaAutoplayTracked = useRef(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Observe the carousel section to start/stop playback with visibility.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setCarouselInView(entries.some((entry) => entry.isIntersecting));
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play/pause the current carousel video based on visibility + motion pref.
  // currentVideo is a dependency because the <video> remounts on change (key).
  useEffect(() => {
    const video = carouselVideoRef.current;
    if (!video || reducedMotion) return;
    if (carouselInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [carouselInView, currentVideo, reducedMotion]);

  // Observe the Maria's Story phone frame (same pattern as the carousel observer).
  useEffect(() => {
    const el = mariaFrameRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setMariaInView(entries.some((entry) => entry.isIntersecting));
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autoplay Maria's video MUTED when scrolled into view; pause when out of
  // view. Controls stay available so visitors can unmute. Tracks the play
  // event once on first autoplay.
  useEffect(() => {
    const video = mariaVideoRef.current;
    if (!video || reducedMotion) return;
    if (mariaInView) {
      video.muted = true; // browser autoplay policies require muted playback
      video
        .play()
        .then(() => {
          if (!mariaAutoplayTracked.current) {
            mariaAutoplayTracked.current = true;
            trackVideoPlay({ videoTitle: "Maria's Story - A Taste of Texas" });
          }
          const overlay = document.getElementById('video-play-overlay');
          if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
          }
        })
        .catch(() => {});
    } else {
      video.pause();
    }
  }, [mariaInView, reducedMotion]);

  const videos = [
    { src: '/Taste of Texas_compressed.mp4', title: 'Taste of Texas' },
    { src: '/tiks/H-E-B Tortillas_ Ride With Us_compressed.mp4', title: 'Ride With Us' },
    { src: '/tiks/Texan Tortilla Secret_compressed.mp4', title: 'Texan Secret' }
  ];

  // Track video play and switch video
  const handleVideoChange = (index: number) => {
    trackVideoPlay({ videoTitle: videos[index].title });
    setCurrentVideo(index);
  };

  return (
    <>
      {/* Effect-only animation controller — rendered as a sibling so the
          content below server-renders (it previously wrapped everything via
          an ssr:false dynamic import, which shipped empty HTML) */}
      <ScrollAnimations />

      {/* HEB Disclaimer - Homepage only */}
      <DisclaimerBanner />

      <div className="relative bg-cream-50 text-charcoal-950 overflow-hidden">
        {/* Hero — Asymmetric split: editorial type left, photography right */}
        <section ref={heroSectionRef} className="relative min-h-screen grid lg:grid-cols-12 overflow-hidden" id="hero-section">
          {/* Left: type panel */}
          <div className="lg:col-span-6 xl:col-span-5 flex items-center bg-gradient-to-b from-cream-50 to-cream-100 relative">
            <div className="w-full px-6 sm:px-10 lg:pl-14 lg:pr-10 pt-36 pb-16 lg:pt-32 lg:pb-12">
              {/* Quality badge */}
              <div className="mb-6 reveal-text">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] sm:tracking-[0.4em] uppercase text-masa-700">
                  {t('hero.badge')}
                </span>
              </div>

              {/* SEO-optimized H1, anchored left */}
              <h1 className="mb-8">
                <span className="block font-black leading-[0.85] tracking-[-0.02em] text-charcoal-950 text-[clamp(44px,7vw,92px)]">
                  LONESTAR
                </span>
                <span className="block font-display font-light italic leading-[0.95] text-sunset-600 text-[clamp(34px,5vw,68px)] mt-1">
                  Tortillas
                </span>
                <span className="sr-only">- Authentic H-E-B® Tortillas Delivered Nationwide</span>
              </h1>

              {/* Rule + established */}
              <div className="flex items-center gap-4 mb-8">
                <span aria-hidden="true" className="block w-14 h-[2px] bg-sunset-500" />
                <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-charcoal-500">
                  {t('hero.established')}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-base lg:text-lg font-semibold tracking-[0.15em] text-charcoal-700 uppercase mb-2 max-w-md text-pretty">
                {t('hero.tagline')}
              </p>
              <p className="text-lg lg:text-xl font-display font-light italic text-masa-700 mb-10 max-w-md text-pretty">
                {t('hero.subtagline')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop" className="w-full sm:w-auto bg-sunset-600 hover:bg-sunset-700 text-cream-50 px-8 py-4 text-base font-bold tracking-wider uppercase transition-colors shadow-medium text-center">
                  {t('hero.cta.shop')}
                </Link>
                <Link href="/story" className="w-full sm:w-auto border-2 border-charcoal-950 text-charcoal-950 hover:bg-charcoal-950 hover:text-cream-50 px-8 py-4 text-base font-bold tracking-wider uppercase transition-colors text-center">
                  {t('hero.cta.story')}
                </Link>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] sm:text-xs text-charcoal-500 mt-8 tracking-wide uppercase">
                {t('disclaimer.short')}
              </p>
            </div>
          </div>

          {/* Right: full-height photography */}
          <div className="lg:col-span-6 xl:col-span-7 relative min-h-[55vh] lg:min-h-screen">
            <Image
              src="/images/brand/hero-editorial.webp"
              alt="Stack of fresh flour tortillas steaming on a comal"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
              priority
            />
            {/* Seam blend into the type panel */}
            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream-100 to-transparent hidden lg:block" />
            {/* Floating proof chip */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-8 bg-cream-50/95 backdrop-blur rounded-xl px-5 py-3 shadow-large flex items-center gap-3">
              <CalendarTuesdayIcon className="w-7 h-7 text-sunset-600 shrink-0" />
              <span className="leading-tight">
                <span className="block font-display text-lg font-bold text-sunset-600">Fast delivery</span>
                <span className="block text-xs font-medium text-charcoal-700">We ship Tuesdays to maximize freshness.</span>
              </span>
            </div>
          </div>
        </section>

        {/* Featured Video Section - Maria's Story */}
        <section className="relative py-14 bg-gradient-to-b from-cream-50 to-masa-50 overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

              {/* Left Side - Text Content */}
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-sunset-700 mb-2">{t('founder.label')}</p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-balance text-charcoal-950 mb-3">
                    {t('founder.name')}
                  </h2>
                  <p className="text-lg text-charcoal-600 leading-relaxed text-pretty max-w-prose">
                    {t('founder.title')}
                  </p>
                </div>

                <blockquote className="relative">
                  <span className="absolute -top-4 -left-4 text-8xl text-sunset-200 font-serif">"</span>
                  <p className="relative text-xl italic text-charcoal-700 pl-8 leading-relaxed">
                    {t('founder.quote')}
                  </p>
                  <cite className="block mt-4 text-sm font-medium text-charcoal-600 pl-8">
                    — {t('founder.attribution')}
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
                    className="group flex items-center gap-4 bg-sunset-600 hover:bg-sunset-700 text-cream-50 px-8 py-4 rounded-full transition-all duration-300 shadow-medium hover:shadow-large"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span className="font-bold text-lg">{t('founder.watchStory')}</span>
                  </button>

                  <p className="text-xs text-charcoal-500 uppercase tracking-wider">
                    {t('disclaimer.short')}
                  </p>
                </div>
              </div>

              {/* Right Side - Portrait Video */}
              <div className="relative flex justify-center lg:justify-end">
                <div ref={mariaFrameRef} className="relative w-full max-w-[400px] lg:max-w-[450px]">
                  {/* Phone Frame Effect */}
                  <div className="relative rounded-[3rem] overflow-hidden bg-charcoal-950 p-2 shadow-large">
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-charcoal-900">
                      {/* Video Container - Portrait Style */}
                      <div className="relative aspect-[9/16] bg-charcoal-950">
                        <video
                          id="maria-video"
                          ref={mariaVideoRef}
                          className="absolute inset-0 w-full h-full object-cover"
                          controls
                          muted
                          poster="/images/lonestar-logo.webp"
                          preload="metadata"
                          playsInline
                        >
                          <source src="/Taste of Texas_compressed.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>

                        {/* Custom Play Button Overlay */}
                        <button
                          type="button"
                          id="video-play-overlay"
                          aria-label="Play video: Maria's Story"
                          className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-transparent cursor-pointer transition-opacity duration-300 text-left"
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
                          <div
                            className="bg-cream-50/90 backdrop-blur rounded-full p-6 shadow-large"
                          >
                            <svg className="w-12 h-12 text-charcoal-950 ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>

                          {/* Video Title Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-cream-50">
                            <p className="font-bold text-lg">{t('founder.videoTitle')}</p>
                            <p className="text-sm opacity-80">{t('founder.videoSubtitle')}</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-sunset-200 rounded-full blur-3xl opacity-30" />
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-masa-300 rounded-full blur-2xl opacity-30" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Section - About Our Service */}
        <section className="relative py-14 bg-gradient-to-b from-cream-50 to-cream-100 overflow-hidden">
          <div className="container mx-auto px-8 max-w-6xl">
            {/* Editorial header — left-aligned */}
            <div className="mb-8 md:mb-10">
              <p className="text-sm font-bold uppercase tracking-widest text-sunset-700 mb-2">{t('about.label')}</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-balance text-charcoal-950">
                {t('about.title')}
              </h2>
            </div>

            {/* Asymmetric 5/7 split — photography left, benefits right */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Image — 5 cols */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-large">
                  <Image
                    src="/images/brand/texture-comal.webp"
                    alt="Flour tortillas blistering on a seasoned comal"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content — 7 cols */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-4 text-charcoal-700">
                  <RichText text={t('about.intro1')} className="leading-relaxed" />
                  <RichText text={t('about.intro2')} className="leading-relaxed" />
                  <RichText text={t('about.intro3')} className="leading-relaxed" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-charcoal-950 mb-4">{t('about.whyChoose')}</h3>
                  <ul className="space-y-3 text-charcoal-700">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sunset-600 mt-1 flex-shrink-0" aria-hidden="true" />
                      <span><strong>{t('about.benefits.genuine.title')}</strong> {t('about.benefits.genuine.text')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sunset-600 mt-1 flex-shrink-0" aria-hidden="true" />
                      <span><strong>{t('about.benefits.nationwide.title')}</strong> {t('about.benefits.nationwide.text')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sunset-600 mt-1 flex-shrink-0" aria-hidden="true" />
                      <span><strong>{t('about.benefits.shelfStable.title')}</strong> {t('about.benefits.shelfStable.text')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sunset-600 mt-1 flex-shrink-0" aria-hidden="true" />
                      <span><strong>{t('about.benefits.authentic.title')}</strong> {t('about.benefits.authentic.text')}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-masa-50 p-6 rounded-xl">
                  <p className="text-charcoal-700 leading-relaxed">
                    {t('about.mission')}
                  </p>
                </div>

                <p className="text-xs text-charcoal-500 uppercase tracking-wider">
                  {t('disclaimer.short')}
                </p>
              </div>
            </div>

            {/* Additional SEO Content - How It Works — editorial timeline */}
            <div className="mt-12 pt-12 border-t border-charcoal-200">
              <div className="flex items-baseline gap-3 mb-10">
                <h3 className="font-display text-2xl font-bold text-balance text-charcoal-950">{t('howItWorks.title')}</h3>
                <span aria-hidden="true" className="hidden md:block flex-1 h-px bg-masa-200" />
              </div>
              <ol className="grid gap-10 md:grid-cols-3 md:gap-0">
                {[
                  { Icon: CalendarTuesdayIcon, title: t('howItWorks.step1.title'), text: t('howItWorks.step1.text') },
                  { Icon: ComalIcon, title: t('howItWorks.step2.title'), text: t('howItWorks.step2.text') },
                  { Icon: RouteIcon, title: t('howItWorks.step3.title'), text: t('howItWorks.step3.text') },
                ].map(({ Icon, title, text }, i) => (
                  <li key={i} className="group relative md:pr-10">
                    {/* Icon marker + thin connecting rule to the next step */}
                    <div className="flex items-center gap-4 mb-4">
                      <Icon className="w-6 h-6 text-sunset-600 shrink-0" />
                      <span aria-hidden="true" className="hidden md:block h-px flex-1 -mr-6 bg-masa-200 group-last:hidden" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-charcoal-950 mb-2">{title}</h4>
                    <p className="text-charcoal-600 text-pretty">{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Magazine Typography Section — Editorial Offset */}
        <section className="relative py-14 bg-gradient-to-b from-masa-50 to-cream-100 overflow-hidden">
          <div className="container mx-auto px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
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
                  <span className="block text-3xl md:text-4xl lg:text-5xl font-display italic font-light text-masa-700 mt-3">
                    makes
                  </span>
                </h2>
              </div>

              {/* Right Column - Editorial image + text */}
              <div className="lg:col-span-5 space-y-6 slide-right">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-large -rotate-1">
                  <Image
                    src="/images/brand/story-hands.webp"
                    alt="Hands pressing masa dough in a cast iron tortilla press"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-lg leading-relaxed text-charcoal-700 text-pretty max-w-prose">
                  Those who know Texas tortillas, know quality. We're your trusted independent source
                  for authentic Texas products, delivering the tortillas Texas loves to connoisseurs nationwide.
                </p>
                <blockquote className="border-l-4 border-sunset-500 pl-6 py-2">
                  <p className="text-xl font-display italic text-charcoal-800">
                    "Those who know Texas tortillas, know quality."
                  </p>
                  <cite className="text-sm text-charcoal-600 mt-2 block">— Maria Rodriguez, Founder</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase with Horizontal Scroll */}
        <section className="horizontal-scroll min-h-[80vh] relative bg-gradient-to-b from-charcoal-950 to-charcoal-900 text-cream-50 z-10 pt-14">
          {/* Section header — editorial conventions on dark */}
          <div className="container mx-auto px-8">
            <p className="text-sm font-bold uppercase tracking-widest text-sunset-400 mb-2">What We Ship</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-balance text-cream-50">
              The Tortilla Lineup
            </h2>
          </div>

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
                    <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-cream-200/20 to-transparent blur-xl" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-sunset-300/20 to-transparent blur-xl" />

                    {/* Main product image */}
                    <div className="relative w-[280px] h-[280px] mx-auto">
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-40 rounded-full blur-2xl scale-110 group-hover:scale-125 transition-transform duration-1000`} />
                      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cream-200/10 shadow-large">
                        <Image
                          src={product.img}
                          alt=""
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
                      <span className="inline-block w-32 h-px bg-gradient-to-r from-transparent via-sunset-400 to-transparent" />
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
            <div className="relative z-10 slide-right">
              <span className="text-9xl font-display text-masa-300 leading-none">"</span>
              <h3 className="text-4xl lg:text-5xl font-display leading-tight mt-6 mb-8 text-charcoal-900">
                Those who<br />
                <span className="text-gradient-masa">know Texas</span><br />
                <span className="font-black">tortillas,</span><br />
                <span className="text-gradient-masa">know quality</span>
              </h3>
            </div>
          </div>

          {/* Right Side - Video Carousel */}
          <div ref={carouselRef} className="lg:w-1/2 relative h-[600px] lg:h-auto bg-charcoal-950 flex items-center justify-center p-8">
            <div className="relative w-full max-w-md mx-auto">
              {/* Video Container - playback starts via IntersectionObserver
                  when the section is in view (no autoPlay attribute) */}
              <div className="relative aspect-[9/16] bg-charcoal-900 rounded-2xl overflow-hidden shadow-large">
                <video
                  key={currentVideo}
                  ref={carouselVideoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/images/lonestar-logo.webp"
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
                  {videos.map((video, index) => (
                    <button
                      key={index}
                      onClick={() => handleVideoChange(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentVideo === index
                          ? 'w-8 bg-cream-50'
                          : 'bg-cream-50/50 hover:bg-cream-50/70'
                      }`}
                      aria-label={`Play video ${index + 1}: ${video.title}`}
                      aria-current={currentVideo === index ? 'true' : undefined}
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

              {/* Video Thumbnails Below - Static images instead of video elements */}
              <div className="flex gap-4 mt-6 justify-center">
                {videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => handleVideoChange(index)}
                    className={`relative w-20 h-32 rounded-lg overflow-hidden transition-all duration-300 bg-charcoal-800 ${
                      currentVideo === index
                        ? 'ring-2 ring-sunset-500 scale-105'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-8 h-8 text-cream-50/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
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
        <section className="py-14 bg-gradient-to-b from-charcoal-950 to-charcoal-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-sunset-500/10 to-transparent blur-3xl" />
          </div>

          <div className="container mx-auto px-8 relative z-20">
            <div className="text-center mx-auto max-w-2xl mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-balance text-cream-50 reveal-text relative z-30">
                {t('features.title')}
              </h2>
              <p className="mt-3 text-lg text-cream-200 relative z-30 text-pretty">{t('features.subtitle')}</p>
            </div>

            <div className="stagger-container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <TortillaStackIcon className="w-12 h-12 mx-auto" />,
                  title: 'GENUINE H-E-B®',
                  desc: 'The same products Texas trusts, sourced and delivered',
                  gradient: 'from-sunset-400 to-sunset-600',
                  bgImage: '/images/Cards/image (8).webp'
                },
                {
                  icon: <RouteIcon className="w-12 h-12 mx-auto" />,
                  title: 'NATIONWIDE DELIVERY',
                  desc: 'Shelf-stable goodness shipped to all 50 states',
                  gradient: 'from-masa-400 to-masa-600',
                  bgImage: '/images/Cards/image (9).webp'
                },
                {
                  icon: <ComalIcon className="w-12 h-12 mx-auto" />,
                  title: 'EXPERT SOURCING',
                  desc: 'We know H-E-B® quality and deliver it nationwide',
                  gradient: 'from-lime-500 to-lime-700',
                  bgImage: '/images/Cards/image (10).webp'
                },
                {
                  icon: <TexasStarIcon className="w-12 h-12 mx-auto" />,
                  title: 'PREMIUM VALUE',
                  desc: 'Big flavor, fair prices, no bull',
                  gradient: 'from-sunset-500 to-masa-500',
                  bgImage: '/images/Cards/image (11).webp'
                },
                {
                  icon: <ShipBoxIcon className="w-12 h-12 mx-auto" />,
                  title: 'SHELF-STABLE',
                  desc: 'No refrigeration needed - pantry-ready!',
                  gradient: 'from-cream-400 to-cream-600',
                  bgImage: '/images/Cards/image (12).webp'
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
                  bgImage: '/images/Cards/image (13).webp'
                },
              ].map((feature, i) => (
                <div key={i} className="stagger-item group">
                  <div className="relative bg-charcoal-800/50 backdrop-blur-sm border border-cream-200/10 rounded-xl overflow-hidden hover:bg-charcoal-800/70 transition-all duration-500 hover-lift">
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

                      {/* Icon — solid sunset accent (bg-clip-text rendered stroked
                          SVGs invisible since currentColor resolved to transparent) */}
                      <div className="mb-6 text-sunset-400">
                        {feature.icon}
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold text-cream-50 mb-3 tracking-wide">{feature.title}</h3>
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
        <section className="py-12 bg-gradient-to-b from-cream-50 via-cream-100 to-masa-50 relative overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="mb-10">
              <p className="text-sm font-bold uppercase tracking-widest text-sunset-700 mb-2">Pantry Ready</p>
              <div className="flex items-baseline gap-3">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-balance text-charcoal-950 reveal-text">
                  Our Treasures
                </h2>
                <span aria-hidden="true" className="hidden md:block flex-1 h-px bg-masa-200" />
              </div>
              <p className="text-lg text-charcoal-600 mt-3 slide-left text-pretty max-w-prose">Shelf-stable Texas gold, ready for your pantry</p>
              <p className="text-base text-charcoal-600 mt-2 text-pretty max-w-prose">
                Made fresh, sealed for shipping — no refrigeration needed until opened.
              </p>
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-charcoal-600">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Ships Nationwide
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sunset-500 rounded-full"></span>
                  Freshness First Shipping
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-masa-500 rounded-full"></span>
                  Shipping to All 50 States
                </span>
              </div>
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
                  accent: 'text-masa-700',
                  shadow: 'shadow-masa'
                },
                {
                  name: 'WILD CARDS',
                  type: 'Specialty Varieties',
                  style: 'Shelf-Stable • Limited Edition',
                  badge: 'Coming Soon',
                  gradient: 'bg-gradient-to-br from-lime-100 to-lime-200',
                  accent: 'text-lime-700',
                  shadow: 'shadow-medium'
                }
              ].map((product, i) => (
                <Link href="/shop" key={i} className="scale-in group block cursor-pointer">
                  <div className={`relative ${product.gradient} rounded-xl p-12 h-80 flex flex-col justify-between overflow-hidden hover-lift hover:shadow-large hover:-translate-y-1 ${product.shadow} transition-all duration-500`}>
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
                      {/* Shop CTA indicator */}
                      <p className="text-sm mt-3 font-semibold text-sunset-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                        Shop Now →
                      </p>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-charcoal-950 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Guides & Tips Section */}
        <section className="py-14 bg-gradient-to-b from-masa-50 to-cream-50 relative overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="text-center mx-auto max-w-2xl mb-10">
              <p className="text-sm font-bold uppercase tracking-widest text-sunset-700 mb-2">Know-How</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-balance text-charcoal-950 reveal-text">
                {t('guides.title')}
              </h2>
              <p className="mt-3 text-lg text-charcoal-600 slide-left text-pretty">
                {t('guides.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="group bg-white rounded-xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden hover:-translate-y-2">
                <Link href="/guides/how-to-store-tortillas" className="block">
                  <div className="p-8">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-sunset-100 text-sunset-600 group-hover:bg-sunset-600 group-hover:text-white transition-all duration-300">
                      <TortillaStackIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal-950 mb-4 group-hover:text-sunset-600 transition-colors">
                      How to Store Tortillas
                    </h3>
                    <p className="text-charcoal-700 leading-relaxed mb-6">
                      Keep your tortillas fresh for weeks with proper storage. Learn room temperature, refrigeration, and freezing methods.
                    </p>
                    <span className="text-sunset-700 font-semibold group-hover:translate-x-2 inline-flex items-center gap-2 transition-transform">
                      Read Guide
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-sunset-500 to-masa-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </div>

              <div className="group bg-white rounded-xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden hover:-translate-y-2">
                <Link href="/guides/how-to-reheat-tortillas" className="block">
                  <div className="p-8">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-masa-100 text-masa-700 group-hover:bg-masa-600 group-hover:text-white transition-all duration-300">
                      <ComalIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal-950 mb-4 group-hover:text-masa-700 transition-colors">
                      How to Reheat Tortillas
                    </h3>
                    <p className="text-charcoal-700 leading-relaxed mb-6">
                      Warm tortillas to perfection every time. Master stovetop, microwave, and oven techniques for soft, pliable results.
                    </p>
                    <span className="text-masa-700 font-semibold group-hover:translate-x-2 inline-flex items-center gap-2 transition-transform">
                      Read Guide
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-masa-500 to-rust-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </div>

              <div className="group bg-white rounded-xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden hover:-translate-y-2">
                <Link href="/guides/corn-vs-flour-tortillas" className="block">
                  <div className="p-8">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-rust-100 text-rust-600 group-hover:bg-rust-600 group-hover:text-white transition-all duration-300">
                      <WheatIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal-950 mb-4 group-hover:text-rust-600 transition-colors">
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
                className="inline-block bg-charcoal-950 hover:bg-charcoal-800 text-cream-50 px-10 py-4 rounded-lg font-bold text-lg tracking-wide uppercase transition-colors shadow-medium"
              >
                {t('guides.viewAll')}
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Recipe Section */}
        <section className="py-14 bg-gradient-to-b from-cream-50 to-sunset-50 relative overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="mb-10">
              <p className="text-sm font-bold uppercase tracking-widest text-sunset-700 mb-2">From Our Kitchen</p>
              <div className="flex items-baseline gap-3">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-balance text-charcoal-950 reveal-text">
                  {t('recipes.title')}
                </h2>
                <span aria-hidden="true" className="hidden md:block flex-1 h-px bg-masa-200" />
              </div>
              <p className="text-lg text-charcoal-600 mt-3 max-w-prose slide-left text-pretty">
                {t('recipes.subtitle')}
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Link href="/recipes/breakfast-tacos" className="group block">
                <div className="bg-white rounded-2xl shadow-medium overflow-hidden hover:shadow-large transition-all duration-500 hover:-translate-y-2">
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
                      <div className="absolute top-6 right-6 bg-sunset-600 text-white px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider shadow-medium">
                        Featured Recipe
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-10 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="inline-block bg-sunset-100 text-sunset-700 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                          Breakfast
                        </span>
                      </div>

                      <h3 className="text-2xl font-semibold text-charcoal-950 mb-4 group-hover:text-sunset-600 transition-colors">
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
                  className="inline-block bg-charcoal-950 hover:bg-charcoal-800 text-cream-50 px-10 py-4 rounded-lg font-bold text-lg tracking-wide uppercase transition-colors shadow-medium"
                >
                  {t('recipes.comingSoon')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section — canonical warm CTA band (matches CTABanner tone="warm") */}
        <section className="py-12 md:py-14 bg-cream-50">
          <div className="container mx-auto px-8 max-w-5xl">
            <div className="rounded-2xl p-8 md:p-12 text-center bg-gradient-to-r from-rust-600 to-sunset-600 text-white">
              <h2 className="font-display text-balance text-3xl md:text-4xl font-bold reveal-text">
                {t('cta.title')}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-lg text-white/90 text-pretty">
                {t('cta.subtitle')}
              </p>

              <div className="flex flex-wrap gap-4 justify-center mt-8 scale-in">
                <Link href="/shop" className="rounded-lg bg-white text-rust-700 hover:bg-cream-100 px-8 py-3 font-bold transition-colors">
                  {t('cta.shop')}
                </Link>
                <Link href="/story" className="rounded-lg border-2 border-white/70 text-white hover:bg-white/10 px-8 py-3 font-bold transition-colors">
                  {t('cta.story')}
                </Link>
              </div>

              <p className="text-xs text-white/70 mt-8 tracking-wider uppercase">
                {t('disclaimer.short')}
              </p>
            </div>
          </div>
        </section>

        {/* Footer removed: the root layout renders <Footer /> right after this
            component — the duplicate created two contentinfo landmarks */}
      </div>
    </>
  )
}