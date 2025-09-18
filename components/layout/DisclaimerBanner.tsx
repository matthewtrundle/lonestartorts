import React from 'react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <section className="bg-light-gray border-t border-medium-gray">
      <div className="max-w-[1440px] mx-auto px-12 py-8">
        <div className="flex items-center justify-center">
          <p className="text-sm font-light text-gray-dark leading-relaxed text-center">
            Independent reseller. Not affiliated with or endorsed by H-E-B®.
          </p>
        </div>
      </div>
    </section>
  );
};