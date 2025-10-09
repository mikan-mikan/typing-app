'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';

import Button from '@/components/parts/Button/Button';
import CountDown from '@/components/parts/CountDown/CountDown';
import { CourseLevelContext } from '@/contexts/CourseLevelContext';
import { ScoreContext } from '@/contexts/ScoreContext';
import { UserSettingContext } from '@/contexts/UserSettingContext';
import useGameLogic from '@/hooks/useGameLogic';
import useGameTimer from '@/hooks/useGameTimer';
import useGoToPage from '@/hooks/useGoToPage';

function TypingGame(): JSX.Element {
  const { goToPage } = useGoToPage();
  const { courseCo, levelCo } = useContext(CourseLevelContext);
  const { updateScoreCo } = useContext(ScoreContext);
  const { seCo, seVolumeCo } = useContext(UserSettingContext);
  const { elapsedTime, startGameTimer, stopGameTimer } = useGameTimer(); // ゲームの経過時間
  const {
    displayTextKanji,
    displayTextRomaji,
    userInput,
    isOk,
    prevUserInput,
    handleInputChange,
    isGameFinished,
    currentQuestionIndex,
  } = useGameLogic(); // 表示内容など
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
      // 「やめる」ボタン以外をクリックした場合にフォーカスを設定
      if (!target.closest('button') && inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const handleFocusOnClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLElement;
    // 「やめる」ボタン以外をクリックした場合にフォーカスを設定
    if (!target.closest('button') && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 効果音再生関数
  const playSE = (file: string): void => {
    if (seCo) {
      const audio = new Audio(`/music/${file}`);
      audio.volume = seVolumeCo / 100;
      void audio.play();
    }
  };

  // 正解時SE
  // 最後の文字（isLastChar）でなければse-typing-okを鳴らす
  const [isLastChar, setIsLastChar] = useState(false);
  useEffect(() => {
    // isLastChar判定
    setIsLastChar(displayTextRomaji.length === 0 && userInput === '');
  }, [displayTextRomaji, userInput]);

  useEffect(() => {
    if (isGameStart && isOk && prevUserInput && userInput === '' && !isLastChar) {
      playSE('se-typing-ok.mp3');
    }
    // eslint-disable-next-line
  }, [isOk, prevUserInput, userInput, isGameStart, isLastChar]);

  // ミス時SE
  useEffect(() => {
    if (isGameStart && !isOk && prevUserInput) {
      playSE('se-typing-ng.mp3');
    }
    // eslint-disable-next-line
  }, [isOk, prevUserInput, isGameStart]);

  // 1問終了時SE
  const prevQuestionIndex = useRef<number>(-1); // 初期値を-1に
  useEffect(() => {
    if (isGameStart && prevQuestionIndex.current !== currentQuestionIndex) {
      playSE('se-typing-end.mp3');
    }
    prevQuestionIndex.current = currentQuestionIndex;
    // eslint-disable-next-line
  }, [currentQuestionIndex, isGameStart]);

  // 全問終了時SE（従来通り）
  useEffect(() => {
    if (isGameFinished) {
      playSE('se-typing-end.mp3');
    }
    // eslint-disable-next-line
  }, [isGameFinished]);

  return (
    <>
      {isGameStart ? (
        <div
          className="flex flex-col items-center justify-center"
          onClick={handleFocusOnClick} // 共通関数を使用
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
          <Button
            label="やめる"
            onClick={() => {
              goToPage('トップ'); // トップ画面に戻る
            }}
            seType="back"
          />
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
