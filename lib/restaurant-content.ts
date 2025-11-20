/**
 * Restaurant Landing Page Content Configuration
 * "Up Your Game" Campaign - 7 Restaurant Types
 */

import { Truck, Flame, ChefHat, UtensilsCrossed, Sparkles, Users, Coffee } from 'lucide-react';

export interface RestaurantContent {
  slug: string;
  name: string;
  displayName: string;
  icon: any;
  hero: {
    headline: string;
    subhead: string;
    image: string;
    cta: string;
  };
  painPoints: {
    title: string;
    description: string;
    icon: string;
  }[];
  solution: {
    headline: string;
    subhead: string;
    features: {
      title: string;
      description: string;
      icon: string;
    }[];
    image: string;
  };
  trustSignals: {
    title: string;
    description: string;
  }[];
  testimonials: {
    quote: string;
    author: string;
    role: string;
    restaurant: string;
  }[];
  finalCTA: {
    headline: string;
    subhead: string;
    buttonText: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const restaurantContent: Record<string, RestaurantContent> = {
  'food-trucks': {
    slug: 'food-trucks',
    name: 'Food Trucks',
    displayName: 'Food Truck Operators',
    icon: Truck,
    hero: {
      headline: 'Food Trucks, Ready to Up Your Game?',
      subhead: 'H-E-B® Tortillas Are Your Edge',
      image: '/images/restaurants/food-trucks-hero.png',
      cta: 'Shop Restaurant-Grade Tortillas',
    },
    painPoints: [
      {
        title: 'Inconsistent Quality',
        description: 'Unreliable wholesale suppliers delivering subpar tortillas that don\'t hold up',
        icon: 'AlertTriangle',
      },
      {
        title: 'Customer Complaints',
        description: 'Negative reviews about soggy, torn, or tasteless tortillas ruining your tacos',
        icon: 'ThumbsDown',
      },
      {
        title: 'Tight Margins',
        description: 'Premium tortillas cost too much, but cheap ones hurt your reputation',
        icon: 'DollarSign',
      },
    ],
    solution: {
      headline: 'Why Top Food Trucks Choose H-E-B Tortillas',
      subhead: 'The same authentic Texas tortillas that locals line up for—delivered to your truck',
      features: [
        {
          title: 'Holds Up Under Pressure',
          description: 'These tortillas can handle your loaded tacos without tearing or falling apart. Your customers finish every bite, not cleaning up a mess.',
          icon: 'Shield',
        },
        {
          title: 'Authentic Texas Taste',
          description: 'H-E-B is the tortilla Texans trust. When your customers bite in, they know they\'re getting the real deal.',
          icon: 'Star',
        },
        {
          title: 'Delivered Fresh',
          description: 'Shelf-stable with 60-day freshness. Order once, run your truck for weeks without worrying about restock.',
          icon: 'Truck',
        },
      ],
      image: '/images/restaurants/food-trucks-product-in-use.png',
    },
    trustSignals: [
      {
        title: 'Authentic H-E-B Sourcing',
        description: 'Direct from Texas\' most trusted grocer',
      },
      {
        title: '2-3 Day Delivery',
        description: 'Fast shipping anywhere in the US',
      },
      {
        title: '60-Day Shelf Life',
        description: 'Shelf-stable, restaurant-grade freshness',
      },
      {
        title: 'Texas Heritage',
        description: 'The tortilla brand Texans grew up with',
      },
      {
        title: 'Satisfaction Guaranteed',
        description: '100% money-back guarantee',
      },
      {
        title: 'Professional Grade',
        description: 'Used by top food trucks across Texas',
      },
    ],
    testimonials: [
      {
        quote: 'We switched to H-E-B tortillas and immediately noticed fewer complaints. Customers can taste the difference, and our reviews improved overnight.',
        author: 'Marcus Rodriguez',
        role: 'Owner',
        restaurant: 'Taco Riot Food Truck',
      },
      {
        quote: 'These tortillas hold up to our loaded brisket tacos like nothing else we\'ve tried. Game changer for our business.',
        author: 'Sarah Chen',
        role: 'Chef/Owner',
        restaurant: 'Smoke & Roll Mobile Kitchen',
      },
    ],
    finalCTA: {
      headline: 'Join Food Trucks Winning with H-E-B',
      subhead: 'Free shipping on 4+ packs. Start serving Texas\' favorite tortillas.',
      buttonText: 'Start Your Order',
    },
    seo: {
      title: 'Premium H-E-B Tortillas for Food Trucks | Lonestar Tortillas',
      description: 'Elevate your food truck menu with authentic H-E-B tortillas. Restaurant-grade quality, consistent results, delivered fresh. Free shipping on 4+ packs.',
      keywords: ['food truck tortillas', 'HEB tortillas wholesale', 'restaurant tortillas', 'Texas food truck supplies', 'authentic tortillas'],
    },
  },

  bbq: {
    slug: 'bbq',
    name: 'BBQ Restaurants',
    displayName: 'BBQ Restaurants',
    icon: Flame,
    hero: {
      headline: 'BBQ Restaurants, Ready to Up Your Game?',
      subhead: 'H-E-B® Tortillas Are Your Edge',
      image: '/images/restaurants/bbq-hero.png',
      cta: 'Shop Restaurant-Grade Tortillas',
    },
    painPoints: [
      {
        title: 'Brisket Tacos as Afterthought',
        description: 'Your smoked meats are world-class, but your tortillas don\'t match that quality',
        icon: 'Frown',
      },
      {
        title: 'Wrong Tortilla, Wrong Experience',
        description: 'Generic tortillas can\'t handle your rich, smoky flavors and just fall apart',
        icon: 'X',
      },
      {
        title: 'Missing the Texas Authenticity',
        description: 'Out-of-state visitors expect authentic Texas BBQ—including the tortillas',
        icon: 'MapPin',
      },
    ],
    solution: {
      headline: 'Why Top BBQ Joints Choose H-E-B Tortillas',
      subhead: 'Your brisket deserves a tortilla that can handle it—and tastes just as authentic',
      features: [
        {
          title: 'Built for BBQ',
          description: 'Thick, sturdy, and ready to handle your loaded brisket, pulled pork, or sausage. No more cleanup from tortilla blowouts.',
          icon: 'CheckCircle2',
        },
        {
          title: 'Complements, Doesn\'t Compete',
          description: 'Subtle, authentic flavor that lets your smoke and rubs shine. This is what great BBQ tacos should taste like.',
          icon: 'Award',
        },
        {
          title: 'The Texas Standard',
          description: 'H-E-B is what locals expect when they order brisket tacos. Give them the real deal and watch them come back.',
          icon: 'Star',
        },
      ],
      image: '/images/restaurants/bbq-product-in-use.png',
    },
    trustSignals: [
      {
        title: 'Authentic H-E-B Sourcing',
        description: 'Direct from Texas\' most trusted grocer',
      },
      {
        title: '2-3 Day Delivery',
        description: 'Fast shipping anywhere in the US',
      },
      {
        title: '60-Day Shelf Life',
        description: 'Shelf-stable, restaurant-grade freshness',
      },
      {
        title: 'Texas Heritage',
        description: 'The tortilla brand Texans grew up with',
      },
      {
        title: 'Satisfaction Guaranteed',
        description: '100% money-back guarantee',
      },
      {
        title: 'Professional Grade',
        description: 'Used by top BBQ restaurants across Texas',
      },
    ],
    testimonials: [
      {
        quote: 'Our brisket tacos were good, but once we switched to H-E-B tortillas, they became legendary. People drive an hour just for them.',
        author: 'Robert "Smoke" Williams',
        role: 'Pitmaster',
        restaurant: 'Lone Oak BBQ',
      },
      {
        quote: 'These tortillas have the strength to hold a half-pound of brisket and all the fixings. Our customers notice the quality immediately.',
        author: 'Jennifer Martinez',
        role: 'Owner',
        restaurant: 'Hill Country Smoke Company',
      },
    ],
    finalCTA: {
      headline: 'Join BBQ Restaurants Winning with H-E-B',
      subhead: 'Free shipping on 4+ packs. Give your brisket the tortilla it deserves.',
      buttonText: 'Start Your Order',
    },
    seo: {
      title: 'H-E-B Tortillas for BBQ Restaurants | Lonestar Tortillas',
      description: 'Elevate your BBQ tacos with authentic H-E-B flour tortillas. Strong enough for loaded brisket, authentic enough for Texas. Free shipping on 4+ packs.',
      keywords: ['BBQ restaurant tortillas', 'brisket taco tortillas', 'HEB tortillas', 'Texas BBQ supplies', 'restaurant flour tortillas'],
    },
  },

  mexican: {
    slug: 'mexican',
    name: 'Mexican Restaurants',
    displayName: 'Mexican Restaurants',
    icon: ChefHat,
    hero: {
      headline: 'Mexican Restaurants, Ready to Up Your Game?',
      subhead: 'H-E-B® Tortillas Are Your Edge',
      image: '/images/restaurants/mexican-hero.png',
      cta: 'Shop Restaurant-Grade Tortillas',
    },
    painPoints: [
      {
        title: 'Authenticity Questions',
        description: 'Your recipes are authentic, but generic tortillas undermine your credibility',
        icon: 'HelpCircle',
      },
      {
        title: 'Inconsistent Texture',
        description: 'Some batches are perfect, others are cardboard. Your kitchen can\'t work like this.',
        icon: 'Shuffle',
      },
      {
        title: 'Flavor Doesn\'t Match',
        description: 'Your abuela wouldn\'t use these tortillas. Why should your restaurant?',
        icon: 'Slash',
      },
    ],
    solution: {
      headline: 'Why Top Mexican Restaurants Choose H-E-B Tortillas',
      subhead: 'Traditional flavor, reliable quality, and the authentic taste your customers expect',
      features: [
        {
          title: 'Authentic Mexican Flavor Profile',
          description: 'Soft, pliable, with that fresh-made taste. These taste like homemade tortillas, because that\'s the standard H-E-B set.',
          icon: 'Heart',
        },
        {
          title: 'Perfect for Traditional Dishes',
          description: 'Whether it\'s tacos al pastor, enchiladas, or quesadillas—these tortillas work the way your recipes demand.',
          icon: 'Utensils',
        },
        {
          title: 'Consistent Every Time',
          description: 'No more surprise batches that ruin your prep. Every tortilla meets the same high standard, every order.',
          icon: 'Target',
        },
      ],
      image: '/images/restaurants/mexican-product-in-use.png',
    },
    trustSignals: [
      {
        title: 'Authentic H-E-B Sourcing',
        description: 'Direct from Texas\' most trusted grocer',
      },
      {
        title: '2-3 Day Delivery',
        description: 'Fast shipping anywhere in the US',
      },
      {
        title: '60-Day Shelf Life',
        description: 'Shelf-stable, restaurant-grade freshness',
      },
      {
        title: 'Texas Heritage',
        description: 'The tortilla brand Texans grew up with',
      },
      {
        title: 'Satisfaction Guaranteed',
        description: '100% money-back guarantee',
      },
      {
        title: 'Professional Grade',
        description: 'Used by top Mexican restaurants',
      },
    ],
    testimonials: [
      {
        quote: 'Finally, tortillas that match the quality of our family recipes. Our customers keep asking what we changed—this is what made the difference.',
        author: 'Maria Elena Gutierrez',
        role: 'Chef/Owner',
        restaurant: 'Casa Gutierrez',
      },
      {
        quote: 'We tried every supplier in the region. H-E-B tortillas are the only ones that taste homemade and hold up through service.',
        author: 'Carlos Delgado',
        role: 'Executive Chef',
        restaurant: 'Sabor Auténtico',
      },
    ],
    finalCTA: {
      headline: 'Join Mexican Restaurants Winning with H-E-B',
      subhead: 'Free shipping on 4+ packs. Serve tortillas your abuela would approve of.',
      buttonText: 'Start Your Order',
    },
    seo: {
      title: 'Authentic H-E-B Tortillas for Mexican Restaurants | Lonestar Tortillas',
      description: 'Elevate your Mexican restaurant with authentic H-E-B flour tortillas. Traditional flavor, consistent quality, loved by Texans. Free shipping on 4+ packs.',
      keywords: ['Mexican restaurant tortillas', 'authentic tortillas', 'HEB tortillas wholesale', 'restaurant supplies', 'flour tortillas'],
    },
  },

  'tex-mex': {
    slug: 'tex-mex',
    name: 'Tex-Mex Restaurants',
    displayName: 'Tex-Mex Restaurants',
    icon: UtensilsCrossed,
    hero: {
      headline: 'Tex-Mex Restaurants, Ready to Up Your Game?',
      subhead: 'H-E-B® Tortillas Are Your Edge',
      image: '/images/restaurants/tex-mex-hero.png',
      cta: 'Shop Restaurant-Grade Tortillas',
    },
    painPoints: [
      {
        title: 'Fajita Failures',
        description: 'Your sizzling fajitas arrive perfect, then customers struggle with tortillas that tear',
        icon: 'Flame',
      },
      {
        title: 'High-Volume Challenges',
        description: 'During Friday dinner rush, you need tortillas that work fast and work consistently',
        icon: 'Clock',
      },
      {
        title: 'Value Perception',
        description: 'Customers pay premium prices for Tex-Mex. Cheap tortillas make them question value.',
        icon: 'TrendingDown',
      },
    ],
    solution: {
      headline: 'Why Top Tex-Mex Restaurants Choose H-E-B Tortillas',
      subhead: 'Versatile, reliable, and ready for your busiest nights',
      features: [
        {
          title: 'Fajita-Ready Performance',
          description: 'Large, pliable, and strong enough for loaded fajitas. These tortillas make wrapping easy, even for first-timers.',
          icon: 'Zap',
        },
        {
          title: 'Speed & Consistency',
          description: 'Warm them fast, serve them hot, and they perform perfectly every time. Your kitchen runs smoother with these.',
          icon: 'Gauge',
        },
        {
          title: 'Premium Brand Recognition',
          description: 'H-E-B signals quality to Texans. Out-of-state guests see the name and know they\'re getting authentic Tex-Mex.',
          icon: 'Award',
        },
      ],
      image: '/images/restaurants/tex-mex-product-in-use.png',
    },
    trustSignals: [
      {
        title: 'Authentic H-E-B Sourcing',
        description: 'Direct from Texas\' most trusted grocer',
      },
      {
        title: '2-3 Day Delivery',
        description: 'Fast shipping anywhere in the US',
      },
      {
        title: '60-Day Shelf Life',
        description: 'Shelf-stable, restaurant-grade freshness',
      },
      {
        title: 'Texas Heritage',
        description: 'The tortilla brand Texans grew up with',
      },
      {
        title: 'Satisfaction Guaranteed',
        description: '100% money-back guarantee',
      },
      {
        title: 'Professional Grade',
        description: 'Used by top Tex-Mex restaurants',
      },
    ],
    testimonials: [
      {
        quote: 'We serve 400+ covers on Friday nights. H-E-B tortillas keep up with our pace and never let us down. They\'re part of our success.',
        author: 'Antonio Vasquez',
        role: 'General Manager',
        restaurant: 'La Frontera Tex-Mex',
      },
      {
        quote: 'Our fajitas are legendary, and these tortillas are a huge reason why. They can handle the heat and the weight without falling apart.',
        author: 'Linda Ramirez',
        role: 'Owner',
        restaurant: 'Border Grill & Cantina',
      },
    ],
    finalCTA: {
      headline: 'Join Tex-Mex Restaurants Winning with H-E-B',
      subhead: 'Free shipping on 4+ packs. Serve fajitas that stay together.',
      buttonText: 'Start Your Order',
    },
    seo: {
      title: 'H-E-B Tortillas for Tex-Mex Restaurants | Lonestar Tortillas',
      description: 'Elevate your Tex-Mex restaurant with H-E-B flour tortillas. Perfect for fajitas, strong enough for high volume. Free shipping on 4+ packs.',
      keywords: ['Tex-Mex restaurant tortillas', 'fajita tortillas', 'HEB tortillas wholesale', 'restaurant supplies', 'large flour tortillas'],
    },
  },

  'taco-shops': {
    slug: 'taco-shops',
    name: 'Taco Shops',
    displayName: 'Taco Shops & Taquerias',
    icon: Sparkles,
    hero: {
      headline: 'Taco Shops, Ready to Up Your Game?',
      subhead: 'H-E-B® Tortillas Are Your Edge',
      image: '/images/restaurants/taco-shops-hero.png',
      cta: 'Shop Restaurant-Grade Tortillas',
    },
    painPoints: [
      {
        title: 'Tortilla Is Your Core Product',
        description: 'When your whole business is tacos, you can\'t afford to serve mediocre tortillas',
        icon: 'AlertCircle',
      },
      {
        title: 'Competition Is Fierce',
        description: 'Three taco shops on your block. What makes yours worth choosing?',
        icon: 'Users',
      },
      {
        title: 'Thin Margins, High Standards',
        description: 'Your customers expect perfection at $3/taco. Every detail matters.',
        icon: 'Target',
      },
    ],
    solution: {
      headline: 'Why Top Taco Shops Choose H-E-B Tortillas',
      subhead: 'Your tortilla is half the taco. Make it count.',
      features: [
        {
          title: 'The Foundation of Great Tacos',
          description: 'Soft, flavorful, and perfectly sized. These tortillas don\'t just hold ingredients—they elevate them.',
          icon: 'Layers',
        },
        {
          title: 'Differentiation That Matters',
          description: 'When everyone sells tacos, quality sets you apart. H-E-B tortillas give customers a reason to choose you.',
          icon: 'TrendingUp',
        },
        {
          title: 'Reliability You Can Build On',
          description: 'Every tortilla performs the same. Your kitchen knows what to expect, your customers get consistency.',
          icon: 'Shield',
        },
      ],
      image: '/images/restaurants/taco-shops-product-in-use.png',
    },
    trustSignals: [
      {
        title: 'Authentic H-E-B Sourcing',
        description: 'Direct from Texas\' most trusted grocer',
      },
      {
        title: '2-3 Day Delivery',
        description: 'Fast shipping anywhere in the US',
      },
      {
        title: '60-Day Shelf Life',
        description: 'Shelf-stable, restaurant-grade freshness',
      },
      {
        title: 'Texas Heritage',
        description: 'The tortilla brand Texans grew up with',
      },
      {
        title: 'Satisfaction Guaranteed',
        description: '100% money-back guarantee',
      },
      {
        title: 'Professional Grade',
        description: 'Used by top taco shops',
      },
    ],
    testimonials: [
      {
        quote: 'We built our reputation on quality. H-E-B tortillas are a huge part of why customers keep coming back instead of going next door.',
        author: 'Diego Morales',
        role: 'Owner',
        restaurant: 'Taco Perfecto',
      },
      {
        quote: 'In a city full of taco options, people choose us because they can taste the difference. These tortillas are that difference.',
        author: 'Gabriela Santos',
        role: 'Chef/Owner',
        restaurant: 'La Taqueria Moderna',
      },
    ],
    finalCTA: {
      headline: 'Join Taco Shops Winning with H-E-B',
      subhead: 'Free shipping on 4+ packs. Make your tacos unforgettable.',
      buttonText: 'Start Your Order',
    },
    seo: {
      title: 'H-E-B Tortillas for Taco Shops & Taquerias | Lonestar Tortillas',
      description: 'Elevate your taco shop with authentic H-E-B flour tortillas. Quality that differentiates, consistency that builds loyalty. Free shipping on 4+ packs.',
      keywords: ['taco shop tortillas', 'taqueria supplies', 'HEB tortillas wholesale', 'authentic taco tortillas', 'restaurant tortillas'],
    },
  },

  catering: {
    slug: 'catering',
    name: 'Catering Companies',
    displayName: 'Catering Companies',
    icon: Users,
    hero: {
      headline: 'Caterers, Ready to Up Your Game?',
      subhead: 'H-E-B® Tortillas Are Your Edge',
      image: '/images/restaurants/catering-hero.png',
      cta: 'Shop Restaurant-Grade Tortillas',
    },
    painPoints: [
      {
        title: 'Bulk Orders Gone Wrong',
        description: 'Ordering 500 tortillas for an event, only to find half are unusable upon arrival',
        icon: 'PackageX',
      },
      {
        title: 'Reputation on the Line',
        description: 'One bad taco bar at a corporate event can cost you repeat business',
        icon: 'AlertTriangle',
      },
      {
        title: 'Shelf Life Uncertainty',
        description: 'You prep days in advance. Will your tortillas still be fresh at service time?',
        icon: 'Clock',
      },
    ],
    solution: {
      headline: 'Why Top Caterers Choose H-E-B Tortillas',
      subhead: 'Reliable quality, extended shelf life, and presentation that impresses',
      features: [
        {
          title: 'Consistent Quality at Scale',
          description: 'Whether you\'re serving 50 or 500, every tortilla meets the same high standard. No surprises on event day.',
          icon: 'CheckCircle2',
        },
        {
          title: 'Extended Shelf Life',
          description: '60-day shelf stability means you can order ahead and know your tortillas will be perfect when you need them.',
          icon: 'Calendar',
        },
        {
          title: 'Client-Impressing Quality',
          description: 'H-E-B is a name that signals quality to Texans and authenticity to out-of-staters. Your clients notice.',
          icon: 'Award',
        },
      ],
      image: '/images/restaurants/catering-product-in-use.png',
    },
    trustSignals: [
      {
        title: 'Authentic H-E-B Sourcing',
        description: 'Direct from Texas\' most trusted grocer',
      },
      {
        title: '2-3 Day Delivery',
        description: 'Fast shipping anywhere in the US',
      },
      {
        title: '60-Day Shelf Life',
        description: 'Shelf-stable, restaurant-grade freshness',
      },
      {
        title: 'Texas Heritage',
        description: 'The tortilla brand Texans grew up with',
      },
      {
        title: 'Satisfaction Guaranteed',
        description: '100% money-back guarantee',
      },
      {
        title: 'Professional Grade',
        description: 'Used by top catering companies',
      },
    ],
    testimonials: [
      {
        quote: 'We cater 15-20 events per month. H-E-B tortillas give us the reliability we need and the quality our clients expect. Game changer.',
        author: 'Patricia Nguyen',
        role: 'Owner',
        restaurant: 'Lone Star Catering Co.',
      },
      {
        quote: 'The shelf life is incredible. We can stock up and know our taco bars will be perfect every time. Our clients rave about the quality.',
        author: 'Michael Thompson',
        role: 'Operations Director',
        restaurant: 'Premier Events & Catering',
      },
    ],
    finalCTA: {
      headline: 'Join Catering Companies Winning with H-E-B',
      subhead: 'Free shipping on 4+ packs. Deliver events your clients will remember.',
      buttonText: 'Start Your Order',
    },
    seo: {
      title: 'H-E-B Tortillas for Catering Companies | Lonestar Tortillas',
      description: 'Elevate your catering with reliable H-E-B flour tortillas. 60-day shelf life, consistent quality at scale. Free shipping on 4+ packs.',
      keywords: ['catering tortillas', 'bulk tortillas', 'HEB tortillas wholesale', 'event catering supplies', 'restaurant grade tortillas'],
    },
  },

  breakfast: {
    slug: 'breakfast',
    name: 'Breakfast & Brunch',
    displayName: 'Breakfast & Brunch Spots',
    icon: Coffee,
    hero: {
      headline: 'Breakfast Spots, Ready to Up Your Game?',
      subhead: 'H-E-B® Tortillas Are Your Edge',
      image: '/images/restaurants/breakfast-hero.png',
      cta: 'Shop Restaurant-Grade Tortillas',
    },
    painPoints: [
      {
        title: 'Morning Rush Chaos',
        description: 'Tortillas that tear or stick together slow down your line when speed matters most',
        icon: 'Clock',
      },
      {
        title: 'Breakfast Taco Competition',
        description: 'In Texas, breakfast tacos are serious business. Generic tortillas won\'t cut it.',
        icon: 'Coffee',
      },
      {
        title: 'Holding Quality',
        description: 'Eggs, bacon, and cheese get heavy. Your tortillas need to hold up through the rush.',
        icon: 'Weight',
      },
    ],
    solution: {
      headline: 'Why Top Breakfast Spots Choose H-E-B Tortillas',
      subhead: 'Start your customers\' day right with tortillas that match your morning excellence',
      features: [
        {
          title: 'Built for Breakfast Tacos',
          description: 'Soft, pliable, and strong enough for loaded eggs, bacon, and cheese. These tortillas make breakfast easy to eat.',
          icon: 'Sunrise',
        },
        {
          title: 'Morning Rush Ready',
          description: 'Warms fast, separates easily, and performs consistently when your line is 20 deep and everyone\'s hungry.',
          icon: 'Zap',
        },
        {
          title: 'The Breakfast Taco Standard',
          description: 'H-E-B tortillas are what Texans expect in their morning tacos. Give them the authentic experience they crave.',
          icon: 'Star',
        },
      ],
      image: '/images/restaurants/breakfast-product-in-use.png',
    },
    trustSignals: [
      {
        title: 'Authentic H-E-B Sourcing',
        description: 'Direct from Texas\' most trusted grocer',
      },
      {
        title: '2-3 Day Delivery',
        description: 'Fast shipping anywhere in the US',
      },
      {
        title: '60-Day Shelf Life',
        description: 'Shelf-stable, restaurant-grade freshness',
      },
      {
        title: 'Texas Heritage',
        description: 'The tortilla brand Texans grew up with',
      },
      {
        title: 'Satisfaction Guaranteed',
        description: '100% money-back guarantee',
      },
      {
        title: 'Professional Grade',
        description: 'Used by top breakfast spots',
      },
    ],
    testimonials: [
      {
        quote: 'We serve 300 breakfast tacos every Saturday morning. H-E-B tortillas keep up with our pace and never let us down.',
        author: 'Amanda Foster',
        role: 'Owner',
        restaurant: 'Rise & Shine Cafe',
      },
      {
        quote: 'Our breakfast tacos are the talk of the town. These tortillas are a huge part of why. They\'re the real deal.',
        author: 'David Tran',
        role: 'Chef/Owner',
        restaurant: 'Morning Glory Kitchen',
      },
    ],
    finalCTA: {
      headline: 'Join Breakfast Spots Winning with H-E-B',
      subhead: 'Free shipping on 4+ packs. Serve breakfast tacos worth waking up for.',
      buttonText: 'Start Your Order',
    },
    seo: {
      title: 'H-E-B Tortillas for Breakfast & Brunch Restaurants | Lonestar Tortillas',
      description: 'Elevate your breakfast tacos with authentic H-E-B flour tortillas. Perfect for the morning rush, loved by Texans. Free shipping on 4+ packs.',
      keywords: ['breakfast taco tortillas', 'brunch restaurant supplies', 'HEB tortillas', 'Texas breakfast tacos', 'restaurant tortillas'],
    },
  },
};

export const getRestaurantContent = (slug: string): RestaurantContent | undefined => {
  return restaurantContent[slug];
};

export const getAllRestaurantSlugs = (): string[] => {
  return Object.keys(restaurantContent);
};
