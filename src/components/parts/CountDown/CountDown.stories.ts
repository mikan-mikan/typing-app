import type { Meta, StoryObj } from '@storybook/react';

import CountDown from './CountDown';

const meta = {
  title: 'Parts/CountDown',
  component: CountDown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CountDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
