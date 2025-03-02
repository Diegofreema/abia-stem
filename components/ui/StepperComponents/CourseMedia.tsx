'use client';
import { CourseType, TitleProps } from '@/types';
import { Box, FileUploadFileChangeDetails, Stack } from '@chakra-ui/react';
import { StepperTitle } from './StepperTitle';

import { FlexWrapper } from '@/components/custom-components/FlexWrapper';
import { LoadingSpinner } from '@/components/universal/LoadingSpinner';
import { colors } from '@/constants';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useCourseId } from '@/hooks/useCourseId';
import { useStep } from '@/hooks/useSteps';
import { generateStorageId } from '@/lib/utils';
import { useMedia } from '@/lib/zustand/useMedia';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { Attachments } from '../Attachments';
import { toaster } from '../toaster';
import { DropzoneImage, DropzoneVideo } from './Dropzone';
import { NextPreviousBtn } from './NextPreviousBtn';

export const CourseMedia = ({
  title,
  course,
  loggedInUserId,
}: TitleProps): JSX.Element => {
  return (
    <Stack>
      <StepperTitle title={title} />
      <CourseMediaDetails course={course} loggedInUserId={loggedInUserId} />
    </Stack>
  );
};

const CourseMediaDetails = ({
  course,
  loggedInUserId,
}: {
  course: CourseType;
  loggedInUserId: Id<'users'>;
}) => {
  console.log(course);

  const setImage = useMedia((state) => state.setImage);
  const setVideo = useMedia((state) => state.setVideo);
  const selectedImage = useMedia((state) => state.image);
  const selectedVideo = useMedia((state) => state.video);
  const clearVideo = useMedia((state) => state.clearVideo);
  const clearImage = useMedia((state) => state.clearImage);
  const videoUrl = useMedia((state) => state.videoUrl);

  const generateUploadUrl = useMutation(api.courses.generateUploadUrl);
  const courseId = useCourseId((state) => state.courseId);
  const uploadMedia = useMutation(api.courses.editCourse);
  const [uploadingAttachments, setUploadingAttachments] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [, setStep] = useStep();
  const toggleAttachmentState = (state: boolean) => {
    setUploadingAttachments(state);
  };
  const onImageFileChange = (details: FileUploadFileChangeDetails) => {
    const file = details.acceptedFiles[0];

    if (file) {
      setImage(file);
    } else if (details.rejectedFiles.length > 0) {
      const description = details.rejectedFiles[0].errors[0].replace(/_/g, ' ');
      toaster.create({
        type: 'error',
        title: 'Something went wrong',
        description,
      });
    }
  };
  const onVideoFileChange = (details: FileUploadFileChangeDetails) => {
    const file = details.acceptedFiles[0];
    if (file) {
      setVideo(file);
    } else if (details.rejectedFiles.length > 0) {
      const description = details.rejectedFiles[0].errors[0].replace(/_/g, ' ');
      toaster.create({
        type: 'error',
        title: 'Something went wrong',
        description,
      });
    }
  };

  const onUpload = async () => {
    if (course?.course?._id) {
      return toaster.create({
        type: 'info',
        title: 'Can not upload media',
        description: 'Please complete the previous steps first',
      });
    }
    setUploading(true);
    if (!selectedImage || !selectedVideo || !courseId) return;
    try {
      const [imageStorageId, videoStorageId] = await Promise.all([
        generateStorageId(generateUploadUrl, selectedImage),
        generateStorageId(generateUploadUrl, selectedVideo),
      ]);

      await uploadMedia({
        image: imageStorageId,
        videoPreview: videoStorageId,
        courseId,
      });
      await setStep({
        step: 2,
        title: 'Chapters',
      });
      toaster.create({
        type: 'success',
        title: 'Success',
        description: 'Media uploaded successfully',
      });
      clearImage();
      clearVideo();
    } catch (error) {
      console.log(error);

      toaster.create({
        type: 'error',
        title: 'Something went wrong',
        description: 'Failed to upload media',
      });
    } finally {
      setUploading(false);
    }
  };
  const disable = !selectedImage || !selectedVideo || uploading;
  const image = course?.imageUrl;
  const video = course?.videoUrl;

  return (
    <Stack gap={{ base: 5, md: 10 }} position={'relative'}>
      {uploadingAttachments && (
        <Box
          position={'absolute'}
          width={'100%'}
          height={'100%'}
          bg={'black'}
          inset={0}
          opacity={0.7}
          zIndex={3}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <LoadingSpinner />
        </Box>
      )}
      <FlexWrapper
        justify={'center'}
        borderWidth={1}
        borderColor={colors.textGrey}
        borderRadius={5}
        borderStyle={'dashed'}
        p={{ base: 5, md: 10 }}
      >
        <DropzoneImage
          disable={!!course}
          onFileChange={onImageFileChange}
          accept={['image/png', 'image/jpeg']}
          label="course thumbnail"
          uploading={uploading}
          media={image!}
        />
      </FlexWrapper>
      <FlexWrapper
        justify={'center'}
        borderWidth={1}
        borderColor={colors.textGrey}
        borderRadius={5}
        borderStyle={'dashed'}
        p={{ base: 5, md: 10 }}
      >
        <DropzoneVideo
          disable={!!course}
          onFileChange={onVideoFileChange}
          accept={['video/mp4']}
          label="course video preview"
          description=".mp4 up to 1GB"
          maxFileSize={1_000_000_000}
          uploading={uploading}
          media={video!}
          clearVideo={clearVideo}
          videoUrl={videoUrl}
        />
      </FlexWrapper>
      <Attachments
        setUploading={toggleAttachmentState}
        uploading={uploadingAttachments}
        courseId={courseId!}
        loggedInUserId={loggedInUserId}
        attachments={course?.attachments || []}
      />

      <NextPreviousBtn
        onClick={onUpload}
        disable={disable}
        loading={uploading}
      />
    </Stack>
  );
};
