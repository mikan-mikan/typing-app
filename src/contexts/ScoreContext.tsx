import React, { createContext, ReactNode, useState } from 'react';

import { ScoreMessageProps, ScoreMissProps } from '@/types';

interface ContextType {
  elapsedTimeCo: number;
  setElapsedTimeCo: (value: number) => void;
  missObjectCo: ScoreMissProps;
  setMissObjectCo: (value: ScoreMissProps) => void;
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
  missObjectCo: {
    missCount: 0,
    missTime: 0,
  },
  setMissObjectCo: () => {},
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

  // ミス回数、ミス秒数
  const [missObjectCo, setMissObjectCo] = useState<ScoreMissProps>({
    missCount: 0,
    missTime: 0,
  });

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
        missObjectCo,
        setMissObjectCo,
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
