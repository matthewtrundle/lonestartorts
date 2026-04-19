import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscribe & Save',
  description: 'Subscribe to Lonestar Tortillas and save on every order. Fresh premium Texas tortillas delivered on your schedule.',
};

export default function SubscribeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
