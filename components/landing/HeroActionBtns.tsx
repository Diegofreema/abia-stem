'use client';

import { colors } from '@/constants';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { Button } from '../ui/button';
import { Circle, IconButton } from '@chakra-ui/react';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { NormalText } from '../typography/Title';

export const HeroActionBtns = (): JSX.Element => {
  return (
    <FlexWrapper gap={6} alignItems={'center'}>
      <Button
        backgroundColor={colors.lightRed}
        color={colors.red}
        p={6}
        _hover={{
          backgroundColor: colors.red,
          color: colors.lightRed,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        Get Started
      </Button>
      <FlexWrapper alignItems={'center'} gap={2}>
        <Circle
          backgroundColor={'#A4C4EA'}
          width={14}
          height={14}
          _hover={{
            transform: 'scale(1.1)',
            transition: 'all 0.3s linear',
          }}
          className="transition"
        >
          <IconButton
            aria-label="Search database"
            backgroundColor={colors.blue}
            rounded="full"
          >
            <IconPlayerPlayFilled size={25} color={colors.white} />
          </IconButton>
        </Circle>
        <NormalText fontWeight={600} fontSize={'md'} color={colors.black}>
          Watch Video
        </NormalText>
      </FlexWrapper>
    </FlexWrapper>
  );
};
