'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Minus, Plus, Truck, Calendar, Shield, ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AddressForm from '@/components/account/AddressForm';
import { products } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import type { AddressFields } from '@/lib/address-validation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Filter to subscribable products (non-bundle, non-wholesale)
const subscribableProducts = products.filter(
  p => !p.bundleOnly && p.productType !== 'wholesale'
);

const frequencies = [
  { id: 'biweekly', label: 'Every 2 Weeks', description: 'For tortilla-lovers who go through packs fast' },
  { id: 'monthly', label: 'Monthly', description: 'The most popular choice' },
  { id: 'quarterly', label: 'Every 3 Months', description: 'Stock up and save on shipping' },
];

const shippingDayLabels: Record<string, string> = {
  '1st_tuesday': '1st Tuesday',
  '2nd_tuesday': '2nd Tuesday',
  '3rd_tuesday': '3rd Tuesday',
  '4th_tuesday': '4th Tuesday',
};

type Step = 'products' | 'frequency' | 'address' | 'account' | 'payment';

const RESTORABLE_STEPS: Step[] = ['products', 'frequency', 'address', 'account'];

interface SelectedItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500 focus-visible:ring-offset-2';

export default function SubscribePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('products');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [frequency, setFrequency] = useState('monthly');
  const [shippingDay, setShippingDay] = useState('');
  const [address, setAddress] = useState<AddressFields | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  // Restore state from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('subscribe_state');
      if (saved) {
        const state = JSON.parse(saved);
        if (state.selectedItems?.length) setSelectedItems(state.selectedItems);
        if (state.frequency) setFrequency(state.frequency);
        if (state.shippingDay) setShippingDay(state.shippingDay);
        if (state.address) setAddress(state.address);
        if (state.step && RESTORABLE_STEPS.includes(state.step)) setStep(state.step);
      }
    } catch {}
    // Check if already logged in
    fetch('/api/customer/me').then(res => {
      if (res.ok) setIsLoggedIn(true);
    });
  }, []);

  // Persist selections to sessionStorage
  useEffect(() => {
    if (selectedItems.length > 0) {
      sessionStorage.setItem('subscribe_state', JSON.stringify({
        selectedItems, frequency, shippingDay, address, step,
      }));
    }
  }, [selectedItems, frequency, shippingDay, address, step]);

  const addItem = (product: typeof subscribableProducts[0]) => {
    const existing = selectedItems.find(i => i.sku === product.sku);
    if (existing) {
      setSelectedItems(selectedItems.map(i =>
        i.sku === product.sku ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setSelectedItems([...selectedItems, {
        sku: product.sku,
        name: product.name,
        quantity: 1,
        unitPrice: product.price,
        image: product.image,
      }]);
    }
  };

  const updateQuantity = (sku: string, delta: number) => {
    setSelectedItems(selectedItems
      .map(i => i.sku === sku ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
      .filter(i => i.quantity > 0)
    );
  };

  const subtotal = selectedItems.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const tax = Math.round(subtotal * 0.0825);
  const total = subtotal + tax;
  const frequencyLabel = frequencies.find(f => f.id === frequency)?.label ?? 'Monthly';

  // Step indicator: account step only shows for guests
  const stepFlow: Array<{ id: Step; label: string }> = [
    { id: 'products', label: 'Choose Items' },
    { id: 'frequency', label: 'Schedule' },
    { id: 'address', label: 'Shipping' },
    ...(isLoggedIn ? [] : [{ id: 'account' as Step, label: 'Account' }]),
    { id: 'payment', label: 'Payment' },
  ];
  const currentStepIndex = Math.max(0, stepFlow.findIndex(s => s.id === step));

  const handleAddressSubmit = async (fields: AddressFields) => {
    setAddress(fields);
    setError('');
    if (isLoggedIn) {
      await createSubscription(fields);
    } else {
      setStep('account');
    }
  };

  const handleAccountStep = async () => {
    if (!address) {
      setError('Please add your shipping address first.');
      setStep('address');
      return;
    }

    if (isLoggedIn) {
      await createSubscription(address);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Try to register
      const res = await fetch('/api/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await res.json();

      if (res.status === 409) {
        // Account exists, try login
        const loginRes = await fetch('/api/customer/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!loginRes.ok) {
          const loginData = await loginRes.json();
          setError(loginData.error || 'Account exists but login failed. Check your password.');
          return;
        }
      } else if (!res.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      setIsLoggedIn(true);
      await createSubscription(address);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (shippingAddress: AddressFields) => {
    setLoading(true);
    setError('');

    try {
      // Save the shipping address first — fulfillment ships to this address.
      // Blocks the subscription if the address is missing or invalid.
      const addressRes = await fetch('/api/customer/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shippingAddress),
      });

      if (!addressRes.ok) {
        const addressData = await addressRes.json().catch(() => ({}));
        setError(addressData.error || 'We could not save your shipping address. Please check it and try again.');
        setStep('address');
        return;
      }

      const res = await fetch('/api/customer/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: selectedItems.map(i => ({ sku: i.sku, quantity: i.quantity })),
          interval: frequency,
          intervalCount: 1,
          preferredShippingDay: shippingDay || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create subscription');
        return;
      }

      if (data.subscription?.clientSecret) {
        setClientSecret(data.subscription.clientSecret);
        setStep('payment');
      }
    } catch {
      setError('Failed to create subscription');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    try {
      sessionStorage.removeItem('subscribe_state');
    } catch {}
    router.push('/account?subscribed=true');
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero */}
      <div className="bg-charcoal-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Never Run Out of Tortillas
          </h1>
          <p className="text-xl text-charcoal-300 max-w-2xl mx-auto">
            Subscribe and get premium tortillas delivered on your schedule. Free shipping, cancel anytime.
          </p>
          <div className="flex items-center justify-center gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-sunset-500" aria-hidden="true" />
              Free Shipping
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sunset-500" aria-hidden="true" />
              Flexible Schedule
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-sunset-500" aria-hidden="true" />
              Cancel Anytime
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <nav aria-label="Subscription progress" className="max-w-4xl mx-auto px-4 py-6">
        <ol className="flex items-center justify-center gap-2 text-sm">
          {stepFlow.map((s, i) => {
            const isDone = i < currentStepIndex;
            const isCurrent = step === s.id;
            return (
              <li key={s.id} className="flex items-center gap-2" aria-current={isCurrent ? 'step' : undefined}>
                <span
                  aria-hidden="true"
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCurrent ? 'bg-sunset-600 text-white' :
                    isDone ? 'bg-green-500 text-white' :
                    'bg-charcoal-200 text-charcoal-500'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : i + 1}
                </span>
                <span className={`sr-only sm:not-sr-only ${isCurrent ? 'text-charcoal-950 font-medium' : 'text-charcoal-500'}`}>
                  {s.label}
                </span>
                {i < stepFlow.length - 1 && <span aria-hidden="true" className="w-6 h-px bg-charcoal-300" />}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {error && (
          <div role="alert" className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Product Selection */}
        {step === 'products' && (
          <div>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Choose Your Tortillas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscribableProducts.filter(p => p.productType === 'tortilla').map(product => {
                const selected = selectedItems.find(i => i.sku === product.sku);
                return (
                  <div key={product.sku} className={`bg-white rounded-xl p-4 border-2 transition-colors ${selected ? 'border-sunset-500' : 'border-transparent shadow-soft'}`}>
                    <div className="aspect-square relative mb-3 rounded-lg overflow-hidden bg-charcoal-50">
                      <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, 200px" className="object-cover" />
                    </div>
                    <h3 className="font-semibold text-charcoal-950 text-sm">{product.name}</h3>
                    {product.tortillaCount > 0 && (
                      <p className="text-xs text-charcoal-500">{product.tortillaCount} count</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-charcoal-950">{formatPrice(product.price)}</span>
                      {selected ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(product.sku, -1)}
                            aria-label={`Decrease ${product.name} quantity`}
                            className={`w-8 h-8 rounded-full bg-charcoal-100 flex items-center justify-center hover:bg-charcoal-200 ${focusRing}`}
                          >
                            <Minus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <span className="font-bold w-6 text-center" aria-live="polite">{selected.quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.sku, 1)}
                            aria-label={`Increase ${product.name} quantity`}
                            className={`w-8 h-8 rounded-full bg-sunset-100 flex items-center justify-center hover:bg-sunset-200 text-sunset-700 ${focusRing}`}
                          >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addItem(product)}
                          aria-label={`Add ${product.name}`}
                          className={`px-3 py-1.5 bg-sunset-600 text-white rounded-lg text-sm font-medium hover:bg-sunset-700 ${focusRing}`}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sauces, Salsas, Seasonings as add-ons */}
            {subscribableProducts.filter(p => p.productType !== 'tortilla').length > 0 && (
              <>
                <h3 className="text-lg font-bold text-charcoal-950 mt-10 mb-4">Add Extras</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {subscribableProducts.filter(p => p.productType !== 'tortilla').map(product => {
                    const selected = selectedItems.find(i => i.sku === product.sku);
                    return (
                      <div key={product.sku} className={`bg-white rounded-lg p-3 border-2 transition-colors ${selected ? 'border-sunset-500' : 'border-transparent shadow-soft'}`}>
                        <h4 className="font-medium text-charcoal-950 text-sm">{product.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold">{formatPrice(product.price)}</span>
                          {selected ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(product.sku, -1)}
                                aria-label={`Decrease ${product.name} quantity`}
                                className={`w-6 h-6 rounded-full bg-charcoal-100 flex items-center justify-center text-xs ${focusRing}`}
                              >
                                <Minus className="w-3 h-3" aria-hidden="true" />
                              </button>
                              <span className="text-sm font-bold w-4 text-center" aria-live="polite">{selected.quantity}</span>
                              <button
                                onClick={() => updateQuantity(product.sku, 1)}
                                aria-label={`Increase ${product.name} quantity`}
                                className={`w-6 h-6 rounded-full bg-sunset-100 flex items-center justify-center text-xs text-sunset-700 ${focusRing}`}
                              >
                                <Plus className="w-3 h-3" aria-hidden="true" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addItem(product)}
                              aria-label={`Add ${product.name}`}
                              className={`text-xs px-2 py-1 bg-sunset-600 text-white rounded font-medium hover:bg-sunset-700 ${focusRing}`}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Cart Summary & Continue */}
            {selectedItems.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-charcoal-200 shadow-xl p-4 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                  <div>
                    <p className="text-sm text-charcoal-600">{selectedItems.reduce((sum, i) => sum + i.quantity, 0)} items</p>
                    <p className="text-lg font-bold text-charcoal-950">{formatPrice(subtotal)}/delivery</p>
                  </div>
                  <button
                    onClick={() => setStep('frequency')}
                    className={`px-6 py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 flex items-center gap-2 ${focusRing}`}
                  >
                    Choose Schedule <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Frequency Selection */}
        {step === 'frequency' && (
          <div>
            <button onClick={() => setStep('products')} className={`flex items-center gap-1 text-sm text-charcoal-500 hover:text-charcoal-700 mb-6 rounded ${focusRing}`}>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to products
            </button>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">How Often?</h2>
            <div className="space-y-3 max-w-lg" role="radiogroup" aria-label="Delivery frequency">
              {frequencies.map(freq => (
                <button
                  key={freq.id}
                  onClick={() => setFrequency(freq.id)}
                  role="radio"
                  aria-checked={frequency === freq.id}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-colors ${focusRing} ${
                    frequency === freq.id ? 'border-sunset-500 bg-sunset-50' : 'border-charcoal-200 bg-white hover:border-charcoal-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-charcoal-950">{freq.label}</p>
                      <p className="text-sm text-charcoal-500 mt-0.5">{freq.description}</p>
                    </div>
                    <div aria-hidden="true" className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      frequency === freq.id ? 'border-sunset-500 bg-sunset-500' : 'border-charcoal-300'
                    }`}>
                      {frequency === freq.id && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Pick Your Tuesday */}
            <div className="mt-8 max-w-lg">
              <h3 className="text-lg font-bold text-charcoal-950 mb-2">Pick Your Shipping Day</h3>
              <p className="text-sm text-charcoal-500 mb-4">Choose which Tuesday of the month you&apos;d like your tortillas shipped.</p>
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Shipping day">
                {Object.entries(shippingDayLabels).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setShippingDay(id)}
                    role="radio"
                    aria-checked={shippingDay === id}
                    className={`p-4 rounded-xl border-2 text-center transition-colors ${focusRing} ${
                      shippingDay === id ? 'border-sunset-500 bg-sunset-50' : 'border-charcoal-200 bg-white hover:border-charcoal-300'
                    }`}
                  >
                    <Calendar className="w-5 h-5 mx-auto mb-1 text-sunset-600" aria-hidden="true" />
                    <p className="font-semibold text-charcoal-950 text-sm">{label}</p>
                    <p className="text-xs text-charcoal-500">of the month</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-8 max-w-lg">
              <OrderSummary
                items={selectedItems}
                frequencyLabel={frequencyLabel}
                shippingDay={shippingDay}
                subtotal={subtotal}
                tax={tax}
                total={total}
              />
            </div>

            <button
              onClick={() => setStep('address')}
              className={`mt-6 px-6 py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 flex items-center gap-2 ${focusRing}`}
            >
              Continue to Shipping <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Step 3: Shipping Address */}
        {step === 'address' && (
          <div>
            <button onClick={() => setStep('frequency')} className={`flex items-center gap-1 text-sm text-charcoal-500 hover:text-charcoal-700 mb-6 rounded ${focusRing}`}>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to schedule
            </button>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-2 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-sunset-600" aria-hidden="true" />
              Where Should We Ship?
            </h2>
            <p className="text-charcoal-600 mb-6">Every delivery ships free to this address. You can update it anytime from your account.</p>
            <div className="max-w-lg">
              <AddressForm
                initial={address}
                submitLabel={isLoggedIn ? 'Continue to Payment' : 'Continue'}
                loading={loading}
                onSubmit={handleAddressSubmit}
              />
            </div>
          </div>
        )}

        {/* Step 4: Account Creation */}
        {step === 'account' && !isLoggedIn && (
          <div>
            <button onClick={() => setStep('address')} className={`flex items-center gap-1 text-sm text-charcoal-500 hover:text-charcoal-700 mb-6 rounded ${focusRing}`}>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to shipping
            </button>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-2">Create Your Account</h2>
            <p className="text-charcoal-600 mb-6">You&apos;ll use this to manage your subscription, track orders, and update preferences.</p>

            <div className="max-w-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="account-first-name" className="block text-sm font-medium text-charcoal-700 mb-1">First Name</label>
                  <input
                    id="account-first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500 focus:border-sunset-500"
                  />
                </div>
                <div>
                  <label htmlFor="account-last-name" className="block text-sm font-medium text-charcoal-700 mb-1">Last Name</label>
                  <input
                    id="account-last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500 focus:border-sunset-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="account-email" className="block text-sm font-medium text-charcoal-700 mb-1">Email</label>
                <input
                  id="account-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500 focus:border-sunset-500"
                />
              </div>
              <div>
                <label htmlFor="account-password" className="block text-sm font-medium text-charcoal-700 mb-1">Password</label>
                <input
                  id="account-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500 focus:border-sunset-500"
                />
              </div>

              <button
                onClick={handleAccountStep}
                disabled={loading || !email || !password}
                aria-busy={loading || undefined}
                className={`w-full py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${focusRing}`}
              >
                {loading ? 'Setting up...' : 'Continue to Payment'} <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>

              <p className="text-center text-sm text-charcoal-500">
                Already have an account?{' '}
                <Link href="/account/login" className="text-sunset-600 font-medium">Sign in</Link>
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Payment (Stripe Elements) */}
        {step === 'payment' && clientSecret && (
          <div>
            <button onClick={() => setStep('address')} className={`flex items-center gap-1 text-sm text-charcoal-500 hover:text-charcoal-700 mb-6 rounded ${focusRing}`}>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to shipping
            </button>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Payment Details</h2>
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3 bg-white rounded-xl shadow-soft p-6">
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                  <PaymentForm
                    shipping={address}
                    onSuccess={handlePaymentSuccess}
                    onError={(msg) => setError(msg)}
                  />
                </Elements>
              </div>
              <aside className="lg:col-span-2 space-y-4">
                <OrderSummary
                  items={selectedItems}
                  frequencyLabel={frequencyLabel}
                  shippingDay={shippingDay}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                />
                {address && (
                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <h3 className="font-semibold text-charcoal-950 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sunset-600" aria-hidden="true" />
                      Ships To
                    </h3>
                    <address className="not-italic text-sm text-charcoal-600 leading-relaxed">
                      <p>{address.firstName} {address.lastName}</p>
                      <p>{address.street}{address.street2 ? `, ${address.street2}` : ''}</p>
                      <p>{address.city}, {address.state} {address.zip}</p>
                    </address>
                    <button
                      onClick={() => setStep('address')}
                      className={`mt-2 text-sm font-medium text-sunset-600 hover:text-sunset-700 rounded ${focusRing}`}
                    >
                      Edit address
                    </button>
                  </div>
                )}
              </aside>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderSummary({
  items,
  frequencyLabel,
  shippingDay,
  subtotal,
  tax,
  total,
}: {
  items: SelectedItem[];
  frequencyLabel: string;
  shippingDay: string;
  subtotal: number;
  tax: number;
  total: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="font-semibold text-charcoal-950 mb-3">Your Subscription</h3>
      <div className="space-y-2 text-sm">
        {items.map(item => (
          <div key={item.sku} className="flex justify-between gap-3">
            <span className="text-charcoal-600">{item.quantity}x {item.name}</span>
            <span className="font-medium whitespace-nowrap">{formatPrice(item.quantity * item.unitPrice)}</span>
          </div>
        ))}
        <div className="pt-2 border-t border-charcoal-100 flex justify-between">
          <span className="text-charcoal-600">Delivery</span>
          <span className="font-medium">{frequencyLabel}</span>
        </div>
        {shippingDay && (
          <div className="flex justify-between">
            <span className="text-charcoal-600">Ships on</span>
            <span className="font-medium">{shippingDayLabels[shippingDay] ?? shippingDay} of the month</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-charcoal-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal-600">Shipping</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal-600">Tax (8.25%)</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        <div className="pt-2 border-t border-charcoal-200 flex justify-between text-base">
          <span className="font-bold text-charcoal-950">Total per delivery</span>
          <span className="font-bold text-sunset-600">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}

function PaymentForm({
  shipping,
  onSuccess,
  onError,
}: {
  shipping: AddressFields | null;
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/account?subscribed=true`,
        // Attach the shipping address to the Stripe payment as well
        ...(shipping && {
          shipping: {
            name: `${shipping.firstName} ${shipping.lastName}`.trim(),
            phone: shipping.phone || undefined,
            address: {
              line1: shipping.street,
              line2: shipping.street2 || undefined,
              city: shipping.city,
              state: shipping.state,
              postal_code: shipping.zip,
              country: 'US',
            },
          },
        }),
      },
    });

    if (error) {
      onError(error.message || 'Payment failed');
    } else {
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        aria-busy={loading || undefined}
        className={`w-full py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 disabled:opacity-50 disabled:cursor-not-allowed ${focusRing}`}
      >
        {loading ? 'Processing...' : 'Start Subscription'}
      </button>
      <p className="text-xs text-charcoal-400 text-center">
        Secure payment via Stripe. Cancel or pause anytime from your account.
      </p>
    </form>
  );
}
