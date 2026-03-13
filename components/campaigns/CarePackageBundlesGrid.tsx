'use client';

import { CarePackageCard } from '@/components/campaigns/CarePackageCard';
import { carePackageBundles } from '@/lib/care-packages';

export function CarePackageBundlesGrid() {
  const scrollToForm = () => {
    document.getElementById('gift-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {carePackageBundles.map((bundle) => (
        <CarePackageCard
          key={bundle.id}
          bundle={bundle}
          onSelect={scrollToForm}
        />
      ))}
    </div>
  );
}
