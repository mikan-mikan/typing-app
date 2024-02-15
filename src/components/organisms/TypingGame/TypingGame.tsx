'use client';

import React, { useContext, useEffect, useState } from 'react';
import * as wanakana from 'wanakana';

import CountDown from '@/components/parts/CountDown/CountDown';
import { CourseLevelContext } from '@/contexts/CourseLevelContext';
import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';

function TypingGame(): JSX.Element {
  const [isStart, setIsStart] = useState(false); // カウントダウンが終了してゲームが開始できる状態かどうか
  const jpText = 'ここに練習用のテキストを設定';
  const exampleText = 'ここにれんしゅうようのてきすとをせってい';
  const alphabetText = wanakana.toRomaji(exampleText);
  const [displayText, setDisplayText] = useState(alphabetText); // 表示するテキスト
  const [userInput, setUserInput] = useState(''); // ユーザーの入力
  const [prevUserInput, setPrevUserInput] = useState(''); // 直前のユーザーの入力
  const [isOk, setIsOk] = useState(true); // ユーザーの入力が正しいかどうか

  const current = useContext(CurrentScreenContext);
  const { courseCo, levelCo } = useContext(CourseLevelContext);

  // 入力された文字列とパターンを比較し、一致する部分を削除した文字列を返す
  function removeMatchingPrefix(input: string, pattern: string): string {
    let index = 0;
    while (index < input.length && index < pattern.length && input[index] === pattern[index]) {
      index++;
    }
    return input.substring(index);
  }

  // function checkInputStrings(input: string): string {
  //   console.log('input:', input);
  //   const original = input;
  //   const toHiraganaOriginal = wanakana.toHiragana(original);
  //   const toRomajiOriginal = wanakana.toRomaji(toHiraganaOriginal);
  //   console.log('original:', original);
  //   console.log('toRomajiOriginal:', toRomajiOriginal);
  //   if (original.length - toRomajiOriginal.length >= 2) {
  //     return original.slice(0, -1);
  //   } else {
  //     return original;
  //   }
  // }

  useEffect(() => {
    //TODO: 入力途中の1文字が残る場合の判断をしたい、一度ローマ字に変換してから判断する？①
    // const checkUserInputText: string = checkInputStrings(userInput);

    const checkUserInput: string = wanakana.toHiragana(userInput);

    if (exampleText.startsWith(checkUserInput)) {
      // exampleTextの先頭の文字を削除
      const remainingText = removeMatchingPrefix(exampleText, checkUserInput);
      const remainingTextToRomaji = wanakana.toRomaji(remainingText);
      // TODO: 最後の問題で、残りの文字がなくなったらゲーム終了, リザルト画面に遷移
      if (remainingTextToRomaji.length === 0) {
        current.setCurrentNameCo('リザルト');
      }
      setDisplayText(remainingTextToRomaji);
      setIsOk(true);
    } else {
      // TODO: 最後に入力した1文字を削除したい、母音が合っているかどうかを判断して削除するかどうかを判断させたい②
      // const newQuestionText = userInput.slice(0, -1);
      // setDisplayText(newQuestionText);
      // setUserInput(newQuestionText);
      setIsOk(false);
    }
  }, [current, userInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setUserInput(value);
    setPrevUserInput(value.slice(-1));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Escape') {
      current.setCurrentNameCo('セレクト');
    }
  };

  const handleCountdownFinished = (): void => {
    setIsStart(true);
  };

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
            {displayText}
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
