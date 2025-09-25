'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the pre-sale page since orders aren't available yet
    router.replace('/pre-sale');
  }, [router]);

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-display">Orders coming soon! Redirecting to Pre-Sale...</h1>
      </div>
    </div>
  );
}