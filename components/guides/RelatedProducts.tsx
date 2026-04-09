'use client';

import { ProductCard } from '@/components/product/ProductCard';
import { products, getProductBySku, type Product } from '@/lib/products';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

interface RelatedProductsProps {
  title?: string;
  description?: string;
  productSkus: string[];
  ctaText?: string;
  ctaLink?: string;
}

export function RelatedProducts({
  title = 'Shop Our Tortillas',
  description = 'Get authentic Texas tortillas delivered to your door with free shipping.',
  productSkus,
  ctaText = 'View All Products',
  ctaLink = '/shop',
}: RelatedProductsProps) {
  // Get products by SKU, filter out any that don't exist
  const relatedProducts = productSkus
    .map((sku) => getProductBySku(sku))
    .filter((p): p is Product => p !== undefined);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="my-12 bg-gradient-to-b from-cream-50 to-masa-50 p-6 md:p-8 rounded-xl border border-masa-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal-950 mb-2">{title}</h2>
        <p className="text-charcoal-600 max-w-2xl mx-auto">{description}</p>
      </div>

      <div className={`grid gap-4 md:gap-6 ${
        relatedProducts.length === 2
          ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto'
          : 'grid-cols-1 md:grid-cols-3'
      }`}>
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.sku}
            sku={product.sku}
            name={product.name}
            description={product.description}
            image={product.image}
            price={product.price}
            tortillaCount={product.tortillaCount}
            storage={product.storage}
            category={product.category}
            productType={product.productType}
            tortillaType={product.tortillaType}
            isBestSeller={product.isBestSeller}
            savingsPercent={product.savingsPercent}
            bundleOnly={product.bundleOnly}
            brand={product.brand}
          />
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          href={ctaLink}
          className="inline-flex items-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
