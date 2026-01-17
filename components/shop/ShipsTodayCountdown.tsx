'use client';

import { useState, useEffect } from 'react';
import { Clock, Truck } from 'lucide-react';

// Shipping cutoff is noon Central Time (12:00 PM CST/CDT)
const CUTOFF_HOUR = 12; // noon

function getTimeUntilCutoff(): { hours: number; minutes: number; seconds: number; isPastCutoff: boolean } {
  const now = new Date();

  // Convert to Central Time
  const centralTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  const currentHour = centralTime.getHours();
  const currentMinute = centralTime.getMinutes();
  const currentSecond = centralTime.getSeconds();

  // Check if we're past the cutoff
  if (currentHour >= CUTOFF_HOUR) {
    return { hours: 0, minutes: 0, seconds: 0, isPastCutoff: true };
  }

  // Calculate time until cutoff
  const hoursLeft = CUTOFF_HOUR - currentHour - 1;
  const minutesLeft = 59 - currentMinute;
  const secondsLeft = 59 - currentSecond;

  return {
    hours: hoursLeft,
    minutes: minutesLeft,
    seconds: secondsLeft,
    isPastCutoff: false,
  };
}

export function ShipsTodayCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilCutoff());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilCutoff());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
        <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
        <span className="text-sm font-medium text-green-800">Same-day shipping available</span>
      </div>
    );
  }

  if (timeLeft.isPastCutoff) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
        <Truck className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span className="text-sm font-medium text-amber-800">
          Order now, ships tomorrow morning
        </span>
      </div>
    );
  }

  const { hours, minutes, seconds } = timeLeft;
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-green-800">
            Ships TODAY if ordered in:
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3 text-green-600" />
            <span className="font-mono text-base font-bold text-green-700">
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact version for product cards
export function ShipsTodayBadge() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilCutoff());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilCutoff());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
        <Truck className="w-3 h-3" />
        Ships today
      </span>
    );
  }

  if (timeLeft.isPastCutoff) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
        <Truck className="w-3 h-3" />
        Ships tomorrow
      </span>
    );
  }

  const { hours, minutes } = timeLeft;

  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
      <Truck className="w-3 h-3" />
      Ships today • {hours}h {minutes}m left
    </span>
  );
}
