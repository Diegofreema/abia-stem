import { colors } from '@/constants';
import { Box } from '@chakra-ui/react';
import { StepperTop } from './StepperTop';
import { Suspense } from 'react';
import { StepperBottom } from './StepperBottom';
import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { LoadingSpinner } from '@/components/universal/LoadingSpinner';

export const Stepper = async ({ userId }: { userId: string }) => {
  const preloadUser = await preloadQuery(api.users.currentUser, {
    userId,
  });
  return (
    <Box
      width={'100%'}
      borderWidth={1}
      borderColor={colors.bgGrey}
      borderRadius={7}
      mt={10}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <StepperTop />
        <StepperBottom preloadedUser={preloadUser} />
      </Suspense>
    </Box>
  );
};
