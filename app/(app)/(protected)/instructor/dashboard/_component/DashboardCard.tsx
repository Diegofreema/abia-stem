'use client';

import { FlexWrapper } from '@/components/custom-components/FlexWrapper';
import { DisplayCard } from '@/components/landing/DisplayCard';
import { api } from '@/convex/_generated/api';
import { For } from '@chakra-ui/react';
import { useAuth } from '@clerk/clerk-react';
import { IconDeviceDesktop, IconStar, IconUser } from '@tabler/icons-react';
import { useQuery } from 'convex/react';

export const DashboardCard = () => {
  const { userId } = useAuth();
  const user = useQuery(api.users.currentUser, { userId: userId! });

  if (!user) return null;

  const data = [
    {
      icon: IconDeviceDesktop,
      title: user?.numberOfCourses,
      description: 'Total Courses',
      backgroundColor: '#EAE3F6',
      color: '#6F42C1',
    },
    {
      icon: IconUser,
      title: user?.numberOfStudents,
      description: 'Students',
      backgroundColor: '#DDE2E5',
      color: '#1D3B53',
    },
    {
      icon: IconStar,
      title: user?.rating,
      description: 'Ratings',
      backgroundColor: '#FEF6E3',
      color: '#F7C32D',
    },
  ];

  return (
    <FlexWrapper gap={5}>
      <For each={data}>
        {(item, index) => <DisplayCard key={index} {...item} />}
      </For>
    </FlexWrapper>
  );
};
