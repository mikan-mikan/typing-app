import type { Meta, StoryObj } from '@storybook/react';

import Start from './Start';

const meta = {
  title: 'Organisms/Start',
  component: Start,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Start>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
