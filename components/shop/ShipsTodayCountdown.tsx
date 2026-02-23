'use client';

import { useState, useEffect } from 'react';
import { Clock, Truck } from 'lucide-react';
import {
  getShippingMessage,
  getTimeUntilCutoff,
  type ShippingMessage,
} from '@/lib/shipping-schedule';

export function ShipsTodayCountdown() {
  const [message, setMessage] = useState<ShippingMessage>(getShippingMessage());
  const [countdown, setCountdown] = useState(getTimeUntilCutoff());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setMessage(getShippingMessage());
      setCountdown(getTimeUntilCutoff());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Don't render dynamic content on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
        <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
        <span className="text-sm font-medium text-green-800">Freshness First Shipping</span>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  // Ships today — green with countdown
  if (message.type === 'ships-today' && countdown) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-green-800">
              Freshness First — Ships Today!
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-green-600" />
              <span className="font-mono text-base font-bold text-green-700">
                {pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
              </span>
              <span className="text-xs text-green-600 ml-1">until 2 PM CT cutoff</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Ships tomorrow — amber
  if (message.type === 'ships-tomorrow') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
        <Truck className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <div>
          <span className="text-sm font-semibold text-amber-800">
            Freshness First — Ships {message.shipDateFormatted}
          </span>
          <p className="text-xs text-amber-600 mt-0.5">{message.subtext}</p>
        </div>
      </div>
    );
  }

  // Ships next ship day — blue
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex items-center gap-2">
      <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
      <div>
        <span className="text-sm font-semibold text-blue-800">
          Freshness First — Ships {message.shipDateFormatted}
        </span>
        <p className="text-xs text-blue-600 mt-0.5">{message.subtext}</p>
      </div>
    </div>
  );
}

// Compact version for product cards
export function ShipsTodayBadge() {
  const [message, setMessage] = useState<ShippingMessage>(getShippingMessage());
  const [countdown, setCountdown] = useState(getTimeUntilCutoff());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setMessage(getShippingMessage());
      setCountdown(getTimeUntilCutoff());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
        <Truck className="w-3 h-3" />
        Freshness First
      </span>
    );
  }

  // Ships today
  if (message.type === 'ships-today' && countdown) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
        <Truck className="w-3 h-3" />
        Ships today • {countdown.hours}h {countdown.minutes}m left
      </span>
    );
  }

  // Ships tomorrow
  if (message.type === 'ships-tomorrow') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
        <Truck className="w-3 h-3" />
        Ships {message.shipDateFormatted}
      </span>
    );
  }

  // Ships next ship day
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
      <Truck className="w-3 h-3" />
      Ships {message.shipDateFormatted}
    </span>
  );
}
