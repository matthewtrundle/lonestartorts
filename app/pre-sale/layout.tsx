import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join the Waitlist',
  description: 'Sign up for early access to Lonestar Tortillas. Be the first to order authentic H-E-B tortillas shipped nationwide.',
  openGraph: {
    title: 'Join the Waitlist | Lonestar Tortillas',
    description: 'Sign up for early access to Lonestar Tortillas. Be the first to order authentic H-E-B tortillas shipped nationwide.',
  },
};

export default function PreSaleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
