'use client';

import React, { useContext, useState } from 'react';

import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';

function TypingGame(): JSX.Element {
  const jpText = 'ここに練習用のテキストを設定';
  const alphabetText = 'kokonirensyuuyounotekisutowosettei'; // TODO: 複数の入力パターンがある場合は、複数のテキストを設定？
  const [questionText, setQuestionText] = useState(alphabetText); // 表示するテキスト
  const [userInput, setUserInput] = useState(''); // ユーザーの入力
  const [prevUserInput, setPrevUserInput] = useState(''); // 直前のユーザーの入力
  const [isOk, setIsOk] = useState(true); // ユーザーの入力が正しいかどうか
  const current = useContext(CurrentScreenContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setUserInput(value);
    setPrevUserInput(value);

    // ユーザーの入力を判定
    if (questionText.startsWith(value)) {
      // alphabetTextの先頭の文字を削除
      const newQuestionText = questionText.slice(1);
      setIsOk(true);

      // newQuestionTextが空の場合は、リザルト画面に遷移
      // TODO: かつ「最後の問題かどうか」を追加する
      if (newQuestionText === '') {
        current.setCurrentNameCo('リザルト');
      }

      setQuestionText(newQuestionText);
    } else {
      setIsOk(false);
    }

    setUserInput('');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p>{jpText}</p>
      <p className="mt-4">
        <span className={isOk ? 'text-green-400' : 'text-red-400'}>{prevUserInput}</span>
        {questionText}
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
  );
}

export default TypingGame;
