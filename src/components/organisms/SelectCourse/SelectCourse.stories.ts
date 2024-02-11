import type { Meta, StoryObj } from '@storybook/react';

import SelectCourse from './SelectCourse';

const meta = {
  title: 'Organisms/SelectCourse',
  component: SelectCourse,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SelectCourse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
