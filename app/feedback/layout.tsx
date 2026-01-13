import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leave Feedback | Lonestar Tortillas',
  description: 'Share your feedback about your Lonestar Tortillas order.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
