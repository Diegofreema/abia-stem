'use client';
import { useStep } from '@/hooks/useSteps';
import { CourseDetail } from './CourseDetail';
import { CourseMedia } from './CourseMedia';
import { Curriculum } from './Curriculum';
import { AdditionalInformation } from './AdditionalInformation';
import { Stack } from '@chakra-ui/react';

const forms = [CourseDetail, CourseMedia, Curriculum, AdditionalInformation];
export const StepperBottom = (): JSX.Element => {
  const [activeStep] = useStep();
  const { step, title } = activeStep;
  const Component = forms[step];
  return (
    <Stack p={5}>
      <Component title={title} />
    </Stack>
  );
};
