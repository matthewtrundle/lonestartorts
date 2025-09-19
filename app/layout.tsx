import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lonestar Tortillas - Texas Tortillas, Delivered Fresh',
  description: 'Authentic Mi Tienda-style tortillas, shipped anywhere the salsa flows. Independent reseller. Not affiliated with or endorsed by H-E-B®.',
  keywords: 'texas tortillas, mi tienda tortillas, corn tortillas, flour tortillas, tortilla delivery',
  openGraph: {
    title: 'Lonestar Tortillas',
    description: 'Texas tortillas, shipped anywhere the salsa flows.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}