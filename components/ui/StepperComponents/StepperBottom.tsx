'use client';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useStep } from '@/hooks/useSteps';
import { Stack } from '@chakra-ui/react';
import { AdditionalInformation } from './AdditionalInformation';
import { CourseDetail } from './CourseDetail';
import { CourseMedia } from './CourseMedia';
import { Curriculum } from './Curriculum';
import { Preloaded, usePreloadedQuery, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useCourseId } from '@/hooks/useCourseId';
import { LoadingSpinner } from '@/components/universal/LoadingSpinner';

const forms = [CourseDetail, CourseMedia, Curriculum, AdditionalInformation];
export const StepperBottom = ({
  preloadedUser,
}: {
  preloadedUser: Preloaded<typeof api.users.currentUser>;
}) => {
  const [activeStep] = useStep();

  const user = usePreloadedQuery(preloadedUser);
  const courseId = useCourseId((state) => state.courseId);
  const course = useQuery(api.courses.getCourse, { courseId });

  const { step, title } = activeStep;
  const Component = forms[step];
  if (
    user === undefined ||
    user?._id === undefined ||
    course === undefined ||
    course?.course?._id === undefined
  ) {
    return <LoadingSpinner />;
  }
  return (
    <Stack p={5}>
      {/* @ts-ignore */}
      <Component title={title} loggedInUserId={user?._id} course={course} />
    </Stack>
  );
};
