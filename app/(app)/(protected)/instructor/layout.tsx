import { FlexWrapper } from '@/components/custom-components/FlexWrapper';
import { SideNav } from '@/components/custom-components/SideNav';
import { SidebarSkeleton } from '@/components/ui/Skeletons';
import { instructorRoutes } from '@/routes';
import { Box } from '@chakra-ui/react';
import React, { Suspense } from 'react';

type Props = {
  children: React.ReactNode;
};

const InstructorLayout = ({ children }: Props) => {
  return (
    <Box minH={'100%'} width={'100%'} mt={10}>
      <FlexWrapper gap={10}>
        <Suspense fallback={<SidebarSkeleton />}>
          <SideNav routes={instructorRoutes} />
        </Suspense>
        <Box width={'100%'} flexBasis={'70%'} flex={1}>
          {children}
        </Box>
      </FlexWrapper>
    </Box>
  );
};

export default InstructorLayout;
