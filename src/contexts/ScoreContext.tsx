import React, { createContext, ReactNode, useCallback, useState } from 'react';

import { ScoreMessageProps } from '@/types';

interface ContextType {
  elapsedTimeCo: number;
  setElapsedTimeCo: (value: number) => void;
  missCo: number;
  setMissCo: (value: number) => void;
  totalTimeCo: number;
  setTotalTimeCo: (value: number) => void;
  scoreObjectCo: ScoreMessageProps;
  setScoreObjectCo: (value: ScoreMessageProps) => void;
  resetScoreContext: () => void;
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
  resetScoreContext: () => {},
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

  // 状態リセット用
  const resetScoreContext = useCallback(() => {
    setElapsedTimeCo(0);
    setMissCo(0);
    setTotalTimeCo(0);
    setScoreObjectCo({ score: '', message: '' });
  }, []);

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
        resetScoreContext,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export { ScoreContext, ScoreProvider };
