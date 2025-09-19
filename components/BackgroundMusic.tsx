'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(true) // Start muted for better UX
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3) // 30% volume by default
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio()

    // Use a royalty-free western/Mexican guitar track
    // You can replace this with your own audio file
    // For now, using a free western ambient track from a CDN
    audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3'

    // Alternative free western/Mexican music sources:
    // audio.src = '/audio/western-guitar.mp3' // Add your own file to public/audio/

    audio.loop = true
    audio.volume = volume
    audio.muted = isMuted

    audioRef.current = audio

    // Handle user interaction to start playing
    const handleUserInteraction = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log('Audio play failed:', err))
      }
    }

    // Try to play on first user interaction
    document.addEventListener('click', handleUserInteraction, { once: true })
    document.addEventListener('scroll', handleUserInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('scroll', handleUserInteraction)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  const toggleMute = () => {
    setIsMuted(!isMuted)

    // If unmuting and not playing, try to play
    if (isMuted && !isPlaying && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Audio play failed:', err))
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      {/* Music Control Button */}
      <button
        onClick={toggleMute}
        className="bg-charcoal-950/90 backdrop-blur-sm text-cream-50 p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group-hover:bg-sunset-600"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>

      {/* Volume Slider (appears on hover) */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charcoal-950/90 backdrop-blur-sm rounded-lg p-3 shadow-xl">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-cream-50 text-xs font-medium tracking-wider uppercase">
            {isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="w-24 h-1 bg-cream-200/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #F15A0E 0%, #F15A0E ${volume * 100}%, #E8CCA5 ${volume * 100}%, #E8CCA5 100%)`
            }}
          />
          <span className="text-cream-400 text-xs">
            🎵 Western Vibes
          </span>
        </div>
      </div>

      {/* Animated Music Notes */}
      {!isMuted && isPlaying && (
        <div className="absolute -top-2 -left-2 pointer-events-none">
          <span className="absolute animate-float-note-1 text-sunset-500 text-xl">♪</span>
          <span className="absolute animate-float-note-2 text-masa-500 text-lg" style={{ animationDelay: '0.5s' }}>♫</span>
          <span className="absolute animate-float-note-3 text-sunset-400 text-base" style={{ animationDelay: '1s' }}>♪</span>
        </div>
      )}
    </div>
  )
}