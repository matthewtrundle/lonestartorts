/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://lonestartortillas.com',
  generateRobotsTxt: false, // We have a custom robots.txt with AI crawler config
  generateIndexSitemap: false, // Not needed for small sites
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  // Don't stamp every URL with build time — Google ignores lastmod when it
  // claims everything changed on every deploy.
  autoLastmod: false,

  // Exclude admin, API, and private routes from sitemap
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/account',
    '/account/*', // auth/account pages - noindexed
    '/page-backup',
    '/page-previous',
    '/checkout',
    '/success',
    '/shop/ad', // ad-traffic variant of /shop, served via middleware rewrite

    '/chicago',  // redirects to /locations/illinois/chicago
    '/denver',   // redirects to /locations/colorado/denver
    '/seattle',  // redirects to /locations/washington/seattle
    '/los-angeles', // redirects to /locations/california/los-angeles
    '/new-york', // redirects to /locations/new-york/new-york-city
    '/maria-story', // redirects to /blog/marias-story
    '/order',    // redirects to /track
    '/track',    // utility page - order tracking
    '/unsubscribe', // utility page - email unsubscribe
    '/feedback', // utility page - customer feedback
  ],

  // Custom transform for specific page priorities and frequencies
  transform: async (config, path) => {
    // Homepage - highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
      };
    }

    // Pre-sale and Shop - high priority
    if (path === '/pre-sale' || path === '/shop') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
      };
    }

    // Product pages - high priority
    if (path.startsWith('/products/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
      };
    }

    // FAQ - medium-high priority
    if (path === '/faq') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
      };
    }

    // Guide pages - high priority (SEO content)
    if (path.startsWith('/guides/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
      };
    }

    // Location pages - medium-high priority (local SEO)
    if (path.startsWith('/locations/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
      };
    }

    // Recipe pages - high priority (content SEO)
    if (path.startsWith('/recipes/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
      };
    }

    // Story and Craft pages - medium priority
    if (path === '/story' || path === '/craft') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
      };
    }

    // Default for other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
    };
  },

  robotsTxtOptions: {
    // This won't generate robots.txt but documents our policy
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
