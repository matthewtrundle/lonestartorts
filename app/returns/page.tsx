import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { ReturnsForm } from '@/components/ReturnsForm';
import Link from 'next/link';
import { Package, Clock, ShieldCheck, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Returns & Refunds | Lonestar Tortillas',
  description: 'Our hassle-free return policy. Request a refund or replacement within 7 days of delivery for any damaged, defective, or unsatisfactory products.',
  alternates: {
    canonical: 'https://lonestartortillas.com/returns',
  },
  openGraph: {
    title: 'Returns & Refunds | Lonestar Tortillas',
    description: 'Hassle-free returns within 7 days. Your satisfaction is our priority.',
    type: 'website',
  },
};

export default function ReturnsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Returns & Refunds Policy',
    description: 'Return policy and refund request form for Lonestar Tortillas orders.',
    url: 'https://lonestartortillas.com/returns',
    mainEntity: {
      '@type': 'MerchantReturnPolicy',
      name: 'Lonestar Tortillas Return Policy',
      applicableCountry: 'US',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 7,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn',
      refundType: 'https://schema.org/FullRefund',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DisclaimerBanner />
      <Header />

      <main className="min-h-screen bg-cream-50 pt-24">
        {/* Hero Section */}
        <section className="bg-charcoal-950 text-white py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Returns & Refunds
              </h1>
              <p className="text-xl text-cream-200">
                Your satisfaction is our priority. We make returns simple.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Highlights */}
        <section className="py-12 bg-white border-b border-cream-200">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sunset-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-sunset-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-950">7-Day Window</h3>
                  <p className="text-sm text-charcoal-600">From delivery date</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sunset-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-sunset-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-950">Full Refund</h3>
                  <p className="text-sm text-charcoal-600">Or free replacement</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sunset-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-sunset-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-950">No Return Shipping</h3>
                  <p className="text-sm text-charcoal-600">Keep the product</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sunset-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-sunset-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-950">100% Guarantee</h3>
                  <p className="text-sm text-charcoal-600">Your satisfaction matters</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Return Request Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-charcoal-950 mb-6">
                  Request a Return or Refund
                </h2>
                <ReturnsForm />
              </div>

              {/* Policy Details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-charcoal-950 mb-6">
                    Our Return Policy
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-masa-50 rounded-xl p-6">
                      <h3 className="font-semibold text-charcoal-950 mb-3">What's Covered</h3>
                      <ul className="space-y-2 text-charcoal-700">
                        <li className="flex items-start gap-2">
                          <span className="text-sunset-500 mt-1">✓</span>
                          Products damaged during shipping
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sunset-500 mt-1">✓</span>
                          Wrong items received
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sunset-500 mt-1">✓</span>
                          Quality issues with products
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sunset-500 mt-1">✓</span>
                          Orders that never arrived
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-sunset-500 mt-1">✓</span>
                          Products you're not satisfied with
                        </li>
                      </ul>
                    </div>

                    <div className="bg-cream-100 rounded-xl p-6">
                      <h3 className="font-semibold text-charcoal-950 mb-3">How It Works</h3>
                      <ol className="space-y-3 text-charcoal-700">
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-sunset-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">1</span>
                          <span>Submit the return request form with your order details</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-sunset-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">2</span>
                          <span>We'll review your request within 1-2 business days</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-sunset-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">3</span>
                          <span>Choose a full refund or free replacement</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-sunset-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">4</span>
                          <span>Refunds processed within 5-7 business days</span>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-white border border-charcoal-200 rounded-xl p-6">
                      <h3 className="font-semibold text-charcoal-950 mb-3">Important Notes</h3>
                      <ul className="space-y-2 text-charcoal-700 text-sm">
                        <li>• Return requests must be submitted within 7 days of delivery</li>
                        <li>• For damaged products, please take photos if possible</li>
                        <li>• You don't need to ship anything back to us</li>
                        <li>• Refunds go back to the original payment method</li>
                        <li>• Replacement orders ship free via the same method</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-charcoal-950 rounded-xl p-6 text-white">
                  <h3 className="font-semibold mb-4">Need Something Else?</h3>
                  <div className="space-y-3">
                    <Link
                      href="/track"
                      className="block text-cream-200 hover:text-white transition-colors"
                    >
                      → Track Your Order
                    </Link>
                    <Link
                      href="/faq"
                      className="block text-cream-200 hover:text-white transition-colors"
                    >
                      → Frequently Asked Questions
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-cream-200 hover:text-white transition-colors"
                    >
                      → General Contact Form
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="py-8 bg-cream-100">
          <p className="text-sm text-charcoal-500 italic text-center">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>
        </div>
      </main>
    </>
  );
}
