import { useCallback, useContext } from 'react';

import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';
import { CurrentType } from '@/types';

type Props = {
  goToPage: (page: CurrentType) => void;
};

const useGoToPage = (): Props => {
  const { setCurrentNameCo } = useContext(CurrentScreenContext);

  const goToPage = useCallback(
    (page: CurrentType) => {
      setCurrentNameCo(page);
    },
    [setCurrentNameCo]
  );

  return { goToPage };
};

export default useGoToPage;
