'use client';

import React, { useContext } from 'react';

import Start from '@/components/organisms/GameTop/GameTop';
import Result from '@/components/organisms/Result/Result';
import TypingGame from '@/components/organisms/TypingGame/TypingGame';
import GameContainer from '@/components/parts/GameContainer/GameContainer';
import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';

import SelectCourse from '../SelectCourse/SelectCourse';

const GameScreen = (): JSX.Element => {
  const current = useContext(CurrentScreenContext);
  return (
    <GameContainer>
      <div className="flex size-full flex-col items-center justify-center">
        {current.currentNameCo === 'トップ' && <Start />}
        {current.currentNameCo === 'セレクト' && <SelectCourse />}
        {current.currentNameCo === 'ゲーム' && <TypingGame />}
        {current.currentNameCo === 'リザルト' && <Result />}
      </div>
    </GameContainer>
  );
};

export default GameScreen;
