'use client';
import { signIn } from '@/auth-client';
import { colors } from '@/constants';
import { IconBrandGoogle } from '@tabler/icons-react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { NormalText, Title } from '../typography/Title';
import { Button } from '../ui/button';
import { useEffect, useRef } from 'react';

export const AuthForm = (): JSX.Element => {
  const callbackUrl = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      callbackUrl.current = localStorage.getItem('callbackUrl');
    }
  }, []);
  return (
    <FlexWrapper className="bg-white w-full h-full justify-center items-center  flex-col">
      <FlexWrapper
        flexDir={'column'}
        alignItems={'center'}
        width={{ base: '90%', md: '80%' }}
        mx="auto"
        gap={5}
      >
        <NormalText fontSize={50}>👋</NormalText>
        <Title color={colors.black}>Login into Abia Stem</Title>
        <NormalText fontSize={20}>
          Nice to see you! Please log in with your account.
        </NormalText>
        <Button
          color={colors.white}
          background={colors.blue}
          px={4}
          onClick={() => signIn(callbackUrl.current || '/')}
          _hover={{
            backgroundColor: colors.skyBlue,
            transition: 'all 0.3s linear',
          }}
        >
          <IconBrandGoogle />
          Login with Google
        </Button>
      </FlexWrapper>
    </FlexWrapper>
  );
};
