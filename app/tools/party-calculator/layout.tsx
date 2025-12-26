import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tortilla Party Calculator - How Many Tortillas Per Person?',
  description: 'Calculate exactly how many tortillas you need for your party or event. Free calculator for tacos, burritos, and quesadillas. Plan 3 tortillas per person for tacos, 1-2 for burritos.',
  keywords: 'how many tortillas per person, tortilla calculator, taco party calculator, burrito party planning, tortillas for party, how many tacos per person',
  alternates: {
    canonical: 'https://lonestartortillas.com/tools/party-calculator',
  },
  openGraph: {
    title: 'Tortilla Party Calculator | Lonestar Tortillas',
    description: 'Free calculator to plan exactly how many tortillas you need for your event. Never run out of tortillas again!',
    type: 'website',
  },
};

export default function PartyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
