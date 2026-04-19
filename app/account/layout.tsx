import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your Lonestar Tortillas account — view orders, update subscriptions, and edit your preferences.',
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
