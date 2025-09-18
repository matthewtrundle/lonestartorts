'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ScrollAnimations({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    // Initialize Lenis smooth scroll with premium settings
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic ease out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.8,
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Track cursor for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }

      // Update CSS variables for spotlight effects
      document.documentElement.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`)
      document.documentElement.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`)
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Set up ScrollTrigger defaults for consistent behavior
    ScrollTrigger.defaults({
      markers: false, // Set to true for debugging
      toggleActions: 'play pause resume reverse',
    })

    // Hero text animations with sophisticated timing
    const heroTimeline = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    })

    // Hero reveal sequence
    gsap.utils.toArray('.hero-title').forEach((element: any, index) => {
      const chars = element.textContent.split('')
      element.innerHTML = chars.map((char: string, i: number) =>
        `<span class="inline-block" style="--char-index: ${i}">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('')

      gsap.fromTo(element.children,
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: 'power4.out',
          delay: index * 0.2,
        }
      )
    })

    // Text reveal animations with depth
    gsap.utils.toArray('.reveal-text').forEach((element: any) => {
      gsap.fromTo(element,
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Magazine-style text animations
    gsap.utils.toArray('.magazine-text').forEach((element: any) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      timeline
        .fromTo(element,
          {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
            y: 50,
          },
          {
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            y: 0,
            duration: 1.2,
            ease: 'power2.inOut',
          }
        )
        .fromTo(element,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.8'
        )
    })

    // Slide animations with blur effect
    gsap.utils.toArray('.slide-left').forEach((element: any) => {
      gsap.fromTo(element,
        {
          x: -150,
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    gsap.utils.toArray('.slide-right').forEach((element: any) => {
      gsap.fromTo(element,
        {
          x: 150,
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Advanced parallax with rotation
    gsap.utils.toArray('.parallax-img').forEach((element: any) => {
      const speed = parseFloat(element.dataset.speed || '0.5')
      const rotation = parseFloat(element.dataset.rotation || '0')

      gsap.to(element, {
        yPercent: -100 * speed,
        rotation: rotation,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    })

    // Scale and fade animations with overshoot
    gsap.utils.toArray('.scale-in').forEach((element: any) => {
      gsap.fromTo(element,
        {
          scale: 0.7,
          opacity: 0,
          y: 60,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Pinned sections with smooth transitions
    const pinnedSections = gsap.utils.toArray('.pin-section')
    pinnedSections.forEach((section: any) => {
      const content = section.querySelector('.pin-content')

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          if (content) {
            // Add depth effect on scroll
            gsap.to(content, {
              scale: 1 - (self.progress * 0.1),
              opacity: 1 - (self.progress * 0.3),
              duration: 0,
            })
          }
        },
      })
    })

    // Enhanced horizontal scroll with 3D perspective
    const horizontalSections = gsap.utils.toArray('.horizontal-scroll')
    horizontalSections.forEach((section: any) => {
      const wrapper = section.querySelector('.horizontal-wrapper')
      const items = wrapper?.querySelectorAll('.horizontal-item')

      if (wrapper && items) {
        const scrollWidth = wrapper.scrollWidth - section.offsetWidth

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollWidth * 1.5}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        })

        tl.to(wrapper, {
          x: -scrollWidth,
          ease: 'none',
        })

        // Add depth to items as they scroll
        items.forEach((item: any, i: number) => {
          tl.fromTo(item,
            {
              scale: 0.8,
              rotateY: 45,
            },
            {
              scale: 1,
              rotateY: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            i * 0.1
          )
        })
      }
    })

    // Stagger reveals with wave effect
    gsap.utils.toArray('.stagger-container').forEach((container: any) => {
      const items = container.querySelectorAll('.stagger-item')

      gsap.fromTo(items,
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
          rotateX: -15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: {
            amount: 0.8,
            from: 'start',
            ease: 'power2.inOut',
          },
          ease: 'power4.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
          },
        }
      )
    })

    // Premium header transformation - simplified without scaling
    const header = document.querySelector('.shrink-header')
    if (header) {
      ScrollTrigger.create({
        start: 'top top',
        end: 99999,
        onUpdate: (self) => {
          const scrolled = self.scroll() > 50

          // Simple header state change
          gsap.to(header, {
            backgroundColor: scrolled ? 'rgba(250, 248, 245, 0.95)' : 'rgba(250, 248, 245, 0)',
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
            borderBottomColor: scrolled ? 'rgba(181, 134, 80, 0.2)' : 'transparent',
            paddingTop: scrolled ? 16 : 32,
            paddingBottom: scrolled ? 16 : 32,
            duration: 0.3,
            ease: 'power2.out',
          })
        },
      })
    }

    // Magnetic hover effect for interactive elements
    document.querySelectorAll('.magnetic-area').forEach((area: any) => {
      const content = area.querySelector('.magnetic-content')

      if (content) {
        area.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = area.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2

          gsap.to(content, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out',
          })
        })

        area.addEventListener('mouseleave', () => {
          gsap.to(content, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)',
          })
        })
      }
    })

    // Text split animations for dramatic reveals
    document.querySelectorAll('.split-text').forEach((element: any) => {
      const text = element.textContent
      const chars = text.split('')
      element.innerHTML = chars.map((char: string, i: number) =>
        `<span class="inline-block" style="--char-index: ${i}">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('')

      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(element.children,
            {
              y: 50,
              opacity: 0,
              rotateZ: -5,
            },
            {
              y: 0,
              opacity: 1,
              rotateZ: 0,
              duration: 0.8,
              stagger: 0.02,
              ease: 'power4.out',
            }
          )
        },
      })
    })

    // Floating animation for accent elements
    document.querySelectorAll('.float-element').forEach((element: any) => {
      gsap.to(element, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    })

    // Cleanup
    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <>{children}</>
}