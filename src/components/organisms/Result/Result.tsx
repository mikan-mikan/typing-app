import { useContext } from 'react';

import { CurrentScreenContext } from '@/context/CurrentScreenContext';

function Start(): JSX.Element {
  const current = useContext(CurrentScreenContext);

  function handleButton(): void {
    current.setCurrentNameCo('スタート');
  }

  return (
    <div>
      <h2 className="text-4xl">リザルト画面</h2>

      <button type="button" onClick={handleButton}>
        TOPへ戻るボタン
      </button>
    </div>
  );
}

export default Start;
