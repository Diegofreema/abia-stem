import { colors } from '@/constants';
import { Box } from '@chakra-ui/react';
import { StepperTop } from './StepperTop';
import { Suspense } from 'react';
import { StepperBottom } from './StepperBottom';

export const Stepper = (): JSX.Element => {
  return (
    <Box
      width={'100%'}
      borderWidth={1}
      borderColor={colors.bgGrey}
      borderRadius={7}
      mt={10}
    >
      <Suspense fallback={null}>
        <StepperTop />
        <StepperBottom />
      </Suspense>
    </Box>
  );
};
