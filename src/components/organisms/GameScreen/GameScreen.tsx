'use client';

import React, { useContext } from 'react';

import GameTop from '@/components/organisms/GameTop/GameTop';
import Result from '@/components/organisms/Result/Result';
import SelectCourse from '@/components/organisms/SelectCourse/SelectCourse';
import Settings from '@/components/organisms/Settings/Settings';
import TypingGame from '@/components/organisms/TypingGame/TypingGame';
import GameContainer from '@/components/parts/GameContainer/GameContainer';
import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';

const GameScreen = (): JSX.Element => {
  const current = useContext(CurrentScreenContext);
  return (
    <GameContainer>
      <div className="flex size-full flex-col items-center justify-center">
        {current.currentNameCo === 'トップ' && <GameTop />}
        {current.currentNameCo === 'セレクト' && <SelectCourse />}
        {current.currentNameCo === 'ゲーム' && <TypingGame />}
        {current.currentNameCo === 'リザルト' && <Result />}
        {current.currentNameCo === 'セッティング' && <Settings />}
      </div>
    </GameContainer>
  );
};

export default GameScreen;
