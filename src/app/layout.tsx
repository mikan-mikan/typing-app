import './globals.css';

import type { Metadata } from 'next';
import { DotGothic16 } from 'next/font/google';

const dot = DotGothic16({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'タイピングアプリをつくる（仮）',
  description: 'タイピングアプリをつくる（仮）のdiscussion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ja">
      <body className={dot.className}>{children}</body>
    </html>
  );
}
