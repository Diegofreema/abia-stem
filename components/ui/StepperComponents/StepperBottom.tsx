'use client';
import { useStep } from '@/hooks/useSteps';
import { CourseDetail } from './CourseDetail';
import { CourseMedia } from './CourseMedia';
import { Curriculum } from './Curriculum';
import { AdditionalInformation } from './AdditionalInformation';
import { Stack } from '@chakra-ui/react';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import Orb from '@/components/custom-components/Orbs';

const forms = [CourseDetail, CourseMedia, Curriculum, AdditionalInformation];
export const StepperBottom = () => {
  const [activeStep] = useStep();
  const user = useGetCurrentUser();
  const { step, title } = activeStep;
  const Component = forms[step];
  if (user === undefined || user?._id === undefined) {
    return <Orb />;
  }
  return (
    <Stack p={5}>
      <Component title={title} loggedInUserId={user?._id} />
    </Stack>
  );
};
