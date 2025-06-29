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

const STORAGE_KEY = 'typing-app-user-settings';

const defaultSettings = {
  bgmCo: false,
  seCo: false,
  bgmVolumeCo: 65,
  seVolumeCo: 65,
};

type Settings = typeof defaultSettings;

const getInitialSettings = (): Settings => {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'bgmCo' in parsed &&
        'seCo' in parsed &&
        'bgmVolumeCo' in parsed &&
        'seVolumeCo' in parsed
      ) {
        const obj = parsed as Partial<Settings>;
        return {
          bgmCo: typeof obj.bgmCo === 'boolean' ? obj.bgmCo : defaultSettings.bgmCo,
          seCo: typeof obj.seCo === 'boolean' ? obj.seCo : defaultSettings.seCo,
          bgmVolumeCo: typeof obj.bgmVolumeCo === 'number' ? obj.bgmVolumeCo : defaultSettings.bgmVolumeCo,
          seVolumeCo: typeof obj.seVolumeCo === 'number' ? obj.seVolumeCo : defaultSettings.seVolumeCo,
        };
      }
    }
  } catch (e) {
    // 何もしない（パース失敗時はデフォルト）
  }
  return defaultSettings;
};

const UserSettingContext = createContext<UserSettingProps>({
  bgmCo: false,
  setBgmCo: () => {},
  seCo: false,
  setSeCo: () => {},
  bgmVolumeCo: 65,
  setBgmVolumeCo: () => {},
  seVolumeCo: 65,
  setSeVolumeCo: () => {},
});

const UserSettingProvider = ({ children }: ProviderProps): JSX.Element => {
  const initial = getInitialSettings();
  const [settings, setSettings] = useState<Settings>(initial);

  // ローカルストレージに保存（settingsが変わるたび）
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // setter
  const setBgmCo = (value: boolean): void => {
    setSettings((prev) => ({ ...prev, bgmCo: value }));
  };
  const setSeCo = (value: boolean): void => {
    setSettings((prev) => ({ ...prev, seCo: value }));
  };
  const setBgmVolumeCo = (value: number): void => {
    setSettings((prev) => ({ ...prev, bgmVolumeCo: value }));
  };
  const setSeVolumeCo = (value: number): void => {
    setSettings((prev) => ({ ...prev, seVolumeCo: value }));
  };

  return (
    <UserSettingContext.Provider
      value={{
        bgmCo: settings.bgmCo,
        setBgmCo,
        seCo: settings.seCo,
        setSeCo,
        bgmVolumeCo: settings.bgmVolumeCo,
        setBgmVolumeCo,
        seVolumeCo: settings.seVolumeCo,
        setSeVolumeCo,
      }}
    >
      {children}
    </UserSettingContext.Provider>
  );
};

export { UserSettingContext, UserSettingProvider };
