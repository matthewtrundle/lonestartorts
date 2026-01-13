import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Your Order | Lonestar Tortillas',
  description: 'Track your Lonestar Tortillas order status and shipping information.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
