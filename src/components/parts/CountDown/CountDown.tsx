import React, { useEffect, useState } from 'react';

type Props = {
  onCountdownFinished: () => void;
};

function CountDown({ onCountdownFinished }: Props): JSX.Element {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    } else {
      // １秒後にonCountdownFinishedを実行
      setTimeout(() => {
        onCountdownFinished();
      }, 1000);
      return;
    }
  }, [count, onCountdownFinished]);

  return <div>{count > 0 ? count : 'スタート！'}</div>;
}

export default CountDown;
