import { colors } from '@/constants';
import { Box } from '@chakra-ui/react';

export const Banner = (): JSX.Element => {
  return <Box height={200} width={'100%'} bg={colors.banner} />;
};
