'use client';
import { colors } from '@/constants';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { Button } from './button';
import { IconPlus } from '@tabler/icons-react';
import { useChapterModal } from '@/hooks/useChapterModal';
import { Doc } from '@/convex/_generated/dataModel';
import { ChapterAccordion } from './ChapterAccordion';
import { Stack } from '@chakra-ui/react';
import { NextPreviousBtn } from './StepperComponents/NextPreviousBtn';
import { useStep } from '@/hooks/useSteps';

type Props = {
  chapters: Doc<'chapters'>[];
};

export const Chapters = ({ chapters }: Props) => {
  const [, setOpen] = useChapterModal();
  const [, setStep] = useStep();
  const onClick = async () => {
    await setStep({
      title: 'Additional Information',
      step: 3,
    });
  };
  return (
    <Stack gap={4}>
      <FlexWrapper justifyContent={'flex-end'} width={'100%'}>
        <Button
          bg="transparent"
          px={4}
          _hover={{
            opacity: 0.5,
          }}
          color={colors.black}
          onClick={() => setOpen(true)}
        >
          <IconPlus />
          Add Chapter
        </Button>
      </FlexWrapper>
      <ChapterAccordion chapters={chapters} />
      <NextPreviousBtn onClick={onClick} />
    </Stack>
  );
};
