import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/lib/products';

// Shared product grid used by /shop and the /shop/ad variant
export function ProductGrid({ products, cols = 3 }: { products: Product[]; cols?: 3 | 4 }) {
  const gridClass = cols === 4
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6';

  return (
    <div className={gridClass}>
      {products.map((product) => (
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
  );
}
