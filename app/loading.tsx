import Image from 'next/image'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-charcoal-950 to-black">
      <div className="relative">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <div className="relative w-20 h-20 animate-pulse">
              <Image
                src="/images/lonestar-logo.webp"
                alt="Lonestar Tortillas"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Brand Name */}
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight text-cream-50 font-display">
              LONE STAR
            </h1>
            <div className="text-xl text-sunset-500 tracking-widest font-medium">
              TORTILLAS
            </div>
          </div>

          {/* Tagline */}
          <p className="text-masa-300 text-sm italic">Premium Texas Tortillas</p>

          {/* Loading Bar */}
          <div className="mt-8">
            <div className="w-64 h-1 bg-charcoal-800 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-sunset-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}