import {
  products,
  getDisplayName,
  FLAT_SHIPPING_RATE,
  FREE_SHIPPING_THRESHOLD,
  type Product,
} from '@/lib/products';

// Revalidate the feed once per day (Merchant Center crawls daily).
export const revalidate = 86400;

// Base URL: env override, otherwise the site's canonical host (matches
// the convention used across app/api routes and layout.tsx metadataBase).
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://lonestartortillas.com';

// Store/channel name.
const STORE_BRAND = 'Lonestar Tortillas';

// g:brand must be the actual MANUFACTURER brand so Google Merchant Center's
// image/text matching doesn't reject items for "incorrect brand". Stating the
// true maker of a resold product is factual feed data, not an affiliation claim.
const BRAND_NAMES: Record<string, string> = {
  heb: 'H-E-B',
  mission: 'Mission',
  'la-banderita': 'La Banderita',
};
function brandFor(product: Product): string {
  if (product.brand && BRAND_NAMES[product.brand]) return BRAND_NAMES[product.brand];
  // The catalog is overwhelmingly H-E-B; default accordingly.
  return product.name.includes('Mi Tienda') ? 'Mi Tienda' : 'H-E-B';
}

// Google product taxonomy by productType (drives Shopping categorization).
function googleCategoryFor(product: Product): string {
  switch (product.productType) {
    case 'sauce':
    case 'salsa':
      return 'Food, Beverages & Tobacco > Food Items > Condiments & Sauces';
    case 'chips':
      return 'Food, Beverages & Tobacco > Food Items > Snack Foods';
    case 'seasoning':
      return 'Food, Beverages & Tobacco > Food Items > Seasonings & Spices';
    case 'tortilla':
    default:
      return 'Food, Beverages & Tobacco > Food Items > Bakery > Tortillas & Wraps';
  }
}

// Where shoppers land. There is no per-SKU product page; the shop deep-links
// to product cards via SKU anchor (matches the site's ItemList schema URLs).
const SHOP_URL = `${BASE_URL}/shop`;

// Escape XML special characters for safe inclusion in element text.
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Only include retail SKUs. Exclude bundle-only products and any
// wholesale-prefixed/typed SKUs.
function isRetailSku(product: Product): boolean {
  if (product.bundleOnly) return false;
  if (product.productType === 'wholesale') return false;
  if (product.sku.startsWith('WHOLESALE-')) return false;
  return true;
}

function formatPrice(cents: number): string {
  return `${(cents / 100).toFixed(2)} USD`;
}

function buildItem(product: Product): string {
  const title = getDisplayName(product);
  const imageLink = `${BASE_URL}${product.image}`;
  const productLink = `${SHOP_URL}#${encodeURIComponent(product.sku)}`;

  return `    <item>
      <g:id>${escapeXml(product.sku)}</g:id>
      <g:title>${escapeXml(title)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${escapeXml(productLink)}</g:link>
      <g:image_link>${escapeXml(imageLink)}</g:image_link>
      <g:price>${formatPrice(product.price)}</g:price>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:brand>${escapeXml(brandFor(product))}</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>${escapeXml(googleCategoryFor(product))}</g:google_product_category>
      <g:product_type>${escapeXml([product.collection, product.category].filter(Boolean).join(' > '))}</g:product_type>
      <g:shipping>
        <g:country>US</g:country>
        <g:price>${formatPrice(FLAT_SHIPPING_RATE)}</g:price>
      </g:shipping>
      <g:shipping_label>standard</g:shipping_label>
    </item>`;
}

function buildFeed(): string {
  const items = products.filter(isRetailSku).map(buildItem).join('\n');

  // Free-shipping threshold expressed for context in the channel description.
  const freeShippingDollars = (FREE_SHIPPING_THRESHOLD / 100).toFixed(2);

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(STORE_BRAND)}</title>
    <link>${escapeXml(BASE_URL)}</link>
    <description>${escapeXml(
      `Premium Texas tortillas delivered nationwide. Flat $${(FLAT_SHIPPING_RATE / 100).toFixed(2)} shipping, free over $${freeShippingDollars}. Independent reseller of authentic H-E-B products.`
    )}</description>
${items}
  </channel>
</rss>`;
}

export async function GET() {
  const body = buildFeed();

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Daily cache — feed is regenerated at most once per day.
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
