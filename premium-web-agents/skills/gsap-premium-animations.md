# GSAP Premium Animation Skills Module

*Extracted from Lone Star Tortilla project - proven patterns for sophisticated scroll experiences*

## Core Setup Pattern

### Lenis + ScrollTrigger Integration
```javascript
// Premium smooth scroll initialization
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

// Sync ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### ScrollTrigger Defaults
```javascript
ScrollTrigger.defaults({
  markers: false,
  toggleActions: 'play pause resume reverse',
})
```

## Character-Level Text Animations

### Hero Title Reveals
```javascript
gsap.utils.toArray('.hero-title').forEach((element, index) => {
  const chars = element.textContent.split('')
  element.innerHTML = chars.map((char, i) =>
    `<span class="inline-block" style="--char-index: ${i}">${char === ' ' ? '&nbsp;' : char}</span>`
  ).join('')

  gsap.fromTo(element.children, {
    y: 100,
    opacity: 0,
    rotateX: -90,
  }, {
    y: 0,
    opacity: 1,
    rotateX: 0,
    duration: 1.2,
    stagger: 0.03,
    ease: 'power4.out',
    delay: index * 0.2,
  })
})
```

### Split Text Dramatic Reveals
```javascript
document.querySelectorAll('.split-text').forEach((element) => {
  const text = element.textContent
  const chars = text.split('')
  element.innerHTML = chars.map((char, i) =>
    `<span class="inline-block" style="--char-index: ${i}">${char === ' ' ? '&nbsp;' : char}</span>`
  ).join('')

  ScrollTrigger.create({
    trigger: element,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(element.children, {
        y: 50,
        opacity: 0,
        rotateZ: -5,
      }, {
        y: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power4.out',
      })
    },
  })
})
```

## Magazine-Style Content Reveals

### Clip-Path Polygon Animations
```javascript
gsap.utils.toArray('.magazine-text').forEach((element) => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  })

  timeline
    .fromTo(element, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      y: 50,
    }, {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
      y: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    })
    .fromTo(element, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.8')
})
```

### Content Slides with Blur Effects
```javascript
// Slide from left with blur
gsap.utils.toArray('.slide-left').forEach((element) => {
  gsap.fromTo(element, {
    x: -150,
    opacity: 0,
    filter: 'blur(10px)',
  }, {
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
  })
})
```

## Advanced Parallax Systems

### Multi-Speed Parallax
```javascript
gsap.utils.toArray('.parallax-img').forEach((element) => {
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
```

## Horizontal Scroll Mastery

### Premium Horizontal Scroll
```javascript
const horizontalSections = gsap.utils.toArray('.horizontal-scroll')
horizontalSections.forEach((section) => {
  const wrapper = section.querySelector('.horizontal-wrapper')
  const items = wrapper?.querySelectorAll('.horizontal-item')

  if (wrapper && items) {
    // Calculate tighter scroll distance
    const totalWidth = items.length * window.innerWidth * 0.9
    const scrollWidth = totalWidth - section.offsetWidth

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })

    tl.to(wrapper, {
      x: -scrollWidth,
      ease: 'none',
    })

    // Smoother item animations
    items.forEach((item, i) => {
      tl.fromTo(item, {
        scale: 0.95,
        opacity: 0.8,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, i * 0.05)
    })
  }
})
```

## Interactive Micro-Animations

### Magnetic Hover Effects
```javascript
document.querySelectorAll('.magnetic-area').forEach((area) => {
  const content = area.querySelector('.magnetic-content')

  if (content) {
    area.addEventListener('mousemove', (e) => {
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
```

### Scale with Elastic Easing
```javascript
gsap.utils.toArray('.scale-in').forEach((element) => {
  gsap.fromTo(element, {
    scale: 0.7,
    opacity: 0,
    y: 60,
  }, {
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
  })
})
```

## Header Transformations

### Premium Header Scroll Behavior
```javascript
const header = document.querySelector('.shrink-header')
if (header) {
  ScrollTrigger.create({
    start: 'top top',
    end: 99999,
    onUpdate: (self) => {
      const scrolled = self.scroll() > 50

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
```

## Stagger Animations

### Wave-Effect Staggers
```javascript
gsap.utils.toArray('.stagger-container').forEach((container) => {
  const items = container.querySelectorAll('.stagger-item')

  gsap.fromTo(items, {
    y: 100,
    opacity: 0,
    scale: 0.9,
    rotateX: -15,
  }, {
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
  })
})
```

## Performance Best Practices

### Reduced Motion Compliance
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReducedMotion) {
  return // Skip all animations
}
```

### Cleanup Pattern
```javascript
// Always cleanup in useEffect return
return () => {
  lenis.destroy()
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  window.removeEventListener('mousemove', handleMouseMove)
}
```

### Hardware Acceleration
```css
.will-change-transform {
  will-change: transform;
}

.backface-hidden {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
```

## Easing Functions Reference

### Premium Easing Patterns
```javascript
// Smooth organic motion
'power4.out'

// Bouncy, playful reveals
'elastic.out(1, 0.5)'

// Sharp, immediate attention
'power2.inOut'

// Gentle, natural movement
'power1.inOut'
```

These patterns create sophisticated, magazine-quality scroll experiences that feel intentional and premium while maintaining excellent performance.