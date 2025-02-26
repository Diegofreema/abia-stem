'use client';
import { colors } from '@/constants';

import { SignInButton } from '@clerk/clerk-react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { NormalText, Title } from '../typography/Title';
import { Button } from '../ui/button';
import { GoogleLogo } from '../ui/GoogleLogo';

export const AuthForm = () => {
  return (
    <FlexWrapper className="bg-white w-full sm:h-1/2 md:h-full pt-10 justify-center items-center  flex-col">
      <FlexWrapper
        flexDir={'column'}
        alignItems={'center'}
        width={{ base: '90%', md: '80%' }}
        mx="auto"
        gap={5}
      >
        <NormalText fontSize={50}>👋</NormalText>
        <Title
          color={colors.black}
          fontSize={{ base: 'xl', md: '3xl', lg: '5xl' }}
        >
          Login into Abia Stem
        </Title>
        <NormalText fontSize={20}>
          Nice to see you! Please log in with your account.
        </NormalText>
        <SignInButton
          mode="modal"
          signUpFallbackRedirectUrl={'/'}
          signUpForceRedirectUrl={'/'}
          fallbackRedirectUrl={'/'}
          forceRedirectUrl={'/'}
        >
          <Button
            color={colors.white}
            background={colors.blue}
            px={4}
            loadingText="Signing in..."
            _hover={{
              backgroundColor: colors.skyBlue,
              transition: 'all 0.3s linear',
            }}
            width={{ base: '100%', md: 'fit-content' }}
          >
            <GoogleLogo />
            Login with Google
          </Button>
        </SignInButton>
      </FlexWrapper>
    </FlexWrapper>
  );
};
