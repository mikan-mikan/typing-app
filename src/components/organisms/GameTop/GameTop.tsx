import Button from '@/components/parts/Button/Button';
import useGoToPage from '@/hooks/useGoToPage';

function GameTop(): JSX.Element {
  const { goToPage } = useGoToPage();

  return (
    <div>
      <h2 className="text-center text-4xl">スタート画面</h2>

      <div>
        <Button
          label="スタートする"
          onClick={() => {
            goToPage('セレクト');
          }}
        />
      </div>

      <div>
        <Button
          label="設定画面"
          onClick={() => {
            goToPage('セッティング');
          }}
        />
      </div>
    </div>
  );
}

export default GameTop;
