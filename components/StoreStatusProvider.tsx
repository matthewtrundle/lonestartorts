'use client';

import { createContext, useContext } from 'react';

interface StoreStatusValue {
  salesPaused: boolean;
  pauseMessage: string | null;
  nextShipDate: string | null;
  announcement: string | null;
}

const StoreStatusContext = createContext<StoreStatusValue>({
  salesPaused: false,
  pauseMessage: null,
  nextShipDate: null,
  announcement: null,
});

export function StoreStatusProvider({
  salesPaused,
  pauseMessage,
  nextShipDate,
  announcement,
  children,
}: StoreStatusValue & { children: React.ReactNode }) {
  return (
    <StoreStatusContext.Provider value={{ salesPaused, pauseMessage, nextShipDate, announcement }}>
      {children}
    </StoreStatusContext.Provider>
  );
}

export function useStoreStatus() {
  return useContext(StoreStatusContext);
}
