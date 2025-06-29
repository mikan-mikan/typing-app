import type { Meta, StoryObj } from '@storybook/react';

import GameTop from './GameTop';

const meta = {
  title: 'Organisms/GameTop',
  component: GameTop,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ゲームのトップ画面を表示するコンポーネント。ゲーム開始前の情報や操作を提供します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof GameTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
