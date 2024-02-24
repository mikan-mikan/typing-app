import { useContext } from 'react';

import { CourseLevelContext } from '@/contexts/CourseLevelContext';
import { CurrentScreenContext } from '@/contexts/CurrentScreenContext';
import { QuestionListContext } from '@/contexts/QuestionListContext';
import { selectQuestLists } from '@/functions/selectQuestLists';
import type { CurrentType, SelectCourseType, SelectLevelType } from '@/types';

function SelectCourse(): JSX.Element {
  const { setCurrentNameCo } = useContext(CurrentScreenContext);
  const { courseCo, setCourseCo, levelCo, setLevelCo } = useContext(CourseLevelContext);
  const { setQuestionListCo } = useContext(QuestionListContext);
  const courses: SelectCourseType[] = ['単語', '文章'];
  const levels: SelectLevelType[] = ['易しい', '普通', '難しい'];

  function goToPageButton(page: CurrentType): void {
    setCurrentNameCo(page);
  }

  function updateSelectCourse(course: SelectCourseType): void {
    setCourseCo(course);
  }

  function updateSelectLevel(level: SelectLevelType): void {
    setLevelCo(level);
  }

  return (
    <div>
      <h2 className="text-center text-4xl">コース・難易度 選択画面</h2>

      <div>
        {courses.map((course, i) => (
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
        {levels.map((level, i) => (
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
            goToPageButton('ゲーム');
          }}
        >
          ゲームスタート
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            goToPageButton('トップ');
          }}
        >
          TOPに戻る
        </button>
      </div>
    </div>
  );
}

export default SelectCourse;
