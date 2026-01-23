'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  X,
  Plus,
  Trash2,
  Percent,
  DollarSign,
  Truck,
  Gift,
  Calendar,
  Hash,
  Mail,
  Package,
  AlertCircle,
} from 'lucide-react';
import { products } from '@/lib/products';

// Types for discount form
interface DiscountRule {
  id?: string;
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING' | 'BOGO';
  value?: number | null;
  maxDiscount?: number | null;
  buyProductSku?: string | null;
  buyQuantity?: number | null;
  getProductSku?: string | null;
  getQuantity?: number | null;
  getDiscountPct?: number | null;
  minOrderAmount?: number | null;
  priority?: number;
}

interface DiscountRestriction {
  id?: string;
  type: 'PRODUCT_SKU' | 'EMAIL_DOMAIN';
  value: string;
  include: boolean;
}

export interface DiscountFormData {
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  startsAt?: string | null;
  expiresAt?: string | null;
  minOrderAmount?: number | null;
  maxDiscountAmount?: number | null;
  maxUsageTotal?: number | null;
  maxUsagePerEmail: number;
  firstOrderOnly: boolean;
  stackable: boolean;
  priority: number;
  rules: DiscountRule[];
  restrictions: DiscountRestriction[];
}

interface DiscountFormProps {
  initialData?: DiscountFormData;
  isEditing?: boolean;
  onSubmit: (data: DiscountFormData) => Promise<void>;
  onCancel: () => void;
}

const defaultFormData: DiscountFormData = {
  code: '',
  name: '',
  description: '',
  isActive: true,
  startsAt: null,
  expiresAt: null,
  minOrderAmount: null,
  maxDiscountAmount: null,
  maxUsageTotal: null,
  maxUsagePerEmail: 1,
  firstOrderOnly: false,
  stackable: false,
  priority: 0,
  rules: [],
  restrictions: [],
};

export default function DiscountForm({
  initialData,
  isEditing = false,
  onSubmit,
  onCancel,
}: DiscountFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<DiscountFormData>(initialData || defaultFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'rules' | 'restrictions' | 'limits'>('basic');

  // Format date for input
  const formatDateForInput = (dateStr?: string | null): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 16);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate
    if (!formData.code.trim()) {
      setError('Discount code is required');
      return;
    }

    if (!formData.name.trim()) {
      setError('Discount name is required');
      return;
    }

    if (formData.rules.length === 0) {
      setError('At least one discount rule is required');
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save discount');
    } finally {
      setLoading(false);
    }
  };

  // Add a new rule
  const addRule = (type: DiscountRule['type']) => {
    const newRule: DiscountRule = {
      type,
      priority: formData.rules.length,
    };

    if (type === 'PERCENTAGE') {
      newRule.value = 10;
    } else if (type === 'FIXED_AMOUNT') {
      newRule.value = 500; // $5 in cents
    } else if (type === 'BOGO') {
      newRule.buyProductSku = products[0]?.sku || '';
      newRule.buyQuantity = 1;
      newRule.getProductSku = products[0]?.sku || '';
      newRule.getQuantity = 1;
      newRule.getDiscountPct = 100;
    }

    setFormData({
      ...formData,
      rules: [...formData.rules, newRule],
    });
  };

  // Remove a rule
  const removeRule = (index: number) => {
    setFormData({
      ...formData,
      rules: formData.rules.filter((_, i) => i !== index),
    });
  };

  // Update a rule
  const updateRule = (index: number, updates: Partial<DiscountRule>) => {
    setFormData({
      ...formData,
      rules: formData.rules.map((rule, i) =>
        i === index ? { ...rule, ...updates } : rule
      ),
    });
  };

  // Add a restriction
  const addRestriction = (type: DiscountRestriction['type']) => {
    setFormData({
      ...formData,
      restrictions: [
        ...formData.restrictions,
        { type, value: '', include: true },
      ],
    });
  };

  // Remove a restriction
  const removeRestriction = (index: number) => {
    setFormData({
      ...formData,
      restrictions: formData.restrictions.filter((_, i) => i !== index),
    });
  };

  // Update a restriction
  const updateRestriction = (index: number, updates: Partial<DiscountRestriction>) => {
    setFormData({
      ...formData,
      restrictions: formData.restrictions.map((restriction, i) =>
        i === index ? { ...restriction, ...updates } : restriction
      ),
    });
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'rules', label: 'Discount Rules' },
    { id: 'restrictions', label: 'Restrictions' },
    { id: 'limits', label: 'Usage Limits' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-charcoal-200">
        <nav className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab.id
                  ? 'border-sunset-500 text-sunset-600'
                  : 'border-transparent text-charcoal-500 hover:text-charcoal-700 hover:border-charcoal-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Basic Info Tab */}
      {activeTab === 'basic' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">
                Discount Code *
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500 uppercase"
                placeholder="SUMMER2025"
                required
              />
              <p className="mt-1 text-xs text-charcoal-500">
                The code customers will enter at checkout
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">
                Display Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500"
                placeholder="Summer Sale 2025"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500"
              placeholder="Optional description shown to customers"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Start Date
              </label>
              <input
                type="datetime-local"
                value={formatDateForInput(formData.startsAt)}
                onChange={(e) => setFormData({ ...formData, startsAt: e.target.value || null })}
                className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500"
              />
              <p className="mt-1 text-xs text-charcoal-500">Leave blank to start immediately</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Expiration Date
              </label>
              <input
                type="datetime-local"
                value={formatDateForInput(formData.expiresAt)}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value || null })}
                className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500"
              />
              <p className="mt-1 text-xs text-charcoal-500">Leave blank for no expiration</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-charcoal-300 text-sunset-500 focus:ring-sunset-500"
              />
              <span className="text-sm text-charcoal-700">Active</span>
            </label>
          </div>
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => addRule('PERCENTAGE')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              <Percent className="w-4 h-4" />
              Add Percentage
            </button>
            <button
              type="button"
              onClick={() => addRule('FIXED_AMOUNT')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              <DollarSign className="w-4 h-4" />
              Add Fixed Amount
            </button>
            <button
              type="button"
              onClick={() => addRule('FREE_SHIPPING')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
            >
              <Truck className="w-4 h-4" />
              Add Free Shipping
            </button>
            <button
              type="button"
              onClick={() => addRule('BOGO')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200"
            >
              <Gift className="w-4 h-4" />
              Add BOGO
            </button>
          </div>

          {formData.rules.length === 0 ? (
            <div className="text-center py-8 bg-charcoal-50 rounded-lg">
              <p className="text-charcoal-500">
                No discount rules yet. Add one using the buttons above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.rules.map((rule, index) => (
                <div
                  key={index}
                  className="bg-charcoal-50 rounded-lg p-4 border border-charcoal-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {rule.type === 'PERCENTAGE' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                          <Percent className="w-3 h-3" /> Percentage
                        </span>
                      )}
                      {rule.type === 'FIXED_AMOUNT' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                          <DollarSign className="w-3 h-3" /> Fixed Amount
                        </span>
                      )}
                      {rule.type === 'FREE_SHIPPING' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                          <Truck className="w-3 h-3" /> Free Shipping
                        </span>
                      )}
                      {rule.type === 'BOGO' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded">
                          <Gift className="w-3 h-3" /> BOGO
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeRule(index)}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Percentage Rule */}
                  {rule.type === 'PERCENTAGE' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-charcoal-600 mb-1">
                          Discount %
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={rule.value || ''}
                          onChange={(e) =>
                            updateRule(index, { value: parseInt(e.target.value) || null })
                          }
                          className="w-full px-2 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                          placeholder="10"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-charcoal-600 mb-1">
                          Max Discount ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={rule.maxDiscount ? rule.maxDiscount / 100 : ''}
                          onChange={(e) =>
                            updateRule(index, {
                              maxDiscount: e.target.value ? Math.round(parseFloat(e.target.value) * 100) : null,
                            })
                          }
                          className="w-full px-2 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                          placeholder="Optional cap"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-charcoal-600 mb-1">
                          Min Order ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={rule.minOrderAmount ? rule.minOrderAmount / 100 : ''}
                          onChange={(e) =>
                            updateRule(index, {
                              minOrderAmount: e.target.value
                                ? Math.round(parseFloat(e.target.value) * 100)
                                : null,
                            })
                          }
                          className="w-full px-2 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                          placeholder="For tiered discounts"
                        />
                      </div>
                    </div>
                  )}

                  {/* Fixed Amount Rule */}
                  {rule.type === 'FIXED_AMOUNT' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-charcoal-600 mb-1">
                          Discount Amount ($)
                        </label>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={rule.value ? rule.value / 100 : ''}
                          onChange={(e) =>
                            updateRule(index, {
                              value: e.target.value ? Math.round(parseFloat(e.target.value) * 100) : null,
                            })
                          }
                          className="w-full px-2 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                          placeholder="5.00"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-charcoal-600 mb-1">
                          Min Order ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={rule.minOrderAmount ? rule.minOrderAmount / 100 : ''}
                          onChange={(e) =>
                            updateRule(index, {
                              minOrderAmount: e.target.value
                                ? Math.round(parseFloat(e.target.value) * 100)
                                : null,
                            })
                          }
                          className="w-full px-2 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                          placeholder="Optional minimum"
                        />
                      </div>
                    </div>
                  )}

                  {/* Free Shipping Rule */}
                  {rule.type === 'FREE_SHIPPING' && (
                    <div>
                      <div>
                        <label className="block text-xs font-medium text-charcoal-600 mb-1">
                          Min Order ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={rule.minOrderAmount ? rule.minOrderAmount / 100 : ''}
                          onChange={(e) =>
                            updateRule(index, {
                              minOrderAmount: e.target.value
                                ? Math.round(parseFloat(e.target.value) * 100)
                                : null,
                            })
                          }
                          className="w-full max-w-xs px-2 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                          placeholder="Optional minimum"
                        />
                      </div>
                    </div>
                  )}

                  {/* BOGO Rule */}
                  {rule.type === 'BOGO' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-charcoal-600 mb-1">
                            Buy Product
                          </label>
                          <select
                            value={rule.buyProductSku || ''}
                            onChange={(e) => updateRule(index, { buyProductSku: e.target.value })}
                            className="w-full px-2 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                          >
                            <option value="">Select product...</option>
                            {products.map((product) => (
                              <option key={product.sku} value={product.sku}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-charcoal-600 mb-1">
                            Buy Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={rule.buyQuantity || ''}
                            onChange={(e) =>
                              updateRule(index, { buyQuantity: parseInt(e.target.value) || null })
                            }
                            className="w-full px-2 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                            placeholder="4"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-charcoal-600 mb-1">
                            Get Product
                          </label>
                          <select
                            value={rule.getProductSku || ''}
                            onChange={(e) => updateRule(index, { getProductSku: e.target.value })}
                            className="w-full px-2 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                          >
                            <option value="">Select product...</option>
                            {products.map((product) => (
                              <option key={product.sku} value={product.sku}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-charcoal-600 mb-1">
                            Get Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={rule.getQuantity || ''}
                            onChange={(e) =>
                              updateRule(index, { getQuantity: parseInt(e.target.value) || null })
                            }
                            className="w-full px-2 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                            placeholder="1"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-charcoal-600 mb-1">
                            Discount %
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={rule.getDiscountPct || ''}
                            onChange={(e) =>
                              updateRule(index, { getDiscountPct: parseInt(e.target.value) || null })
                            }
                            className="w-full px-2 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                            placeholder="100 = free"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <p className="text-xs text-charcoal-500">
                Tip: Add multiple percentage rules with different min orders for tiered discounts.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Restrictions Tab */}
      {activeTab === 'restrictions' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => addRestriction('PRODUCT_SKU')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-charcoal-100 text-charcoal-700 rounded-lg hover:bg-charcoal-200"
            >
              <Package className="w-4 h-4" />
              Product Restriction
            </button>
            <button
              type="button"
              onClick={() => addRestriction('EMAIL_DOMAIN')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-charcoal-100 text-charcoal-700 rounded-lg hover:bg-charcoal-200"
            >
              <Mail className="w-4 h-4" />
              Email Domain Restriction
            </button>
          </div>

          {formData.restrictions.length === 0 ? (
            <div className="text-center py-8 bg-charcoal-50 rounded-lg">
              <p className="text-charcoal-500">No restrictions. This discount applies to all products and customers.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.restrictions.map((restriction, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-charcoal-50 rounded-lg p-3 border border-charcoal-200"
                >
                  <span className="text-xs font-medium text-charcoal-500 w-24">
                    {restriction.type === 'PRODUCT_SKU' ? 'Product SKU' : 'Email Domain'}
                  </span>
                  <select
                    value={restriction.include ? 'include' : 'exclude'}
                    onChange={(e) =>
                      updateRestriction(index, { include: e.target.value === 'include' })
                    }
                    className="px-2 py-1 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                  >
                    <option value="include">Only</option>
                    <option value="exclude">Except</option>
                  </select>
                  {restriction.type === 'PRODUCT_SKU' ? (
                    <select
                      value={restriction.value}
                      onChange={(e) => updateRestriction(index, { value: e.target.value })}
                      className="flex-1 px-2 py-1 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                    >
                      <option value="">Select product...</option>
                      {products.map((product) => (
                        <option key={product.sku} value={product.sku}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={restriction.value}
                      onChange={(e) => updateRestriction(index, { value: e.target.value })}
                      placeholder="gmail.com"
                      className="flex-1 px-2 py-1 text-sm border border-charcoal-300 rounded focus:ring-1 focus:ring-sunset-500"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeRestriction(index)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Limits Tab */}
      {activeTab === 'limits' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">
                <Hash className="w-4 h-4 inline mr-1" />
                Total Usage Limit
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxUsageTotal || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxUsageTotal: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500"
                placeholder="Unlimited"
              />
              <p className="mt-1 text-xs text-charcoal-500">
                Leave blank for unlimited total uses
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">
                <Mail className="w-4 h-4 inline mr-1" />
                Uses Per Email
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxUsagePerEmail}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxUsagePerEmail: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500"
              />
              <p className="mt-1 text-xs text-charcoal-500">
                How many times each customer can use this code
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">
                Minimum Order Amount ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.minOrderAmount ? formData.minOrderAmount / 100 : ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minOrderAmount: e.target.value
                      ? Math.round(parseFloat(e.target.value) * 100)
                      : null,
                  })
                }
                className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500"
                placeholder="No minimum"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-1">
                Maximum Discount Cap ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.maxDiscountAmount ? formData.maxDiscountAmount / 100 : ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxDiscountAmount: e.target.value
                      ? Math.round(parseFloat(e.target.value) * 100)
                      : null,
                  })
                }
                className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500"
                placeholder="No cap"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.firstOrderOnly}
                onChange={(e) => setFormData({ ...formData, firstOrderOnly: e.target.checked })}
                className="w-4 h-4 rounded border-charcoal-300 text-sunset-500 focus:ring-sunset-500"
              />
              <span className="text-sm text-charcoal-700">First order only</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.stackable}
                onChange={(e) => setFormData({ ...formData, stackable: e.target.checked })}
                className="w-4 h-4 rounded border-charcoal-300 text-sunset-500 focus:ring-sunset-500"
              />
              <span className="text-sm text-charcoal-700">
                Stackable (can be combined with other discounts)
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-charcoal-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-charcoal-700 bg-white border border-charcoal-300 rounded-lg hover:bg-charcoal-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sunset-500 rounded-lg hover:bg-sunset-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : isEditing ? 'Update Discount' : 'Create Discount'}
        </button>
      </div>
    </form>
  );
}
