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
