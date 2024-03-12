'use client';

import React from 'react';

import { CourseLevelProvider } from '@/contexts/CourseLevelContext';
import { CurrentScreenProvider } from '@/contexts/CurrentScreenContext';
import { QuestionListProvider } from '@/contexts/QuestionListContext';
import { ScoreProvider } from '@/contexts/ScoreContext';
import { UserSettingProvider } from '@/contexts/UserSettingContext';

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps): JSX.Element => {
  return (
    <UserSettingProvider>
      <ScoreProvider>
        <QuestionListProvider>
          <CurrentScreenProvider>
            <CourseLevelProvider>{children}</CourseLevelProvider>
          </CurrentScreenProvider>
        </QuestionListProvider>
      </ScoreProvider>
    </UserSettingProvider>
  );
};

export default Provider;
