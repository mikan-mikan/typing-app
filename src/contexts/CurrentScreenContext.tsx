import React, { createContext, ReactNode, useState } from 'react';

import { CurrentType } from '@/types';

interface ContextType {
  currentNameCo: CurrentType;
  setCurrentNameCo: (value: CurrentType) => void;
}
interface ProviderProps {
  children: ReactNode;
}

const CurrentScreenContext = createContext<ContextType>({
  currentNameCo: 'トップ',
  setCurrentNameCo: () => {},
});

const CurrentScreenProvider = ({ children }: ProviderProps): JSX.Element => {
  const [currentNameCo, setCurrentNameCo] = useState<CurrentType>('トップ');

  return (
    <CurrentScreenContext.Provider value={{ currentNameCo, setCurrentNameCo }}>
      {children}
    </CurrentScreenContext.Provider>
  );
};

export { CurrentScreenContext, CurrentScreenProvider };
