import { Header } from '@/components/layout/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lonestar Tortillas',
  description: 'Privacy Policy for Lonestar Tortillas - how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-cream-50 pt-24">
        {/* Hero Section */}
        <section className="bg-charcoal-950 text-white py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-cream-300">Last updated: December 21, 2025</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 prose prose-charcoal max-w-none">

              <p className="lead text-lg text-charcoal-700 mb-8">
                Lonestar Tortillas (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website lonestartortillas.com or make a purchase from us.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">1. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-charcoal-900 mt-6 mb-3">Information You Provide Directly</h3>
              <p className="text-charcoal-700 mb-4">We collect information you voluntarily provide when you:</p>
              <ul className="list-disc pl-6 text-charcoal-700 space-y-2 mb-4">
                <li><strong>Place an order:</strong> Name, email address, shipping address, billing address, and phone number</li>
                <li><strong>Contact us:</strong> Information submitted through our contact form, email (howdy@lonestartortillas.com), or text messages to (737) 228-0037</li>
                <li><strong>Subscribe to updates:</strong> Email address for order notifications and promotional communications</li>
              </ul>

              <h3 className="text-xl font-semibold text-charcoal-900 mt-6 mb-3">Payment Information</h3>
              <p className="text-charcoal-700 mb-4">
                We use Stripe to process payments securely. When you make a purchase, your payment card details are collected and processed directly by Stripe. We do not store your full credit card number on our servers. Stripe may share with us limited transaction information such as the last four digits of your card, card type, and billing address for order verification and fraud prevention. For more information, please see <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sunset-600 hover:text-sunset-700">Stripe&apos;s Privacy Policy</a>.
              </p>

              <h3 className="text-xl font-semibold text-charcoal-900 mt-6 mb-3">Information Collected Automatically</h3>
              <p className="text-charcoal-700 mb-4">When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-6 text-charcoal-700 space-y-2 mb-4">
                <li>Device information (browser type, operating system, device type)</li>
                <li>IP address and general location data</li>
                <li>Pages visited, time spent on pages, and navigation patterns</li>
                <li>Referring website or source</li>
              </ul>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="text-charcoal-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-charcoal-700 space-y-2 mb-4">
                <li>Process and fulfill your orders, including shipping and delivery</li>
                <li>Send order confirmations, shipping updates, and delivery notifications</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website, products, and customer experience</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Prevent fraud and maintain security</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">3. Advertising and Analytics</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-charcoal-800 mb-0">
                  <strong>Third-Party Advertising &amp; Analytics:</strong> We use third-party advertising and analytics tools, including Google Ads and Google Analytics, to measure performance and show relevant ads. These services may use cookies or similar technologies and may receive limited customer data (such as email or purchase activity) in a privacy-safe, hashed form to improve ad relevance. We only share data as permitted by law and user consent.
                </p>
              </div>
              <p className="text-charcoal-700 mb-4">
                We may share customer data with third parties to perform services on our behalf, including advertising and measurement. This data may be used for personalized advertising to show you relevant products and offers.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">4. How We Share Your Information</h2>
              <p className="text-charcoal-700 mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 text-charcoal-700 space-y-2 mb-4">
                <li><strong>Payment processors:</strong> Stripe processes your payment information securely</li>
                <li><strong>Shipping carriers:</strong> USPS, FedEx, or other carriers to deliver your orders</li>
                <li><strong>Advertising partners:</strong> Google Ads for remarketing and audience targeting</li>
                <li><strong>Analytics providers:</strong> Google Analytics to understand website usage</li>
                <li><strong>Service providers:</strong> Email delivery, customer support tools, and hosting services</li>
                <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="text-charcoal-700 mb-4">
                We do not sell your personal information to third parties.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-charcoal-700 mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. These may include:
              </p>
              <ul className="list-disc pl-6 text-charcoal-700 space-y-2 mb-4">
                <li><strong>Essential cookies:</strong> Required for the website to function properly (cart, checkout)</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our site</li>
                <li><strong>Advertising cookies:</strong> Used to deliver relevant ads and track campaign performance</li>
              </ul>
              <p className="text-charcoal-700 mb-4">
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">6. Data Retention</h2>
              <p className="text-charcoal-700 mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, including to satisfy legal, accounting, or reporting requirements. Order records are typically retained for 7 years for tax and accounting purposes.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">7. Data Security</h2>
              <p className="text-charcoal-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information. All data transmitted during checkout is encrypted using SSL/TLS technology. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">8. Your Rights and Choices</h2>
              <p className="text-charcoal-700 mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 text-charcoal-700 space-y-2 mb-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Opt-out of personalized advertising</li>
              </ul>
              <p className="text-charcoal-700 mb-4">
                To exercise any of these rights, please contact us at howdy@lonestartortillas.com.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-charcoal-700 mb-4">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">10. Changes to This Policy</h2>
              <p className="text-charcoal-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">11. Contact Us</h2>
              <p className="text-charcoal-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul className="list-none pl-0 text-charcoal-700 space-y-2 mb-4">
                <li><strong>Email:</strong> howdy@lonestartortillas.com</li>
                <li><strong>Text:</strong> (737) 228-0037</li>
                <li><strong>Website:</strong> lonestartortillas.com/contact</li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-charcoal-500 italic">
                  Lonestar Tortillas is an independent reseller and is not affiliated with or endorsed by H-E-B.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
