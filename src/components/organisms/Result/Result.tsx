import { useContext } from 'react';

import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';
import { CurrentType } from '@/types';

function Start(): JSX.Element {
  const { setCurrentNameCo } = useContext(CurrentScreenContext);

  function goToPageButton(page: CurrentType): void {
    setCurrentNameCo(page);
  }

  return (
    <div>
      <h2 className="text-4xl">リザルト画面</h2>

      <div>
        <button
          type="button"
          onClick={() => {
            goToPageButton('トップ');
          }}
        >
          TOPへ戻るボタン
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            goToPageButton('セレクト');
          }}
        >
          コース・難易度 選択画面へ
        </button>
      </div>
    </div>
  );
}

export default Start;
