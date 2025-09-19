'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Music } from 'lucide-react'

// Romantic Mexican music playlist
const MUSIC_PLAYLIST = [
  {
    name: 'Romance Mexicano',
    description: 'Classical Guitar Romance',
    // Note: In production, add your own licensed music files to /public/audio/
    // Suggested tracks: "Besame Mucho", "La Paloma", "Sabor a Mi", "Solamente Una Vez"
    src: 'https://www.fesliyanstudios.com/play-mp3/2861'
  },
  // Add more romantic Mexican tracks here as you acquire them:
  // { name: 'Besame Mucho', src: '/audio/besame-mucho.mp3' },
  // { name: 'Cielito Lindo', src: '/audio/cielito-lindo.mp3' },
  // { name: 'La Bamba (Romantic)', src: '/audio/la-bamba-romantic.mp3' },
]

export function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(true) // Start muted for better UX
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.2) // 20% volume for romantic ambiance
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio()

    // Set the current track from playlist
    if (MUSIC_PLAYLIST[currentTrack]) {
      audio.src = MUSIC_PLAYLIST[currentTrack].src
    }

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

      {/* Volume Slider and Track Info (appears on hover) */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charcoal-950/95 backdrop-blur-sm rounded-lg p-4 shadow-xl min-w-[200px]">
        <div className="flex flex-col items-center space-y-3">
          {/* Current track info */}
          <div className="text-center">
            <Music className="w-4 h-4 mx-auto mb-1 text-sunset-400" />
            <p className="text-cream-50 text-xs font-semibold">
              {MUSIC_PLAYLIST[currentTrack]?.name || 'Romance Mexicano'}
            </p>
            <p className="text-cream-400 text-xs opacity-75">
              Música Romántica
            </p>
          </div>

          {/* Volume control */}
          <div className="w-full">
            <span className="text-cream-50 text-xs font-medium tracking-wider uppercase block text-center mb-2">
              {isMuted ? 'Silenciado' : `Volumen: ${Math.round(volume * 100)}%`}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              className="w-full h-1 bg-cream-200/20 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #EF4444 0%, #EF4444 ${volume * 100}%, #E8CCA5 ${volume * 100}%, #E8CCA5 100%)`
              }}
            />
          </div>

          {/* Romantic message */}
          <div className="flex items-center gap-1 text-red-400 text-xs">
            <span>♥</span>
            <span className="italic">Con Amor de México</span>
            <span>♥</span>
          </div>
        </div>
      </div>

      {/* Animated Music Notes with Hearts for Romance */}
      {!isMuted && isPlaying && (
        <div className="absolute -top-2 -left-2 pointer-events-none">
          <span className="absolute animate-float-note-1 text-sunset-500 text-xl">♪</span>
          <span className="absolute animate-float-note-2 text-red-500 text-lg" style={{ animationDelay: '0.5s' }}>♥</span>
          <span className="absolute animate-float-note-3 text-masa-500 text-lg" style={{ animationDelay: '1s' }}>♫</span>
          <span className="absolute animate-float-note-1 text-red-400 text-base" style={{ animationDelay: '1.5s', left: '10px' }}>♥</span>
        </div>
      )}
    </div>
  )
}