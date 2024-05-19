import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { createContext, useContext, useState } from 'react';

interface WatchListContextType {
  watchList: any[];
  setWatchList: Dispatch<SetStateAction<any[]>>;
}

const defaultWatchList: WatchListContextType = {
  watchList: [],
  setWatchList: () => {},
};

const WatchListContext = createContext<WatchListContextType>(defaultWatchList);

export const WatchListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [watchList, setWatchList] = useState<string[]>([]);

  return (
    <WatchListContext.Provider value={{ watchList, setWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = () => useContext(WatchListContext);
