import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wholesale & Bulk Orders | H-E-B Tortillas for Restaurants',
  description:
    'Order H-E-B tortillas in bulk for your restaurant, food truck, or catering business. Volume discounts up to 20% off, long shelf life, fast shipping with overnight available.',
  keywords:
    'wholesale tortillas, bulk tortilla order, restaurant tortilla supplier, H-E-B tortillas wholesale, commercial tortilla order',
  alternates: {
    canonical: 'https://lonestartortillas.com/wholesale',
  },
  openGraph: {
    title: 'Wholesale & Bulk Tortilla Orders | Lonestar Tortillas',
    description:
      'Premium H-E-B tortillas for restaurants and food service. Volume pricing up to 20% off, reliable supply, nationwide delivery.',
    type: 'website',
  },
};

export default function WholesaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
