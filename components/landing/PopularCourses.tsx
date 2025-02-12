'use client';

import { colors } from '@/constants';
import { Stack } from '@chakra-ui/react';
import { NormalText, Title } from '../typography/Title';
import { CoursesSwitcher } from './CoursesSwitcher';
import { Courses } from './Courses';

export const PopularCourses = (): JSX.Element => {
  return (
    <Stack textAlign={'center'} py={10} mt={20} gap={10}>
      <Title
        fontSize={{ base: '2xl', md: '5xl' }}
        fontWeight={600}
        color={colors.black}
      >
        Most Popular Courses
      </Title>
      <NormalText fontSize={{ base: 'md', md: 'lg' }}>
        Choose from hundreds of courses from specialist organizations
      </NormalText>
      <CoursesSwitcher />
      <Courses />
    </Stack>
  );
};
