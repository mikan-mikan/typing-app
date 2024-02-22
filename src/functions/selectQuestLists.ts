import { QUESTION_NUMBER } from '@/static';
import { QUESTIONS } from '@/static/questions';
import { QuestionType, SelectCourseType, SelectLevelType } from '@/types';

function shuffleQuestions(array: QuestionType[]): QuestionType[] {
  const arrayLength = array.length;
  const newArray: { kanji: string; kana: string }[] = [];

  // 同じ問題は出さないようにする
  while (newArray.length < QUESTION_NUMBER) {
    const randomIndex = Math.floor(Math.random() * arrayLength);
    if (!newArray.includes(array[randomIndex])) {
      newArray.push(array[randomIndex]);
    }
  }
  return newArray;
}

// TODO: 一旦すべてQUESTIONSから取得しているが、実際はコースと難易度によって取得する問題を変える
export function selectQuestLists(course: SelectCourseType, level: SelectLevelType): QuestionType[] {
  if (course === '単語' && level === '易しい') {
    return shuffleQuestions(QUESTIONS);
  } else if (course === '単語' && level === '普通') {
    return shuffleQuestions(QUESTIONS);
  } else if (course === '単語' && level === '難しい') {
    return shuffleQuestions(QUESTIONS);
  } else if (course === '文章' && level === '易しい') {
    return shuffleQuestions(QUESTIONS);
  } else if (course === '文章' && level === '普通') {
    return shuffleQuestions(QUESTIONS);
  } else if (course === '文章' && level === '難しい') {
    return shuffleQuestions(QUESTIONS);
  } else {
    return shuffleQuestions(QUESTIONS);
  }
}
