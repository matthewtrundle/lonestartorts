'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSection {
  category: string;
  questions: FAQ[];
}

interface FAQContentProps {
  faqs: FAQSection[];
}

export default function FAQContent({ faqs }: FAQContentProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-masa-50 to-cream-100">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-8 py-6">
        <ol className="flex items-center gap-2 text-sm text-charcoal-600">
          <li><Link href="/" className="hover:text-sunset-500">{t('faq.breadcrumb.home')}</Link></li>
          <li>/</li>
          <li className="text-charcoal-950 font-medium">{t('faq.breadcrumb.faq')}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-8 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-display font-black text-charcoal-950 mb-6">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-charcoal-700 leading-relaxed">
            {t('faq.heroText')}
          </p>
        </div>

        {/* Quick Links */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-bold text-charcoal-950 mb-4">{t('faq.jumpToSection')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {faqs.map((section, idx) => (
                <a
                  key={idx}
                  href={`#${section.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block p-4 bg-cream-50 hover:bg-sunset-100 rounded-lg transition-colors group"
                >
                  <span className="font-bold text-charcoal-950 group-hover:text-sunset-600">
                    {section.category} →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-5xl mx-auto space-y-16">
          {faqs.map((section, sectionIdx) => (
            <div key={sectionIdx} id={section.category.toLowerCase().replace(/\s+/g, '-')}>
              <h2 className="text-4xl font-display font-black text-charcoal-950 mb-8 pb-4 border-b-4 border-sunset-500">
                {section.category}
              </h2>

              <div className="space-y-6">
                {section.questions.map((faq, faqIdx) => (
                  <div
                    key={faqIdx}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-8"
                  >
                    <h3 className="text-xl font-bold text-charcoal-950 mb-4 flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-sunset-500 text-cream-50 rounded-full flex items-center justify-center text-sm font-black">
                        Q
                      </span>
                      {faq.q}
                    </h3>
                    <div className="ml-11 text-lg text-charcoal-700 leading-relaxed">
                      <span className="font-bold text-masa-600">A: </span>
                      {faq.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-gradient-to-br from-sunset-500 to-sunset-600 rounded-2xl shadow-2xl p-12 text-center text-cream-50">
            <h2 className="text-4xl font-display font-black mb-4">
              {t('faq.stillHaveQuestions')}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t('faq.stillHaveQuestionsText')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a
                href="tel:+15128946823"
                className="inline-block bg-cream-50 text-sunset-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors shadow-lg"
              >
                Call Maria: (512) 894-6823
              </a>
              <Link
                href="/contact"
                className="inline-block bg-transparent border-2 border-cream-50 text-cream-50 px-8 py-4 rounded-full font-bold text-lg hover:bg-cream-50/10 transition-colors"
              >
                {t('faq.contactUs')}
              </Link>
              <Link
                href="/returns"
                className="inline-block bg-transparent border-2 border-cream-50 text-cream-50 px-8 py-4 rounded-full font-bold text-lg hover:bg-cream-50/10 transition-colors"
              >
                {t('faq.returnsRefunds')}
              </Link>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-3xl font-display font-bold text-charcoal-950 mb-6 text-center">
            {t('faq.exploreProducts')}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/products/corn-tortillas" className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow text-center">
              <h3 className="font-bold text-lg text-charcoal-950 group-hover:text-sunset-500 transition-colors mb-2">
                {t('faq.products.corn')}
              </h3>
              <p className="text-sm text-charcoal-600">{t('faq.products.cornDesc')}</p>
            </Link>
            <Link href="/products/flour-tortillas" className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow text-center">
              <h3 className="font-bold text-lg text-charcoal-950 group-hover:text-sunset-500 transition-colors mb-2">
                {t('faq.products.flour')}
              </h3>
              <p className="text-sm text-charcoal-600">{t('faq.products.flourDesc')}</p>
            </Link>
            <Link href="/products/butter-tortillas" className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow text-center">
              <h3 className="font-bold text-lg text-charcoal-950 group-hover:text-sunset-500 transition-colors mb-2">
                {t('faq.products.butter')}
              </h3>
              <p className="text-sm text-charcoal-600">{t('faq.products.butterDesc')}</p>
            </Link>
            <Link href="/products/specialty-tortillas" className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow text-center">
              <h3 className="font-bold text-lg text-charcoal-950 group-hover:text-sunset-500 transition-colors mb-2">
                {t('faq.products.specialty')}
              </h3>
              <p className="text-sm text-charcoal-600">{t('faq.products.specialtyDesc')}</p>
            </Link>
          </div>
        </div>

        {/* SEO Content Block */}
        <div className="max-w-4xl mx-auto mt-20 prose prose-lg">
          <h2 className="text-3xl font-display font-bold text-charcoal-950">{t('faq.seo.title')}</h2>
          <p className="text-charcoal-700">
            {t('faq.seo.paragraph1')}
          </p>
          <p className="text-charcoal-700">
            {t('faq.seo.paragraph2')}
          </p>
        </div>
      </section>
    </div>
  );
}
