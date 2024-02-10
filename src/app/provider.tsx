'use client';

import React from 'react';

import { CurrentScreenProvider } from '@/contexts/CurrentScreenContext';

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps): JSX.Element => {
  return <CurrentScreenProvider>{children}</CurrentScreenProvider>;
};

export default Provider;
