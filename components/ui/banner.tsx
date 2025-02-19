'use client';
import { colors } from '@/constants';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { NormalText, Title } from '../typography/Title';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { Stack } from '@chakra-ui/react';

export const Banner = () => {
  const pathname = usePathname();
  const hideContent = pathname !== '/instructor/courses/create-course';
  return (
    <FlexWrapper
      height={200}
      width={'100%'}
      bg={colors.banner}
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {!hideContent && (
        <Stack gap={3}>
          <Title color={'white'}>Submit a new Course</Title>
          <NormalText color={'white'} textAlign={'center'}>
            Read our{' '}
            <Link
              href={'/before-you-create-a-course'}
              className="underline underline-offset-2"
            >
              &quot;Before you create a course&quot;
            </Link>
            article before submitting!
          </NormalText>
        </Stack>
      )}
    </FlexWrapper>
  );
};
