import { ProfilePreview } from '@/components/custom-components/ProfilePreview';
import { Banner } from '@/components/ui/banner';
import {
  BannerSkeleton,
  ProfilePreviewSkeleton,
} from '@/components/ui/Skeletons';
import { Box } from '@chakra-ui/react';
import React, { Suspense } from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box width="100%" minHeight="100dvh">
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>

      <Box width={{ base: '90%', md: '75%', lg: '70%' }} mx="auto">
        <Suspense fallback={<ProfilePreviewSkeleton />}>
          <ProfilePreview />
        </Suspense>

        {children}
      </Box>
    </Box>
  );
};

export default layout;
