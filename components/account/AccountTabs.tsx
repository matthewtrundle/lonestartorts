'use client';

import React from 'react';
import { User, Building2 } from 'lucide-react';

interface AccountTabsProps {
  activeTab: 'personal' | 'wholesale';
  onTabChange: (tab: 'personal' | 'wholesale') => void;
  isWholesale: boolean;
}

export default function AccountTabs({ activeTab, onTabChange, isWholesale }: AccountTabsProps) {
  if (!isWholesale) return null;

  return (
    <div className="flex items-center gap-1 bg-charcoal-100 rounded-lg p-1 mb-6">
      <button
        onClick={() => onTabChange('personal')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
          activeTab === 'personal'
            ? 'bg-white text-charcoal-950 shadow-sm'
            : 'text-charcoal-500 hover:text-charcoal-700'
        }`}
      >
        <User className="w-4 h-4" />
        Personal
      </button>
      <button
        onClick={() => onTabChange('wholesale')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
          activeTab === 'wholesale'
            ? 'bg-white text-charcoal-950 shadow-sm'
            : 'text-charcoal-500 hover:text-charcoal-700'
        }`}
      >
        <Building2 className="w-4 h-4" />
        Wholesale
      </button>
    </div>
  );
}
