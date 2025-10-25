/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://lonestartortillas.com',
  generateRobotsTxt: false, // We have a custom robots.txt with AI crawler config
  generateIndexSitemap: false, // Not needed for small sites
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude admin and API routes from sitemap
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/page-backup',
    '/page-previous',
  ],

  // Custom transform for specific page priorities and frequencies
  transform: async (config, path) => {
    // Homepage - highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Pre-sale and Shop - high priority
    if (path === '/pre-sale' || path === '/shop' || path === '/order') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    // Product pages - high priority
    if (path.startsWith('/products/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // FAQ - medium-high priority
    if (path === '/faq') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Guide pages - high priority (SEO content)
    if (path.startsWith('/guides/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // City landing pages - high priority (expat/nationwide targeting)
    if (path === '/new-york' || path === '/los-angeles' || path === '/chicago' || path === '/denver' || path === '/seattle') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Recipe pages - high priority (content SEO)
    if (path.startsWith('/recipes/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Story and Craft pages - medium priority
    if (path === '/story' || path === '/craft') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Track page - lower priority
    if (path === '/track') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      };
    }

    // Default for other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
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
