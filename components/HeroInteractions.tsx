'use client'

import { useEffect } from 'react'

export function HeroInteractions() {
  useEffect(() => {
    // Magnetic text effect
    const magneticElements = document.querySelectorAll('.magnetic-text')
    const cleanups: (() => void)[] = []

    // Throttle helper using requestAnimationFrame
    function rafThrottle(fn: (e: Event) => void): (e: Event) => void {
      let ticking = false
      return (e: Event) => {
        if (!ticking) {
          ticking = true
          requestAnimationFrame(() => {
            fn(e)
            ticking = false
          })
        }
      }
    }

    magneticElements.forEach(element => {
      const magneticArea = element.querySelector('.magnetic-area')
      const strength = parseFloat(element.getAttribute('data-magnetic-strength') || '10')

      if (magneticArea) {
        const handleMouseMove = rafThrottle((e: Event) => {
          const mouseEvent = e as MouseEvent
          const rect = magneticArea.getBoundingClientRect()
          const x = mouseEvent.clientX - rect.left - rect.width / 2
          const y = mouseEvent.clientY - rect.top - rect.height / 2

          const distance = Math.sqrt(x * x + y * y)
          const maxDistance = Math.max(rect.width, rect.height) / 2

          if (distance < maxDistance) {
            const power = (1 - distance / maxDistance) * strength
            const translateX = (x / maxDistance) * power
            const translateY = (y / maxDistance) * power

            ;(element as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`
          }
        })

        const handleMouseLeave = () => {
          ;(element as HTMLElement).style.transform = 'translate(0, 0)'
        }

        magneticArea.addEventListener('mousemove', handleMouseMove)
        magneticArea.addEventListener('mouseleave', handleMouseLeave)

        cleanups.push(() => {
          magneticArea.removeEventListener('mousemove', handleMouseMove)
          magneticArea.removeEventListener('mouseleave', handleMouseLeave)
        })
      }
    })

    // Parallax effect on scroll - throttled with rAF
    const parallaxElements = document.querySelectorAll('.parallax-layer')
    let scrollTicking = false

    const handleScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true
        requestAnimationFrame(() => {
          const scrollY = window.scrollY

          parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed') || '0.5')
            const yPos = -(scrollY * speed)
            ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
          })
          scrollTicking = false
        })
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Spotlight effect following cursor - throttled with rAF
    const spotlightElement = document.querySelector('.spotlight') as HTMLElement
    let spotlightTicking = false

    const handleSpotlightMove = (e: Event) => {
      if (!spotlightTicking) {
        spotlightTicking = true
        requestAnimationFrame(() => {
          const mouseEvent = e as MouseEvent
          const x = (mouseEvent.clientX / window.innerWidth) * 100
          const y = (mouseEvent.clientY / window.innerHeight) * 100

          if (spotlightElement) {
            spotlightElement.style.setProperty('--mouse-x', `${x}%`)
            spotlightElement.style.setProperty('--mouse-y', `${y}%`)
          }
          spotlightTicking = false
        })
      }
    }

    if (spotlightElement) {
      window.addEventListener('mousemove', handleSpotlightMove)
    }

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (spotlightElement) {
        window.removeEventListener('mousemove', handleSpotlightMove)
      }
      cleanups.forEach(fn => fn())
    }
  }, [])

  return null
}
