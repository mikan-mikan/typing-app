import type { Meta, StoryObj } from '@storybook/react';

import Settings from './Settings';

const meta = {
  title: 'Organisms/Settings',
  component: Settings,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ユーザー設定画面のコンポーネント。ゲームの設定やユーザーの好みに応じたオプションを提供します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Settings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
