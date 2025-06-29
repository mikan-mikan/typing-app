import { Meta, StoryObj } from '@storybook/react';

import { UserSettingProvider } from '@/contexts/UserSettingContext';

import Button from './Button';

export default {
  title: 'Parts/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          '汎用的なボタンコンポーネント。`label`でボタンのテキストを指定し、`onClick`でクリック時の動作を指定します。seTypeでSE種別を切り替え可能。',
      },
    },
  },
  argTypes: {
    label: {
      description: 'ボタンに表示されるテキスト',
      control: 'text',
    },
    onClick: {
      description: 'ボタンがクリックされたときに実行される関数',
      action: 'clicked',
    },
    seType: {
      description: '再生するSEの種類',
      control: { type: 'radio' },
      options: ['se-button-next', 'se-button-back'],
    },
  },
  decorators: [
    (Story): JSX.Element => (
      <UserSettingProvider>
        <Story />
      </UserSettingProvider>
    ),
  ],
  tags: ['autodocs'],
} as Meta;

export const Default: StoryObj<{ label: string; onClick: () => void; seType?: 'back' | 'next' }> = {
  args: {
    label: 'クリック',
    onClick: (): void => {
      alert('ボタンがクリックされました！');
    },
    seType: 'next',
  },
};

export const BackSE: StoryObj<{ label: string; onClick: () => void; seType?: 'back' | 'next' }> = {
  args: {
    label: '戻る',
    onClick: (): void => {
      alert('戻るボタンがクリックされました！');
    },
    seType: 'back',
  },
};
