import { useContext, useState } from 'react';

import { UserSettingContext } from '@/contexts/UserSettingContext';
import useGoToPage from '@/hooks/useGoToPage';
import { SETTING_NAME, SETTING_RADIO_TYPE, SETTING_VOLUME } from '@/static/settings';

function Settings(): JSX.Element {
  const { goToPage } = useGoToPage();
  const { seCo, setSeCo, bgmCo, setBgmCo, seVolumeCo, setSeVolumeCo, bgmVolumeCo, setBgmVolumeCo } =
    useContext(UserSettingContext);
  const [bgmVolume, setBgmVolume] = useState<number>(bgmVolumeCo);
  const [seVolume, setSeVolume] = useState<number>(seVolumeCo);

  return (
    <div>
      <h2 className="text-center text-4xl">設定画面</h2>

      <hr />

      <p>BGM</p>
      <div>
        {SETTING_RADIO_TYPE.map((name, i) => (
          <label key={i}>
            <input
              type="radio"
              name={SETTING_NAME[0]}
              value={SETTING_RADIO_TYPE[i]}
              defaultChecked={SETTING_RADIO_TYPE[i] === 'on' ? bgmCo : !bgmCo}
              onChange={() => {
                setBgmCo(!bgmCo);
              }}
            />
            {SETTING_RADIO_TYPE[i].toUpperCase()}
          </label>
        ))}
      </div>
      <div>
        <label>
          Volume
          <input
            type="range"
            name="bgmVolume"
            min={SETTING_VOLUME.min}
            max={SETTING_VOLUME.max}
            value={bgmVolume}
            onInput={(e) => {
              const target = Number(e.currentTarget.value);
              setBgmVolume(target);
              setBgmVolumeCo(target);
            }}
          />
        </label>
      </div>

      <hr />

      <p>SE</p>
      <div>
        {SETTING_RADIO_TYPE.map((name, i) => (
          <label key={i}>
            <input
              type="radio"
              name={SETTING_NAME[1]}
              value={SETTING_RADIO_TYPE[i]}
              defaultChecked={SETTING_RADIO_TYPE[i] === 'on' ? seCo : !seCo}
              onChange={() => {
                setSeCo(!seCo);
              }}
            />
            {SETTING_RADIO_TYPE[i].toUpperCase()}
          </label>
        ))}
      </div>
      <div>
        <label>
          Volume
          <input
            type="range"
            name="seVolume"
            min={SETTING_VOLUME.min}
            max={SETTING_VOLUME.max}
            value={seVolume}
            onInput={(e) => {
              const target = Number(e.currentTarget.value);
              setSeVolume(target);
              setSeVolumeCo(target);
            }}
          />
        </label>
      </div>

      <hr />

      <div>
        <button
          type="button"
          onClick={() => {
            // TODO: 遷移前の画面に戻る、仮でトップ画面に戻る
            goToPage('トップ');
          }}
        >
          戻る
        </button>
      </div>
    </div>
  );
}

export default Settings;
