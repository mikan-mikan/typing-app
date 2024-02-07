import type { Meta, StoryObj } from '@storybook/react';

import GameContainer from './GameContainer';

const meta = {
  title: 'Parts/GameContainer',
  component: GameContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
} satisfies Meta<typeof GameContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'テキスト',
  },
};
