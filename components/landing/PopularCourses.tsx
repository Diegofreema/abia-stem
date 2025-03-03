'use client';

import { Stack } from '@chakra-ui/react';
import { Heading } from '../custom-components/Heading';
import { Courses } from './Courses';
import { CoursesSwitcher } from './CoursesSwitcher';
import { Suspense } from 'react';

export const PopularCourses = (): JSX.Element => {
  return (
    <Stack textAlign={'center'} py={10} mt={20} gap={10}>
      <Heading
        title=" Most Popular Courses"
        description="Choose from hundreds of courses from specialist organizations"
      />
      <Suspense>
        <CoursesSwitcher />
      </Suspense>
      <Suspense>
        <Courses />
      </Suspense>
    </Stack>
  );
};
