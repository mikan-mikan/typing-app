'use client';

import React, { useContext } from 'react';

import Start from '@/components/organisms/Start/Start';
import TypingGame from '@/components/organisms/TypingGame/TypingGame';
import GameContainer from '@/components/parts/GameContainer/GameContainer';
import { CurrentScreenContext } from '@/context/CurrentScreenContext';

const GameScreen = (): JSX.Element => {
  const current = useContext(CurrentScreenContext);
  return (
    <GameContainer>
      <div className="flex flex-col items-center justify-center">
        {/* TODO: ここで遷移 */}
        {current.currentNameCo === 'スタート' && <Start />}
        {current.currentNameCo === 'ゲーム' && <TypingGame />}
      </div>
    </GameContainer>
  );
};

export default GameScreen;
