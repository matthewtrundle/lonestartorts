/**
 * Plain-text cold email templates for B2B outreach
 * Direct, conversational approach for initial contact
 */

export interface ColdEmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: 'bbq' | 'mexican' | 'restaurant' | 'foodtruck';
  description: string;
  body: string;
}

export const COLD_EMAIL_TEMPLATES: ColdEmailTemplate[] = [
  {
    id: 'bbq-cold',
    name: 'BBQ Restaurant - Cold Outreach',
    subject: 'Quick question about your brisket tacos',
    category: 'bbq',
    description: 'Direct, conversational cold email for BBQ restaurants',
    body: `Hey [FIRST_NAME],

I was checking out [RESTAURANT_NAME] on Google and saw your brisket tacos. They look incredible.

Quick question: what tortillas are you using?

I ask because we work with BBQ joints across Texas who were frustrated with tortillas that couldn't handle their portions. Tears, sogginess, complaints.

We source authentic H-E-B® tortillas (the real Texas ones) and ship them nationwide. They're thick enough for a half-pound of brisket, stay pliable in your warmer, and actually taste good.

Not saying your current setup is broken. But if you've ever had a tortilla fail during Saturday lunch rush, we should talk.

Want to try a sample pack? On us. No sales pitch, just quality tortillas.

Matt
Lonestar Tortillas
wholesale@lonestartortillas.com
lonestartortillas.com

P.S. - We're independent resellers. Not affiliated with H-E-B®, just really passionate about their tortillas.`
  },
  {
    id: 'mexican-cold',
    name: 'Mexican Restaurant - Cold Outreach',
    subject: 'Authentic tortillas for [RESTAURANT_NAME]',
    category: 'mexican',
    description: 'Direct, authentic-focused cold email for Mexican restaurants',
    body: `Hey [FIRST_NAME],

I'll get straight to it.

Your customers know what real tortillas taste like. They grew up on them. They judge your restaurant by them.

We ship authentic H-E-B® tortillas nationwide. Made with traditional nixtamalization, the way it's supposed to be done.

These are the tortillas Texas families trust. Now available for your restaurant, wherever you are.

Why restaurants switch to us:
- Traditional process, authentic taste
- Restaurant-grade consistency
- Your customers notice immediately

No pressure. But if you've ever had a customer say "these taste like the ones from back home," you know what I'm talking about.

Sample pack? Free shipping. Just reply.

Matt
Lonestar Tortillas
wholesale@lonestartortillas.com
lonestartortillas.com

P.S. - Independent reseller. Not affiliated with H-E-B®, just bringing Texas quality everywhere.`
  },
  {
    id: 'restaurant-cold',
    name: 'Generic Restaurant - Cold Outreach',
    subject: 'Upgrade your tortilla game',
    category: 'restaurant',
    description: 'Quality-focused cold email for general restaurants',
    body: `Hi [FIRST_NAME],

Noticed [RESTAURANT_NAME] has tacos/burritos/quesadillas on the menu.

Quick question: Are your tortillas getting mentioned in your 5-star reviews?

Most restaurants don't think about tortillas. They just order whatever. But your customers notice.

We supply authentic H-E-B® tortillas (Texas standard) to restaurants nationwide:
- Restaurant-grade consistency
- Holds up to any filling
- Premium taste customers remember

Six months ago, a bistro in Denver switched to us. Started getting Yelp reviews mentioning "authentic tortillas" and "high-quality ingredients."

That's the difference good tortillas make.

Want a sample pack? Free. See for yourself.

Matt
Lonestar Tortillas
wholesale@lonestartortillas.com
lonestartortillas.com

P.S. - We're independent resellers, not affiliated with H-E-B®. Just really believe in quality.`
  },
  {
    id: 'foodtruck-cold',
    name: 'Food Truck - Cold Outreach',
    subject: 'Tortillas that survive the road',
    category: 'foodtruck',
    description: 'Durability-focused cold email for food trucks',
    body: `Hey [FIRST_NAME],

Saw [TRUCK_NAME] on Instagram. Menu looks fire.

Real talk: How many times have your tortillas cracked during service? Or torn when you're slammed? Or felt different than last week's batch?

Food trucks need tortillas that can handle:
- Tight storage spaces
- Temperature swings
- Rush hour abuse
- Consistency every damn time

We ship authentic H-E-B® tortillas nationwide. Built for restaurant service, perfect for trucks.

Food truck owner in Portland told us: "Finally found a supplier that gets what we need."

Try a sample? On us. If they work, great. If not, no hard feelings.

Matt
Lonestar Tortillas
wholesale@lonestartortillas.com
lonestartortillas.com

P.S. - Independent reseller. Not affiliated with H-E-B®. Just making your life easier.`
  }
];

export function getColdEmailByCategory(category: 'bbq' | 'mexican' | 'restaurant' | 'foodtruck'): ColdEmailTemplate | undefined {
  return COLD_EMAIL_TEMPLATES.find(template => template.category === category);
}

export function replaceColdEmailPlaceholders(body: string, data: {
  firstName?: string;
  restaurantName?: string;
  truckName?: string;
}): string {
  return body
    .replace(/\[FIRST_NAME\]/g, data.firstName || '[First Name]')
    .replace(/\[RESTAURANT_NAME\]/g, data.restaurantName || '[Restaurant Name]')
    .replace(/\[TRUCK_NAME\]/g, data.truckName || '[Truck Name]');
}
