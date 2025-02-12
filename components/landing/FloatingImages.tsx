import { colors } from '@/constants';
import { Box, BoxProps, Image } from '@chakra-ui/react';

type Props = BoxProps & {
  src: string;
};

export const FloatingImages = ({
  src,
  width = 43,
  height = 43,
  ...props
}: Props): JSX.Element => {
  return (
    <Box
      position={'absolute'}
      {...props}
      backgroundColor={colors.white}
      borderRadius={5}
      boxShadow={'sm'}
      p={2}
    >
      <Image src={src} alt="image" width={width} height={height} />
    </Box>
  );
};
