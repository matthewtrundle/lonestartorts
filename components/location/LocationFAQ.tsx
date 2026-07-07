import { FAQAccordion } from '@/components/ui/FAQAccordion'

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
      answer: `Orders to ${city}, ${state} typically arrive within 2-3 business days via USPS Priority Mail. We ship on Tuesdays — order by Monday 9 PM CT to make that week's shipment. During peak seasons, delivery may take an extra day.`
    },
    {
      question: `Are the tortillas fresh when they arrive in ${city}?`,
      answer: `Absolutely! Our H-E-B tortillas are shelf-stable, meaning they don't require refrigeration and maintain their freshness during shipping. They arrive soft, pliable, and ready to use. Each package has a 60-day shelf life from the date of production.`
    },
    {
      question: `Do you offer free shipping to ${city}?`,
      answer: `Yes! Every order ships FREE to ${city} and all other destinations in ${state}. We have an $80 minimum order.`
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
      <h2 className="font-display text-balance text-3xl md:text-4xl font-bold text-charcoal-950 mb-8">{city} Tortilla Delivery FAQs</h2>
      <FAQAccordion items={faqItems} />

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
