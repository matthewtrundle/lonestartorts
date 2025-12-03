import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Lonestar Tortillas',
  description: 'How Lonestar Tortillas brings authentic H-E-B tortillas from Texas to tortilla lovers nationwide.',
  alternates: {
    canonical: 'https://lonestartortillas.com/story',
  },
  openGraph: {
    title: 'Our Story - Lonestar Tortillas',
    description: 'How Lonestar Tortillas brings authentic H-E-B tortillas from Texas to tortilla lovers nationwide.',
    url: 'https://lonestartortillas.com/story',
    type: 'website',
  },
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
