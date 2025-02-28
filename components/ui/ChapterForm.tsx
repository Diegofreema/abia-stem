import { useChapterModal } from '@/hooks/useChapterModal';

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, FileUploadFileChangeDetails, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { chapterValidator } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '@/constants';
import { ValidatorField } from './CustomInput';
import { RichTextEditor } from './RichTextEditor';
import { ValidatorFieldSwitch } from './CustomSwitch';
import { DropzoneVideo } from './StepperComponents/Dropzone';
import { toaster } from './toaster';
import { useState } from 'react';
import { NormalText } from '../typography/Title';
import { useCourseId } from '@/hooks/useCourseId';
import { Id } from '@/convex/_generated/dataModel';
import { generateStorageId } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ConvexError } from 'convex/values';
type Props = {
  loggedInUser: Id<'users'>;
};

export const ChapterForm = ({ loggedInUser }: Props) => {
  const [open, setOpen] = useChapterModal();
  const [initialVideo, setInitialVideo] = useState<File | null>(null);
  const courseId = useCourseId((state) => state.courseId);
  const generateUploadUrl = useMutation(api.courses.generateUploadUrl);
  const createChapter = useMutation(api.courses.createChapter);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<z.infer<typeof chapterValidator>>({
    defaultValues: {
      description: '',
      isPaid: false,
      title: '',
      video: '',
      isPublished: false,
    },
    resolver: zodResolver(chapterValidator),
  });
  const { video } = watch();

  const onSubmit = async (values: z.infer<typeof chapterValidator>) => {
    if (!initialVideo || !courseId) return;
    const videoStorageId = await generateStorageId(
      generateUploadUrl,
      initialVideo
    );
    const { video, ...rest } = values;
    try {
      await createChapter({
        courseId,
        loggedInUserId: loggedInUser,
        ...rest,
        videoStorageId,
      });
      toaster.create({
        title: 'Success',
        description: 'Chapter created successfully',
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
  const onVideoFileChange = (details: FileUploadFileChangeDetails) => {
    const file = details.acceptedFiles[0];
    if (file) {
      const vid = URL.createObjectURL(file);
      setValue('video', vid);
      setInitialVideo(file);
    } else if (details.rejectedFiles.length > 0) {
      const description = details.rejectedFiles[0].errors[0].replace(/_/g, ' ');
      toaster.create({
        type: 'error',
        title: 'Something went wrong',
        description,
      });
    }
  };
  const onClear = () => {
    setValue('video', '');
    setInitialVideo(null);
  };
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogContent bg={colors.white} color={colors.black}>
        <DialogHeader>
          <DialogTitle>Chapter Form</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={3}>
            <ValidatorField
              control={control}
              name="title"
              errors={errors}
              label="Chapter title"
              placeholder="Enter chapter title"
              disabled={isSubmitting}
            />
            <RichTextEditor
              control={control}
              name="description"
              errors={errors}
              label="Chapter description"
              placeholder="Describe your chapter..."
              disabled={isSubmitting}
            />
            <ValidatorFieldSwitch
              control={control}
              name="isPaid"
              errors={errors}
              label="Check if you want this to be a paid chapter"
              disabled={isSubmitting}
            />
            <ValidatorFieldSwitch
              control={control}
              name="isPublished"
              errors={errors}
              label="Check if you want to publish this chapter"
              disabled={isSubmitting}
            />
            <>
              <DropzoneVideo
                videoUrl={video}
                disable={isSubmitting}
                onFileChange={onVideoFileChange}
                accept={['video/mp4']}
                label="Chapter video"
                description=".mp4"
                maxFileSize={3_000_000_000}
                uploading={isSubmitting}
                media={video!}
                clearVideo={onClear}
              />
              {errors['video'] && (
                <NormalText color={colors.red}>
                  {errors['video']?.message as string}
                </NormalText>
              )}
            </>
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
            Create
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
