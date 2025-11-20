'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { IconBadge } from '@/components/svg/IconBadge';
import { PatternBackground } from '@/components/svg/PatternBackground';

interface PainPoint {
  title: string;
  description: string;
  icon: string;
}

interface PainPointGridProps {
  painPoints: PainPoint[];
}

export function PainPointGrid({ painPoints }: PainPointGridProps) {
  return (
    <section className="relative py-8 md:py-10 bg-cream-50 overflow-hidden">
      {/* Subtle Pattern Background */}
      <PatternBackground variant="dots" opacity={0.03} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-display font-bold text-charcoal-950 text-center mb-8"
        >
          Sound Familiar?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {painPoints.map((point, index) => {
            // Dynamically get the icon component from lucide-react
            const IconComponent = (LucideIcons as any)[point.icon] || LucideIcons.AlertCircle;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-charcoal-200/20 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <IconBadge variant="hexagon" size="md">
                      <IconComponent className="w-6 h-6 text-sunset-600" />
                    </IconBadge>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-charcoal-950 mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-charcoal-800 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
