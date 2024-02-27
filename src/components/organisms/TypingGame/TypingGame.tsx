'use client';

import React, { useContext, useEffect, useState } from 'react';

import CountDown from '@/components/parts/CountDown/CountDown';
import { CourseLevelContext } from '@/contexts/CourseLevelContext';
import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';
import { ScoreContext } from '@/contexts/ScoreContext';
import useGameLogic from '@/hooks/useGameLogic';
import useGameTimer from '@/hooks/useGameTimer';

function TypingGame(): JSX.Element {
  const { setCurrentNameCo } = useContext(CurrentScreenContext);
  const { courseCo, levelCo } = useContext(CourseLevelContext);
  const { updateScoreCo } = useContext(ScoreContext);
  const { elapsedTime, startGameTimer, stopGameTimer } = useGameTimer(); // ゲームの経過時間
  const { displayTextKanji, displayTextRomaji, userInput, isOk, prevUserInput, handleInputChange, isGameFinished } =
    useGameLogic(); // 表示内容など
  const [isStart, setIsStart] = useState(false); // スタートできるかどうか

  useEffect(() => {
    if (isGameFinished) {
      stopGameTimer(); // 時間計測を停止
      updateScoreCo(elapsedTime); // スコア更新
      setCurrentNameCo('リザルト');
    }
  }, [isGameFinished]);

  useEffect(() => {
    if (isStart) {
      // 時間計測を開始
      startGameTimer();
    }
  }, [isStart]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Escape') {
      setCurrentNameCo('セレクト');
    }
  }

  function handleCountdownFinished(): void {
    setIsStart(true);
  }

  return (
    <>
      {isStart ? (
        <div className="flex flex-col items-center justify-center" onKeyDown={handleKeyDown}>
          <p>
            難易度: {courseCo}, コース: {levelCo}
          </p>
          <p className="mt-10">{displayTextKanji}</p>
          <p className="mt-4">
            <span className={isOk ? 'text-green-400' : 'text-red-400'}>{prevUserInput}</span>
            {displayTextRomaji}
          </p>
          <input
            className="mt-4"
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="テキスト入力エリア"
          />
          {!isOk && <p className="text-red-400">Miss</p>}
        </div>
      ) : (
        <CountDown onCountdownFinished={handleCountdownFinished} />
      )}
    </>
  );
}

export default TypingGame;
