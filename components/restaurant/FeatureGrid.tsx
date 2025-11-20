'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureGridProps {
  headline: string;
  subhead: string;
  features: Feature[];
  image: string;
}

export function FeatureGrid({ headline, subhead, features, image }: FeatureGridProps) {
  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold text-charcoal-950 mb-3"
          >
            {headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-charcoal-800"
          >
            {subhead}
          </motion.p>
        </div>

        {/* Two Column Layout: Features + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Features Column */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const IconComponent = (LucideIcons as any)[feature.icon] || LucideIcons.CheckCircle2;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 transition-transform group-hover:scale-110">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sunset-100 to-sunset-50 flex items-center justify-center shadow-sm">
                      <IconComponent className="w-5 h-5 text-sunset-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-charcoal-800 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src={image}
              alt="H-E-B Tortillas in use"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
