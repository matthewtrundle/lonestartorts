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