'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Minus, Plus, Truck, Calendar, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { products } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

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

type Step = 'products' | 'frequency' | 'account' | 'payment';

interface SelectedItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export default function SubscribePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('products');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [frequency, setFrequency] = useState('monthly');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Check if already logged in
    fetch('/api/customer/me').then(res => {
      if (res.ok) setIsLoggedIn(true);
    });
  }, []);

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

  const handleAccountStep = async () => {
    if (isLoggedIn) {
      await createSubscription();
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
      await createSubscription();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/customer/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: selectedItems.map(i => ({ sku: i.sku, quantity: i.quantity })),
          interval: frequency,
          intervalCount: 1,
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
              <Truck className="w-5 h-5 text-sunset-500" />
              Free Shipping
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sunset-500" />
              Flexible Schedule
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-sunset-500" />
              Cancel Anytime
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 text-sm">
          {(['products', 'frequency', 'account', 'payment'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s ? 'bg-sunset-600 text-white' :
                (['products', 'frequency', 'account', 'payment'].indexOf(step) > i) ? 'bg-green-500 text-white' :
                'bg-charcoal-200 text-charcoal-500'
              }`}>
                {(['products', 'frequency', 'account', 'payment'].indexOf(step) > i) ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`hidden sm:inline ${step === s ? 'text-charcoal-950 font-medium' : 'text-charcoal-500'}`}>
                {s === 'products' ? 'Choose Items' : s === 'frequency' ? 'Schedule' : s === 'account' ? 'Account' : 'Payment'}
              </span>
              {i < 3 && <div className="w-8 h-px bg-charcoal-300" />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
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
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <h3 className="font-semibold text-charcoal-950 text-sm">{product.name}</h3>
                    {product.tortillaCount > 0 && (
                      <p className="text-xs text-charcoal-500">{product.tortillaCount} count</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-charcoal-950">{formatPrice(product.price)}</span>
                      {selected ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(product.sku, -1)} className="w-8 h-8 rounded-full bg-charcoal-100 flex items-center justify-center hover:bg-charcoal-200">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold w-6 text-center">{selected.quantity}</span>
                          <button onClick={() => updateQuantity(product.sku, 1)} className="w-8 h-8 rounded-full bg-sunset-100 flex items-center justify-center hover:bg-sunset-200 text-sunset-700">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addItem(product)}
                          className="px-3 py-1.5 bg-sunset-600 text-white rounded-lg text-sm font-medium hover:bg-sunset-700"
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
                              <button onClick={() => updateQuantity(product.sku, -1)} className="w-6 h-6 rounded-full bg-charcoal-100 flex items-center justify-center text-xs">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-bold w-4 text-center">{selected.quantity}</span>
                              <button onClick={() => updateQuantity(product.sku, 1)} className="w-6 h-6 rounded-full bg-sunset-100 flex items-center justify-center text-xs text-sunset-700">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => addItem(product)} className="text-xs px-2 py-1 bg-sunset-600 text-white rounded font-medium hover:bg-sunset-700">
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
                    className="px-6 py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 flex items-center gap-2"
                  >
                    Choose Schedule <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Frequency Selection */}
        {step === 'frequency' && (
          <div>
            <button onClick={() => setStep('products')} className="flex items-center gap-1 text-sm text-charcoal-500 hover:text-charcoal-700 mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to products
            </button>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">How Often?</h2>
            <div className="space-y-3 max-w-lg">
              {frequencies.map(freq => (
                <button
                  key={freq.id}
                  onClick={() => setFrequency(freq.id)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-colors ${
                    frequency === freq.id ? 'border-sunset-500 bg-sunset-50' : 'border-charcoal-200 bg-white hover:border-charcoal-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-charcoal-950">{freq.label}</p>
                      <p className="text-sm text-charcoal-500 mt-0.5">{freq.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      frequency === freq.id ? 'border-sunset-500 bg-sunset-500' : 'border-charcoal-300'
                    }`}>
                      {frequency === freq.id && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 bg-white rounded-xl shadow-soft p-6 max-w-lg">
              <h3 className="font-semibold text-charcoal-950 mb-3">Your Subscription</h3>
              <div className="space-y-2 text-sm">
                {selectedItems.map(item => (
                  <div key={item.sku} className="flex justify-between">
                    <span className="text-charcoal-600">{item.quantity}x {item.name}</span>
                    <span className="font-medium">{formatPrice(item.quantity * item.unitPrice)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-charcoal-100 flex justify-between">
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

            <button
              onClick={() => setStep(isLoggedIn ? 'payment' : 'account')}
              className="mt-6 px-6 py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 flex items-center gap-2"
            >
              {isLoggedIn ? 'Continue to Payment' : 'Create Account'} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 3: Account Creation */}
        {step === 'account' && !isLoggedIn && (
          <div>
            <button onClick={() => setStep('frequency')} className="flex items-center gap-1 text-sm text-charcoal-500 hover:text-charcoal-700 mb-6">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-2">Create Your Account</h2>
            <p className="text-charcoal-600 mb-6">You&apos;ll use this to manage your subscription, track orders, and update preferences.</p>

            <div className="max-w-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleAccountStep}
                disabled={loading || !email || !password}
                className="w-full py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Setting up...' : 'Continue to Payment'} <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-sm text-charcoal-500">
                Already have an account?{' '}
                <Link href="/account/login" className="text-sunset-600 font-medium">Sign in</Link>
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Payment (Stripe Elements) */}
        {step === 'payment' && clientSecret && (
          <div>
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Payment Details</h2>
            <div className="max-w-lg">
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                <PaymentForm
                  onSuccess={() => router.push('/account?subscribed=true')}
                  onError={(msg) => setError(msg)}
                />
              </Elements>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentForm({ onSuccess, onError }: { onSuccess: () => void; onError: (msg: string) => void }) {
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
        className="w-full py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Start Subscription'}
      </button>
    </form>
  );
}
