import useGoToPage from '@/hooks/useGoToPage';

function GameTop(): JSX.Element {
  const { goToPage } = useGoToPage();

  return (
    <div>
      <h2 className="text-center text-4xl">スタート画面</h2>

      <div>
        <button
          type="button"
          onClick={() => {
            goToPage('セレクト');
          }}
        >
          スタートする
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            goToPage('セッティング');
          }}
        >
          設定画面
        </button>
      </div>
    </div>
  );
}

export default GameTop;
