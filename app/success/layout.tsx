import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed | Lonestar Tortillas',
  description: 'Your tortilla order has been confirmed. Thank you for choosing Lonestar Tortillas.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
