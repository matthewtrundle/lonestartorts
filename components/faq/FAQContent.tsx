'use client';

import Link from 'next/link';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { SectionHeader } from '@/components/ui/SectionHeader';
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

      {/* Editorial header */}
      <section className="container mx-auto px-8 py-8 md:py-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-sunset-700">
            {t('faq.breadcrumb.faq')}
          </p>
          <h1 className="font-display text-balance text-5xl md:text-6xl font-bold text-charcoal-950 mb-5">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-charcoal-600 leading-relaxed text-pretty">
            {t('faq.heroText')}
          </p>
        </div>

        {/* Quick Links */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="rounded-2xl border border-charcoal-200/60 bg-white p-6 md:p-8 shadow-soft">
            <h2 className="font-display text-2xl font-bold text-charcoal-950 mb-4">{t('faq.jumpToSection')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {faqs.map((section, idx) => (
                <a
                  key={idx}
                  href={`#${section.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block rounded-lg bg-cream-50 p-3 transition-colors hover:bg-sunset-50 group"
                >
                  <span className="font-semibold text-charcoal-950 group-hover:text-sunset-600">
                    {section.category} →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-5xl mx-auto space-y-12">
          {faqs.map((section, sectionIdx) => (
            <div
              key={sectionIdx}
              id={section.category.toLowerCase().replace(/\s+/g, '-')}
              className="scroll-mt-24"
            >
              <SectionHeader title={section.category} className="mb-6" />
              <FAQAccordion
                items={section.questions.map((faq) => ({
                  question: faq.q,
                  answer: faq.a,
                }))}
                defaultOpenFirst={false}
              />
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="rounded-2xl bg-gradient-to-r from-rust-600 to-sunset-600 p-10 md:p-12 text-center text-cream-50 shadow-large">
            <h2 className="font-display text-balance text-3xl md:text-4xl font-bold mb-4">
              {t('faq.stillHaveQuestions')}
            </h2>
            <p className="text-xl mb-8 text-white/90 text-pretty">
              {t('faq.stillHaveQuestionsText')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a
                href="tel:+15128946823"
                className="inline-block bg-cream-50 text-sunset-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors"
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
        <div className="max-w-5xl mx-auto mt-14">
          <SectionHeader align="center" title={t('faq.exploreProducts')} className="mb-6" />
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/products/corn-tortillas" className="group block rounded-xl border border-charcoal-200/60 bg-white p-6 shadow-soft hover:shadow-medium transition-shadow text-center">
              <h3 className="font-semibold text-lg text-charcoal-950 group-hover:text-sunset-600 transition-colors mb-2">
                {t('faq.products.corn')}
              </h3>
              <p className="text-sm text-charcoal-600">{t('faq.products.cornDesc')}</p>
            </Link>
            <Link href="/products/flour-tortillas" className="group block rounded-xl border border-charcoal-200/60 bg-white p-6 shadow-soft hover:shadow-medium transition-shadow text-center">
              <h3 className="font-semibold text-lg text-charcoal-950 group-hover:text-sunset-600 transition-colors mb-2">
                {t('faq.products.flour')}
              </h3>
              <p className="text-sm text-charcoal-600">{t('faq.products.flourDesc')}</p>
            </Link>
            <Link href="/products/butter-tortillas" className="group block rounded-xl border border-charcoal-200/60 bg-white p-6 shadow-soft hover:shadow-medium transition-shadow text-center">
              <h3 className="font-semibold text-lg text-charcoal-950 group-hover:text-sunset-600 transition-colors mb-2">
                {t('faq.products.butter')}
              </h3>
              <p className="text-sm text-charcoal-600">{t('faq.products.butterDesc')}</p>
            </Link>
            <Link href="/products/specialty-tortillas" className="group block rounded-xl border border-charcoal-200/60 bg-white p-6 shadow-soft hover:shadow-medium transition-shadow text-center">
              <h3 className="font-semibold text-lg text-charcoal-950 group-hover:text-sunset-600 transition-colors mb-2">
                {t('faq.products.specialty')}
              </h3>
              <p className="text-sm text-charcoal-600">{t('faq.products.specialtyDesc')}</p>
            </Link>
          </div>
        </div>

        {/* SEO Content Block */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="font-display text-balance text-3xl font-bold text-charcoal-950 mb-4">{t('faq.seo.title')}</h2>
          <p className="text-charcoal-700 leading-relaxed text-pretty mb-4">
            {t('faq.seo.paragraph1')}
          </p>
          <p className="text-charcoal-700 leading-relaxed text-pretty">
            {t('faq.seo.paragraph2')}
          </p>
        </div>
      </section>
    </div>
  );
}
