'use client';

import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { FlexWrapper } from './FlexWrapper';
import { Avatar } from '../ui/avatar';
import { Stack } from '@chakra-ui/react';
import { NormalText, Title } from '../typography/Title';
import { colors } from '@/constants';
import { IconBook, IconStar, IconUser } from '@tabler/icons-react';
import { Button } from '../ui/button';
import NumberFormatter from './NumberFormatter';
import { usePathname, useRouter } from 'next/navigation';

export const ProfilePreview = () => {
  const { userId } = useAuth();
  const user = useQuery(api.users.currentUser, { userId: userId! });
  const router = useRouter();
  const pathname = usePathname();
  const onNavigate = () => {
    router.push('/instructor/courses/create-course');
  };
  if (pathname === '/instructor/courses/create-course') return null;
  const ratingText =
    user?.rating === 0 ? 'No rating yet' : `${user?.rating.toFixed(1) || 0}/5`;
  return (
    <FlexWrapper
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <FlexWrapper gap={5} alignItems={'center'}>
        <Avatar src={user?.image} width={150} height={150} mt={-10} />
        <Stack>
          <Title color={colors.black} fontSize={{ base: 'xl', md: '3xl' }}>
            {user?.name}
          </Title>
          <FlexWrapper gap={4} alignItems={'center'}>
            <FlexWrapper alignItems={'center'} gap={1}>
              <IconStar size={20} fill="#FFD700" />{' '}
              <NormalText color={colors.black} fontSize={18}>
                {ratingText}
              </NormalText>
            </FlexWrapper>
            <FlexWrapper alignItems={'center'} gap={1}>
              <IconUser size={20} fill={colors.orange} color={colors.orange} />
              <NumberFormatter
                number={user?.numberOfStudents}
                text="enrolled students"
              />
            </FlexWrapper>
            <FlexWrapper alignItems={'center'} gap={1}>
              <IconBook size={20} fill={colors.purple} color={colors.purple} />
              <NumberFormatter number={user?.numberOfCourses} text="courses" />
            </FlexWrapper>
          </FlexWrapper>
        </Stack>
      </FlexWrapper>
      <Button
        color={colors.white}
        onClick={onNavigate}
        bg={colors.green}
        px={5}
        _hover={{ opacity: 0.5 }}
        className="transition duration-300"
      >
        Create a course
      </Button>
    </FlexWrapper>
  );
};
