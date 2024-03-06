import useGoToPage from '@/hooks/useGoToPage';

function Settings(): JSX.Element {
  const { goToPage } = useGoToPage();

  return (
    <div>
      <h2 className="text-center text-4xl">設定画面</h2>

      {/* TODO: 効果音、BGM を設定 */}

      <div>
        <button
          type="button"
          onClick={() => {
            // TODO: 遷移前の画面に戻る、仮でトップ画面に戻る
            goToPage('トップ');
          }}
        >
          戻る
        </button>
      </div>
    </div>
  );
}

export default Settings;
