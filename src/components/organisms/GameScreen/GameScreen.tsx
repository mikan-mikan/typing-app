import React from 'react';

import GameContainer from '@/components/parts/GameContainer/GameContainer';

const GameScreen = (): JSX.Element => {
  return (
    <GameContainer>
      <div className="flex flex-col items-center justify-center">
        <p>ここで遷移</p>
      </div>
    </GameContainer>
  );
};

export default GameScreen;
