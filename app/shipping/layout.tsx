import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tortilla Delivery | HEB Tortillas Shipped to Your Door',
  description: 'Order authentic H-E-B tortillas for delivery anywhere in the US. FREE shipping on orders $80+, flat $12.99 under $80. 2-3 day delivery via USPS Priority Mail. Ships Tuesdays for maximum freshness.',
  keywords: 'tortilla delivery, HEB tortillas shipped, buy tortillas online, tortilla shipping, nationwide tortilla delivery',
  alternates: {
    canonical: 'https://lonestartortillas.com/shipping',
  },
  openGraph: {
    title: 'Tortilla Delivery | HEB Tortillas Shipped Nationwide',
    description: 'Order authentic H-E-B tortillas for delivery anywhere in the US. FREE shipping on orders $80+. 2-3 day delivery via USPS Priority Mail.',
    type: 'website',
  },
};

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
