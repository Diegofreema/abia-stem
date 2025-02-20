import { TitleProps } from '@/types';
import { Stack } from '@chakra-ui/react';
import { StepperTitle } from './StepperTitle';

export const AdditionalInformation = ({ title }: TitleProps): JSX.Element => {
  return (
    <Stack>
      <StepperTitle title={title} />
    </Stack>
  );
};
