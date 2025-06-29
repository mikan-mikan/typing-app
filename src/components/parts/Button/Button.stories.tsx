import { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

export default {
  title: 'Parts/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          '汎用的なボタンコンポーネント。`label`でボタンのテキストを指定し、`onClick`でクリック時の動作を指定します。',
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
  },
  tags: ['autodocs'],
} as Meta;

export const Default: StoryObj<{ label: string; onClick: () => void }> = {
  args: {
    label: 'クリック',
    onClick: (): void => {
      alert('ボタンがクリックされました！');
    },
  },
};
