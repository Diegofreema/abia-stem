import { TitleProps } from '@/types';
import { StepperTitle } from './StepperTitle';
import { Stack } from '@chakra-ui/react';

export const CourseMedia = ({ title }: TitleProps): JSX.Element => {
  return (
    <Stack>
      <StepperTitle title={title} />
    </Stack>
  );
};
