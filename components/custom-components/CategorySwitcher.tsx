'use client';
import {
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { colors } from '@/constants';
import { courses } from '@/dummy_data';
import { For, Text } from '@chakra-ui/react';
import { IconLayoutDashboard } from '@tabler/icons-react';
import { Title } from '../typography/Title';
import { FlexWrapper } from './FlexWrapper';
import { useSelectCourses } from '@/hooks/useSelectCourses';
import { usePathname } from 'next/navigation';

export const CategorySwitcher = (): JSX.Element | null => {
  const [, setSelectedCat] = useSelectCourses();
  const pathname = usePathname();
  const onClick = (cat: string) => {
    setSelectedCat(cat);
  };

  if (pathname !== '/') {
    return null;
  }
  return (
    <HoverCardRoot openDelay={500} closeDelay={100}>
      <HoverCardTrigger>
        <FlexWrapper
          gap={3}
          alignItems={'center'}
          bg={colors.skyBlue}
          p={2}
          borderRadius={5}
          cursor={'pointer'}
        >
          <IconLayoutDashboard color={colors.blue} />
          <Title color={colors.blue} fontWeight={600} fontSize={'lg'}>
            Category
          </Title>
        </FlexWrapper>
      </HoverCardTrigger>
      <HoverCardContent backgroundColor={'white'} gap={2}>
        <For each={courses}>
          {(cat) => (
            <Text
              color={'black'}
              key={cat}
              onClick={() => onClick(cat)}
              cursor={'pointer'}
              p={2}
              _hover={{
                color: colors.blue,
                backgroundColor: colors.skyBlue,
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {cat}
            </Text>
          )}
        </For>
      </HoverCardContent>
    </HoverCardRoot>
  );
};
