import type { Meta, StoryObj } from '@storybook/react';

import TypingGame from './TypingGame';

const meta = {
  title: 'Organisms/TypingGame',
  component: TypingGame,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TypingGame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
