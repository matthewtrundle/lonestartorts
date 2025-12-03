import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Source - Authentic H-E-B Tortillas | Lonestar Tortillas',
  description: 'Learn how we source authentic H-E-B tortillas from Texas and deliver them fresh to your door nationwide.',
  alternates: {
    canonical: 'https://lonestartortillas.com/craft',
  },
  openGraph: {
    title: 'Our Source - Authentic H-E-B Tortillas',
    description: 'Learn how we source authentic H-E-B tortillas from Texas and deliver them fresh to your door nationwide.',
    url: 'https://lonestartortillas.com/craft',
    type: 'website',
  },
};

export default function CraftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
