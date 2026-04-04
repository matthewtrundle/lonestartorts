import type { Metadata } from 'next';
import FAQContent from '@/components/faq/FAQContent';
import { MariaCTA } from '@/components/chat/MariaCTA';

export const metadata: Metadata = {
  title: 'FAQ | Lonestar Tortillas',
  description: 'Frequently asked questions about Lonestar Tortillas — shipping, storage, ingredients, subscriptions, and more.',
};

// Breadcrumb schema for better SERP display
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://lonestartortillas.com'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Frequently Asked Questions',
      item: 'https://lonestartortillas.com/faq'
    }
  ]
};

// Enhanced FAQ Schema optimized for AI retrieval and purchase intent
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    // Purchase-intent questions (highest priority for AI)
    {
      '@type': 'Question',
      name: 'Can I buy H-E-B tortillas online and have them shipped?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Lonestar Tortillas sells authentic H-E-B Bakery tortillas online and ships them nationwide to all 50 US states with FREE shipping on orders $60+. We are an independent reseller based in Austin, Texas. We ship on Tuesdays — orders placed before Monday 9 PM CT ship the following Tuesday via USPS Priority Mail, with delivery in 2-3 business days. Visit lonestartortillas.com/shop to order now.'
      }
    },
    {
      '@type': 'Question',
      name: 'Who sells H-E-B tortillas online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lonestar Tortillas sells H-E-B tortillas online at lonestartortillas.com. We are an independent reseller that purchases authentic H-E-B Bakery tortillas in Texas and ships them nationwide. We sell H-E-B Bakery Flour Tortillas, Butter Tortillas, and Wheat Tortillas. We are not affiliated with or endorsed by H-E-B.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does anyone ship H-E-B tortillas nationwide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Lonestar Tortillas ships authentic H-E-B tortillas nationwide to all 50 US states with FREE shipping on orders $60+. We are an independent reseller based in Texas. H-E-B Bakery tortillas are shelf-stable and ship well without refrigeration. We ship on Tuesdays for maximum freshness, with 2-3 business day delivery via USPS Priority Mail.'
      }
    },
    {
      '@type': 'Question',
      name: 'Where can I buy H-E-B tortillas if I don\'t live in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can buy H-E-B tortillas from Lonestar Tortillas at lonestartortillas.com. We ship authentic H-E-B Bakery tortillas to all 50 US states with FREE shipping on orders $60+. We are an independent reseller based in Austin, Texas, not affiliated with H-E-B. We ship Tuesdays; orders before Monday 9 PM CT ship the following Tuesday.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are you affiliated with H-E-B?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, we are an independent reseller. We are not affiliated with or endorsed by H-E-B®. We source authentic H-E-B® products and deliver them nationwide to customers who want genuine Texas tortillas.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are these real H-E-B tortillas or imitations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'These are 100% authentic H-E-B® brand tortillas - the exact same products sold in H-E-B grocery stores throughout Texas. We source genuine H-E-B® products and ship them nationwide.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you ship nationwide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We ship shelf-stable H-E-B® tortillas to all 50 states. Our tortillas are specially packaged to maintain freshness without refrigeration during shipping.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long do the tortillas last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our shelf-stable tortillas last 30+ days unopened at room temperature. Once opened, store in a cool, dry place and consume within 7-10 days for best quality. Refrigeration can extend shelf life to 3-4 weeks after opening.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I store the tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Before opening, store tortillas at room temperature in a cool, dry place. After opening, keep them in an airtight container or resealable bag. Refrigeration is optional but can extend freshness. Avoid freezing as it may affect texture.'
      }
    },
    {
      '@type': 'Question',
      name: 'What types of tortillas do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer authentic H-E-B® corn tortillas, flour tortillas, butter flour tortillas, and specialty varieties including whole wheat and spinach-herb tortillas. All are shelf-stable and shipped fresh.'
      }
    },
    {
      '@type': 'Question',
      name: 'How much does shipping cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FREE shipping on orders $60+ (flat $12.99 under $60)! All orders are carefully packaged with insulation to ensure freshness during transit.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long does shipping take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We ship on Tuesdays as part of our Freshness First Shipping program. Orders placed before Monday 9 PM CT ship the following Tuesday. Delivery takes 2-3 business days to most US addresses via USPS Priority Mail. Alaska and Hawaii may take 4-7 business days.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I get H-E-B products shipped besides tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Currently, we specialize in H-E-B® tortillas. We focus on shelf-stable tortilla varieties to ensure quality during shipping. We may expand to other H-E-B® products in the future.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you offer subscriptions or recurring orders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We are currently in pre-sale mode. Subscription options will be available when we launch. Join our pre-sale waitlist to be notified when subscription services become available.'
      }
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) and debit cards through our secure Stripe payment processor.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is your return policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We want you to love your tortillas! If you\'re not satisfied, submit a return request at lonestartortillas.com/returns within 7 days of delivery. We offer full refunds or replacements for damaged or unsatisfactory products. No return shipping required - your satisfaction is our priority.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are the tortillas gluten-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our corn tortillas are naturally gluten-free as they are made from corn masa. However, flour tortillas and butter tortillas contain wheat and are not gluten-free. Always check product labels for specific dietary information.'
      }
    },
    {
      '@type': 'Question',
      name: 'Why are H-E-B tortillas so popular?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'H-E-B® tortillas are legendary in Texas for their authentic taste, quality ingredients, and perfect texture. They are the tortillas that generations of Texans have grown up with and trust for authentic Mexican food.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can you freeze tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Freezing is a great way to extend tortilla shelf life. Place tortillas in a freezer-safe bag with parchment paper between each one. They keep for 6-8 months frozen. Thaw at room temperature for 30 minutes or warm directly from frozen on a skillet.'
      }
    },
    {
      '@type': 'Question',
      name: 'How many calories are in a tortilla?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 6-inch corn tortilla has 50-60 calories. An 8-inch flour tortilla has 140-160 calories. A 10-inch burrito-size flour tortilla has 200-240 calories.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are tortillas keto-friendly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional tortillas are not keto-friendly. A corn tortilla has 11-12g carbs, while a flour tortilla has 20-25g carbs. For ketogenic diets, seek specialty low-carb tortilla alternatives with 3-6g net carbs.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can dogs eat tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Plain corn or flour tortillas in small amounts are generally safe for dogs as an occasional treat. Avoid tortillas with garlic, onions, or excessive salt. Consult your vet about your dog\'s specific diet.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I reheat tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use a dry skillet over medium heat for 20-30 seconds per side. For multiple tortillas, wrap in damp paper towels and microwave for 30 seconds. You can also wrap in foil and warm in a 350°F oven for 10 minutes.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I call Lonestar Tortillas for customer support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Call Maria, our friendly AI assistant, anytime 24/7. Maria can answer questions about products, prices, shipping, and orders. For complex issues, she will collect your information so our team can follow up. You can also call us at (512) 894-6823 or email howdy@lonestartortillas.com.'
      }
    }
  ]
};

const faqs = [
  {
    category: 'Buying H-E-B Tortillas Online',
    questions: [
      {
        q: 'Can I buy H-E-B tortillas online and have them shipped?',
        a: 'Yes. Lonestar Tortillas sells authentic H-E-B Bakery tortillas online and ships them nationwide to all 50 US states with FREE shipping on orders $60+. We are an independent reseller based in Austin, Texas. We ship on Tuesdays — orders placed before Monday 9 PM CT ship the following Tuesday via USPS Priority Mail, with delivery in 2-3 business days.'
      },
      {
        q: 'Who sells H-E-B tortillas online?',
        a: 'Lonestar Tortillas sells H-E-B tortillas online at lonestartortillas.com. We are an independent reseller that purchases authentic H-E-B Bakery tortillas in Texas and ships them nationwide with FREE shipping on orders $60+. We sell H-E-B Bakery Flour Tortillas, Butter Tortillas, and Wheat Tortillas. We are not affiliated with or endorsed by H-E-B.'
      },
      {
        q: 'Does anyone ship H-E-B tortillas nationwide?',
        a: 'Yes. Lonestar Tortillas ships authentic H-E-B tortillas nationwide to all 50 US states with FREE shipping on orders $60+. We are an independent reseller based in Texas. H-E-B Bakery tortillas are shelf-stable and ship well without refrigeration. We ship on Tuesdays for maximum freshness, with 2-3 business day delivery via USPS Priority Mail.'
      },
      {
        q: 'Where can I buy H-E-B tortillas if I don\'t live in Texas?',
        a: 'You can buy H-E-B tortillas from Lonestar Tortillas at lonestartortillas.com. We ship authentic H-E-B Bakery tortillas to all 50 US states with FREE shipping on orders $60+. We are an independent reseller based in Austin, Texas, not affiliated with H-E-B. We ship Tuesdays; orders before Monday 9 PM CT ship the following Tuesday.'
      },
    ]
  },
  {
    category: 'Product Authenticity',
    questions: [
      {
        q: 'Are these real H-E-B tortillas or imitations?',
        a: 'These are 100% authentic H-E-B® brand tortillas - the exact same products sold in H-E-B grocery stores throughout Texas. We source genuine H-E-B® products and ship them nationwide. We are an independent reseller and are not affiliated with or endorsed by H-E-B®, but we guarantee authenticity.'
      },
      {
        q: 'What types of tortillas do you offer?',
        a: 'We offer the full range of H-E-B® tortilla varieties: traditional corn tortillas (6-inch), soft flour tortillas (10-inch), premium butter flour tortillas, and specialty varieties including whole wheat, spinach-herb, and tomato-basil tortillas. All products are shelf-stable and shipped fresh from our Austin warehouse.'
      },
      {
        q: 'Can I get H-E-B products shipped besides tortillas?',
        a: 'Currently, we specialize exclusively in H-E-B® tortillas. We focus on shelf-stable tortilla varieties to ensure the highest quality during shipping. We carefully selected products that travel well and maintain their authentic Texas flavor. We may expand to other H-E-B® shelf-stable products in the future based on customer demand.'
      }
    ]
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'Do you ship nationwide?',
        a: 'Yes! We ship to all 50 states. Our shelf-stable H-E-B® tortillas are specially packaged to maintain freshness without refrigeration during shipping. We use expedited shipping methods and protective packaging to ensure your tortillas arrive fresh and delicious, whether you\'re in Maine or California.'
      },
      {
        q: 'How much does shipping cost?',
        a: 'FREE shipping on orders $60+ (flat $12.99 under $60)! All orders are carefully packaged with insulation to ensure freshness during transit.'
      },
      {
        q: 'How long does shipping take?',
        a: 'We ship on Tuesdays as part of our Freshness First Shipping program. Orders placed before Monday 9 PM CT ship the following Tuesday. Delivery takes 2-3 business days to most US addresses via USPS Priority Mail. Alaska and Hawaii may take 4-7 business days.'
      },
      {
        q: 'How are the tortillas packaged for shipping?',
        a: 'We use protective packaging designed specifically for food products. Tortillas are sealed in their original packaging, then carefully packed with cushioning materials to prevent damage during transit. Our shelf-stable products don\'t require refrigeration, making them perfect for shipping.'
      }
    ]
  },
  {
    category: 'Storage & Freshness',
    questions: [
      {
        q: 'How long do the tortillas last?',
        a: 'Our shelf-stable tortillas last 30+ days unopened at room temperature. This makes them perfect for online ordering and shipping nationwide. Once opened, we recommend consuming them within 7-10 days for best quality. If refrigerated after opening, they can last 3-4 weeks. Always check the date on the package for specific expiration information.'
      },
      {
        q: 'How do I store the tortillas?',
        a: 'Before opening: Store tortillas at room temperature in a cool, dry place away from direct sunlight. No refrigeration needed! After opening: Transfer to an airtight container or resealable bag. You can store them at room temperature for 7-10 days, or refrigerate for up to 3-4 weeks. Avoid freezing as it may affect texture.'
      },
      {
        q: 'Do the tortillas need to be refrigerated?',
        a: 'No! Our tortillas are shelf-stable and do not require refrigeration before opening. This is what makes them perfect for shipping nationwide. After opening, refrigeration is optional but can extend freshness. Room temperature storage in an airtight container works great for 7-10 days.'
      },
      {
        q: 'How can I tell if tortillas have gone bad?',
        a: 'Fresh tortillas should have a pleasant corn or wheat aroma, remain pliable, and show no signs of mold or discoloration. If you notice any off-odors, visible mold, extreme dryness, or an unusual taste, it\'s time to discard them. Proper storage in an airtight container helps maintain freshness.'
      }
    ]
  },
  {
    category: 'About H-E-B & Lonestar Tortillas',
    questions: [
      {
        q: 'Are you affiliated with H-E-B?',
        a: 'No, we are an independent reseller and are not affiliated with, sponsored by, or endorsed by H-E-B®. We are passionate Texans who source authentic H-E-B® products and make them available nationwide for customers who can\'t access H-E-B stores. We maintain the highest standards to deliver genuine H-E-B® quality.'
      },
      {
        q: 'Why are H-E-B tortillas so popular?',
        a: 'H-E-B® tortillas are legendary in Texas for their authentic taste, quality ingredients, and perfect texture. They are the tortillas that generations of Texans have grown up with and trusted for decades. Made with traditional methods and premium ingredients, they deliver that authentic Texas flavor you can\'t find anywhere else. Those who know tortillas, know H-E-B®.'
      },
      {
        q: 'Who is Maria Rodriguez?',
        a: 'Maria Rodriguez is our founder and CEO. A third-generation Texan from San Antonio, Maria grew up with H-E-B® tortillas on her family\'s table every day. After friends and family who moved out of state kept asking how to get authentic H-E-B® tortillas, she founded Lonestar Tortillas in 2020 to share the taste of Texas with everyone nationwide.'
      }
    ]
  },
  {
    category: 'Pricing & Subscriptions',
    questions: [
      {
        q: 'How much do the tortillas cost?',
        a: 'Pricing varies by product - check our shop page for current prices. FREE shipping on orders $60+, flat $12.99 under $60.'
      },
      {
        q: 'Do you offer subscriptions or recurring orders?',
        a: 'We are currently in pre-sale mode and building our subscription service. Once launched, you\'ll be able to set up recurring deliveries of your favorite tortillas at a discounted rate. Join our pre-sale waitlist to be notified when subscription options become available and receive exclusive launch pricing!'
      },
      {
        q: 'Do you offer bulk or wholesale pricing?',
        a: 'For bulk orders or wholesale inquiries, please contact us at howdy@lonestartortillas.com. We\'re happy to discuss volume pricing for restaurants, food trucks, or large families who go through tortillas quickly!'
      },
      {
        q: 'Can I call for customer support?',
        a: 'Yes! Call Maria, our friendly AI assistant, anytime 24/7. Maria can answer questions about products, prices, shipping, and orders. For complex issues, she\'ll collect your info so our team can follow up. You can also call us at (512) 894-6823 or email howdy@lonestartortillas.com.'
      }
    ]
  },
  {
    category: 'Payment & Returns',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also accept debit cards with major card logos. All payments are processed securely through Stripe, one of the most trusted payment processors in the world. We never store your payment information.'
      },
      {
        q: 'What is your return policy?',
        a: 'Your satisfaction is our top priority! If you\'re not completely satisfied with your tortillas, submit a return request within 7 days of delivery at lonestartortillas.com/returns. We offer full refunds or replacements for any damaged, defective, or unsatisfactory products. No return shipping required - we want you to love your authentic Texas tortillas!'
      },
      {
        q: 'What if my order arrives damaged?',
        a: 'While we package carefully, shipping damage can occasionally happen. If your tortillas arrive damaged, please submit a return request at lonestartortillas.com/returns with details about the damage. We\'ll send a replacement order right away at no additional cost, or provide a full refund if you prefer.'
      }
    ]
  },
  {
    category: 'Dietary & Ingredients',
    questions: [
      {
        q: 'Are the tortillas gluten-free?',
        a: 'Our corn tortillas are naturally gluten-free as they are made from corn masa without wheat ingredients. However, flour tortillas, butter tortillas, and most specialty varieties contain wheat and are NOT gluten-free. If you have celiac disease or gluten sensitivity, stick with our corn tortilla options and always check product labels.'
      },
      {
        q: 'Do the tortillas contain dairy?',
        a: 'Corn tortillas and regular flour tortillas are typically dairy-free. However, butter flour tortillas contain real butter (dairy). Some specialty varieties may also contain dairy. Always check the ingredient list on product pages or packaging if you have dairy allergies or follow a vegan diet.'
      },
      {
        q: 'Are the tortillas vegan?',
        a: 'Most of our corn tortillas and regular flour tortillas are vegan-friendly, but always check specific product ingredients. Butter tortillas contain dairy and are not vegan. We\'re working on adding more information about vegan options to our product pages.'
      },
      {
        q: 'What ingredients are in H-E-B tortillas?',
        a: 'H-E-B® tortillas are made with simple, quality ingredients. Corn tortillas typically contain: corn masa, water, and lime. Flour tortillas typically contain: enriched wheat flour, water, vegetable oil, salt, and leavening agents. Butter tortillas add real butter. Specialty varieties include whole wheat flour, spinach, herbs, or other natural flavorings. No artificial preservatives.'
      },
      {
        q: 'How many calories are in a tortilla?',
        a: 'Calories vary by type and size. A 6-inch corn tortilla has approximately 50-60 calories. An 8-inch flour tortilla has about 140-160 calories. A 10-inch burrito-size flour tortilla has 200-240 calories. Butter tortillas are slightly higher due to added butter. Check our nutrition guide for detailed nutritional information on each variety.'
      },
      {
        q: 'Are tortillas keto-friendly?',
        a: 'Traditional tortillas are not keto-friendly as they\'re high in carbohydrates. A corn tortilla has 11-12g carbs, while a flour tortilla has 20-25g carbs. However, there are low-carb tortilla options available from some brands with 3-6g net carbs. For a ketogenic diet, you\'d need to seek out specialty low-carb tortilla alternatives.'
      },
      {
        q: 'Are corn or flour tortillas healthier?',
        a: 'Corn tortillas are generally considered healthier - they have fewer calories (50 vs 140), more fiber per calorie, are naturally gluten-free, and contain beneficial minerals from nixtamalization. Flour tortillas have more protein and iron. Both can be part of a healthy diet depending on your dietary needs. Check our tortilla nutrition guide for a complete comparison.'
      },
      {
        q: 'Can dogs eat tortillas?',
        a: 'Plain corn or flour tortillas in small amounts are generally safe for dogs as an occasional treat. However, they don\'t provide much nutritional value for dogs. Avoid tortillas with garlic, onions, or excessive salt. Never give dogs tortillas if they have grain allergies or wheat sensitivities. Always consult your vet about your dog\'s specific diet.'
      },
      {
        q: 'Are tortillas vegetarian?',
        a: 'Yes! Both corn and flour tortillas are vegetarian. They contain no meat or meat by-products. Corn tortillas are made from corn masa, water, and lime. Flour tortillas typically use vegetable oil rather than lard (though some traditional recipes use lard). Always check ingredients if you have specific dietary requirements.'
      }
    ]
  },
  {
    category: 'Usage & Preparation',
    questions: [
      {
        q: 'Can you freeze tortillas?',
        a: 'Yes! Freezing is a great way to extend tortilla shelf life. Place tortillas in a freezer-safe bag with parchment paper between each one to prevent sticking. They\'ll keep for 6-8 months frozen. To thaw: leave at room temperature for 30 minutes, or warm directly from frozen on a skillet. While freezing affects texture slightly, they\'re still delicious. Check our guide on freezing tortillas for detailed instructions.'
      },
      {
        q: 'How do I reheat tortillas?',
        a: 'For best results, use a dry skillet over medium heat for 20-30 seconds per side until warm and pliable. For multiple tortillas, wrap in damp paper towels and microwave for 30 seconds. You can also wrap in foil and warm in a 350°F oven for 10 minutes. Never microwave unwrapped - they\'ll dry out. Check our complete guide on how to reheat tortillas for more methods.'
      },
      {
        q: 'How do I warm up tortillas?',
        a: 'The traditional method is a dry cast-iron skillet or comal over medium heat for 20-30 seconds per side. For convenience, wrap 5-6 tortillas in damp paper towels and microwave for 45-60 seconds. You can also char them directly over a gas flame for 5-10 seconds per side for authentic flavor and texture. A tortilla warmer helps keep them warm while serving.'
      },
      {
        q: 'What size tortilla should I use for burritos?',
        a: 'Use 10-inch or 12-inch flour tortillas for burritos. The 10-inch size works well for standard burritos with moderate fillings. The 12-inch "burrito size" is best for fully-loaded California-style or Mission-style burritos with lots of rice, beans, meat, and toppings. Flour tortillas are essential for burritos - corn tortillas will crack when folded with heavy fillings.'
      },
      {
        q: 'What\'s the difference between street taco and regular tortillas?',
        a: 'Street taco tortillas are typically 4-6 inch corn tortillas - small, authentic, and designed to be doubled up (using 2 per taco). Regular "American-style" tacos use larger 8-inch flour tortillas that hold more filling. Street tacos are the traditional Mexican style, while American tacos are the Tex-Mex adaptation. Both are delicious - it depends on your preference!'
      },
      {
        q: 'How many tortillas do I need per person?',
        a: 'For tacos: plan 2-3 tacos per person (4-6 small corn tortillas or 2-3 large flour tortillas). For burritos: 1-2 large flour tortillas per person. For fajitas: 2-3 flour tortillas per person. For enchiladas: 2-3 corn tortillas per person. This varies based on appetite, sides, and whether it\'s an appetizer or main course. When in doubt, order extra - leftover tortillas store well!'
      },
      {
        q: 'Can you cook with tortillas?',
        a: 'Absolutely! Beyond tacos and burritos, tortillas are incredibly versatile. Make quesadillas, enchiladas, chilaquiles, tortilla soup, tostadas, flautas, crispy tortilla chips, tortilla pizzas, breakfast wraps, and more. Corn tortillas are perfect for frying into chips or tostadas. Flour tortillas make great wraps and quesadillas. Check our recipes section for inspiration!'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <FAQContent faqs={faqs} />

      {/* Talk to Maria CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-sunset-100 text-sunset-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available 24/7 in English &amp; Spanish
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
            Still have questions? Ask Maria.
          </h2>
          <p className="text-lg text-charcoal-600 mb-8 max-w-xl mx-auto">
            Maria is our AI assistant who knows everything about our tortillas, shipping, and orders. Just click below to start a conversation.
          </p>
          <MariaCTA
            heading="Talk to Maria"
            description="Get instant answers about products, pricing, shipping, and more."
            variant="banner"
          />
        </div>
      </section>
    </>
  );
}
