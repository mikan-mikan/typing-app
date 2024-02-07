import GameScreen from '@/components/organisms/GameScreen/GameScreen';

export default function Home(): JSX.Element {
  return (
    <>
      <h1 className="text-lg">タイピングアプリをつくる（仮）</h1>
      <div className="mt-10 h-135 w-full max-w-5xl">
        <GameScreen />
      </div>
    </>
  );
}
