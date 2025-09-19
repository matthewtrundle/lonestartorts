'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShopPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the order page for unified purchase experience
    router.replace('/order');
  }, [router]);

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-display">Redirecting to Order Page...</h1>
      </div>
    </div>
  );
}