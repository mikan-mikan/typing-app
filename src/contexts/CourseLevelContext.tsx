import React, { createContext, ReactNode, useState } from 'react';

import { SelectCourseType, SelectLevelType } from '@/types';

interface ContextType {
  levelCo: SelectLevelType;
  setLevelCo: (value: SelectLevelType) => void;
  courseCo: SelectCourseType;
  setCourseCo: (value: SelectCourseType) => void;
}
interface ProviderProps {
  children: ReactNode;
}

const CourseLevelContext = createContext<ContextType>({
  levelCo: '易しい',
  setLevelCo: () => {},
  courseCo: '単語',
  setCourseCo: () => {},
});

const CourseLevelProvider = ({ children }: ProviderProps): JSX.Element => {
  const [levelCo, setLevelCo] = useState<SelectLevelType>('易しい');
  const [courseCo, setCourseCo] = useState<SelectCourseType>('単語');

  return (
    <CourseLevelContext.Provider value={{ levelCo, setLevelCo, courseCo, setCourseCo }}>
      {children}
    </CourseLevelContext.Provider>
  );
};

export { CourseLevelContext, CourseLevelProvider };
