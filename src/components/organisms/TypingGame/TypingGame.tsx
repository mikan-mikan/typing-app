'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';

import CountDown from '@/components/parts/CountDown/CountDown';
import { CourseLevelContext } from '@/contexts/CourseLevelContext';
import { ScoreContext } from '@/contexts/ScoreContext';
import useGameLogic from '@/hooks/useGameLogic';
import useGameTimer from '@/hooks/useGameTimer';
import useGoToPage from '@/hooks/useGoToPage';

function TypingGame(): JSX.Element {
  const { goToPage } = useGoToPage();
  const { courseCo, levelCo } = useContext(CourseLevelContext);
  const { updateScoreCo } = useContext(ScoreContext);
  const { elapsedTime, startGameTimer, stopGameTimer } = useGameTimer(); // ゲームの経過時間
  const { displayTextKanji, displayTextRomaji, userInput, isOk, prevUserInput, handleInputChange, isGameFinished } =
    useGameLogic(); // 表示内容など
  const [isGameStart, setIsGameStart] = useState(false); // スタートできるかどうか
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isGameFinished) {
      updateScoreCo(elapsedTime); // 保存した値でスコア更新
      stopGameTimer(); // 時間計測を停止
      goToPage('リザルト');
    }
  }, [isGameFinished, stopGameTimer, updateScoreCo, elapsedTime, goToPage]);

  useEffect(() => {
    if (isGameStart) {
      // 時間計測を開始
      startGameTimer();
    }
  }, [isGameStart, startGameTimer]);

  useEffect(() => {
    if (isGameStart && inputRef.current) {
      inputRef.current.focus(); // ゲーム開始時に入力欄にフォーカスを設定
    }
  }, [isGameStart]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      // 戻るボタン以外をクリックした場合にフォーカスを設定
      if (!target.closest('button') && inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <>
      {isGameStart ? (
        <div
          className="flex flex-col items-center justify-center"
          onClick={(e) => {
            // 戻るボタン以外をクリックした場合にフォーカスを設定
            if (e.target instanceof HTMLElement && !e.target.closest('button')) {
              inputRef.current?.focus();
            }
          }}
        >
          <p>
            難易度: {courseCo}, コース: {levelCo}
          </p>
          <p className="mt-10">{displayTextKanji}</p>
          <p className="mt-4">
            <span className={isOk ? 'text-green-400' : 'text-red-400'}>{prevUserInput}</span>
            {displayTextRomaji}
          </p>
          <input
            ref={inputRef} // 入力欄にrefを設定
            className="mt-4"
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="テキスト入力エリア"
            style={{ opacity: 0 }} // 非表示にする
          />
          {!isOk && <p className="text-red-400">Miss</p>}
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => {
              goToPage('トップ'); // トップ画面に戻る
            }}
          >
            やめる
          </button>
        </div>
      ) : (
        <CountDown
          onCountdownFinished={() => {
            setIsGameStart(true);
          }}
        />
      )}
    </>
  );
}

export default TypingGame;
