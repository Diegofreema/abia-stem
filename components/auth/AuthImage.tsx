import { colors } from '@/constants';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { Title } from '../typography/Title';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

export const AuthImage = (): JSX.Element => {
  return (
    <FlexWrapper
      className=" w-full h-screen justify-center items-center flex-col space-y-10"
      bg={colors.bgGrey}
    >
      <Title color={colors.black} fontSize={{ base: '3xl', md: '5xl' }}>
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
