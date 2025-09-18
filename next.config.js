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
};

module.exports = nextConfig;