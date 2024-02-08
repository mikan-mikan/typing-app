import { useContext } from 'react';

import { CurrentScreenContext } from '@/context/CurrentScreenContext';

function Start(): JSX.Element {
  const current = useContext(CurrentScreenContext);

  function handleStartButton(): void {
    current.setCurrentNameCo('ゲーム');
  }

  return (
    <div>
      <button type="button" onClick={handleStartButton}>
        スタートするボタン
      </button>
    </div>
  );
}

export default Start;
