'use client';

import React from 'react';

import { CourseLevelProvider } from '@/contexts/CourseLevelContext';
import { CurrentScreenProvider } from '@/contexts/CurrentScreenContext';
import { QuestionListProvider } from '@/contexts/QuestionListContext';
import { ScoreProvider } from '@/contexts/ScoreContext';

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps): JSX.Element => {
  return (
    <ScoreProvider>
      <QuestionListProvider>
        <CurrentScreenProvider>
          <CourseLevelProvider>{children}</CourseLevelProvider>
        </CurrentScreenProvider>
      </QuestionListProvider>
    </ScoreProvider>
  );
};

export default Provider;
