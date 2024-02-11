import { useContext } from 'react';

import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';
import type { CurrentType } from '@/types';

function SelectCourse(): JSX.Element {
  const current = useContext(CurrentScreenContext);

  function goToPageButton(page: CurrentType): void {
    current.setCurrentNameCo(page);
  }

  return (
    <div>
      <h2 className="text-center text-4xl">コース・難易度 選択画面</h2>

      {/* TODO: ループ・context・コンポーネント化 */}
      <div>
        <label>
          <input type="radio" name="course" value="単語" defaultChecked />
          単語
        </label>
        <label>
          <input type="radio" name="course" value="文章" />
          文章
        </label>
      </div>

      <div>
        <label>
          <input type="radio" name="level" value="易しい" defaultChecked />
          易しい
        </label>
        <label>
          <input type="radio" name="level" value="普通" />
          普通
        </label>
        <label>
          <input type="radio" name="level" value="難しい" />
          難しい
        </label>
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            goToPageButton('ゲーム');
          }}
        >
          ゲームスタート
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            goToPageButton('トップ');
          }}
        >
          TOPに戻る
        </button>
      </div>
    </div>
  );
}

export default SelectCourse;
