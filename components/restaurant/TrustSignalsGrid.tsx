'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface TrustSignal {
  title: string;
  description: string;
}

interface TrustSignalsGridProps {
  signals: TrustSignal[];
}

export function TrustSignalsGrid({ signals }: TrustSignalsGridProps) {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-display font-bold text-charcoal-950 text-center mb-8"
        >
          Why Choose Us
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {signals.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-sunset-600" />
              </div>
              <div>
                <h3 className="font-bold text-charcoal-950 text-sm mb-1">
                  {signal.title}
                </h3>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {signal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
