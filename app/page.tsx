import HomeContent from '@/components/home/HomeContent'

// Video schema for SEO - rendered server-side
const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'A Taste of Texas - Lonestar Tortillas',
  description: 'Watch the story of Lonestar Tortillas and how we bring authentic Texas H-E-B tortillas to tortilla lovers nationwide.',
  thumbnailUrl: 'https://lonestartortillas.com/images/lonestar-logo.webp',
  uploadDate: '2025-01-15',
  duration: 'PT1M30S',
  contentUrl: 'https://lonestartortillas.com/Taste%20of%20Texas_compressed.mp4',
  embedUrl: 'https://lonestartortillas.com',
  publisher: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
    logo: {
      '@type': 'ImageObject',
      url: 'https://lonestartortillas.com/images/lonestar-logo.webp'
    }
  }
};

export default function Home() {
  return (
    <>
      {/* Video Schema for SEO - server-rendered */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <HomeContent />
    </>
  )
}
