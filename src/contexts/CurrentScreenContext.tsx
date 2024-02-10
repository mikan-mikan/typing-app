import React, { createContext, ReactNode, useState } from 'react';

import { currentType } from '@/types';

interface ContextType {
  currentNameCo: currentType;
  setCurrentNameCo: (value: currentType) => void;
}
interface ProviderProps {
  children: ReactNode;
}

const CurrentScreenContext = createContext<ContextType>({
  currentNameCo: 'スタート',
  setCurrentNameCo: () => {},
});

const CurrentScreenProvider = ({ children }: ProviderProps): JSX.Element => {
  const [currentNameCo, setCurrentNameCo] = useState<currentType>('スタート');

  return (
    <CurrentScreenContext.Provider value={{ currentNameCo, setCurrentNameCo }}>
      {children}
    </CurrentScreenContext.Provider>
  );
};

export { CurrentScreenContext, CurrentScreenProvider };
