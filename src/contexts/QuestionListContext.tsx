import React, { createContext, ReactNode, useState } from 'react';

import { QuestionType } from '@/types';

interface ContextType {
  questionListCo: QuestionType[];
  setQuestionListCo: (value: QuestionType[]) => void;
}
interface ProviderProps {
  children: ReactNode;
}

const QuestionListContext = createContext<ContextType>({
  questionListCo: [],
  setQuestionListCo: () => {},
});

const QuestionListProvider = ({ children }: ProviderProps): JSX.Element => {
  const [questionListCo, setQuestionListCo] = useState<QuestionType[]>([]);

  return (
    <QuestionListContext.Provider value={{ questionListCo, setQuestionListCo }}>
      {children}
    </QuestionListContext.Provider>
  );
};

export { QuestionListContext, QuestionListProvider };
