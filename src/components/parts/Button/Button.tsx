import React from 'react';

type ButtonProps = {
  label: string; // ボタンのラベル
  onClick: () => void; // クリック時の動作
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
