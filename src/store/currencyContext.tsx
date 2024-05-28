import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { createContext, useContext, useState } from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: Dispatch<SetStateAction<string>>;
}

const defaultCurrencyContextValue: CurrencyContextType = {
  currency: 'usd',
  setCurrency: () => {},
};

const CurrencyContext = createContext<CurrencyContextType>(
  defaultCurrencyContextValue,
);

export function useCurrency() {
  return useContext(CurrencyContext);
}

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialCurrency = 'usd';
  const [currency, setCurrency] = useState<string>(initialCurrency);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
