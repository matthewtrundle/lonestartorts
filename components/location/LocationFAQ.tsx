interface FAQItem {
  question: string
  answer: string
}

interface LocationFAQProps {
  city: string
  state: string
  faqs?: FAQItem[]
}

export function LocationFAQ({ city, state, faqs }: LocationFAQProps) {
  const defaultFAQs: FAQItem[] = [
    {
      question: `How long does shipping to ${city} take?`,
      answer: `Orders to ${city}, ${state} typically arrive within 2-3 business days via USPS Priority Mail. We ship Monday through Friday, and orders placed before 2 PM CT ship the same day. During peak seasons, delivery may take an extra day.`
    },
    {
      question: `Are the tortillas fresh when they arrive in ${city}?`,
      answer: `Absolutely! Our H-E-B tortillas are shelf-stable, meaning they don't require refrigeration and maintain their freshness during shipping. They arrive soft, pliable, and ready to use. Each package has a 60-day shelf life from the date of production.`
    },
    {
      question: `Do you offer free shipping to ${city}?`,
      answer: `Yes! We offer free shipping on orders over $45 to ${city} and all other destinations in ${state}. For smaller orders, shipping rates start at $7.99 and vary based on order size.`
    },
    {
      question: `What types of tortillas can I order to ${city}?`,
      answer: `We offer the full range of H-E-B tortillas: corn tortillas (perfect for tacos and enchiladas), flour tortillas (great for burritos and quesadillas), and butter tortillas (the rich, Texas favorite). All varieties ship fresh to ${city}.`
    },
    {
      question: `Why should I order H-E-B tortillas instead of buying local?`,
      answer: `H-E-B tortillas have a distinctive Texas taste that's hard to find outside of Texas. They're made with traditional recipes and quality ingredients that have made them a favorite for generations of Texans. If you've ever visited Texas and fallen in love with these tortillas, now you can enjoy them at home in ${city}.`
    }
  ]

  const faqItems = faqs || defaultFAQs

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-charcoal-950 mb-8">{city} Tortilla Delivery FAQs</h2>
      <div className="space-y-4">
        {faqItems.map((faq, index) => (
          <details
            key={index}
            className="border border-charcoal-200 rounded-lg overflow-hidden group"
            open={index === 0}
          >
            <summary className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-cream-50 transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="font-semibold text-charcoal-950 pr-4">{faq.question}</span>
              <svg
                className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="p-4 bg-cream-50 border-t border-charcoal-200">
              <p className="text-charcoal-700 leading-relaxed">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />
    </section>
  )
}
