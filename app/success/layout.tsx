import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed | Lonestar Tortillas',
  description: 'Your Lonestar Tortillas order has been confirmed. Thank you for your purchase!',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
