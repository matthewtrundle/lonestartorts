export const revalidate = 86400;

import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/seo/LastUpdated';
import { CTABanner } from '@/components/ui/CTABanner';
import { QuickAnswer } from '@/components/ui/QuickAnswer';

export const metadata: Metadata = {
  title: 'Does H-E-B Ship Out of State? Yes — Here\'s How to Get H-E-B Tortillas Anywhere',
  description:
    'H-E-B doesn\'t ship groceries out of state — but you can still get authentic H-E-B tortillas delivered to all 50 states in 2-4 days. Here\'s exactly how it works.',
  keywords:
    'does heb ship out of state, will heb ship out of state, does heb deliver out of state, heb tortillas shipped, h-e-b tortillas shipped, how to get heb tortillas outside texas, heb shipping out of state',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/does-heb-ship-out-of-state',
  },
  openGraph: {
    title: 'Does H-E-B Ship Out of State? Here\'s How to Get H-E-B Tortillas Anywhere',
    description:
      'H-E-B doesn\'t ship groceries out of state — but authentic H-E-B tortillas can still reach your door in all 50 states in 2-4 days.',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does H-E-B ship out of state?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — H-E-B itself does not ship groceries outside of Texas. H-E-B curbside and delivery only serve Texas (and select Mexico locations). However, independent resellers like Lonestar Tortillas purchase fresh H-E-B tortillas in Texas and ship them to all 50 states, typically arriving in 2-4 business days.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will H-E-B deliver to other states?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'H-E-B delivery (via heb.com and the H-E-B app) is only available within Texas. If you live outside Texas, the way to get H-E-B products is through an independent reseller that ships nationwide. Lonestar Tortillas ships authentic H-E-B tortillas to every US state.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I get H-E-B tortillas if I live outside Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Order them from Lonestar Tortillas — an independent reseller based in Austin, Texas. We buy fresh H-E-B tortillas, package them carefully, and ship nationwide every Tuesday with 2-4 day delivery. Flour, butter, corn, and wheat varieties are available, and shipping is free on orders over $80.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does H-E-B tortilla shipping take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Orders ship from Texas every Tuesday ("Freshness First" shipping) and arrive in 2-4 business days anywhere in the US. Tortillas are shelf-stable in transit and arrive fresh.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do shipped H-E-B tortillas stay fresh?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. H-E-B bakery and pantry tortillas are shelf-stable for shipping and stay fresh for 7-10 days at room temperature, 3-4 weeks refrigerated, or 6-8 months frozen. We ship early in the week so packages never sit over a weekend.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which states can you ship H-E-B tortillas to?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All 50 US states. Popular destinations include California, New York, Florida, Washington, Colorado, and anywhere Texas expats miss real H-E-B tortillas.',
      },
    },
  ],
};

const states = [
  { name: 'California', href: '/locations/california' },
  { name: 'New York', href: '/locations/new-york' },
  { name: 'Florida', href: '/locations/florida' },
  { name: 'Washington', href: '/locations/washington' },
  { name: 'Colorado', href: '/locations/colorado' },
  { name: 'Illinois', href: '/locations/illinois' },
  { name: 'Arizona', href: '/locations/arizona' },
  { name: 'Georgia', href: '/locations/georgia' },
];

export default function DoesHebShipOutOfStatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Guides', href: '/guides' },
              { label: 'Does H-E-B Ship Out of State?' },
            ]}
            className="mb-6 text-cream-300"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
 Does H-E-B Ship Out of State?
</h1>
          <p className="text-xl text-cream-200 max-w-3xl">
            Short answer: H-E-B doesn&apos;t — but you can still get authentic H-E-B tortillas
            delivered to all 50 states in 2&ndash;4 days. Here&apos;s how.
          </p>
        </div>
      </header>

      <article className="container mx-auto px-6 py-12 max-w-4xl">
        <LastUpdated date="2026-06-10" />

        <section className="prose prose-lg max-w-none mb-10">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The honest answer</h2>
          <p className="text-charcoal-700 leading-relaxed">
            H-E-B&apos;s own delivery and curbside services only operate inside Texas. If you&apos;ve
            moved out of state, there is no official way to order H-E-B groceries to your door.
          </p>
          <p className="text-charcoal-700 leading-relaxed mt-4">
            That&apos;s where we come in. <strong>Lonestar Tortillas is an independent reseller</strong> based
            in Austin: we buy fresh H-E-B tortillas in Texas, package them carefully, and ship them
            nationwide every Tuesday. 2&ndash;4 day delivery, all 50 states, free shipping on orders
            over $80.
          </p>
        </section>

        <QuickAnswer title="How it works" className="mb-10">
          <ol className="text-charcoal-700 space-y-2 list-decimal list-inside">
            <li>Order your tortillas online — flour, butter, corn, and wheat varieties</li>
            <li>We buy them fresh from H-E-B in Texas and pack them for transit</li>
            <li>Orders ship Tuesdays (&ldquo;Freshness First&rdquo; — never sitting over a weekend)</li>
            <li>Your tortillas arrive in 2&ndash;4 business days, anywhere in the US</li>
          </ol>
          <Link
            href="/shop"
            className="mt-4 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Shop H-E-B Tortillas
          </Link>
        </QuickAnswer>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Common questions</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">{faq.name}</h3>
                <p className="text-charcoal-700 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-4">We deliver where you are</h2>
          <p className="text-charcoal-700 mb-4">
            Texas expats order from us in every state. See delivery details for yours:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {states.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="bg-cream-100 hover:bg-cream-200 p-3 rounded-lg text-center font-semibold text-charcoal-800 transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
          <p className="mt-3 text-sm">
            <Link href="/locations" className="text-sunset-700 font-semibold hover:underline">
              All delivery locations →
            </Link>
          </p>
        </section>

        <section className="my-12 grid md:grid-cols-3 gap-6">
          <Link href="/buy-heb-tortillas-online" className="bg-cream-100 p-6 rounded-lg hover:bg-cream-200 transition-colors">
            <h3 className="font-bold text-charcoal-950 mb-1">Buy H-E-B Tortillas Online</h3>
            <p className="text-sm text-charcoal-600">All varieties, shipped nationwide</p>
          </Link>
          <Link href="/guides/how-to-store-tortillas" className="bg-cream-100 p-6 rounded-lg hover:bg-cream-200 transition-colors">
            <h3 className="font-bold text-charcoal-950 mb-1">Storage Guide</h3>
            <p className="text-sm text-charcoal-600">Keep your tortillas fresh after delivery</p>
          </Link>
          <Link href="/shipping" className="bg-cream-100 p-6 rounded-lg hover:bg-cream-200 transition-colors">
            <h3 className="font-bold text-charcoal-950 mb-1">Shipping Details</h3>
            <p className="text-sm text-charcoal-600">Rates, schedule, and delivery times</p>
          </Link>
        </section>

        <p className="text-sm text-charcoal-500 italic mt-8">
          Independent reseller. Not affiliated with or endorsed by H-E-B®.
        </p>

        <CTABanner variant="guide" className="mt-12" />
      </article>
    </div>
  );
}
