import { useContext } from 'react';

import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';

function Start(): JSX.Element {
  const current = useContext(CurrentScreenContext);

  function handleStartButton(): void {
    current.setCurrentNameCo('ゲーム');
  }

  return (
    <div>
      <h2 className="text-center text-4xl">スタート画面</h2>

      <button type="button" onClick={handleStartButton}>
        スタートするボタン
      </button>
    </div>
  );
}

export default Start;
