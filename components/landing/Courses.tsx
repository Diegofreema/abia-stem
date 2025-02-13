'use client';
import { coursesArray } from '@/dummy_data';
import { useSelectCourses } from '@/hooks/useSelectCourses';
import { For, SimpleGrid } from '@chakra-ui/react';
import { CourseCard } from './CourseCard';

export const Courses = () => {
  const [selectedCourse] = useSelectCourses();
  const filteredCourses = coursesArray.filter(
    (course) => course.category === selectedCourse
  );

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={{ base: 5, md: 10 }}>
      <For each={filteredCourses}>
        {(course, index) => <CourseCard course={course} key={index} />}
      </For>
    </SimpleGrid>
  );
};
