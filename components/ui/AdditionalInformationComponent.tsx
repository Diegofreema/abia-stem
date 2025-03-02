'use client';

import { For, Stack } from '@chakra-ui/react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { NormalText } from '../typography/Title';
import { colors } from '@/constants';
import { Button } from './button';
import { IconPlus } from '@tabler/icons-react';
import { AddQuestionForm } from './AddQuestionForm';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useFAQModal } from '@/hooks/useChapterModal';
import { FAQ } from './FAQs';
import { NextPreviousBtn } from './StepperComponents/NextPreviousBtn';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useCourseId } from '@/hooks/useCourseId';
import { toaster } from './toaster';
import { ConvexError } from 'convex/values';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  loggedInUser: Id<'users'>;
  faqs: Doc<'faqs'>[];
  chapterLength: number;
};

export const AdditionalInformationComponent = ({
  loggedInUser,
  faqs,
  chapterLength,
}: Props): JSX.Element => {
  const [, setOpen] = useFAQModal();
  const publishCourse = useMutation(api.courses.publishCourse);
  const [publishing, setIsPublishing] = useState(false);
  const courseId = useCourseId((state) => state.courseId);
  const removeCourseId = useCourseId((state) => state.removeCourseId);
  const router = useRouter();
  const onClick = async () => {
    if (!courseId) return;
    if (chapterLength === 0) {
      return toaster.create({
        type: 'info',
        title: 'Can publish this course yet!',
        description: 'Please add at least one chapter first',
      });
    }
    setIsPublishing(true);
    try {
      await publishCourse({ courseId, loggedInUser });
      router.replace(`/instructor/courses/${courseId}`);

      toaster.create({
        title: 'Success',
        description: 'Course has been published',
        type: 'success',
      });
      removeCourseId();
    } catch (error) {
      const errorMessage =
        // Check whether the error is an application error
        error instanceof ConvexError
          ? // Access data and cast it to the type we expect
            (error.data as { message: string }).message
          : // Must be some developer error,
            // and prod deployments will not
            // reveal any more information about it
            // to the client
            'Unexpected error occurred';
      toaster.create({
        title: 'Something went wrong',
        description: errorMessage,
        type: 'error',
      });
    } finally {
      setIsPublishing(false);
    }
  };
  return (
    <Stack p={5} bg={colors.skyBlue}>
      <AddQuestionForm loggedInUser={loggedInUser} />
      <FlexWrapper justify={'space-between'} align={'center'}>
        <NormalText
          fontSize={{ base: 'xl', md: '2xl' }}
          color={colors.black}
          fontWeight={'bold'}
        >
          Upload FAQs
        </NormalText>
        <Button
          onClick={() => setOpen(true)}
          color={colors.black}
          _hover={{ opacity: 0.5 }}
          className="transition"
        >
          <IconPlus />
          Add Question
        </Button>
      </FlexWrapper>
      <Stack my={{ base: 5, md: 10 }} gap={4}>
        <For each={faqs}>{(faq) => <FAQ key={faq._id} faq={faq} />}</For>
      </Stack>
      <NextPreviousBtn
        onClick={onClick}
        text="Publish course"
        loading={publishing}
      />
    </Stack>
  );
};
