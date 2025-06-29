import type { Meta, StoryObj } from '@storybook/react';

import Result from './Result';

const meta = {
  title: 'Organisms/Result',
  component: Result,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ゲーム結果を表示するコンポーネント。スコアや正解率などの情報を提供します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Result>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
