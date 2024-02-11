import { useContext } from 'react';

import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';
import { CurrentType } from '@/types';

function GameTop(): JSX.Element {
  const current = useContext(CurrentScreenContext);

  function goToPageButton(page: CurrentType): void {
    current.setCurrentNameCo(page);
  }

  return (
    <div>
      <h2 className="text-center text-4xl">スタート画面</h2>

      <button
        type="button"
        onClick={() => {
          goToPageButton('セレクト');
        }}
      >
        スタートする
      </button>
    </div>
  );
}

export default GameTop;
