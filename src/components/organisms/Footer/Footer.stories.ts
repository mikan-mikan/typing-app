import type { Meta, StoryObj } from '@storybook/react';

import Footer from './Footer';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    docs: {
      description: {
        component: 'ページのフッター部分を表示するコンポーネント。著作権情報やリンクを含むことができます。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
