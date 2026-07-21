'use client';

import { createContext, useContext } from 'react';

interface StoreStatusValue {
  salesPaused: boolean;
  pauseMessage: string | null;
}

const StoreStatusContext = createContext<StoreStatusValue>({
  salesPaused: false,
  pauseMessage: null,
});

export function StoreStatusProvider({
  salesPaused,
  pauseMessage,
  children,
}: StoreStatusValue & { children: React.ReactNode }) {
  return (
    <StoreStatusContext.Provider value={{ salesPaused, pauseMessage }}>
      {children}
    </StoreStatusContext.Provider>
  );
}

export function useStoreStatus() {
  return useContext(StoreStatusContext);
}
