import type { Meta, StoryObj } from '@storybook/react';

import GameScreen from './GameScreen';

const meta = {
  title: 'Organisms/GameScreen',
  component: GameScreen,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
} satisfies Meta<typeof GameScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'テキスト',
  },
};
