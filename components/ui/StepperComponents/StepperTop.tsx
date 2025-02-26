'use client';
import { FlexWrapper } from '@/components/custom-components/FlexWrapper';
import { colors } from '@/constants';
import { useStep } from '@/hooks/useSteps';
import { Box, For, Stack } from '@chakra-ui/react';
import { Step } from './Step';

const data = [
  {
    title: 'Course details',
    value: 1,
  },
  'line',
  {
    title: 'Course media',
    value: 2,
  },
  'line',
  {
    title: 'Chapters',
    value: 3,
  },
  'line',
  {
    title: 'Additional information',
    value: 4,
  },
];

export const StepperTop = (): JSX.Element => {
  const [activeStep] = useStep();
  const { step } = activeStep;
  return (
    <Stack width={'100%'} bg={colors.bgGrey}>
      <FlexWrapper
        gap={2}
        width={'100%'}
        p={10}
        alignItems={'center'}
        borderBottom={'1px solid #ccc'}
      >
        <For each={data}>
          {(item, index) =>
            typeof item === 'object' ? (
              <Step key={index} {...item} isActive={step === item.value - 1} />
            ) : (
              <Box bg={'#ccc'} width="100%" h={0.5} mt={-5} />
            )
          }
        </For>
      </FlexWrapper>
    </Stack>
  );
};
