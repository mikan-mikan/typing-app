import { ScoreMessageProps } from '@/types';

export const SCORE_MESSAGE_LIST: ScoreMessageProps[] = [
  {
    score: 'VeryFast',
    message: 'すごい！',
  },
  {
    score: 'Fast',
    message: '早い！',
  },
  {
    score: 'Normal',
    message: '普通！',
  },
  {
    score: 'Slow',
    message: '遅い！',
  },
  {
    score: 'VerySlow',
    message: 'もっと頑張ろう！',
  },
];

// ミスペナルティの秒数
export const SCORE_MISS_PENALTY = 2;

// スコア判定の秒数
export const SCORE_VERY_FAST = 70;
export const SCORE_FAST = 80;
export const SCORE_NORMAL = 90;
export const SCORE_SLOW = 100;
