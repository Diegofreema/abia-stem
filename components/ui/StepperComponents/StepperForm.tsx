import { Box } from '@chakra-ui/react';
import { NormalText } from '../../typography/Title';
import { Stepper } from './Stepper';

export const StepperForm = ({ userId }: { userId: string }) => {
  return (
    <Box flexDirection={'column'} gap={5} minWidth={'100%'}>
      <NormalText
        textAlign={'center'}
        maxW={{ base: '90%', md: '70%' }}
        mx={'auto'}
        fontSize={{ base: '0.9rem', md: '1.1rem' }}
      >
        Use this interface to add a new Course to the portal. Once you are done
        adding the item it will be reviewed for quality. If approved, your
        course will appear for sale and you will be informed by email that your
        course has been accepted.
      </NormalText>
      <Stepper userId={userId} />
    </Box>
  );
};
