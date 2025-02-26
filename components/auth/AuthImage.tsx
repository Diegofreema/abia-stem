import { colors } from '@/constants';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { Title } from '../typography/Title';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

export const AuthImage = (): JSX.Element => {
  return (
    <FlexWrapper
      className=" w-full sm:h-1/2 md:h-screen justify-center items-center flex-col space-y-10"
      bg={colors.bgGrey}
      paddingTop={20}
    >
      <Title
        color={colors.black}
        fontSize={{ base: 'xl', md: '3xl', lg: '5xl' }}
        width={{ base: '90%', md: '80%' }}
        lineHeight={1.2}
        textAlign={{ base: 'center', md: 'left' }}
      >
        Welcome to our community
      </Title>
      <Box width={{ base: '90%', md: '85%' }}>
        <Image
          src="/bg.svg"
          alt="image"
          width={500}
          height={500}
          className="w-full"
        />
      </Box>
    </FlexWrapper>
  );
};
