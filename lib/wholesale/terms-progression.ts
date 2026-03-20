import { prisma } from '@/lib/prisma';
import { PaymentTerms } from '@prisma/client';

// Terms progression ladder
export const TERMS_LEVELS = {
  NEW: { name: 'New', terms: 'DUE_ON_RECEIPT' as PaymentTerms, requiredOnTimeOrders: 0, autoPromote: true },
  TRUSTED: { name: 'Trusted', terms: 'NET_7' as PaymentTerms, requiredOnTimeOrders: 3, autoPromote: true },
  ESTABLISHED: { name: 'Established', terms: 'NET_15' as PaymentTerms, requiredOnTimeOrders: 6, autoPromote: true },
  PREMIUM: { name: 'Premium', terms: 'NET_30' as PaymentTerms, requiredOnTimeOrders: 10, autoPromote: false },
} as const;

export type TermsLevel = keyof typeof TERMS_LEVELS;

const LEVEL_ORDER: TermsLevel[] = ['NEW', 'TRUSTED', 'ESTABLISHED', 'PREMIUM'];

function getNextLevel(current: TermsLevel): TermsLevel | null {
  const idx = LEVEL_ORDER.indexOf(current);
  return idx < LEVEL_ORDER.length - 1 ? LEVEL_ORDER[idx + 1] : null;
}

function getPreviousLevel(current: TermsLevel): TermsLevel | null {
  const idx = LEVEL_ORDER.indexOf(current);
  return idx > 0 ? LEVEL_ORDER[idx - 1] : null;
}

/**
 * Get current terms progress for a wholesale client.
 * Returns info for displaying the progress card on the account page.
 */
export async function getTermsProgress(clientId: string) {
  const client = await prisma.wholesaleClient.findUnique({
    where: { id: clientId },
    select: {
      paymentTermsLevel: true,
      paymentTerms: true,
      onTimePaymentCount: true,
      latePaymentCount: true,
      termsLockedUntil: true,
      termsAutoPromoted: true,
      lastTermsChange: true,
    },
  });

  if (!client) return null;

  const currentLevel = (client.paymentTermsLevel || 'NEW') as TermsLevel;
  const currentLevelInfo = TERMS_LEVELS[currentLevel];
  const nextLevel = getNextLevel(currentLevel);
  const nextLevelInfo = nextLevel ? TERMS_LEVELS[nextLevel] : null;

  const isLocked = client.termsLockedUntil && new Date(client.termsLockedUntil) > new Date();

  return {
    currentLevel,
    currentLevelName: currentLevelInfo.name,
    currentTerms: client.paymentTerms,
    onTimePaymentCount: client.onTimePaymentCount,
    latePaymentCount: client.latePaymentCount,
    isLocked: !!isLocked,
    termsLockedUntil: client.termsLockedUntil,
    termsAutoPromoted: client.termsAutoPromoted,
    nextLevel,
    nextLevelName: nextLevelInfo?.name || null,
    nextLevelTerms: nextLevelInfo?.terms || null,
    ordersToNextLevel: nextLevelInfo
      ? Math.max(0, nextLevelInfo.requiredOnTimeOrders - client.onTimePaymentCount)
      : 0,
    nextLevelRequiresApproval: nextLevelInfo ? !nextLevelInfo.autoPromote : false,
    progressPercent: nextLevelInfo
      ? Math.min(100, Math.round(
          ((client.onTimePaymentCount - currentLevelInfo.requiredOnTimeOrders) /
          (nextLevelInfo.requiredOnTimeOrders - currentLevelInfo.requiredOnTimeOrders)) * 100
        ))
      : 100,
    levels: LEVEL_ORDER.map(level => ({
      id: level,
      ...TERMS_LEVELS[level],
      isComplete: LEVEL_ORDER.indexOf(level) < LEVEL_ORDER.indexOf(currentLevel),
      isCurrent: level === currentLevel,
    })),
  };
}

/**
 * Evaluate and apply terms promotion after a successful on-time payment.
 * Called from invoice.payment_succeeded webhook.
 */
export async function evaluateTermsPromotion(
  clientId: string,
  orderDueDate: Date | null,
  paidAt: Date,
): Promise<{ promoted: boolean; newLevel?: TermsLevel; requiresApproval?: boolean }> {
  const client = await prisma.wholesaleClient.findUnique({
    where: { id: clientId },
  });

  if (!client) return { promoted: false };

  const isOnTime = !orderDueDate || paidAt <= orderDueDate;

  if (!isOnTime) {
    return { promoted: false };
  }

  const newOnTimeCount = client.onTimePaymentCount + 1;
  await prisma.wholesaleClient.update({
    where: { id: clientId },
    data: { onTimePaymentCount: newOnTimeCount },
  });

  if (!client.termsAutoPromoted) return { promoted: false };

  if (client.termsLockedUntil && new Date(client.termsLockedUntil) > new Date()) {
    return { promoted: false };
  }

  const currentLevel = (client.paymentTermsLevel || 'NEW') as TermsLevel;
  const nextLevel = getNextLevel(currentLevel);
  if (!nextLevel) return { promoted: false };

  const nextLevelInfo = TERMS_LEVELS[nextLevel];

  if (newOnTimeCount < nextLevelInfo.requiredOnTimeOrders) {
    return { promoted: false };
  }

  if (!nextLevelInfo.autoPromote) {
    return { promoted: false, requiresApproval: true, newLevel: nextLevel };
  }

  await prisma.wholesaleClient.update({
    where: { id: clientId },
    data: {
      paymentTermsLevel: nextLevel,
      paymentTerms: nextLevelInfo.terms,
      lastTermsChange: new Date(),
    },
  });

  return { promoted: true, newLevel: nextLevel };
}

/**
 * Apply terms demotion after a failed/overdue payment.
 * Called from invoice.payment_failed webhook.
 */
export async function applyTermsDemotion(clientId: string): Promise<void> {
  const client = await prisma.wholesaleClient.findUnique({
    where: { id: clientId },
  });

  if (!client) return;

  const newLateCount = client.latePaymentCount + 1;
  const currentLevel = (client.paymentTermsLevel || 'NEW') as TermsLevel;

  if (newLateCount >= 2) {
    const prevLevel = getPreviousLevel(currentLevel);
    if (prevLevel) {
      const prevLevelInfo = TERMS_LEVELS[prevLevel];
      await prisma.wholesaleClient.update({
        where: { id: clientId },
        data: {
          latePaymentCount: newLateCount,
          paymentTermsLevel: prevLevel,
          paymentTerms: prevLevelInfo.terms,
          onTimePaymentCount: Math.max(0, prevLevelInfo.requiredOnTimeOrders),
          lastTermsChange: new Date(),
          termsLockedUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        },
      });
    } else {
      await prisma.wholesaleClient.update({
        where: { id: clientId },
        data: {
          latePaymentCount: newLateCount,
          termsLockedUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        },
      });
    }
  } else {
    await prisma.wholesaleClient.update({
      where: { id: clientId },
      data: {
        latePaymentCount: newLateCount,
        termsLockedUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    });
  }
}

/**
 * Admin override: manually set a client's terms level.
 */
export async function adminOverrideTerms(
  clientId: string,
  newLevel: TermsLevel,
): Promise<void> {
  const levelInfo = TERMS_LEVELS[newLevel];
  await prisma.wholesaleClient.update({
    where: { id: clientId },
    data: {
      paymentTermsLevel: newLevel,
      paymentTerms: levelInfo.terms,
      termsAutoPromoted: false,
      lastTermsChange: new Date(),
    },
  });
}
