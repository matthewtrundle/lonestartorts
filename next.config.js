/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.heb.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
    // Serve modern image formats for better performance
    formats: ['image/avif', 'image/webp'],
    // Optimize for common device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Product/location images never change — cache optimized renditions for 31 days
    minimumCacheTTL: 2678400,
  },
  env: {
    ALLOW_REFRIGERATED: process.env.ALLOW_REFRIGERATED || 'false',
  },
  async redirects() {
    return [
      // Legacy location pages -> new structure
      {
        source: '/chicago',
        destination: '/locations/illinois/chicago',
        permanent: true,
      },
      {
        source: '/denver',
        destination: '/locations/colorado/denver',
        permanent: true,
      },
      // Legacy maria story -> blog post
      {
        source: '/maria-story',
        destination: '/blog/marias-story',
        permanent: true,
      },
      // Legacy order page -> track page
      {
        source: '/order',
        destination: '/track',
        permanent: true,
      },
      // Legacy city pages -> /locations hierarchy (mirrors chicago/denver)
      {
        source: '/seattle',
        destination: '/locations/washington/seattle',
        permanent: true,
      },
      {
        source: '/los-angeles',
        destination: '/locations/california/los-angeles',
        permanent: true,
      },
      {
        source: '/new-york',
        destination: '/locations/new-york/new-york-city',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Cache headers for static assets (1 year, immutable)
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|mp4|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      {
        // Keep private surfaces out of search engines (robots.txt Disallow
        // alone does not prevent indexing of linked URLs)
        source: '/(admin|account)/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' }
        ]
      },
      // NOTE: Content-Security-Policy is defined ONCE in vercel.json (the
      // newer, more complete policy). Do not re-add it here — two sources of
      // truth caused them to drift.
    ];
  },
};

module.exports = nextConfig;