import { SCORE_FAST, SCORE_NORMAL, SCORE_SLOW, SCORE_VERY_FAST } from '@/static/scores';
import { ScoreMessageProps } from '@/types';

export const judgeScore = (totalTime: number): ScoreMessageProps => {
  if (totalTime < SCORE_VERY_FAST) {
    return { score: 'VeryFast', message: 'すごい！' };
  } else if (totalTime < SCORE_FAST) {
    return { score: 'Fast', message: '早い！' };
  } else if (totalTime < SCORE_NORMAL) {
    return { score: 'Normal', message: '普通！' };
  } else if (totalTime < SCORE_SLOW) {
    return { score: 'Slow', message: '遅い！' };
  } else {
    return { score: 'VerySlow', message: 'もっと頑張ろう！' };
  }
};
