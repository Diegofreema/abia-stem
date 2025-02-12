'use client';
import { colors } from '@/constants';
import { For, Stack } from '@chakra-ui/react';
import { IconRosetteDiscountCheck } from '@tabler/icons-react';
import Image from 'next/image';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { GridWrapper } from '../custom-components/GridWrapper';
import { NormalText, Title } from '../typography/Title';
import { HeroActionBtns } from './HeroActionBtns';
import { HoverAvatarCard } from './HoverAvatarCard';
import { FloatingImages } from './FloatingImages';

const text = ['Learn with experts', 'Get certificate', 'Get membership'];

export const Hero = () => {
  return (
    <GridWrapper
      placeItems={'center'}
      gap={{ base: 10, md: 15 }}
      width={'100%'}
    >
      <LeftHero />
      <RightHero />
    </GridWrapper>
  );
};

const LeftHero = () => {
  return (
    <Stack gap={7}>
      <Title
        as="h2"
        fontSize={{ base: '3xl', md: '6xl' }}
        color={'black'}
        fontWeight={700}
        lineHeight={1.2}
      >
        Limitless learning at your fingertips
      </Title>
      <NormalText fontSize={{ base: 'md', md: 'xl' }} color={colors.textGrey}>
        Online learning and teaching marketplace with 5K+ courses & 10M
        students. Taught by experts to help you acquire new skills.
      </NormalText>
      <FlexWrapper gap={5}>
        <For each={text}>
          {(item, index) => (
            <FlexWrapper key={index} gap={1}>
              <IconRosetteDiscountCheck fill={colors.black} />
              <NormalText
                fontSize={{ base: 'sm', md: 'md' }}
                color={colors.textGrey}
              >
                {item}
              </NormalText>
            </FlexWrapper>
          )}
        </For>
      </FlexWrapper>
      <HeroActionBtns />
    </Stack>
  );
};

const RightHero = () => {
  return (
    <FlexWrapper
      justifyContent={'center'}
      width={'100%'}
      height={'100%'}
      position={'relative'}
    >
      <Image
        src={'/hero.png'}
        width={500}
        height={500}
        alt="hero"
        objectFit="cover"
      />
      <FloatingImages src="./download.svg" top="50%" left={0} />
      <FloatingImages
        src="./figma.svg"
        top="80%"
        right={0}
        width={30}
        height={30}
      />
      <FloatingImages
        src="./angular.svg"
        top="10%"
        right={0}
        width={35}
        height={35}
      />
      <HoverAvatarCard />
    </FlexWrapper>
  );
};
