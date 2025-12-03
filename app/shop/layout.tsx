import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop H-E-B Tortillas Online | Lonestar Tortillas',
  description: 'Browse our selection of authentic H-E-B tortillas. Corn, flour, and butter varieties shipped fresh nationwide.',
  alternates: {
    canonical: 'https://lonestartortillas.com/shop',
  },
  openGraph: {
    title: 'Shop H-E-B Tortillas Online',
    description: 'Browse our selection of authentic H-E-B tortillas. Corn, flour, and butter varieties shipped fresh nationwide.',
    url: 'https://lonestartortillas.com/shop',
    type: 'website',
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
