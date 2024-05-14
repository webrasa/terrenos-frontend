import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { createContext, useContext, useState } from 'react';

interface UnitContextType {
  unit: string;
  setUnit: Dispatch<SetStateAction<string>>;
}

const defaultUnitContextValue: UnitContextType = {
  unit: 'sqm',
  setUnit: () => {},
};

const UnitContext = createContext<UnitContextType>(defaultUnitContextValue);

export function useUnit() {
  return useContext(UnitContext);
}

export const UnitProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialUnit = 'sqm';
  const [unit, setUnit] = useState<string>(initialUnit);

  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
};
