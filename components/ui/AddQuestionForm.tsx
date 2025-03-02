import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { Id } from '@/convex/_generated/dataModel';
import { useCourseId } from '@/hooks/useCourseId';
import { faqValidator } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toaster } from './toaster';
import { ConvexError } from 'convex/values';
import { colors } from '@/constants';
import { Stack } from '@chakra-ui/react';
import { ValidatorField } from './CustomInput';
import { Button } from './button';
import { useFAQModal } from '@/hooks/useChapterModal';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
type Props = {
  loggedInUser: Id<'users'>;
};
export const AddQuestionForm = ({ loggedInUser }: Props) => {
  const [open, setOpen] = useFAQModal();
  const createFAQ = useMutation(api.faqs.createFAQ);
  const courseId = useCourseId((state) => state.courseId);

  const {
    control,
    handleSubmit,

    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof faqValidator>>({
    defaultValues: {
      question: '',
      answer: '',
    },
    resolver: zodResolver(faqValidator),
  });

  const onSubmit = async (values: z.infer<typeof faqValidator>) => {
    if (!courseId) return;

    try {
      await createFAQ({ courseId, loggedInUser, ...values });
      toaster.create({
        title: 'Success',
        description: 'FAQ uploaded',
        type: 'success',
      });
      setOpen(false);
      reset();
    } catch (error) {
      console.log(error);

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
      setOpen(false);
    }
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogContent bg={colors.white} color={colors.black}>
        <DialogHeader>
          <DialogTitle>FAQ Form</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={3}>
            <ValidatorField
              control={control}
              name="question"
              errors={errors}
              label="Question"
              placeholder="Enter question"
              disabled={isSubmitting}
            />
            <ValidatorField
              control={control}
              name="answer"
              errors={errors}
              label="Answer"
              placeholder="Enter answer"
              disabled={isSubmitting}
              mode="textarea"
            />
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            loading={isSubmitting}
            bg={colors.blue}
            p={4}
            color={colors.white}
            _hover={{
              opacity: 0.5,
            }}
          >
            Upload
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
