import { useQueryState } from 'nuqs';

export const useSelectCourses = () => {
  return useQueryState('selected-course', {
    defaultValue: 'Web Design',
  });
};
