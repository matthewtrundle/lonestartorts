import { NextResponse } from 'next/server';
import { products } from '@/lib/products';
import { getStoreStatus } from '@/lib/store-status';

// OpenAI product feed for ChatGPT Shopping (Agentic Commerce Protocol).
// Spec: https://developers.openai.com/commerce/specs/file-upload/products
// One JSON object per line (JSONL). Discovery only — checkout happens on our site,
// so is_eligible_checkout stays false.

const SITE = 'https://lonestartortillas.com';
const UTM = 'utm_source=chatgpt&utm_medium=shopping';

// Category pages are the closest thing to product detail pages; all resolve 200.
function productUrl(p: (typeof products)[number]): string {
  if (p.tortillaType === 'Butter') return `${SITE}/products/butter-tortillas?${UTM}`;
  if (p.category === 'corn') return `${SITE}/products/corn-tortillas?${UTM}`;
  if (p.category === 'flour') return `${SITE}/products/flour-tortillas?${UTM}`;
  if (p.category === 'wheat') return `${SITE}/products/specialty-tortillas?${UTM}`;
  if (p.category === 'salsa' || p.category === 'sauce') return `${SITE}/shop/heb-products?${UTM}`;
  return `${SITE}/shop?${UTM}`;
}

function brandName(p: (typeof products)[number]): string {
  if (p.brand === 'mission') return 'Mission';
  if (p.brand === 'la-banderita') return 'La Banderita';
  return 'H-E-B';
}

export async function GET() {
  const { salesPaused } = await getStoreStatus();
  const items = products
    .filter(p => p.category !== 'wholesale' && !p.bundleOnly)
    .map(p => ({
      item_id: p.sku,
      title: p.name,
      description: `${p.description} Independent reseller. Not affiliated with or endorsed by H-E-B®. $80 minimum order; every order ships free nationwide.`,
      url: productUrl(p),
      brand: brandName(p),
      price: `${(p.price / 100).toFixed(2)} USD`,
      image_url: `${SITE}${p.image}`,
      availability: salesPaused ? 'out_of_stock' : 'in_stock',
      is_eligible_search: true,
      is_eligible_checkout: false,
      seller_name: 'Lonestar Tortillas',
      seller_url: SITE,
      seller_privacy_policy: `${SITE}/privacy`,
      seller_tos: `${SITE}/terms`,
      target_countries: ['US'],
      store_country: 'US',
    }));

  const jsonl = items.map(i => JSON.stringify(i)).join('\n');

  return new NextResponse(jsonl, {
    headers: {
      'Content-Type': 'application/jsonl; charset=utf-8',
      'Cache-Control': 'public, max-age=900', // spec allows refresh as often as 15 min
    },
  });
}
