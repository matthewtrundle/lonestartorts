export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-white">
            <span className="text-6xl font-bold">★</span>
            <h1 className="text-5xl font-bold tracking-tight">LONE STAR</h1>
          </div>
          <div className="text-2xl text-yellow-500 tracking-widest">TORTILLA</div>
          <div className="mt-8">
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">Loading premium tortillas...</p>
        </div>
      </div>
    </div>
  )
}