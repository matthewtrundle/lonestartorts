'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  calculateShipping,
  getShippingCost,
  getShippingOptions,
  getFreeShippingProgress,
  calculateBaseShipping,
  ShippingMethod,
  FREE_SHIPPING_THRESHOLD,
} from '@/lib/products';

// Cart item structure matching the product catalog
export interface CartItem {
  sku: string;
  name: string;
  price: number; // Price in cents
  quantity: number;
  productType?: 'tortilla' | 'sauce'; // Product type for shipping calculation
  description?: string;
  image?: string;
}

interface FreeShippingProgress {
  qualifies: boolean;
  amountRemaining: number;
  percentComplete: number;
  savedAmount: number;
}

interface SpinPrize {
  id: string;
  name: string;
  description: string;
  type: string;
  code: string;
  expiresAt: string;
  sku?: string;
  value?: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  baseShipping: number; // What shipping would be without free shipping
  total: number;
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
  shippingOptions: { usps: number; ups_ground: number; ups_3day: number; ups_2day: number; ups_nextday: number };
  freeShippingProgress: FreeShippingProgress;
  freeShippingThreshold: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isHydrated: boolean;
  // Spin wheel state
  showSpinWheel: boolean;
  setShowSpinWheel: (show: boolean) => void;
  spinPrize: SpinPrize | null;
  setSpinPrize: (prize: SpinPrize | null) => void;
  hasTriggeredSpin: boolean;
  triggerSpinForTikTok: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'lonestar-cart';
const SHIPPING_METHOD_KEY = 'lonestar-shipping-method';
const SPIN_TRIGGERED_KEY = 'lonestar-spin-triggered';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [shippingMethod, setShippingMethodState] = useState<ShippingMethod>('usps');

  // Spin wheel state
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [spinPrize, setSpinPrize] = useState<SpinPrize | null>(null);
  const [hasTriggeredSpin, setHasTriggeredSpin] = useState(false);

  // Load cart and shipping method from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(parsed);
      }
      const storedMethod = localStorage.getItem(SHIPPING_METHOD_KEY) as ShippingMethod | null;
      const validMethods = ['usps', 'ups_ground', 'ups_3day', 'ups_2day', 'ups_nextday'];
      if (storedMethod && validMethods.includes(storedMethod)) {
        setShippingMethodState(storedMethod);
      }
      // Check if spin was already triggered this session
      const spinTriggered = sessionStorage.getItem(SPIN_TRIGGERED_KEY);
      if (spinTriggered === 'true') {
        setHasTriggeredSpin(true);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [items, isHydrated]);

  // Save shipping method to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(SHIPPING_METHOD_KEY, shippingMethod);
      } catch (error) {
        console.error('Failed to save shipping method to localStorage:', error);
      }
    }
  }, [shippingMethod, isHydrated]);

  const setShippingMethod = (method: ShippingMethod) => {
    setShippingMethodState(method);
  };

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.sku === item.sku);

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((i) =>
          i.sku === item.sku
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity }];
      }
    });

    // Track AddToCart event for TikTok Pixel
    if (typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.track('AddToCart', {
        content_id: item.sku,
        content_type: 'product',
        content_name: item.name,
        quantity: quantity,
        price: item.price / 100, // Convert cents to dollars
        value: (item.price * quantity) / 100,
        currency: 'USD',
      });
    }
  };

  const removeItem = (sku: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.sku !== sku));
  };

  const updateQuantity = (sku: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(sku);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.sku === sku ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Trigger spin wheel for TikTok users (called after first add-to-cart)
  const triggerSpinForTikTok = () => {
    if (!hasTriggeredSpin) {
      setHasTriggeredSpin(true);
      setShowSpinWheel(true);
      try {
        sessionStorage.setItem(SPIN_TRIGGERED_KEY, 'true');
      } catch (error) {
        console.error('Failed to save spin triggered state:', error);
      }
    }
  };

  // Calculate totals with smart shipping
  // Pricing: $20 per pack (tortillas), $12 per bottle (sauce)
  // Shipping options: USPS (standard) or UPS (Ground, 3-Day, 2-Day, Next Day)
  // FREE shipping on USPS orders $100+
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingOptions = getShippingOptions(items, subtotal);
  const shipping = getShippingCost(items, shippingMethod, subtotal);
  const baseShipping = calculateBaseShipping(items); // What shipping would be without free threshold
  const total = subtotal + shipping;
  const freeShippingProgress = getFreeShippingProgress(subtotal);

  const value: CartContextType = {
    items,
    itemCount,
    subtotal,
    shipping,
    baseShipping,
    total,
    shippingMethod,
    setShippingMethod,
    shippingOptions,
    freeShippingProgress,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isOpen,
    setIsOpen,
    isHydrated,
    // Spin wheel
    showSpinWheel,
    setShowSpinWheel,
    spinPrize,
    setSpinPrize,
    hasTriggeredSpin,
    triggerSpinForTikTok,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
