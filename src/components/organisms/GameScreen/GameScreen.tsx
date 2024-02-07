import React from 'react';

import TypingGame from '@/components/organisms/TypingGame/TypingGame';
import GameContainer from '@/components/parts/GameContainer/GameContainer';

const GameScreen = (): JSX.Element => {
  return (
    <GameContainer>
      <div className="flex flex-col items-center justify-center">
        {/* TODO: ここで遷移 */}
        <TypingGame />
      </div>
    </GameContainer>
  );
};

export default GameScreen;
