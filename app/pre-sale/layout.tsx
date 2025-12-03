import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join the Pre-Sale Waitlist',
  description: 'Be first to get authentic H-E-B tortillas delivered. Join our pre-sale waitlist for exclusive early access.',
  alternates: {
    canonical: 'https://lonestartortillas.com/pre-sale',
  },
  openGraph: {
    title: 'Join the Pre-Sale Waitlist',
    description: 'Be first to get authentic H-E-B tortillas delivered. Join our pre-sale waitlist for exclusive early access.',
    url: 'https://lonestartortillas.com/pre-sale',
    type: 'website',
  },
};

export default function PreSaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
