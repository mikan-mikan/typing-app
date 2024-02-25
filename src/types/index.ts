// Description: 型定義ファイル

// ゲームの状態の型
export type CurrentType = 'トップ' | 'セレクト' | 'ゲーム' | 'リザルト' | 'セッティング';

// 難易度の型
export type SelectLevelType = '易しい' | '普通' | '難しい';

// コースの型
export type SelectCourseType = '単語' | '文章';

// 問題データの型
export type QuestionType = {
  kanji: string;
  kana: string;
};

// スコアの型
export type ScoreProps = 'VeryFast' | 'Fast' | 'Normal' | 'Slow' | 'VerySlow';

// スコアとメッセージの型
export type ScoreMessageProps = {
  score: ScoreProps | '';
  message: string;
};

// ミス回数,秒数の型
export type ScoreMissProps = {
  missCount: number;
  missTime: number;
};
