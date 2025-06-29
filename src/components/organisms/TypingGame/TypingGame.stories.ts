import type { Meta, StoryObj } from '@storybook/react';
import TypingGame from './TypingGame';

const meta: Meta<typeof TypingGame> = {
  title: 'Organisms/TypingGame',
  component: TypingGame,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'タイピングゲームのメイン画面。ユーザーがタイピングを行うためのUIを提供します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TypingGame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
