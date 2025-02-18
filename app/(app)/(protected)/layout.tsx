import { ProfilePreview } from '@/components/custom-components/ProfilePreview';
import { Banner } from '@/components/ui/banner';
import { Box } from '@chakra-ui/react';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box width="100%" minHeight="100dvh">
      <Banner />
      <Box width={{ base: '90%', md: '75%', lg: '65%' }} mx="auto">
        <ProfilePreview />
        {children}
      </Box>
    </Box>
  );
};

export default layout;
