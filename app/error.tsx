'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-charcoal-950 mb-3">Something went wrong</h2>
        <p className="text-charcoal-600 mb-6">
          We hit a snag loading this page. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
