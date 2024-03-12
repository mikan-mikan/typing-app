import React, { createContext, ReactNode, useState } from 'react';

interface ProviderProps {
  children: ReactNode;
}
interface UserSettingProps {
  bgmCo: boolean;
  setBgmCo: (value: boolean) => void;
  seCo: boolean;
  setSeCo: (value: boolean) => void;
  bgmVolumeCo: number;
  setBgmVolumeCo: (value: number) => void;
  seVolumeCo: number;
  setSeVolumeCo: (value: number) => void;
}

const UserSettingContext = createContext<UserSettingProps>({
  bgmCo: true,
  setBgmCo: () => {},
  seCo: true,
  setSeCo: () => {},
  bgmVolumeCo: 70,
  setBgmVolumeCo: () => {},
  seVolumeCo: 70,
  setSeVolumeCo: () => {},
});

const UserSettingProvider = ({ children }: ProviderProps): JSX.Element => {
  const [bgmCo, setBgmCo] = useState<boolean>(true);
  const [seCo, setSeCo] = useState<boolean>(true);
  const [bgmVolumeCo, setBgmVolumeCo] = useState<number>(70);
  const [seVolumeCo, setSeVolumeCo] = useState<number>(70);

  return (
    <UserSettingContext.Provider
      value={{
        bgmCo,
        setBgmCo,
        seCo,
        setSeCo,
        bgmVolumeCo,
        setBgmVolumeCo,
        seVolumeCo,
        setSeVolumeCo,
      }}
    >
      {children}
    </UserSettingContext.Provider>
  );
};

export { UserSettingContext, UserSettingProvider };
