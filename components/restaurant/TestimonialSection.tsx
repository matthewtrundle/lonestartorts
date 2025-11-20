'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  restaurant: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <section className="py-10 bg-cream-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-display font-bold text-charcoal-950 text-center mb-8"
        >
          What Restaurant Owners Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-charcoal-200/20 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-sunset-600" />
              </div>

              {/* Quote */}
              <blockquote className="relative mb-4">
                <p className="text-charcoal-800 leading-relaxed text-sm md:text-base italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Attribution */}
              <div className="border-t border-charcoal-200/30 pt-4">
                <p className="font-bold text-charcoal-950 text-sm">
                  {testimonial.author}
                </p>
                <p className="text-xs text-charcoal-700">
                  {testimonial.role}, {testimonial.restaurant}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
