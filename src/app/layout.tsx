import './globals.css';

import type { Metadata } from 'next';
import { DotGothic16 } from 'next/font/google';

import Footer from '@/components/organisms/Footer/Footer';

import Provider from './provider';

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
      <body className={dot.className}>
        <Provider>
          <div className="flex min-h-screen flex-col items-center justify-between px-4 py-0">
            <main className="flex w-full flex-1 flex-col items-center justify-center">{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
