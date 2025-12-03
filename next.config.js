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
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://clerk.com https://*.clerk.accounts.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://images.unsplash.com https://*.clerk.accounts.dev; font-src 'self' data:; connect-src 'self' https://clerk.com https://*.clerk.accounts.dev https://api.stripe.com; frame-src 'self' https://js.stripe.com https://hooks.stripe.com; media-src 'self' blob: data:;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;