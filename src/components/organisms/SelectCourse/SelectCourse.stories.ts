import type { Meta, StoryObj } from '@storybook/react';

import SelectCourse from './SelectCourse';

const meta = {
  title: 'Organisms/SelectCourse',
  component: SelectCourse,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'コース選択画面のコンポーネント。ユーザーがゲームのコースを選択するためのUIを提供します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SelectCourse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
