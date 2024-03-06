import { useContext } from 'react';

import { CourseLevelContext } from '@/contexts/CourseLevelContext';
import { QuestionListContext } from '@/contexts/QuestionListContext';
import { ScoreContext } from '@/contexts/ScoreContext';
import { selectQuestLists } from '@/functions/selectQuestLists';
import useGoToPage from '@/hooks/useGoToPage';
import useUpdateSelect from '@/hooks/useUpdateSelect';
import { COURSES_LIST, LEVELS_LIST } from '@/static';

function SelectCourse(): JSX.Element {
  const { goToPage } = useGoToPage();
  const { courseCo, levelCo } = useContext(CourseLevelContext);
  const { updateSelectCourse, updateSelectLevel } = useUpdateSelect();
  const { setQuestionListCo } = useContext(QuestionListContext);
  const { resetScoreContext } = useContext(ScoreContext);

  return (
    <div>
      <h2 className="text-center text-4xl">コース・難易度 選択画面</h2>

      <div>
        {COURSES_LIST.map((course, i) => (
          <label key={i}>
            <input
              type="radio"
              name="course"
              value={course}
              defaultChecked={course === courseCo}
              onChange={() => {
                updateSelectCourse(course);
              }}
            />
            {course}
          </label>
        ))}
      </div>

      <div>
        {LEVELS_LIST.map((level, i) => (
          <label key={i}>
            <input
              type="radio"
              name="level"
              value={level}
              defaultChecked={level === levelCo}
              onChange={() => {
                updateSelectLevel(level);
              }}
            />
            {level}
          </label>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            // 問題作成後に、ゲーム画面へ遷移
            const questionList = selectQuestLists(courseCo, levelCo);
            setQuestionListCo(questionList);
            resetScoreContext();
            goToPage('ゲーム');
          }}
        >
          ゲームスタート
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            goToPage('トップ');
          }}
        >
          TOPに戻る
        </button>
      </div>
    </div>
  );
}

export default SelectCourse;
