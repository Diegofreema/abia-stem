import { Stack } from '@chakra-ui/react';
import { Heading } from '../custom-components/Heading';
import { TrendingCoursesCards } from './TrendingCoursesCards';

export const TrendingCourses = (): JSX.Element => {
  return (
    <Stack marginTop={20} gap={10} textAlign={'center'} py={20}>
      <Heading
        title="Our Trending Courses"
        description="Check out most 🔥 courses in the market"
      />
      <TrendingCoursesCards />
    </Stack>
  );
};
