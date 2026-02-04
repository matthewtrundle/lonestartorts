/**
 * ProductCardSkeleton - Loading skeleton for ProductCard
 * Matches the layout and dimensions of ProductCard for smooth loading transitions
 */

export const ProductCardSkeleton = () => {
  return (
    <div className="relative bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col h-full animate-pulse">
      {/* Image Container Skeleton */}
      <div className="aspect-[4/3] relative bg-gray-200" />

      {/* Product Details Skeleton */}
      <div className="p-3 md:p-5 flex flex-col flex-grow">
        {/* Header: Name + Price */}
        <div className="mb-2 md:mb-3">
          <div className="flex justify-between items-start gap-2 mb-1">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="h-6 bg-gray-200 rounded w-16 flex-shrink-0" />
          </div>
          {/* Type badges */}
          <div className="flex gap-2 mt-2">
            <div className="h-5 bg-gray-200 rounded-full w-14" />
            <div className="h-5 bg-gray-200 rounded-full w-20" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Count info */}
        <div className="h-4 bg-gray-200 rounded w-24 mb-3" />

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Shipping info */}
        <div className="h-4 bg-gray-200 rounded w-32 mb-3" />

        {/* Quantity controls and button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-200 rounded-lg h-9 w-24" />
          <div className="flex-1 h-9 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

/**
 * ProductGridSkeleton - A grid of product card skeletons
 * Use this as a Suspense fallback for the shop page
 */
export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
