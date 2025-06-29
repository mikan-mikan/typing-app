import { useCallback, useEffect, useState } from 'react';

type TimerProps = {
  elapsedTime: number;
  startGameTimer: () => void;
  stopGameTimer: () => void;
};

const useGameTimer = (): TimerProps => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else if (elapsedTime !== 0) {
      clearInterval(interval as unknown as NodeJS.Timeout);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, elapsedTime]);

  const startGameTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  const stopGameTimer = useCallback(() => {
    setIsActive(false);
    setElapsedTime(0); // 経過時間をリセット
  }, []);

  return { elapsedTime, startGameTimer, stopGameTimer };
};

export default useGameTimer;
