import React, { createContext, ReactNode, useCallback, useState } from 'react';

import { judgeScore } from '@/functions/scores';
import { SCORE_MISS_PENALTY } from '@/static/scores';
import { ScoreMessageProps } from '@/types';

interface ContextType {
  elapsedTimeCo: number;
  missCo: number;
  setMissCo: (value: number) => void;
  totalTimeCo: number;
  updateScoreCo: (value: number) => void;
  scoreObjectCo: ScoreMessageProps;
  resetScoreContext: () => void;
}
interface ProviderProps {
  children: ReactNode;
}

const ScoreContext = createContext<ContextType>({
  elapsedTimeCo: 0,
  missCo: 0,
  setMissCo: () => {},
  totalTimeCo: 0,
  updateScoreCo: () => {},
  scoreObjectCo: {
    score: '',
    message: '',
  },
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

  // 合計秒数の更新
  const updateScoreCo = (elapsedTime: number): void => {
    const totalTime = elapsedTime + missCo * SCORE_MISS_PENALTY; // ペナルティを含めた合計秒数
    const messages = judgeScore(totalTime); // スコア判定
    setTotalTimeCo(totalTime); // 合計秒数を更新
    setElapsedTimeCo(elapsedTime); // 経過時間を更新
    setScoreObjectCo(messages); // スコアの判定結果を更新
  };

  return (
    <ScoreContext.Provider
      value={{
        elapsedTimeCo,
        missCo,
        setMissCo,
        totalTimeCo,
        updateScoreCo,
        scoreObjectCo,
        resetScoreContext,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export { ScoreContext, ScoreProvider };
