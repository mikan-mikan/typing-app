import { useContext } from 'react';

import Button from '@/components/parts/Button/Button';
import { CourseLevelContext } from '@/contexts/CourseLevelContext';
import { ScoreContext } from '@/contexts/ScoreContext';
import useGoToPage from '@/hooks/useGoToPage';
import useUpdateQuestionList from '@/hooks/useUpdateQuestionList';
import useUpdateSelect from '@/hooks/useUpdateSelect';
import { COURSES_LIST, LEVELS_LIST } from '@/static';

function SelectCourse(): JSX.Element {
  const { goToPage } = useGoToPage();
  const { updateQuestionList } = useUpdateQuestionList();
  const { updateSelectCourse, updateSelectLevel } = useUpdateSelect();
  const { courseCo, levelCo } = useContext(CourseLevelContext);
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
        <Button
          label="ゲームスタート"
          onClick={() => {
            updateQuestionList(courseCo, levelCo);
            resetScoreContext();
            goToPage('ゲーム');
          }}
        />
      </div>
      <div>
        <Button
          label="TOPに戻る"
          onClick={() => {
            goToPage('トップ');
          }}
          seType="back"
        />
      </div>
    </div>
  );
}

export default SelectCourse;
