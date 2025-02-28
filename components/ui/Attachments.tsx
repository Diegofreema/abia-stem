'use client';
import {
  FileUploadFileAcceptDetails,
  FileUploadFileRejectDetails,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { NormalText } from '../typography/Title';
import { colors } from '@/constants';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { Button } from './button';
import { IconFile, IconPlus, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { AttachmentsDropzone } from './AttachmentsDropzone';
import { toaster } from './toaster';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { generateStorageId } from '@/lib/utils';
import { ConvexError } from 'convex/values';

type Props = {
  courseId: Id<'courses'>;
  loggedInUserId: Id<'users'>;
  uploading: boolean;
  setUploading: (state: boolean) => void;
  attachments: Doc<'attachments'>[];
};

export const Attachments = ({
  courseId,
  loggedInUserId,
  setUploading,
  uploading,
  attachments,
}: Props): JSX.Element => {
  const [showDropzone, setShowDropzone] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const createAttachment = useMutation(api.courses.createAttachment);
  const generateUploadUrl = useMutation(api.courses.generateUploadUrl);
  const onFileReject = (details: FileUploadFileRejectDetails) => {
    const description = details?.files?.[0]?.errors[0]?.replace(/_/g, ' ');

    if (details.files.length > 0) {
      toaster.create({
        type: 'error',
        title: 'Something went wrong',
        description,
      });
    }
  };
  const onFileAccept = (details: FileUploadFileAcceptDetails) => {
    const f = details.files[0];
    setFile(f);
  };

  const uploadAttachments = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const storageId = await generateStorageId(generateUploadUrl, file);
      await createAttachment({ courseId, userId: loggedInUserId, storageId });
      toaster.create({
        description: 'Attachment uploaded',
        title: 'Success',
        type: 'success',
      });
      setFile(null);
      setShowDropzone(false);
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as { message: string }).message
          : 'Unexpected error occurred';
      toaster.create({
        title: 'Something went wrong',
        description: errorMessage,
        type: 'error',
      });
    } finally {
      setUploading(false);
    }
  };
  return (
    <Stack>
      <FlexWrapper align={'center'} justifyContent={'space-between'}>
        <NormalText
          color={colors.black}
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight={'bold'}
        >
          Attachments
        </NormalText>
        <Button
          color={colors.black}
          onClick={() => setShowDropzone(true)}
          bg={'transparent'}
          _hover={{ opacity: 0.5 }}
          className="transition"
          p={4}
        >
          <IconPlus /> Add file
        </Button>
      </FlexWrapper>
      <Stack>
        {attachments.map((attachment) => (
          <FlexWrapper key={attachment._id} gap={2}>
            <IconFile color="black" />{' '}
            <NormalText color={colors.black}>{attachment.name}</NormalText>
          </FlexWrapper>
        ))}
      </Stack>
      <FlexWrapper
        justify={'center'}
        alignItems={'center'}
        width={{ base: '100%', md: '60%' }}
        mx={'auto'}
      >
        {showDropzone && (
          <Stack width="100%">
            <AttachmentsDropzone
              onFileAccept={onFileAccept}
              onFileReject={onFileReject}
            />
            {file && (
              <FlexWrapper justify={'space-between'} align={'center'}>
                <NormalText color={colors.black}>
                  {file?.name.split('.')[0]}
                </NormalText>
                <IconButton onClick={() => setFile(null)}>
                  <IconX color={colors.black} />
                </IconButton>
              </FlexWrapper>
            )}
            <FlexWrapper gap={5}>
              <Button
                bg={colors.red}
                className="transition"
                _hover={{ opacity: 0.5 }}
                p={4}
                color="white"
                onClick={() => setShowDropzone(false)}
                disabled={uploading}
              >
                Close
              </Button>

              <Button
                disabled={!file || uploading}
                bg={colors.blue}
                className="transition"
                _hover={{ opacity: 0.5 }}
                p={4}
                color="white"
                onClick={uploadAttachments}
              >
                Upload
              </Button>
            </FlexWrapper>
          </Stack>
        )}
      </FlexWrapper>
    </Stack>
  );
};
