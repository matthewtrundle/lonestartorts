/**
 * 90-Day Nurture Flow (40 emails)
 * Drip campaign for lead nurturing, education, and conversion
 *
 * Strategy: Mix of educational content, social proof, offers, and gentle CTAs
 * Frequency: ~3 emails per week (M/W/F pattern)
 */

export interface NurtureEmail {
  id: string;
  day: number;
  week: number;
  subject: string;
  type: 'education' | 'social-proof' | 'offer' | 'product' | 'story' | 'cta';
  description: string;
  tone: 'casual' | 'professional' | 'texas' | 'urgent';
}

export const NURTURE_FLOW: NurtureEmail[] = [
  // Week 1: Introduction & Problem Awareness
  { id: 'n001', day: 1, week: 1, subject: 'Welcome! Let\'s talk tortillas', type: 'education', tone: 'casual', description: 'Welcome email, set expectations, introduce brand' },
  { id: 'n002', day: 3, week: 1, subject: 'The #1 complaint about restaurant tortillas', type: 'education', tone: 'professional', description: 'Problem awareness - tears, inconsistency, quality issues' },
  { id: 'n003', day: 5, week: 1, subject: 'What makes a great tortilla? (It\'s not what you think)', type: 'education', tone: 'casual', description: 'Educational content - nixtamalization, quality markers' },

  // Week 2: Solution Introduction
  { id: 'n004', day: 8, week: 2, subject: 'Why Texas restaurants swear by H-E-B® tortillas', type: 'product', tone: 'texas', description: 'Introduce product line, Texas heritage' },
  { id: 'n005', day: 10, week: 2, subject: 'Case Study: How Smokin\' Oak BBQ solved their tortilla problem', type: 'social-proof', tone: 'professional', description: 'Customer success story with metrics' },
  { id: 'n006', day: 12, week: 2, subject: '5 signs your current tortillas are costing you money', type: 'education', tone: 'professional', description: 'Cost analysis - waste, complaints, reputation' },

  // Week 3: Deep Dive & Credibility
  { id: 'n007', day: 15, week: 3, subject: 'The real story behind Lonestar Tortillas', type: 'story', tone: 'texas', description: 'Founder story, mission, why we do this' },
  { id: 'n008', day: 17, week: 3, subject: 'Corn vs Flour: Which is right for your menu?', type: 'education', tone: 'professional', description: 'Product education guide' },
  { id: 'n009', day: 19, week: 3, subject: 'What customers say about our tortillas', type: 'social-proof', tone: 'casual', description: 'Testimonial compilation, reviews' },

  // Week 4: First Soft Offer
  { id: 'n010', day: 22, week: 4, subject: '[Restaurant Name] - Try us risk-free', type: 'offer', tone: 'professional', description: 'Free sample pack offer (no strings)' },
  { id: 'n011', day: 24, week: 4, subject: 'How to store tortillas the right way', type: 'education', tone: 'casual', description: 'Practical tips content' },
  { id: 'n012', day: 26, week: 4, subject: 'Last chance: Free sample pack expires Friday', type: 'offer', tone: 'urgent', description: 'Sample pack reminder with urgency' },

  // Week 5: Reset, More Education
  { id: 'n013', day: 29, week: 5, subject: 'The science of tortilla texture', type: 'education', tone: 'professional', description: 'Deep educational content' },
  { id: 'n014', day: 31, week: 5, subject: 'Behind the scenes: Our shipping process', type: 'product', tone: 'casual', description: 'Transparency, build trust' },
  { id: 'n015', day: 33, week: 5, subject: '3 menu items that benefit most from premium tortillas', type: 'education', tone: 'professional', description: 'Application-focused content' },

  // Week 6: Social Proof Heavy
  { id: 'n016', day: 36, week: 6, subject: 'How Casa Gonzalez increased their Google rating', type: 'social-proof', tone: 'professional', description: 'Detailed case study' },
  { id: 'n017', day: 38, week: 6, subject: 'Food truck owners: This one\'s for you', type: 'education', tone: 'texas', description: 'Segment-specific content' },
  { id: 'n018', day: 40, week: 6, subject: 'Quick question: What\'s stopping you?', type: 'cta', tone: 'casual', description: 'Objection-seeking email, dialogue' },

  // Week 7: Product Focus
  { id: 'n019', day: 43, week: 7, subject: 'Introducing: Our 4-Pack & 10-Pack options', type: 'product', tone: 'professional', description: 'Product lineup deep dive' },
  { id: 'n020', day: 45, week: 7, subject: 'Wholesale pricing explained', type: 'product', tone: 'professional', description: 'Transparent pricing education' },
  { id: 'n021', day: 47, week: 7, subject: 'Compare us: Lonestar vs. your current supplier', type: 'education', tone: 'professional', description: 'Competitive comparison' },

  // Week 8: Second Offer Wave
  { id: 'n022', day: 50, week: 8, subject: '🌟 Special: 15% off your first wholesale order', type: 'offer', tone: 'professional', description: 'First purchase discount' },
  { id: 'n023', day: 52, week: 8, subject: 'What happens after you place an order', type: 'education', tone: 'casual', description: 'Process walkthrough, reduce friction' },
  { id: 'n024', day: 54, week: 8, subject: 'This discount expires Monday', type: 'offer', tone: 'urgent', description: '15% reminder with urgency' },

  // Week 9: Community & Belonging
  { id: 'n025', day: 57, week: 9, subject: 'Join 200+ restaurants who switched', type: 'social-proof', tone: 'texas', description: 'Community positioning' },
  { id: 'n026', day: 59, week: 9, subject: 'Recipe: Perfect BBQ brisket tacos', type: 'education', tone: 'casual', description: 'Value-add content' },
  { id: 'n027', day: 61, week: 9, subject: 'The difference quality makes (photos inside)', type: 'social-proof', tone: 'professional', description: 'Visual proof, before/after' },

  // Week 10: Urgency Building
  { id: 'n028', day: 64, week: 10, subject: 'Still on the fence? Here\'s why restaurants choose us', type: 'cta', tone: 'professional', description: 'Benefits recap, objection handling' },
  { id: 'n029', day: 66, week: 10, subject: 'Flash sale: 20% off this weekend only', type: 'offer', tone: 'urgent', description: 'Limited-time offer' },
  { id: 'n030', day: 68, week: 10, subject: 'Hours left on 20% discount', type: 'offer', tone: 'urgent', description: 'Final countdown' },

  // Week 11: Long-term Relationship
  { id: 'n031', day: 71, week: 11, subject: 'How to train staff on tortilla handling', type: 'education', tone: 'professional', description: 'Operational content' },
  { id: 'n032', day: 73, week: 11, subject: 'Meet the farmers behind our corn', type: 'story', tone: 'texas', description: 'Supply chain transparency' },
  { id: 'n033', day: 75, week: 11, subject: 'Customer spotlight: Taco Nomad food truck', type: 'social-proof', tone: 'casual', description: 'Customer interview' },

  // Week 12: Re-engagement Push
  { id: 'n034', day: 78, week: 12, subject: 'We noticed you haven\'t ordered yet', type: 'cta', tone: 'casual', description: 'Check-in email, non-pushy' },
  { id: 'n035', day: 80, week: 12, subject: 'What if we could solve [specific pain point]?', type: 'education', tone: 'professional', description: 'Personalized problem-solving' },
  { id: 'n036', day: 82, week: 12, subject: 'Final offer: 25% off + free shipping', type: 'offer', tone: 'urgent', description: 'Best offer in sequence' },

  // Week 13 (Final Push): Last Chances
  { id: 'n037', day: 85, week: 13, subject: 'Is this goodbye?', type: 'cta', tone: 'casual', description: 'Break-up email, last ditch effort' },
  { id: 'n038', day: 87, week: 13, subject: 'One last thing before we part ways', type: 'offer', tone: 'professional', description: 'Absolutely final offer' },
  { id: 'n039', day: 89, week: 13, subject: 'Expires tonight: Your 25% discount', type: 'offer', tone: 'urgent', description: 'Absolute deadline' },
  { id: 'n040', day: 90, week: 13, subject: 'Thanks for being part of our journey', type: 'story', tone: 'texas', description: 'Graceful exit, leave door open' },
];

export interface NurtureFlowStats {
  totalEmails: number;
  duration: number; // days
  byType: Record<string, number>;
  byWeek: Record<number, number>;
}

export function getNurtureStats(): NurtureFlowStats {
  const byType = NURTURE_FLOW.reduce((acc, email) => {
    acc[email.type] = (acc[email.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byWeek = NURTURE_FLOW.reduce((acc, email) => {
    acc[email.week] = (acc[email.week] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return {
    totalEmails: NURTURE_FLOW.length,
    duration: 90,
    byType,
    byWeek
  };
}

export function getEmailsByWeek(week: number): NurtureEmail[] {
  return NURTURE_FLOW.filter(email => email.week === week);
}

export function getEmailsByType(type: NurtureEmail['type']): NurtureEmail[] {
  return NURTURE_FLOW.filter(email => email.type === type);
}

/**
 * IMPLEMENTATION NOTES:
 *
 * 1. Email Delivery System:
 *    - Use Resend or similar ESP with automation capabilities
 *    - Set up drip campaign triggers
 *    - Track opens, clicks, conversions
 *
 * 2. Segmentation:
 *    - Pause flow if lead converts (makes purchase)
 *    - Skip emails if lead takes specific actions
 *    - Segment by category (BBQ, Mexican, etc.) for personalization
 *
 * 3. Content Creation:
 *    - Each email needs full HTML + plain-text version
 *    - Maintain consistent branding
 *    - A/B test subject lines
 *
 * 4. Metrics to Track:
 *    - Open rates by email
 *    - Click-through rates
 *    - Conversion by email position
 *    - Unsubscribe points
 *    - Optimal offer timing
 *
 * 5. Optimization:
 *    - Review performance monthly
 *    - Adjust frequency based on engagement
 *    - Test different offers and timing
 *    - Personalize based on segment behavior
 */
