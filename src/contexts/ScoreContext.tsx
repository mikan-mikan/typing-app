import React, { createContext, ReactNode, useState } from 'react';

import { ScoreMessageProps, ScoreMissProps } from '@/types';

interface ContextType {
  elapsedTimeCo: number;
  setElapsedTimeCo: (value: number) => void;
  missCo: number;
  setMissCo: (value: number) => void;
  totalTimeCo: number;
  setTotalTimeCo: (value: number) => void;
  scoreObjectCo: ScoreMessageProps;
  setScoreObjectCo: (value: ScoreMessageProps) => void;
}
interface ProviderProps {
  children: ReactNode;
}

const ScoreContext = createContext<ContextType>({
  elapsedTimeCo: 0,
  setElapsedTimeCo: () => {},
  missCo: 0,
  setMissCo: () => {},
  totalTimeCo: 0,
  setTotalTimeCo: () => {},
  scoreObjectCo: {
    score: '',
    message: '',
  },
  setScoreObjectCo: () => {},
});

const ScoreProvider = ({ children }: ProviderProps): JSX.Element => {
  // 経過時間 (秒)
  const [elapsedTimeCo, setElapsedTimeCo] = useState<number>(0);

  // ミス回数
  const [missCo, setMissCo] = useState<number>(0);

  // 合計秒数
  const [totalTimeCo, setTotalTimeCo] = useState<number>(0);

  // 結果とメッセージ
  const [scoreObjectCo, setScoreObjectCo] = useState<ScoreMessageProps>({
    score: '',
    message: '',
  });

  return (
    <ScoreContext.Provider
      value={{
        elapsedTimeCo,
        setElapsedTimeCo,
        missCo,
        setMissCo,
        totalTimeCo,
        setTotalTimeCo,
        scoreObjectCo,
        setScoreObjectCo,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export { ScoreContext, ScoreProvider };
