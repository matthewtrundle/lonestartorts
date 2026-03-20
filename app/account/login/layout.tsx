import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Lonestar Tortillas',
  description: 'Sign in to your Lonestar Tortillas account to manage orders, subscriptions, and more.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
