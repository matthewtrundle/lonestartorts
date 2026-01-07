import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Lonestar Tortillas',
  description: 'Terms of Service for Lonestar Tortillas - the terms and conditions governing your use of our website and purchases.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-cream-50 pt-24">
        {/* Hero Section */}
        <section className="bg-charcoal-950 text-white py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
            <p className="text-cream-300">Last updated: December 21, 2025</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 prose prose-charcoal max-w-none">

              <p className="lead text-lg text-charcoal-700 mb-8">
                Welcome to Lonestar Tortillas. These Terms of Service (&quot;Terms&quot;) govern your use of our website lonestartortillas.com and any purchases you make from us. By accessing our website or placing an order, you agree to be bound by these Terms.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">1. About Our Business</h2>
              <p className="text-charcoal-700 mb-4">
                Lonestar Tortillas is an independent reseller of H-E-B bakery products. We purchase H-E-B tortillas and other products from retail locations in Texas and resell them to customers nationwide.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-charcoal-800 mb-0">
                  <strong>Important:</strong> Lonestar Tortillas is not affiliated with, endorsed by, or sponsored by H-E-B, LP. H-E-B is a registered trademark of H-E-B, LP. Our use of the H-E-B name is solely to accurately describe the products we resell under nominative fair use principles.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">2. Products and Pricing</h2>
              <p className="text-charcoal-700 mb-4">
                All products are sold &quot;as is&quot; and are subject to availability. Prices are listed in U.S. dollars and are subject to change without notice. We reserve the right to limit quantities and to refuse any order.
              </p>
              <ul className="list-disc pl-6 text-charcoal-700 space-y-2 mb-4">
                <li>Product images are for illustration purposes and may vary slightly from actual products</li>
                <li>We make every effort to display accurate product information but cannot guarantee complete accuracy</li>
                <li>Prices do not include shipping unless otherwise stated</li>
              </ul>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">3. Orders and Payment</h2>
              <p className="text-charcoal-700 mb-4">
                By placing an order, you represent that:
              </p>
              <ul className="list-disc pl-6 text-charcoal-700 space-y-2 mb-4">
                <li>You are at least 18 years of age</li>
                <li>The payment information you provide is accurate and complete</li>
                <li>You are authorized to use the payment method</li>
              </ul>
              <p className="text-charcoal-700 mb-4">
                All payments are processed securely through Stripe. We accept major credit cards, debit cards, Apple Pay, and Google Pay. Your order is not confirmed until payment is successfully processed.
              </p>
              <p className="text-charcoal-700 mb-4">
                We reserve the right to cancel any order for any reason, including suspected fraud, pricing errors, or product unavailability. If we cancel your order, we will issue a full refund.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">4. Shipping and Delivery</h2>
              <p className="text-charcoal-700 mb-4">
                We ship to all 50 U.S. states. Shipping rates are calculated at checkout based on your order size and destination.
              </p>
              <ul className="list-disc pl-6 text-charcoal-700 space-y-2 mb-4">
                <li><strong>Processing time:</strong> Orders are typically processed and shipped within 1-2 business days</li>
                <li><strong>Delivery time:</strong> Standard shipping takes 3-5 business days; expedited options are available at checkout</li>
                <li><strong>Free shipping:</strong> Orders of $80 or more qualify for free standard shipping (USPS Priority Mail)</li>
                <li><strong>Tracking:</strong> You will receive a tracking number via email once your order ships</li>
              </ul>
              <p className="text-charcoal-700 mb-4">
                Risk of loss and title for items purchased pass to you upon delivery to the carrier. We are not responsible for delays caused by shipping carriers, weather, or other circumstances beyond our control.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">5. Product Shelf Life and Storage</h2>
              <p className="text-charcoal-700 mb-4">
                Our tortillas are shelf-stable and do not require refrigeration before opening. Please follow storage instructions on the product packaging. Typical shelf life is 2-3 weeks at room temperature, or longer if refrigerated or frozen.
              </p>
              <p className="text-charcoal-700 mb-4">
                For products marked as refrigerated (such as certain sauces), please refrigerate upon receipt.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">6. Returns and Refunds</h2>
              <p className="text-charcoal-700 mb-4">
                Customer satisfaction is our priority. If you receive damaged, defective, or incorrect products, please contact us within 48 hours of delivery:
              </p>
              <ul className="list-disc pl-6 text-charcoal-700 space-y-2 mb-4">
                <li><strong>Damaged products:</strong> Please take photos and contact us. We will replace or refund damaged items.</li>
                <li><strong>Incorrect orders:</strong> We will ship the correct items at no additional cost.</li>
                <li><strong>Quality concerns:</strong> Contact us and we&apos;ll work with you to make it right.</li>
              </ul>
              <p className="text-charcoal-700 mb-4">
                Due to the perishable nature of our products, we cannot accept returns of opened or consumed items unless they are defective. Refunds are issued to the original payment method within 5-10 business days.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">7. Intellectual Property</h2>
              <p className="text-charcoal-700 mb-4">
                All content on our website, including text, graphics, logos, images, and software, is the property of Lonestar Tortillas or its content suppliers and is protected by U.S. and international copyright laws.
              </p>
              <p className="text-charcoal-700 mb-4">
                H-E-B and related marks are trademarks of H-E-B, LP and are used solely to identify the products we resell.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">8. Limitation of Liability</h2>
              <p className="text-charcoal-700 mb-4">
                To the fullest extent permitted by law, Lonestar Tortillas shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products.
              </p>
              <p className="text-charcoal-700 mb-4">
                Our total liability for any claim arising from your purchase shall not exceed the amount you paid for the specific product(s) giving rise to the claim.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">9. Indemnification</h2>
              <p className="text-charcoal-700 mb-4">
                You agree to indemnify and hold harmless Lonestar Tortillas, its owners, employees, and agents from any claims, damages, losses, or expenses arising from your violation of these Terms or misuse of our website or products.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">10. Governing Law</h2>
              <p className="text-charcoal-700 mb-4">
                These Terms are governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Travis County, Texas.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">11. Changes to Terms</h2>
              <p className="text-charcoal-700 mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our website after changes are posted constitutes acceptance of the modified Terms.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">12. Severability</h2>
              <p className="text-charcoal-700 mb-4">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>

              <h2 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">13. Contact Us</h2>
              <p className="text-charcoal-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none pl-0 text-charcoal-700 space-y-2 mb-4">
                <li><strong>Email:</strong> howdy@lonestartortillas.com</li>
                <li><strong>Text:</strong> (737) 228-0037</li>
                <li><strong>Website:</strong> <Link href="/contact" className="text-sunset-600 hover:text-sunset-700">lonestartortillas.com/contact</Link></li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-charcoal-500 italic">
                  By using our website or making a purchase, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our <Link href="/privacy" className="text-sunset-600 hover:text-sunset-700">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
