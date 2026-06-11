/**
 * Maps page templates and US states to brand hero photography
 * (public/images/brand/). Used with <PageHero image={...}>.
 */

export const categoryHeroes = {
  guides: { image: '/images/brand/cat-guides.webp', alt: 'Tortilla dough and rolling pin on a flour-dusted board' },
  recipes: { image: '/images/brand/cat-recipes.webp', alt: 'Plated tacos on charred tortillas' },
  locations: { image: '/images/brand/cat-locations.webp', alt: 'Texas highway at dusk' },
  blog: { image: '/images/brand/cat-blog.webp', alt: 'Tortillas in a cloth-lined basket by a window' },
  wholesale: { image: '/images/brand/cat-wholesale.webp', alt: 'Stacked tortillas on a restaurant kitchen pass' },
  story: { image: '/images/brand/cat-story.webp', alt: 'Heritage Texas kitchen with a comal over flame' },
} as const;

export const productHeroes = {
  flour: { image: '/images/brand/prod-flour.webp', alt: 'Stack of soft flour tortillas with steam rising' },
  corn: { image: '/images/brand/prod-corn.webp', alt: 'Charred corn tortillas fanned on dark slate' },
  butter: { image: '/images/brand/prod-butter.webp', alt: 'Folded butter tortilla with melted butter' },
  specialty: { image: '/images/brand/prod-specialty.webp', alt: 'Trio of specialty tortillas on butcher paper' },
} as const;

const REGIONS = {
  'desert-sw': ['arizona', 'nevada', 'new-mexico'],
  'gulf-coast': ['florida', 'louisiana', 'alabama', 'mississippi'],
  'mountain-west': ['colorado', 'utah', 'wyoming', 'montana', 'idaho'],
  'midwest-plains': ['illinois', 'ohio', 'michigan', 'minnesota', 'wisconsin', 'indiana', 'iowa', 'kansas', 'missouri', 'nebraska'],
  'northeast-city': ['new-york', 'new-jersey', 'massachusetts', 'pennsylvania', 'connecticut', 'maryland'],
  'southeast': ['georgia', 'north-carolina', 'south-carolina', 'tennessee', 'virginia', 'kentucky', 'arkansas'],
  'pacific-nw': ['washington', 'oregon'],
  'california': ['california'],
  'texas-hill': ['texas', 'oklahoma'],
  'great-lakes': [], // spare
} as const;

const regionAlts: Record<string, string> = {
  'desert-sw': 'Sonoran desert at golden hour',
  'gulf-coast': 'Gulf coast shoreline at dusk',
  'mountain-west': 'Mountain foothills at sunset',
  'midwest-plains': 'Golden plains under a big sky',
  'northeast-city': 'City brownstones at dusk',
  'southeast': 'Live oaks in golden southern light',
  'pacific-nw': 'Evergreen forest in morning mist',
  'california': 'Golden California hills at sunset',
  'texas-hill': 'Texas hill country at dusk',
  'great-lakes': 'Lakeshore at dusk',
};

const stateToRegion: Record<string, string> = {};
for (const [region, states] of Object.entries(REGIONS)) {
  for (const s of states) stateToRegion[s] = region;
}

/** Hero image for a location page; falls back to the generic locations hero. */
export function locationHero(stateSlug: string): { image: string; alt: string } {
  const region = stateToRegion[stateSlug.toLowerCase()];
  if (!region) return categoryHeroes.locations;
  return { image: `/images/brand/region-${region}.webp`, alt: regionAlts[region] };
}
