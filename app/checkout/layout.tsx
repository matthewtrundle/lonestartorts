import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | Lonestar Tortillas',
  description: 'Complete your Lonestar Tortillas order. Secure checkout with free shipping on orders $60+.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
