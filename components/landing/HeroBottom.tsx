'use client';
import { For } from '@chakra-ui/react';
import {
  IconDeviceDesktop,
  IconRosetteDiscountCheck,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { DisplayCard } from './DisplayCard';

const details = [
  {
    icon: IconDeviceDesktop,
    title: '10k',
    description: 'Online Courses',
    backgroundColor: '#FEF6E3',
    color: '#F7C32D',
  },
  {
    icon: IconUser,
    title: '200+',
    description: 'Expert Tutors',
    backgroundColor: '#DDE2E5',
    color: '#1D3B53',
  },
  {
    icon: IconUsers,
    title: '60k+',
    description: 'Online Students',
    backgroundColor: '#EAE3F6',
    color: '#6F42C1',
  },
  {
    icon: IconRosetteDiscountCheck,
    title: '6k+',
    description: 'Certified Courses',
    backgroundColor: '#E1F1F4',
    color: '#16A2B8',
  },
];

export const HeroBottom = (): JSX.Element => {
  return (
    <FlexWrapper mt={20} gap={5}>
      <For each={details}>
        {(item, index) => <DisplayCard key={index} {...item} />}
      </For>
    </FlexWrapper>
  );
};
