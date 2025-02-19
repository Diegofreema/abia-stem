import { ProfilePreview } from '@/components/custom-components/ProfilePreview';
import { Banner } from '@/components/ui/banner';
import { Box } from '@chakra-ui/react';
import React, { Suspense } from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box width="100%" minHeight="100dvh">
        <Banner />

        <Box width={{ base: '90%', md: '75%', lg: '70%' }} mx="auto">
          <ProfilePreview />

          {children}
        </Box>
      </Box>
    </Suspense>
  );
};

export default layout;
