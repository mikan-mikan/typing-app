import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const GameContainer = ({ children }: Props): JSX.Element => {
  return <div className="size-full border-2 border-sky-500 bg-white dark:bg-slate-800">{children}</div>;
};

export default GameContainer;
