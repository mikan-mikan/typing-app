import { useContext } from 'react';

import { ScoreContext } from '@/contexts/ScoreContext';
import useGoToPage from '@/hooks/useGoToPage';

function Result(): JSX.Element {
  const { goToPage } = useGoToPage();

  const { elapsedTimeCo, missCo, totalTimeCo, scoreObjectCo } = useContext(ScoreContext);

  return (
    <div>
      <h2 className="text-4xl">リザルト画面</h2>

      <div className="mt-10">
        <p>経過時間: {elapsedTimeCo}秒</p>
        <p>ミス回数: {missCo}回</p>
        <p>合計秒数: {totalTimeCo}秒</p>
        <p>スコア: {scoreObjectCo.score}</p>
        <p>メッセージ: {scoreObjectCo.message}</p>
      </div>

      <div className="mt-10">
        <button
          type="button"
          onClick={() => {
            goToPage('トップ');
          }}
        >
          TOPへ戻るボタン
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            goToPage('セレクト');
          }}
        >
          コース・難易度 選択画面へ
        </button>
      </div>
    </div>
  );
}

export default Result;
