import { TitleProps } from '@/types';
import { Stack } from '@chakra-ui/react';
import { StepperTitle } from './StepperTitle';
import { AdditionalInformationComponent } from '../AdditionalInformationComponent';

export const AdditionalInformation = ({
  title,
  loggedInUserId,
  course,
}: TitleProps): JSX.Element => {
  return (
    <Stack>
      <StepperTitle title={title} />
      <AdditionalInformationComponent
        loggedInUser={loggedInUserId}
        faqs={course.faqs}
        chapterLength={course?.chapters?.length}
      />
    </Stack>
  );
};
