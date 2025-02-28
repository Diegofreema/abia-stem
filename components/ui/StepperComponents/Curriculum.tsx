import { TitleProps } from '@/types';
import { Stack } from '@chakra-ui/react';
import { StepperTitle } from './StepperTitle';
import { Chapters } from '../Chapters';
import { ChapterForm } from '../ChapterForm';

export const Curriculum = ({
  title,
  loggedInUserId,
  course,
}: TitleProps): JSX.Element => {
  return (
    <Stack>
      <ChapterForm loggedInUser={loggedInUserId} />
      <StepperTitle title={title} />
      <Chapters chapters={course?.chapters} />
    </Stack>
  );
};
