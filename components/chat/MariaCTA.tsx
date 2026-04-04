'use client';

import { MessageCircle } from 'lucide-react';

interface MariaCTAProps {
  heading?: string;
  description?: string;
  variant?: 'card' | 'inline' | 'banner';
}

export function MariaCTA({
  heading = 'Chat with Maria',
  description = 'Our AI assistant can answer questions about products, shipping, and orders — available 24/7 in English and Spanish.',
  variant = 'card',
}: MariaCTAProps) {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
  if (!agentId) return null;

  const handleClick = () => {
    // Try to open the ElevenLabs widget by clicking its shadow DOM button
    const widget = document.querySelector('elevenlabs-convai');
    if (widget?.shadowRoot) {
      const button = widget.shadowRoot.querySelector('button');
      button?.click();
    }
  };

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-sunset-50 to-masa-50 border border-sunset-200 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MessageCircle className="w-5 h-5 text-sunset-600" />
          <h3 className="font-semibold text-charcoal-950">{heading}</h3>
        </div>
        <p className="text-sm text-charcoal-600 mb-4 max-w-md mx-auto">{description}</p>
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Talk to Maria
        </button>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 text-sunset-600 hover:text-sunset-700 font-medium transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        {heading}
      </button>
    );
  }

  // card variant (default)
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-sunset-100">
      <div className="w-14 h-14 bg-sunset-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageCircle className="w-7 h-7 text-sunset-600" />
      </div>
      <h3 className="text-xl font-bold text-charcoal-950 mb-2">{heading}</h3>
      <p className="text-charcoal-600 mb-6 max-w-sm mx-auto">{description}</p>
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        Talk to Maria
      </button>
    </div>
  );
}
