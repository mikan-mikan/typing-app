'use client';

import React from 'react';

import { CourseLevelProvider } from '@/contexts/CourseLevelContext';
import { CurrentScreenProvider } from '@/contexts/CurrentScreenContext';
import { QuestionListProvider } from '@/contexts/QuestionListContext';

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps): JSX.Element => {
  return (
    <QuestionListProvider>
      <CurrentScreenProvider>
        <CourseLevelProvider>{children}</CourseLevelProvider>
      </CurrentScreenProvider>
    </QuestionListProvider>
  );
};

export default Provider;
