import { useCallback, useContext } from 'react';

import { CourseLevelContext } from '@/contexts/CourseLevelContext';
import { SelectCourseType, SelectLevelType } from '@/types';

type Props = {
  updateSelectCourse: (page: SelectCourseType) => void;
  updateSelectLevel: (page: SelectLevelType) => void;
};

const useUpdateSelect = (): Props => {
  const { setCourseCo, setLevelCo } = useContext(CourseLevelContext);

  const updateSelectCourse = useCallback(
    (course: SelectCourseType) => {
      setCourseCo(course);
    },
    [setCourseCo]
  );

  const updateSelectLevel = useCallback(
    (level: SelectLevelType) => {
      setLevelCo(level);
    },
    [setLevelCo]
  );

  return { updateSelectCourse, updateSelectLevel };
};

export default useUpdateSelect;
