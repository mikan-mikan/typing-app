import Footer from '@/components/organisms/Footer/Footer';
import GameScreen from '@/components/organisms/GameScreen/GameScreen';

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 pb-0 pt-20">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-lg">タイピングアプリをつくる（仮）</h1>
        <div className="mt-10 h-135 w-full max-w-5xl">
          <GameScreen />
        </div>
      </div>

      <Footer />
    </main>
  );
}
