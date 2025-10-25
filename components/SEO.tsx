import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  price?: {
    amount: string;
    currency: string;
  };
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}

export default function SEO({
  title = 'Lonestar Tortillas - Authentic H-E-B® Tortillas Delivered Nationwide',
  description = 'Get authentic H-E-B® tortillas delivered nationwide. Premium Texas tortillas including flour, corn, butter varieties. Independent reseller.',
  keywords = 'H-E-B tortillas, Texas tortillas delivery, authentic Mexican tortillas',
  image = '/images/lonestar-logo.webp',
  url = 'https://lonestartortillas.com',
  type = 'website',
  author = 'Lonestar Tortillas',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  price,
  availability = 'PreOrder'
}: SEOProps) {
  const fullImageUrl = image.startsWith('http') ? image : `https://lonestartortillas.com${image}`;

  // Create breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://lonestartortillas.com'
      }
    ]
  };

  // Add current page to breadcrumb if not homepage
  if (url !== 'https://lonestartortillas.com' && url !== 'https://lonestartortillas.com/') {
    const pageName = url.split('/').pop()?.replace('-', ' ') || '';
    breadcrumbSchema.itemListElement.push({
      '@type': 'ListItem',
      'position': 2,
      'name': pageName.charAt(0).toUpperCase() + pageName.slice(1),
      'item': url
    });
  }

  // Create product schema if price is provided
  const productSchema = price ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': title,
    'description': description,
    'image': fullImageUrl,
    'offers': {
      '@type': 'Offer',
      'priceCurrency': price.currency,
      'price': price.amount,
      'availability': `https://schema.org/${availability}`,
      'seller': {
        '@type': 'Organization',
        'name': 'Lonestar Tortillas'
      }
    }
  } : null;

  // Create article schema if type is article
  const articleSchema = type === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': title,
    'description': description,
    'image': fullImageUrl,
    'author': {
      '@type': 'Person',
      'name': author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Lonestar Tortillas',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://lonestartortillas.com/images/lonestar-logo.webp'
      }
    },
    'datePublished': publishedTime,
    'dateModified': modifiedTime || publishedTime,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    }
  } : null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Lonestar Tortillas" />
      <meta property="og:locale" content="en_US" />

      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Product specific Open Graph tags */}
      {price && (
        <>
          <meta property="product:price:amount" content={price.amount} />
          <meta property="product:price:currency" content={price.currency} />
          <meta property="product:availability" content={availability.toLowerCase()} />
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@lonestartortillas" />
      <meta name="twitter:creator" content="@lonestartortillas" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Mobile Optimization */}
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}

      {/* Preload important resources */}
      <link rel="preload" as="image" href="/images/lonestar-logo.webp" />
      <link rel="preload" as="video" href="/hero-background_compressed.mp4" />

      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    </Head>
  );
}