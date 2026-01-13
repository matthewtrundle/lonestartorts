import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unsubscribe | Lonestar Tortillas',
  description: 'Unsubscribe from Lonestar Tortillas promotional emails.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function UnsubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
