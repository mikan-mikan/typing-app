import { useCallback, useContext } from 'react';

import { QuestionListContext } from '@/contexts/QuestionListContext';
import { selectQuestLists } from '@/functions/selectQuestLists';
import { SelectCourseType, SelectLevelType } from '@/types';

type Props = {
  updateQuestionList: (courseCo: SelectCourseType, levelCo: SelectLevelType) => void;
};

const useUpdateQuestionList = (): Props => {
  const { setQuestionListCo } = useContext(QuestionListContext);

  const updateQuestionList = useCallback(
    (courseCo: SelectCourseType, levelCo: SelectLevelType) => {
      const questionList = selectQuestLists(courseCo, levelCo);
      setQuestionListCo(questionList);
    },
    [setQuestionListCo]
  );

  return { updateQuestionList };
};

export default useUpdateQuestionList;
