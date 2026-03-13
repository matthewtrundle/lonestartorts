import { ContactPageContent } from '@/components/contact/ContactPageContent';

export default function ContactPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Lonestar Tortillas',
    description: 'Contact page for Lonestar Tortillas - questions about orders, shipping, and wholesale.',
    url: 'https://lonestartortillas.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Lonestar Tortillas',
      email: 'howdy@lonestartortillas.com',
      telephone: '+1-512-894-6823',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Austin',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-cream-50 pt-24">
        <ContactPageContent />
      </main>
    </>
  );
}
