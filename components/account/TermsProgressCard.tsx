'use client';

import React from 'react';
import { Shield, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface TermsLevel {
  id: string;
  name: string;
  terms: string;
  requiredOnTimeOrders: number;
  autoPromote: boolean;
  isComplete: boolean;
  isCurrent: boolean;
}

interface TermsProgressData {
  currentLevel: string;
  currentLevelName: string;
  currentTerms: string;
  onTimePaymentCount: number;
  latePaymentCount: number;
  isLocked: boolean;
  termsLockedUntil: string | null;
  termsAutoPromoted: boolean;
  nextLevel: string | null;
  nextLevelName: string | null;
  nextLevelTerms: string | null;
  ordersToNextLevel: number;
  nextLevelRequiresApproval: boolean;
  progressPercent: number;
  levels: TermsLevel[];
}

interface TermsProgressCardProps {
  termsProgress: TermsProgressData;
}

const termsDisplayMap: Record<string, string> = {
  DUE_ON_RECEIPT: 'Due on Receipt',
  NET_7: 'Net 7 Days',
  NET_15: 'Net 15 Days',
  NET_30: 'Net 30 Days',
  NET_45: 'Net 45 Days',
  NET_60: 'Net 60 Days',
};

export default function TermsProgressCard({ termsProgress }: TermsProgressCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-sunset-600" />
        Payment Terms
      </h2>

      {/* Current Level */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-charcoal-500">Current Level</p>
          <p className="text-xl font-bold text-charcoal-950">{termsProgress.currentLevelName}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-charcoal-500">Payment Terms</p>
          <p className="text-lg font-semibold text-sunset-600">
            {termsDisplayMap[termsProgress.currentTerms] || termsProgress.currentTerms}
          </p>
        </div>
      </div>

      {/* Level Stepper */}
      <div className="flex items-center gap-1 mb-4">
        {termsProgress.levels.map((level, i) => (
          <React.Fragment key={level.id}>
            <div className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                level.isComplete ? 'bg-green-100 text-green-700' : level.isCurrent ? 'bg-sunset-100 text-sunset-700 ring-2 ring-sunset-500' : 'bg-gray-100 text-gray-400'
              }`}>
                {level.isComplete ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[10px] mt-1 text-center leading-tight ${level.isCurrent ? 'font-bold text-charcoal-950' : 'text-charcoal-400'}`}>
                {level.name}
              </span>
              <span className={`text-[9px] text-center ${level.isCurrent ? 'text-sunset-600' : 'text-charcoal-300'}`}>
                {termsDisplayMap[level.terms] || level.terms}
              </span>
            </div>
            {i < termsProgress.levels.length - 1 && (
              <ArrowRight className={`w-3 h-3 flex-shrink-0 mt-[-16px] ${level.isComplete ? 'text-green-400' : 'text-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Progress to Next Level */}
      {termsProgress.nextLevel && (
        <div className="bg-cream-50 rounded-lg p-3">
          {termsProgress.isLocked ? (
            <div className="flex items-center gap-2 text-amber-700">
              <Lock className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm">Promotions frozen until {new Date(termsProgress.termsLockedUntil!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-medium text-charcoal-700">
                  {termsProgress.ordersToNextLevel} more on-time order{termsProgress.ordersToNextLevel !== 1 ? 's' : ''} to unlock <span className="font-bold">{termsProgress.nextLevelName}</span>
                </p>
                <span className="text-xs text-charcoal-500">{termsProgress.progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-sunset-500 rounded-full h-2 transition-all duration-500" style={{ width: `${termsProgress.progressPercent}%` }} />
              </div>
              {termsProgress.nextLevelRequiresApproval && (
                <p className="text-xs text-charcoal-400 mt-1.5">* Requires approval for {termsProgress.nextLevelName} tier</p>
              )}
            </>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-charcoal-100 text-xs text-charcoal-400">
        <span>{termsProgress.onTimePaymentCount} on-time payment{termsProgress.onTimePaymentCount !== 1 ? 's' : ''}</span>
        {termsProgress.latePaymentCount > 0 && (
          <span className="text-amber-500">{termsProgress.latePaymentCount} late</span>
        )}
      </div>
    </div>
  );
}
