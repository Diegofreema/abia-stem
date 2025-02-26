'use client';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useStep } from '@/hooks/useSteps';
import { Stack } from '@chakra-ui/react';
import { AdditionalInformation } from './AdditionalInformation';
import { CourseDetail } from './CourseDetail';
import { CourseMedia } from './CourseMedia';
import { Curriculum } from './Curriculum';

const forms = [CourseDetail, CourseMedia, Curriculum, AdditionalInformation];
export const StepperBottom = () => {
  const [activeStep] = useStep();
  const user = useGetCurrentUser();
  const { step, title } = activeStep;
  const Component = forms[step];
  if (user === undefined || user?._id === undefined) {
    return null;
  }
  return (
    <Stack p={5}>
      <Component title={title} loggedInUserId={user?._id} />
    </Stack>
  );
};
