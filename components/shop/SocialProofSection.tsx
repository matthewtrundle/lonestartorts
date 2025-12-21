'use client';

import React from 'react';
import { Star, Users, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

// Placeholder testimonials - replace with real reviews later
const testimonials: Testimonial[] = [
  {
    quote: "Finally found authentic HEB tortillas! These taste just like home.",
    author: "Maria G.",
    location: "Denver, CO",
    rating: 5,
  },
  {
    quote: "My family moved from Austin to Chicago and we missed these so much. Fast shipping and perfect quality!",
    author: "James T.",
    location: "Chicago, IL",
    rating: 5,
  },
  {
    quote: "Best tortillas outside of Texas. The butter tortillas are incredible.",
    author: "Sarah K.",
    location: "Seattle, WA",
    rating: 5,
  },
];

interface SocialProofSectionProps {
  className?: string;
}

export function SocialProofSection({ className = '' }: SocialProofSectionProps) {
  return (
    <section className={`bg-cream-50 py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Users className="w-5 h-5 text-sunset-600" />
              <span className="text-3xl font-bold text-charcoal-950">500+</span>
            </div>
            <p className="text-sm text-gray-600">Happy Texas Expats</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-3xl font-bold text-charcoal-950">4.9</span>
            </div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-3xl font-bold text-charcoal-950">48</span>
            </div>
            <p className="text-sm text-gray-600">States Served</p>
          </div>
        </div>

        {/* Testimonials */}
        <h2 className="text-2xl font-bold text-center text-charcoal-950 mb-8">
          What Texas Expats Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-sunset-100" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <div className="text-sm">
                <p className="font-semibold text-charcoal-950">{testimonial.author}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Note for adding real reviews */}
        {/* TODO: Replace placeholder testimonials with real customer reviews */}
      </div>
    </section>
  );
}
