import { useContext } from 'react';

import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';
import { CurrentType } from '@/types';

function GameTop(): JSX.Element {
  const { setCurrentNameCo } = useContext(CurrentScreenContext);

  function goToPageButton(page: CurrentType): void {
    setCurrentNameCo(page);
  }

  return (
    <div>
      <h2 className="text-center text-4xl">スタート画面</h2>

      <div>
        <button
          type="button"
          onClick={() => {
            goToPageButton('セレクト');
          }}
        >
          スタートする
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            goToPageButton('セッティング');
          }}
        >
          設定画面
        </button>
      </div>
    </div>
  );
}

export default GameTop;
