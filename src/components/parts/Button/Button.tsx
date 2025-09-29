import React, { useContext } from 'react';

import { UserSettingContext } from '@/contexts/UserSettingContext';

type ButtonProps = {
  label: string; // ボタンのラベル
  onClick: () => void; // クリック時の動作
  seType?: 'back' | 'next'; // SE種別
};

const Button = ({ label, onClick, seType = 'next' }: ButtonProps): JSX.Element => {
  const { seCo, seVolumeCo } = useContext(UserSettingContext);

  const handleClick = (): void => {
    if (seCo) {
      const audio = new Audio(`/music/se-button-${seType}.mp3`);
      audio.volume = seVolumeCo / 100;
      void audio.play();
    }
    onClick();
  };

  return (
    <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
