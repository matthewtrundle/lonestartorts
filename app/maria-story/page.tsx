'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play } from 'lucide-react';

export default function MariaStoryPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            A Taste of Texas
          </h1>
          <p className="text-xl text-stone-600">
            Meet Maria Rodriguez, Founder of Lonestar Tortillas
          </p>
        </div>

        {/* Video Player */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative aspect-video bg-stone-900">
            {!isPlaying ? (
              // Video Thumbnail with Play Button
              <div className="absolute inset-0 flex items-center justify-center group cursor-pointer" onClick={() => setIsPlaying(true)}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Play Button */}
                <div className="relative z-10 w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center group-hover:bg-amber-400 transition-all transform group-hover:scale-110 shadow-2xl">
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <p className="font-bold text-xl mb-1">A Taste of Texas</p>
                  <p className="text-sm opacity-90">Maria Rodriguez shares her story</p>
                </div>
              </div>
            ) : (
              // Actual Video Player
              <video
                className="w-full h-full"
                controls
                autoPlay
                playsInline
              >
                <source src="/tiks/Taste of Texas_compressed.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            The Story Behind Lonestar Tortillas
          </h2>

          <div className="prose prose-stone max-w-none">
            <p className="text-lg text-stone-700 leading-relaxed mb-4">
              Maria Rodriguez is a third-generation Texan from San Antonio who grew up with H-E-B® tortillas on her family's table every single day. For her family, like countless Texas families, these weren't just tortillas—they were a taste of home, a connection to tradition, and the foundation of every great meal.
            </p>

            <p className="text-lg text-stone-700 leading-relaxed mb-4">
              When Maria's friends and family moved out of state, they all had the same question: "How can I get real H-E-B® tortillas?" That simple question sparked an idea that would become Lonestar Tortillas.
            </p>

            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              In 2020, Maria founded Lonestar Tortillas with a mission to share the authentic taste of Texas with families across America. Today, we deliver those same premium H-E-B® tortillas that generations of Texans have trusted—bringing a taste of home to your table, no matter where you live.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <p className="text-lg italic text-stone-800 mb-3">
                "Those who know tortillas, know H-E-B®. Growing up in San Antonio, these tortillas were on our table every single day. Now I'm proud to share that same authentic Texas taste with families across America."
              </p>
              <p className="text-sm font-semibold text-stone-700">
                — Maria Rodriguez, Founder & CEO
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Authentic Texas Tortillas?
          </h2>
          <p className="text-lg mb-6 text-amber-50">
            Join thousands of families nationwide who trust Lonestar Tortillas for that authentic taste of home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-block bg-white text-amber-600 font-bold px-8 py-4 rounded-lg hover:bg-amber-50 transition-colors shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              href="/story"
              className="inline-block bg-amber-700 text-white font-bold px-8 py-4 rounded-lg hover:bg-amber-800 transition-colors"
            >
              Learn More About Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
