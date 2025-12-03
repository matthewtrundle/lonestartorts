import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | Lonestar Tortillas',
  description: 'Complete your order for authentic H-E-B tortillas.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
