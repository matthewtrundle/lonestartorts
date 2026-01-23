/**
 * Discount Engine - Centralized discount calculation and validation
 *
 * Supports:
 * - Percentage discounts (with optional max cap)
 * - Fixed amount discounts
 * - Free shipping
 * - Tiered discounts (different rates based on order amount)
 * - BOGO (Buy One Get One) promotions
 */

import { prisma } from '@/lib/prisma';
import { RuleType, DiscountSource, Prisma } from '@prisma/client';

// Type definitions
export interface CartItem {
  sku: string;
  quantity: number;
  price: number; // Price per item in cents
  name?: string;
}

export interface DiscountValidationResult {
  valid: boolean;
  error?: string;
  discountId?: string;
  discount?: ApplicableDiscount;
}

export interface ApplicableDiscount {
  code: string;
  name: string;
  type: 'percentage' | 'fixed' | 'free_shipping' | 'bogo';
  amount?: number; // Percentage (1-100) or cents
  maxDiscount?: number; // Cap for percentage
  calculatedDiscount: number; // Actual discount in cents
  message: string;
  rules: AppliedRule[];
  freeItems?: BogoFreeItem[];
}

export interface AppliedRule {
  ruleId: string;
  type: RuleType;
  value?: number;
  appliedDiscount: number;
}

export interface BogoFreeItem {
  sku: string;
  quantity: number;
  value: number; // Value in cents
  discountPct: number;
}

export interface DiscountCodeWithRules {
  id: string;
  code: string;
  name: string;
  description: string | null;
  source: DiscountSource;
  isActive: boolean;
  createdAt: Date;
  startsAt: Date | null;
  expiresAt: Date | null;
  minOrderAmount: number | null;
  maxDiscountAmount: number | null;
  maxUsageTotal: number | null;
  maxUsagePerEmail: number;
  currentUsageCount: number;
  firstOrderOnly: boolean;
  stackable: boolean;
  priority: number;
  rules: {
    id: string;
    type: RuleType;
    value: number | null;
    maxDiscount: number | null;
    buyProductSku: string | null;
    buyQuantity: number | null;
    getProductSku: string | null;
    getQuantity: number | null;
    getDiscountPct: number | null;
    minOrderAmount: number | null;
    priority: number;
  }[];
  restrictions: {
    type: string;
    value: string;
    include: boolean;
  }[];
}

/**
 * Validate a discount code for a given email and cart
 */
export async function validateDiscount(
  code: string,
  email: string,
  cart: CartItem[],
  ipAddress?: string
): Promise<DiscountValidationResult> {
  const normalizedCode = code.trim().toUpperCase();
  const normalizedEmail = email.trim().toLowerCase();

  // Fetch the discount code with all relations
  const discountCode = await prisma.discountCode.findUnique({
    where: { code: normalizedCode },
    include: {
      rules: {
        orderBy: { priority: 'desc' },
      },
      restrictions: true,
    },
  });

  if (!discountCode) {
    return { valid: false, error: 'Invalid discount code' };
  }

  // Check if discount is active
  if (!discountCode.isActive) {
    return { valid: false, error: 'This discount code is no longer active' };
  }

  // Check start date
  if (discountCode.startsAt && new Date() < discountCode.startsAt) {
    return { valid: false, error: 'This discount code is not yet active' };
  }

  // Check expiration
  if (discountCode.expiresAt && new Date() > discountCode.expiresAt) {
    return { valid: false, error: 'This discount code has expired' };
  }

  // Calculate cart subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Check minimum order amount
  if (discountCode.minOrderAmount && subtotal < discountCode.minOrderAmount) {
    const minAmount = (discountCode.minOrderAmount / 100).toFixed(2);
    return { valid: false, error: `Minimum order of $${minAmount} required for this discount` };
  }

  // Check total usage limit
  if (discountCode.maxUsageTotal !== null && discountCode.currentUsageCount >= discountCode.maxUsageTotal) {
    return { valid: false, error: 'This discount code has reached its usage limit' };
  }

  // Check per-email usage limit
  const emailUsageCount = await prisma.discountUsage.count({
    where: {
      discountId: discountCode.id,
      email: normalizedEmail,
    },
  });

  if (emailUsageCount >= discountCode.maxUsagePerEmail) {
    return { valid: false, error: 'You have already used this discount code' };
  }

  // Check first-order-only restriction
  if (discountCode.firstOrderOnly) {
    const existingOrderCount = await prisma.order.count({
      where: { email: normalizedEmail },
    });

    if (existingOrderCount > 0) {
      return { valid: false, error: 'This discount code is only valid for first-time orders' };
    }
  }

  // Check product restrictions
  if (discountCode.restrictions.length > 0) {
    const productRestrictions = discountCode.restrictions.filter(r => r.type === 'PRODUCT_SKU');
    const emailRestrictions = discountCode.restrictions.filter(r => r.type === 'EMAIL_DOMAIN');

    // Check product SKU restrictions
    if (productRestrictions.length > 0) {
      const includeSkus = productRestrictions.filter(r => r.include).map(r => r.value);
      const excludeSkus = productRestrictions.filter(r => !r.include).map(r => r.value);

      if (includeSkus.length > 0) {
        const hasIncludedProduct = cart.some(item => includeSkus.includes(item.sku));
        if (!hasIncludedProduct) {
          return { valid: false, error: 'This discount code is not valid for the items in your cart' };
        }
      }

      if (excludeSkus.length > 0) {
        const hasExcludedProduct = cart.some(item => excludeSkus.includes(item.sku));
        if (hasExcludedProduct) {
          return { valid: false, error: 'This discount code cannot be used with certain items in your cart' };
        }
      }
    }

    // Check email domain restrictions
    if (emailRestrictions.length > 0) {
      const emailDomain = normalizedEmail.split('@')[1];
      const includeDomains = emailRestrictions.filter(r => r.include).map(r => r.value);
      const excludeDomains = emailRestrictions.filter(r => !r.include).map(r => r.value);

      if (includeDomains.length > 0 && !includeDomains.includes(emailDomain)) {
        return { valid: false, error: 'This discount code is not available for your email' };
      }

      if (excludeDomains.includes(emailDomain)) {
        return { valid: false, error: 'This discount code is not available for your email' };
      }
    }
  }

  // Calculate the discount
  const applicableDiscount = calculateDiscount(discountCode, cart, subtotal);

  if (!applicableDiscount) {
    return { valid: false, error: 'No applicable discount rules found' };
  }

  return {
    valid: true,
    discountId: discountCode.id,
    discount: applicableDiscount,
  };
}

/**
 * Calculate the discount amount based on rules
 */
function calculateDiscount(
  discountCode: DiscountCodeWithRules,
  cart: CartItem[],
  subtotal: number
): ApplicableDiscount | null {
  const rules = discountCode.rules;

  if (rules.length === 0) {
    return null;
  }

  // Separate rules by type
  const percentageRules = rules.filter(r => r.type === RuleType.PERCENTAGE);
  const fixedRules = rules.filter(r => r.type === RuleType.FIXED_AMOUNT);
  const freeShippingRules = rules.filter(r => r.type === RuleType.FREE_SHIPPING);
  const bogoRules = rules.filter(r => r.type === RuleType.BOGO);

  let calculatedDiscount = 0;
  let discountType: 'percentage' | 'fixed' | 'free_shipping' | 'bogo' = 'fixed';
  let discountAmount: number | undefined;
  let maxDiscount: number | undefined;
  let message = '';
  const appliedRules: AppliedRule[] = [];
  const freeItems: BogoFreeItem[] = [];

  // Process BOGO rules first (they have specific product requirements)
  for (const rule of bogoRules) {
    const bogoResult = calculateBogo(rule, cart);
    if (bogoResult.applies) {
      calculatedDiscount += bogoResult.discountAmount;
      discountType = 'bogo';
      appliedRules.push({
        ruleId: rule.id,
        type: RuleType.BOGO,
        appliedDiscount: bogoResult.discountAmount,
      });
      if (bogoResult.freeItem) {
        freeItems.push(bogoResult.freeItem);
      }
      message = bogoResult.message;
    }
  }

  // Process tiered percentage discounts (use the best qualifying tier)
  if (percentageRules.length > 0 && freeItems.length === 0) {
    const tieredResult = calculateTieredDiscount(percentageRules, subtotal);
    if (tieredResult.applies) {
      calculatedDiscount = tieredResult.discountAmount;
      discountType = 'percentage';
      discountAmount = tieredResult.percentage;
      maxDiscount = tieredResult.maxDiscount;
      appliedRules.push({
        ruleId: tieredResult.ruleId,
        type: RuleType.PERCENTAGE,
        value: tieredResult.percentage,
        appliedDiscount: tieredResult.discountAmount,
      });
      message = tieredResult.message;
    }
  }

  // Process fixed amount discounts
  if (fixedRules.length > 0 && appliedRules.length === 0) {
    // Find the best applicable fixed discount
    const applicableFixed = fixedRules
      .filter(r => !r.minOrderAmount || subtotal >= r.minOrderAmount)
      .sort((a, b) => (b.value || 0) - (a.value || 0))[0];

    if (applicableFixed && applicableFixed.value) {
      calculatedDiscount = Math.min(applicableFixed.value, subtotal);
      discountType = 'fixed';
      discountAmount = applicableFixed.value;
      appliedRules.push({
        ruleId: applicableFixed.id,
        type: RuleType.FIXED_AMOUNT,
        value: applicableFixed.value,
        appliedDiscount: calculatedDiscount,
      });
      message = `$${(applicableFixed.value / 100).toFixed(2)} off your order!`;
    }
  }

  // Process free shipping rules
  if (freeShippingRules.length > 0) {
    const applicableFreeShipping = freeShippingRules.find(
      r => !r.minOrderAmount || subtotal >= r.minOrderAmount
    );

    if (applicableFreeShipping) {
      if (appliedRules.length === 0) {
        discountType = 'free_shipping';
        message = 'Free shipping applied!';
      }
      appliedRules.push({
        ruleId: applicableFreeShipping.id,
        type: RuleType.FREE_SHIPPING,
        appliedDiscount: 0, // Shipping discount calculated separately
      });
    }
  }

  // Apply global max discount cap if set
  if (discountCode.maxDiscountAmount && calculatedDiscount > discountCode.maxDiscountAmount) {
    calculatedDiscount = discountCode.maxDiscountAmount;
  }

  if (appliedRules.length === 0) {
    return null;
  }

  return {
    code: discountCode.code,
    name: discountCode.name,
    type: discountType,
    amount: discountAmount,
    maxDiscount,
    calculatedDiscount,
    message: message || discountCode.description || 'Discount applied!',
    rules: appliedRules,
    freeItems: freeItems.length > 0 ? freeItems : undefined,
  };
}

/**
 * Calculate tiered percentage discount
 * Returns the best applicable tier
 */
function calculateTieredDiscount(
  rules: DiscountCodeWithRules['rules'],
  subtotal: number
): {
  applies: boolean;
  ruleId: string;
  percentage: number;
  discountAmount: number;
  maxDiscount?: number;
  message: string;
} {
  // Sort rules by minOrderAmount descending to find the highest qualifying tier
  const sortedRules = [...rules]
    .filter(r => r.value !== null)
    .sort((a, b) => (b.minOrderAmount || 0) - (a.minOrderAmount || 0));

  for (const rule of sortedRules) {
    if (!rule.minOrderAmount || subtotal >= rule.minOrderAmount) {
      const percentage = rule.value!;
      let discountAmount = Math.round(subtotal * (percentage / 100));

      // Apply max discount cap if set
      if (rule.maxDiscount && discountAmount > rule.maxDiscount) {
        discountAmount = rule.maxDiscount;
      }

      return {
        applies: true,
        ruleId: rule.id,
        percentage,
        discountAmount,
        maxDiscount: rule.maxDiscount || undefined,
        message: `${percentage}% off your order!`,
      };
    }
  }

  return {
    applies: false,
    ruleId: '',
    percentage: 0,
    discountAmount: 0,
    message: '',
  };
}

/**
 * Calculate BOGO discount
 */
function calculateBogo(
  rule: DiscountCodeWithRules['rules'][0],
  cart: CartItem[]
): {
  applies: boolean;
  discountAmount: number;
  freeItem?: BogoFreeItem;
  message: string;
} {
  if (!rule.buyProductSku || !rule.buyQuantity || !rule.getProductSku || !rule.getQuantity) {
    return { applies: false, discountAmount: 0, message: '' };
  }

  // Find the buy item in cart
  const buyItem = cart.find(item => item.sku === rule.buyProductSku);

  if (!buyItem || buyItem.quantity < rule.buyQuantity) {
    return { applies: false, discountAmount: 0, message: '' };
  }

  // Calculate how many free items customer qualifies for
  const qualifyingMultiplier = Math.floor(buyItem.quantity / rule.buyQuantity);
  const freeQuantity = qualifyingMultiplier * rule.getQuantity;

  // Find the get item price (from cart or we need to look it up)
  let getItemPrice = 0;
  const getItem = cart.find(item => item.sku === rule.getProductSku);
  if (getItem) {
    getItemPrice = getItem.price;
  } else {
    // If the free item isn't in cart, we'd need to look up its price
    // For now, we'll need the price to be passed or looked up
    getItemPrice = 2000; // Default to $20 for tortilla products
  }

  // Calculate discount based on getDiscountPct (100 = free)
  const discountPct = rule.getDiscountPct || 100;
  const totalFreeValue = getItemPrice * freeQuantity;
  const discountAmount = Math.round(totalFreeValue * (discountPct / 100));

  return {
    applies: true,
    discountAmount,
    freeItem: {
      sku: rule.getProductSku,
      quantity: freeQuantity,
      value: totalFreeValue,
      discountPct,
    },
    message: discountPct === 100
      ? `Buy ${rule.buyQuantity}, get ${rule.getQuantity} free!`
      : `Buy ${rule.buyQuantity}, get ${rule.getQuantity} at ${discountPct}% off!`,
  };
}

/**
 * Record discount usage after successful order
 */
export async function recordDiscountUsage(
  discountId: string,
  email: string,
  orderId: string | null,
  orderNumber: string | null,
  subtotal: number,
  discountApplied: number,
  rulesApplied: AppliedRule[],
  ipAddress?: string
): Promise<void> {
  await prisma.$transaction([
    // Create usage record
    prisma.discountUsage.create({
      data: {
        discountId,
        email: email.toLowerCase(),
        orderId,
        orderNumber,
        subtotal,
        discountApplied,
        rulesApplied: rulesApplied as unknown as Prisma.InputJsonValue,
        ipAddress,
      },
    }),
    // Increment usage count
    prisma.discountCode.update({
      where: { id: discountId },
      data: {
        currentUsageCount: { increment: 1 },
      },
    }),
  ]);
}

/**
 * Check if a discount code includes free shipping
 */
export function includesFreeShipping(discount: ApplicableDiscount): boolean {
  return discount.rules.some(r => r.type === RuleType.FREE_SHIPPING) || discount.type === 'free_shipping';
}

/**
 * Get discount summary for display
 */
export function getDiscountSummary(discount: ApplicableDiscount): string {
  const hasFreeShipping = includesFreeShipping(discount);
  const hasMonetaryDiscount = discount.calculatedDiscount > 0;

  const parts: string[] = [];

  if (hasMonetaryDiscount) {
    if (discount.type === 'percentage') {
      parts.push(`${discount.amount}% off`);
      if (discount.maxDiscount) {
        parts.push(`(max $${(discount.maxDiscount / 100).toFixed(2)})`);
      }
    } else if (discount.type === 'fixed') {
      parts.push(`$${(discount.calculatedDiscount / 100).toFixed(2)} off`);
    } else if (discount.type === 'bogo' && discount.freeItems) {
      const freeItem = discount.freeItems[0];
      if (freeItem.discountPct === 100) {
        parts.push(`${freeItem.quantity} free item(s)`);
      } else {
        parts.push(`${freeItem.quantity} item(s) at ${freeItem.discountPct}% off`);
      }
    }
  }

  if (hasFreeShipping) {
    parts.push('+ free shipping');
  }

  return parts.join(' ');
}

/**
 * Create a new admin discount code
 */
export async function createDiscountCode(data: {
  code: string;
  name: string;
  description?: string;
  source?: DiscountSource;
  isActive?: boolean;
  startsAt?: Date | null;
  expiresAt?: Date | null;
  minOrderAmount?: number | null;
  maxDiscountAmount?: number | null;
  maxUsageTotal?: number | null;
  maxUsagePerEmail?: number;
  firstOrderOnly?: boolean;
  stackable?: boolean;
  priority?: number;
  createdBy?: string;
  rules?: {
    type: RuleType;
    value?: number | null;
    maxDiscount?: number | null;
    buyProductSku?: string | null;
    buyQuantity?: number | null;
    getProductSku?: string | null;
    getQuantity?: number | null;
    getDiscountPct?: number | null;
    minOrderAmount?: number | null;
    priority?: number;
  }[];
  restrictions?: {
    type: 'PRODUCT_SKU' | 'EMAIL_DOMAIN';
    value: string;
    include?: boolean;
  }[];
}): Promise<DiscountCodeWithRules> {
  const discountCode = await prisma.discountCode.create({
    data: {
      code: data.code.toUpperCase(),
      name: data.name,
      description: data.description,
      source: data.source || 'ADMIN',
      isActive: data.isActive ?? true,
      startsAt: data.startsAt,
      expiresAt: data.expiresAt,
      minOrderAmount: data.minOrderAmount,
      maxDiscountAmount: data.maxDiscountAmount,
      maxUsageTotal: data.maxUsageTotal,
      maxUsagePerEmail: data.maxUsagePerEmail ?? 1,
      firstOrderOnly: data.firstOrderOnly ?? false,
      stackable: data.stackable ?? false,
      priority: data.priority ?? 0,
      createdBy: data.createdBy,
      rules: data.rules
        ? {
            create: data.rules.map((rule, index) => ({
              type: rule.type,
              value: rule.value,
              maxDiscount: rule.maxDiscount,
              buyProductSku: rule.buyProductSku,
              buyQuantity: rule.buyQuantity,
              getProductSku: rule.getProductSku,
              getQuantity: rule.getQuantity,
              getDiscountPct: rule.getDiscountPct,
              minOrderAmount: rule.minOrderAmount,
              priority: rule.priority ?? index,
            })),
          }
        : undefined,
      restrictions: data.restrictions
        ? {
            create: data.restrictions.map(restriction => ({
              type: restriction.type,
              value: restriction.value,
              include: restriction.include ?? true,
            })),
          }
        : undefined,
    },
    include: {
      rules: {
        orderBy: { priority: 'desc' },
      },
      restrictions: true,
    },
  });

  return discountCode as DiscountCodeWithRules;
}

/**
 * Update an existing discount code
 */
export async function updateDiscountCode(
  id: string,
  data: {
    code?: string;
    name?: string;
    description?: string | null;
    isActive?: boolean;
    startsAt?: Date | null;
    expiresAt?: Date | null;
    minOrderAmount?: number | null;
    maxDiscountAmount?: number | null;
    maxUsageTotal?: number | null;
    maxUsagePerEmail?: number;
    firstOrderOnly?: boolean;
    stackable?: boolean;
    priority?: number;
    rules?: {
      type: RuleType;
      value?: number | null;
      maxDiscount?: number | null;
      buyProductSku?: string | null;
      buyQuantity?: number | null;
      getProductSku?: string | null;
      getQuantity?: number | null;
      getDiscountPct?: number | null;
      minOrderAmount?: number | null;
      priority?: number;
    }[];
    restrictions?: {
      type: 'PRODUCT_SKU' | 'EMAIL_DOMAIN';
      value: string;
      include?: boolean;
    }[];
  }
): Promise<DiscountCodeWithRules> {
  // If rules or restrictions are being updated, delete existing and recreate
  const operations: Prisma.PrismaPromise<unknown>[] = [];

  if (data.rules) {
    operations.push(
      prisma.discountRule.deleteMany({ where: { discountId: id } })
    );
  }

  if (data.restrictions) {
    operations.push(
      prisma.discountRestriction.deleteMany({ where: { discountId: id } })
    );
  }

  // Execute deletions
  if (operations.length > 0) {
    await prisma.$transaction(operations);
  }

  // Update the discount code
  const discountCode = await prisma.discountCode.update({
    where: { id },
    data: {
      ...(data.code && { code: data.code.toUpperCase() }),
      ...(data.name && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      ...(data.startsAt !== undefined && { startsAt: data.startsAt }),
      ...(data.expiresAt !== undefined && { expiresAt: data.expiresAt }),
      ...(data.minOrderAmount !== undefined && { minOrderAmount: data.minOrderAmount }),
      ...(data.maxDiscountAmount !== undefined && { maxDiscountAmount: data.maxDiscountAmount }),
      ...(data.maxUsageTotal !== undefined && { maxUsageTotal: data.maxUsageTotal }),
      ...(data.maxUsagePerEmail !== undefined && { maxUsagePerEmail: data.maxUsagePerEmail }),
      ...(data.firstOrderOnly !== undefined && { firstOrderOnly: data.firstOrderOnly }),
      ...(data.stackable !== undefined && { stackable: data.stackable }),
      ...(data.priority !== undefined && { priority: data.priority }),
      rules: data.rules
        ? {
            create: data.rules.map((rule, index) => ({
              type: rule.type,
              value: rule.value,
              maxDiscount: rule.maxDiscount,
              buyProductSku: rule.buyProductSku,
              buyQuantity: rule.buyQuantity,
              getProductSku: rule.getProductSku,
              getQuantity: rule.getQuantity,
              getDiscountPct: rule.getDiscountPct,
              minOrderAmount: rule.minOrderAmount,
              priority: rule.priority ?? index,
            })),
          }
        : undefined,
      restrictions: data.restrictions
        ? {
            create: data.restrictions.map(restriction => ({
              type: restriction.type,
              value: restriction.value,
              include: restriction.include ?? true,
            })),
          }
        : undefined,
    },
    include: {
      rules: {
        orderBy: { priority: 'desc' },
      },
      restrictions: true,
    },
  });

  return discountCode as DiscountCodeWithRules;
}

/**
 * Delete a discount code
 */
export async function deleteDiscountCode(id: string): Promise<void> {
  await prisma.discountCode.delete({
    where: { id },
  });
}

/**
 * Get a discount code by ID
 */
export async function getDiscountCodeById(id: string): Promise<DiscountCodeWithRules | null> {
  const discountCode = await prisma.discountCode.findUnique({
    where: { id },
    include: {
      rules: {
        orderBy: { priority: 'desc' },
      },
      restrictions: true,
    },
  });

  return discountCode as DiscountCodeWithRules | null;
}

/**
 * List discount codes with filtering
 */
export async function listDiscountCodes(options?: {
  source?: DiscountSource;
  isActive?: boolean;
  includeExpired?: boolean;
  limit?: number;
  offset?: number;
}): Promise<{
  codes: DiscountCodeWithRules[];
  total: number;
}> {
  const where: Prisma.DiscountCodeWhereInput = {};

  if (options?.source) {
    where.source = options.source;
  }

  if (options?.isActive !== undefined) {
    where.isActive = options.isActive;
  }

  if (!options?.includeExpired) {
    where.OR = [
      { expiresAt: null },
      { expiresAt: { gt: new Date() } },
    ];
  }

  const [codes, total] = await Promise.all([
    prisma.discountCode.findMany({
      where,
      include: {
        rules: {
          orderBy: { priority: 'desc' },
        },
        restrictions: true,
        _count: {
          select: { usages: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: options?.limit || 50,
      skip: options?.offset || 0,
    }),
    prisma.discountCode.count({ where }),
  ]);

  return {
    codes: codes as unknown as DiscountCodeWithRules[],
    total,
  };
}

/**
 * Get usage statistics for a discount code
 */
export async function getDiscountUsageStats(discountId: string): Promise<{
  totalUses: number;
  uniqueEmails: number;
  totalDiscountGiven: number;
  recentUsages: {
    email: string;
    orderNumber: string | null;
    discountApplied: number;
    usedAt: Date;
  }[];
}> {
  const [usages, aggregations] = await Promise.all([
    prisma.discountUsage.findMany({
      where: { discountId },
      orderBy: { usedAt: 'desc' },
      take: 10,
      select: {
        email: true,
        orderNumber: true,
        discountApplied: true,
        usedAt: true,
      },
    }),
    prisma.discountUsage.aggregate({
      where: { discountId },
      _count: { id: true },
      _sum: { discountApplied: true },
    }),
  ]);

  const uniqueEmails = await prisma.discountUsage.groupBy({
    by: ['email'],
    where: { discountId },
  });

  return {
    totalUses: aggregations._count.id,
    uniqueEmails: uniqueEmails.length,
    totalDiscountGiven: aggregations._sum.discountApplied || 0,
    recentUsages: usages,
  };
}
