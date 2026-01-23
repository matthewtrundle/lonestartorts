/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://clerk.com https://*.clerk.accounts.dev https://clerk.lonestartortillas.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://js.stripe.com https://analytics.tiktok.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://images.unsplash.com https://*.clerk.accounts.dev https://www.google.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
              "font-src 'self' data: https://analytics.tiktok.com",
              "connect-src 'self' https://vercel.live https://clerk.com https://*.clerk.accounts.dev https://clerk.lonestartortillas.com https://api.stripe.com https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://analytics.tiktok.com https://ads.tiktok.com https://*.tiktokw.us",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.googletagmanager.com https://bid.g.doubleclick.net",
              "media-src 'self' blob: data:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;