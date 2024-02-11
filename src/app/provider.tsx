'use client';

import React from 'react';

import { CourseLevelProvider } from '@/contexts/CourseLevelContext';
import { CurrentScreenProvider } from '@/contexts/CurrentScreenContext';

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps): JSX.Element => {
  return (
    <CurrentScreenProvider>
      <CourseLevelProvider>{children}</CourseLevelProvider>
    </CurrentScreenProvider>
  );
};

export default Provider;
