'use client';

import React, { useContext } from 'react';

import Result from '@/components/organisms/Result/Result';
import Start from '@/components/organisms/Start/Start';
import TypingGame from '@/components/organisms/TypingGame/TypingGame';
import GameContainer from '@/components/parts/GameContainer/GameContainer';
import { CurrentScreenContext } from '@/context/CurrentScreenContext';

const GameScreen = (): JSX.Element => {
  const current = useContext(CurrentScreenContext);
  return (
    <GameContainer>
      <div className="flex size-full flex-col items-center justify-center">
        {current.currentNameCo === 'スタート' && <Start />}
        {current.currentNameCo === 'ゲーム' && <TypingGame />}
        {current.currentNameCo === 'リザルト' && <Result />}
      </div>
    </GameContainer>
  );
};

export default GameScreen;
