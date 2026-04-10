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
      // Broken product links from guides -> shop page sections
      {
        source: '/products/corn-tortillas',
        destination: '/shop#pantry',
        permanent: false,
      },
      {
        source: '/products/flour-tortillas',
        destination: '/shop#bakery',
        permanent: false,
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
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://vercel.live https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://js.stripe.com https://analytics.tiktok.com https://dashboard.retellai.com https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://images.heb.com https://images.unsplash.com https://www.google.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
              "font-src 'self' data: https://analytics.tiktok.com",
              "connect-src 'self' https://vercel.live https://api.stripe.com https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://analytics.tiktok.com https://ads.tiktok.com https://*.tiktokw.us https://api.retellai.com wss://*.retellai.com https://*.retellai.com https://*.livekit.cloud wss://*.livekit.cloud",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.googletagmanager.com https://bid.g.doubleclick.net https://*.retellai.com https://vercel.live",
              "media-src 'self' blob: data:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;