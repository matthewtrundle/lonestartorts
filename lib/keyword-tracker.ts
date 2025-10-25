/**
 * Keyword Tracking System
 * Manages target keywords and their ranking positions
 */

export interface Keyword {
  id: string;
  keyword: string;
  targetUrl?: string;
  searchVolume?: number;
  difficulty?: number;
  category?: string;
  createdAt: string;
}

export interface KeywordRanking {
  keywordId: string;
  keyword: string;
  position: number;
  url: string;
  previousPosition?: number;
  change?: number;
  checkedAt: string;
}

export interface KeywordMetrics {
  keyword: string;
  currentPosition: number;
  bestPosition: number;
  averagePosition: number;
  trend: 'up' | 'down' | 'stable';
  history: Array<{
    date: string;
    position: number;
  }>;
}

/**
 * Priority keywords for Lonestar Tortillas
 * These should be monitored regularly via Google Search Console
 */
export const TARGET_KEYWORDS: Omit<Keyword, 'id' | 'createdAt'>[] = [
  // Brand keywords
  {
    keyword: 'lonestar tortillas',
    targetUrl: 'https://lonestartortillas.com',
    category: 'Brand',
  },

  // Product keywords - High priority
  {
    keyword: 'buy h-e-b tortillas online',
    targetUrl: 'https://lonestartortillas.com',
    searchVolume: 480,
    difficulty: 45,
    category: 'Product',
  },
  {
    keyword: 'h-e-b tortillas delivery',
    targetUrl: 'https://lonestartortillas.com',
    searchVolume: 390,
    difficulty: 42,
    category: 'Product',
  },
  {
    keyword: 'texas tortillas online',
    targetUrl: 'https://lonestartortillas.com',
    searchVolume: 320,
    difficulty: 38,
    category: 'Product',
  },

  // Location-specific keywords
  {
    keyword: 'h-e-b tortillas new york',
    targetUrl: 'https://lonestartortillas.com/new-york',
    searchVolume: 210,
    difficulty: 35,
    category: 'Local',
  },
  {
    keyword: 'h-e-b tortillas los angeles',
    targetUrl: 'https://lonestartortillas.com/los-angeles',
    searchVolume: 190,
    difficulty: 34,
    category: 'Local',
  },
  {
    keyword: 'h-e-b tortillas chicago',
    targetUrl: 'https://lonestartortillas.com/chicago',
    searchVolume: 170,
    difficulty: 33,
    category: 'Local',
  },

  // Product type keywords
  {
    keyword: 'authentic corn tortillas online',
    targetUrl: 'https://lonestartortillas.com/products/corn-tortillas',
    searchVolume: 260,
    difficulty: 40,
    category: 'Product Type',
  },
  {
    keyword: 'fresh flour tortillas delivery',
    targetUrl: 'https://lonestartortillas.com/products/flour-tortillas',
    searchVolume: 240,
    difficulty: 39,
    category: 'Product Type',
  },
  {
    keyword: 'butter tortillas online',
    targetUrl: 'https://lonestartortillas.com/products/butter-tortillas',
    searchVolume: 180,
    difficulty: 36,
    category: 'Product Type',
  },

  // Informational keywords
  {
    keyword: 'how to store tortillas',
    targetUrl: 'https://lonestartortillas.com/guides/how-to-store-tortillas',
    searchVolume: 1200,
    difficulty: 28,
    category: 'Informational',
  },
  {
    keyword: 'how to reheat tortillas',
    targetUrl: 'https://lonestartortillas.com/guides/how-to-reheat-tortillas',
    searchVolume: 980,
    difficulty: 26,
    category: 'Informational',
  },
  {
    keyword: 'corn vs flour tortillas',
    targetUrl: 'https://lonestartortillas.com/guides/corn-vs-flour-tortillas',
    searchVolume: 850,
    difficulty: 32,
    category: 'Informational',
  },

  // Long-tail keywords
  {
    keyword: 'where to buy h-e-b tortillas outside texas',
    targetUrl: 'https://lonestartortillas.com',
    searchVolume: 140,
    difficulty: 30,
    category: 'Long-tail',
  },
  {
    keyword: 'authentic texas tortillas nationwide delivery',
    targetUrl: 'https://lonestartortillas.com',
    searchVolume: 110,
    difficulty: 28,
    category: 'Long-tail',
  },
];

/**
 * Calculate ranking trend
 */
export function calculateTrend(
  currentPosition: number,
  previousPosition?: number
): 'up' | 'down' | 'stable' {
  if (!previousPosition) return 'stable';

  const change = previousPosition - currentPosition;

  if (change > 2) return 'up'; // Moved up in rankings
  if (change < -2) return 'down'; // Moved down in rankings
  return 'stable';
}

/**
 * Calculate position change
 */
export function calculateChange(
  currentPosition: number,
  previousPosition?: number
): number {
  if (!previousPosition) return 0;
  return previousPosition - currentPosition; // Positive = improvement
}

/**
 * Get ranking health status
 */
export function getRankingHealth(position: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (position <= 3) return 'excellent';
  if (position <= 10) return 'good';
  if (position <= 20) return 'fair';
  return 'poor';
}

/**
 * Estimate organic traffic potential based on position
 * Based on CTR curve: Position 1 ~35%, Position 2 ~15%, Position 3 ~10%, etc.
 */
export function estimateTrafficPotential(
  position: number,
  searchVolume: number
): number {
  const ctrCurve: Record<number, number> = {
    1: 0.35,
    2: 0.15,
    3: 0.10,
    4: 0.08,
    5: 0.06,
    6: 0.05,
    7: 0.04,
    8: 0.03,
    9: 0.03,
    10: 0.02,
  };

  const ctr = ctrCurve[position] || 0.01;
  return Math.round(searchVolume * ctr);
}

/**
 * Priority score for keywords (used to prioritize improvement efforts)
 */
export function calculatePriorityScore(keyword: Keyword, position: number): number {
  let score = 0;

  // Search volume impact (0-40 points)
  if (keyword.searchVolume) {
    score += Math.min(40, (keyword.searchVolume / 50) * 2);
  }

  // Position impact (0-30 points) - positions 11-20 are highest priority for improvement
  if (position > 10 && position <= 20) {
    score += 30;
  } else if (position > 20 && position <= 50) {
    score += 20;
  } else if (position > 3 && position <= 10) {
    score += 15;
  }

  // Difficulty impact (0-30 points) - easier keywords get higher priority
  if (keyword.difficulty) {
    score += Math.max(0, 30 - keyword.difficulty);
  }

  return Math.round(score);
}
