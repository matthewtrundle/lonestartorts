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

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  baseShipping: number; // What shipping would be without free shipping
  total: number;
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
  shippingOptions: { usps: number; fedex: number };
  freeShippingProgress: FreeShippingProgress;
  freeShippingThreshold: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'lonestar-cart';
const SHIPPING_METHOD_KEY = 'lonestar-shipping-method';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [shippingMethod, setShippingMethodState] = useState<ShippingMethod>('usps');

  // Load cart and shipping method from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(parsed);
      }
      const storedMethod = localStorage.getItem(SHIPPING_METHOD_KEY) as ShippingMethod | null;
      if (storedMethod === 'usps' || storedMethod === 'fedex') {
        setShippingMethodState(storedMethod);
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

  // Calculate totals with smart shipping
  // Pricing: $20 per pack (tortillas), $12 per bottle (sauce)
  // Shipping options: USPS (standard) or FedEx 2nd Day (premium)
  // FREE shipping on USPS orders $60+
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
