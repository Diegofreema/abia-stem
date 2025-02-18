import { FlexWrapper } from '@/components/custom-components/FlexWrapper';
import { SideNav } from '@/components/custom-components/SideNav';
import { instructorRoutes } from '@/routes';
import { Box } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const InstructorLayout = ({ children }: Props) => {
  return (
    <Box minH={'100%'} width={'100%'} mt={10}>
      <FlexWrapper gap={10}>
        <Box flexBasis={'30%'}>
          <SideNav routes={instructorRoutes} />
        </Box>
        <Box width={'100%'} flexBasis={'70%'} backgroundColor={'green'}>
          {children}
        </Box>
      </FlexWrapper>
    </Box>
  );
};

export default InstructorLayout;
