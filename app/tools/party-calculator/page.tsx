'use client';

import { useState } from 'react';
import Link from 'next/link';

// HowTo Schema for rich snippets
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Tortillas for a Party',
  description: 'Learn how to calculate the exact number of tortillas needed for your party, taco bar, or catering event. Includes tips for tacos, burritos, and quesadillas.',
  totalTime: 'PT2M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: '20-100'
  },
  tool: [
    {
      '@type': 'HowToTool',
      name: 'Tortilla Party Calculator'
    }
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter guest count',
      text: 'Enter the number of guests attending your event. Most parties range from 10-100 guests.'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select meal type',
      text: 'Choose what you\'re serving: tacos (3 per person), burritos (1.5 per person), quesadillas (2 per person), or mixed menu.'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose appetite level',
      text: 'Select whether your guests are light eaters, normal, or hearty eaters to adjust portions accordingly.'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Get your count',
      text: 'The calculator provides your exact tortilla count plus a 15% buffer for extras and accidents.'
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Order your tortillas',
      text: 'Order authentic H-E-B tortillas from Lonestar Tortillas with free shipping on all orders.'
    }
  ]
};

export default function PartyCalculator() {
  const [guests, setGuests] = useState(10);
  const [mealType, setMealType] = useState<'tacos' | 'burritos' | 'quesadillas' | 'mixed'>('tacos');
  const [appetiteLevel, setAppetiteLevel] = useState<'light' | 'normal' | 'hearty'>('normal');

  // Calculation logic
  const calculateTortillas = () => {
    const basePerPerson = {
      tacos: { light: 2, normal: 3, hearty: 4 },
      burritos: { light: 1, normal: 1.5, hearty: 2 },
      quesadillas: { light: 1, normal: 2, hearty: 3 },
      mixed: { light: 2, normal: 3, hearty: 4 },
    };

    const tortillasPerPerson = basePerPerson[mealType][appetiteLevel];
    const totalTortillas = Math.ceil(guests * tortillasPerPerson);

    // Add 15% buffer for extras/accidents
    const withBuffer = Math.ceil(totalTortillas * 1.15);

    // Calculate packages (assume 10 per package for corn, 8 for flour)
    const cornPackages = Math.ceil(withBuffer / 10);
    const flourPackages = Math.ceil(withBuffer / 8);

    return {
      tortillasPerPerson,
      totalTortillas,
      withBuffer,
      cornPackages,
      flourPackages,
    };
  };

  const results = calculateTortillas();

  // Meat calculations (rough estimates)
  const meatPerPerson = appetiteLevel === 'light' ? 0.25 : appetiteLevel === 'normal' ? 0.33 : 0.5;
  const totalMeat = Math.ceil(guests * meatPerPerson);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-sunset-50">
      <header className="bg-charcoal-950 text-cream-50 py-8">
        <div className="container mx-auto px-6">
          <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Tortilla Party Calculator</h1>
          <p className="text-cream-300 mt-4 text-lg">Find out exactly how many tortillas you need for your event</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Quick Answer for SEO */}
        <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
          <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
          <p className="text-lg text-charcoal-800">
            <strong>For tacos:</strong> Plan 3 tortillas per person for average appetites. For burritos, plan 1-2 per person. Always add 15% extra for seconds and accidents. Use the calculator below for exact numbers based on your event size.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Calculate Your Tortillas</h2>

          {/* Guest Count */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-charcoal-800 mb-3">
              How many guests?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="100"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="flex-1 h-3 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-rust-600"
              />
              <input
                type="number"
                min="1"
                max="500"
                value={guests}
                onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center text-2xl font-bold border-2 border-charcoal-200 rounded-lg py-2"
              />
            </div>
          </div>

          {/* Meal Type */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-charcoal-800 mb-3">
              What are you serving?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'tacos', label: 'Tacos', emoji: '🌮' },
                { value: 'burritos', label: 'Burritos', emoji: '🌯' },
                { value: 'quesadillas', label: 'Quesadillas', emoji: '🧀' },
                { value: 'mixed', label: 'Mixed Menu', emoji: '🍽️' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMealType(option.value as typeof mealType)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    mealType === option.value
                      ? 'border-rust-600 bg-rust-50 text-rust-800'
                      : 'border-charcoal-200 bg-white hover:border-charcoal-300'
                  }`}
                >
                  <span className="text-2xl block mb-1">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Appetite Level */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-charcoal-800 mb-3">
              How hungry will your guests be?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Light Eaters', desc: 'Appetizers available' },
                { value: 'normal', label: 'Normal', desc: 'Standard portions' },
                { value: 'hearty', label: 'Hearty', desc: 'Hungry crowd!' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setAppetiteLevel(option.value as typeof appetiteLevel)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    appetiteLevel === option.value
                      ? 'border-rust-600 bg-rust-50 text-rust-800'
                      : 'border-charcoal-200 bg-white hover:border-charcoal-300'
                  }`}
                >
                  <span className="font-bold block">{option.label}</span>
                  <span className="text-sm text-charcoal-600">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-charcoal-950 text-cream-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Your Tortilla Count</h3>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-charcoal-800 rounded-lg p-6">
                <p className="text-4xl font-bold text-sunset-400">{results.tortillasPerPerson}</p>
                <p className="text-cream-300 mt-2">Per Person</p>
              </div>
              <div className="bg-charcoal-800 rounded-lg p-6">
                <p className="text-4xl font-bold text-sunset-400">{results.totalTortillas}</p>
                <p className="text-cream-300 mt-2">Base Total</p>
              </div>
              <div className="bg-rust-600 rounded-lg p-6">
                <p className="text-4xl font-bold">{results.withBuffer}</p>
                <p className="text-cream-100 mt-2">With 15% Buffer</p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="bg-charcoal-800 rounded-lg p-4 flex justify-between items-center">
                <span className="text-cream-300">Corn Tortilla Packages (10 ct):</span>
                <span className="text-2xl font-bold text-sunset-400">{results.cornPackages}</span>
              </div>
              <div className="bg-charcoal-800 rounded-lg p-4 flex justify-between items-center">
                <span className="text-cream-300">Flour Tortilla Packages (8 ct):</span>
                <span className="text-2xl font-bold text-sunset-400">{results.flourPackages}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-charcoal-700">
              <p className="text-cream-300 text-center">
                <strong className="text-cream-50">Also plan:</strong> About {totalMeat} lbs of meat for {guests} guests
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Party Planning Tips</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-charcoal-950 mb-3">Tortilla Tips</h3>
              <ul className="space-y-2 text-charcoal-700">
                <li className="flex items-start gap-2">
                  <span className="text-rust-600">•</span>
                  <span>Always buy 15-20% more than you calculate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rust-600">•</span>
                  <span>Keep tortillas warm in a towel-lined container</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rust-600">•</span>
                  <span>Offer both corn and flour for variety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rust-600">•</span>
                  <span>Heat tortillas just before serving</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-charcoal-950 mb-3">Meat & Filling Guide</h3>
              <ul className="space-y-2 text-charcoal-700">
                <li className="flex items-start gap-2">
                  <span className="text-rust-600">•</span>
                  <span><strong>Tacos:</strong> 1/4 - 1/3 lb meat per person</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rust-600">•</span>
                  <span><strong>Burritos:</strong> 1/3 - 1/2 lb meat per person</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rust-600">•</span>
                  <span>Add beans and rice to stretch meat further</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rust-600">•</span>
                  <span>Offer 2-3 protein options if possible</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Quick Reference Chart</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-charcoal-950 text-cream-50">
                  <th className="border px-4 py-3 text-left">Guests</th>
                  <th className="border px-4 py-3 text-center">Tacos (3/person)</th>
                  <th className="border px-4 py-3 text-center">Burritos (1.5/person)</th>
                  <th className="border px-4 py-3 text-center">Meat (lbs)</th>
                </tr>
              </thead>
              <tbody>
                {[10, 20, 30, 50, 75, 100].map((count) => (
                  <tr key={count} className="hover:bg-cream-50">
                    <td className="border px-4 py-3 font-medium">{count} guests</td>
                    <td className="border px-4 py-3 text-center">{Math.ceil(count * 3 * 1.15)} tortillas</td>
                    <td className="border px-4 py-3 text-center">{Math.ceil(count * 1.5 * 1.15)} tortillas</td>
                    <td className="border px-4 py-3 text-center">{Math.ceil(count * 0.33)} lbs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-rust-600 to-sunset-600 text-cream-50 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Stock Up?</h2>
          <p className="text-xl mb-6 text-cream-100">
            Get authentic Texas tortillas delivered for your party
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Shop Tortillas
            </Link>
            <Link
              href="/wholesale"
              className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-rust-600 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Bulk Orders
            </Link>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}
