import { useContext, useState } from 'react';
import * as wanakana from 'wanakana';

import { QuestionListContext } from '@/contexts/QuestionListContext';
import { ScoreContext } from '@/contexts/ScoreContext';
import { checkJa } from '@/functions/common';
import { removeMatchingPrefix } from '@/functions/typingGame';

type Props = {
  displayTextKanji: string;
  displayTextRomaji: string;
  userInput: string;
  isOk: boolean;
  prevUserInput: string;
  isGameFinished: boolean;
  setIsGameFinished: (isGameFinished: boolean) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// TODO: useMemoを使って最適化できないか検討する
const useGameLogic = (): Props => {
  const { questionListCo } = useContext(QuestionListContext); // 作成した問題のリスト
  const { missCo, setMissCo } = useContext(ScoreContext);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 現在の問題のインデックス
  const [userInput, setUserInput] = useState(''); // ユーザーの入力
  const [prevUserInput, setPrevUserInput] = useState(''); // 直前のユーザーの入力
  const [isOk, setIsOk] = useState(true); // ユーザーの入力が正しいかどうか
  const [isGameFinished, setIsGameFinished] = useState(false); // ゲームが終了したかどうか

  // 表示する問題
  const displayTextKanji = questionListCo[currentQuestionIndex].kanji; // 漢字で問題を表示
  const listOriginalTextKana = questionListCo[currentQuestionIndex].kana;
  const listOriginalTextKanaToRomaji = wanakana.toRomaji(listOriginalTextKana);
  const [displayTextRomaji, setDisplayTextRomaji] = useState(listOriginalTextKanaToRomaji); // ローマ字の残りの文字列を表示

  function gameMainLogic(inputValue: string): void {
    const userInputToHiragana: string = wanakana.toHiragana(inputValue);
    const displayTextToHiragana: string = wanakana.toHiragana(displayTextRomaji);
    const isInputOK = displayTextToHiragana.startsWith(userInputToHiragana);

    if (isInputOK) {
      const remainingText = removeMatchingPrefix(displayTextToHiragana, userInputToHiragana);
      const remainingTextToRomaji = wanakana.toRomaji(remainingText);
      const isLastChar = remainingTextToRomaji.length === 0;
      const isLastQuestion = currentQuestionIndex === questionListCo.length - 1;
      const isFinished = isLastChar && isLastQuestion;

      if (isFinished) {
        // 終了
        setIsGameFinished(true);
      } else if (isLastChar) {
        // 次の問題へ進む
        const nextTextToRomaji = wanakana.toRomaji(questionListCo[currentQuestionIndex + 1].kana);
        setDisplayTextRomaji(nextTextToRomaji);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserInput('');
        setPrevUserInput('');
      } else {
        // 次の入力へ進む
        setUserInput('');
        setDisplayTextRomaji(remainingTextToRomaji);
      }
      setIsOk(true);
    } else {
      setIsOk(false);

      // TODO: ミスの条件を変更する必要がある
      setMissCo(missCo + 1);

      const isJaInput = checkJa.test(inputValue); // 日本語入力かどうか
      const isLongInput = inputValue.length > 2;
      const isNotMatch = !displayTextRomaji.startsWith(inputValue);
      const isUserInputEmpty = isJaInput || (isLongInput && isNotMatch);
      if (isUserInputEmpty) {
        setUserInput('');
        return;
      }
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setUserInput(value);
    setPrevUserInput(value);
    gameMainLogic(value);
  }

  return {
    displayTextKanji,
    displayTextRomaji,
    userInput,
    isOk,
    prevUserInput,
    handleInputChange,
    isGameFinished,
    setIsGameFinished,
  };
};

export default useGameLogic;
