'use client';

import React, { useContext, useEffect, useState } from 'react';
import * as wanakana from 'wanakana';

import CountDown from '@/components/parts/CountDown/CountDown';
import { CourseLevelContext } from '@/contexts/CourseLevelContext';
import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';
import { QuestionListContext } from '@/contexts/QuestionListContext';
import { checkJa } from '@/functions/common';

function TypingGame(): JSX.Element {
  const [isStart, setIsStart] = useState(false); // カウントダウンが終了してゲームが開始できる状態かどうか
  const [userInput, setUserInput] = useState(''); // ユーザーの入力
  const [prevUserInput, setPrevUserInput] = useState(''); // 直前のユーザーの入力
  const [isOk, setIsOk] = useState(true); // ユーザーの入力が正しいかどうか

  const { setCurrentNameCo } = useContext(CurrentScreenContext);
  const { courseCo, levelCo } = useContext(CourseLevelContext);
  const { questionListCo } = useContext(QuestionListContext); // 作成した問題のリスト

  // 表示する問題
  const jpText = 'ここに練習用のテキストを設定';
  const exampleTextKana = 'ここにれんしゅうようのてきすとをせってい';
  const exampleTextRomaji = wanakana.toRomaji(exampleTextKana);
  const [displayTextRomaji, setDisplayTextRomaji] = useState(exampleTextRomaji); // 表示するテキスト

  useEffect(() => {
    const userInputToHiragana: string = wanakana.toHiragana(userInput);
    const displayTextToHiragana: string = wanakana.toHiragana(displayTextRomaji);
    const isInputOK = displayTextToHiragana.startsWith(userInputToHiragana);

    if (isInputOK) {
      const remainingText = removeMatchingPrefix(displayTextToHiragana, userInputToHiragana);
      const remainingTextToRomaji = wanakana.toRomaji(remainingText);
      const isFinished = remainingTextToRomaji.length === 0;

      // TODO: 最後の問題で、残りの文字がなくなったらゲーム終了, リザルト画面に遷移
      if (isFinished) {
        setCurrentNameCo('リザルト');
      }

      setUserInput('');
      setDisplayTextRomaji(remainingTextToRomaji);
      setIsOk(true);
    } else {
      setIsOk(false);

      const isJaInput = checkJa.test(userInput); // 日本語入力かどうか
      const isLongInput = userInput.length > 2;
      const isNotMatch = !displayTextRomaji.startsWith(userInput);
      const isUserInputEmpty = isJaInput || (isLongInput && isNotMatch);
      if (isUserInputEmpty) {
        setUserInput('');
        return;
      }
    }
  }, [setCurrentNameCo, userInput]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setUserInput(value);
    setPrevUserInput(value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Escape') {
      setCurrentNameCo('セレクト');
    }
  }

  function handleCountdownFinished(): void {
    setIsStart(true);
  }

  // 入力された文字列とパターンを比較し、一致する部分を削除した文字列を返す
  function removeMatchingPrefix(input: string, pattern: string): string {
    let index = 0;
    while (index < input.length && index < pattern.length && input[index] === pattern[index]) {
      index++;
    }
    return input.substring(index);
  }

  return (
    <>
      {isStart ? (
        <div className="flex flex-col items-center justify-center" onKeyDown={handleKeyDown}>
          <p>
            難易度: {courseCo}, コース: {levelCo}
          </p>
          <p className="mt-10">{jpText}</p>
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
