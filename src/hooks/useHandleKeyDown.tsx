import { useCallback } from 'react';

import useGoToPage from '@/hooks/useGoToPage';

type Props = {
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const useHandleKeyDown = (): Props => {
  const { goToPage } = useGoToPage();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      // ゲームを中断してセレクト画面へ遷移
      if (event.key === 'Escape') {
        goToPage('セレクト');
      }
    },
    [goToPage]
  );

  return { handleKeyDown };
};

export default useHandleKeyDown;
