'use client'

import { useEffect } from 'react'

export function HeroInteractions() {
  useEffect(() => {
    // Magnetic text effect
    const magneticElements = document.querySelectorAll('.magnetic-text')

    magneticElements.forEach(element => {
      const magneticArea = element.querySelector('.magnetic-area')
      const strength = parseFloat(element.getAttribute('data-magnetic-strength') || '10')

      if (magneticArea) {
        const handleMouseMove = (e: Event) => {
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
        }

        const handleMouseLeave = () => {
          ;(element as HTMLElement).style.transform = 'translate(0, 0)'
        }

        magneticArea.addEventListener('mousemove', handleMouseMove)
        magneticArea.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          magneticArea.removeEventListener('mousemove', handleMouseMove)
          magneticArea.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    })

    // Parallax effect on scroll
    const parallaxElements = document.querySelectorAll('.parallax-layer')

    const handleScroll = () => {
      const scrollY = window.scrollY

      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5')
        const yPos = -(scrollY * speed)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)

    // Spotlight effect following cursor
    const spotlightElement = document.querySelector('.spotlight') as HTMLElement

    if (spotlightElement) {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent
        const x = (mouseEvent.clientX / window.innerWidth) * 100
        const y = (mouseEvent.clientY / window.innerHeight) * 100

        spotlightElement.style.setProperty('--mouse-x', `${x}%`)
        spotlightElement.style.setProperty('--mouse-y', `${y}%`)
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}