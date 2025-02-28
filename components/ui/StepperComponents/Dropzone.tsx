import { FlexWrapper } from '@/components/custom-components/FlexWrapper';
import { NormalText } from '@/components/typography/Title';

import ReactPlayer from 'react-player';

import {
  FileUploadDropzone,
  FileUploadLabel,
  FileUploadRoot,
} from '@/components/ui/file-upload';
import { colors } from '@/constants';
import { useMedia } from '@/lib/zustand/useMedia';
import { FileUploadFileChangeDetails, IconButton } from '@chakra-ui/react';
import { IconX } from '@tabler/icons-react';
import { FileMimeType } from '@zag-js/file-utils';
import { ProgressComponent } from '../ProgressComponent';
type DropzoneProps = {
  maxFiles?: number;
  description?: string;
  accept: FileMimeType[];
  label: string;
  onFileChange: (details: FileUploadFileChangeDetails) => void;
  uploading: boolean;
  media: string;
  maxFileSize?: number;
  disable: boolean;
};
export const DropzoneImage = ({
  maxFiles = 1,
  description = '.png, .jpg up to 5MB',
  accept,
  label,
  onFileChange,
  media,
  maxFileSize = 5_242_880,
  uploading,
  disable,
}: DropzoneProps) => {
  const imageUrl = useMedia((state) => state.imageUrl);

  const clearImage = useMedia((state) => state.clearImage);
  const hasMedia = media || imageUrl;
  return (
    <FileUploadRoot
      maxW="xl"
      alignItems="stretch"
      maxFiles={maxFiles}
      accept={accept}
      bg={'white'}
      onFileChange={onFileChange}
      allowDrop={!hasMedia}
      maxFileSize={maxFileSize}
    >
      <FileUploadLabel
        color={colors.black}
        className="capitalize font-bold text-xl "
      >
        {label}
      </FileUploadLabel>
      {hasMedia && (
        <FlexWrapper
          justify="center"
          maxWidth={'500px'}
          mx="auto"
          position={'relative'}
        >
          <img
            src={hasMedia}
            alt="Course thumbnail"
            style={{
              maxWidth: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />

          {!disable && (
            <IconButton
              position={'absolute'}
              disabled={uploading}
              top={-2}
              right={-5}
              onClick={clearImage}
              zIndex={2}
              boxSize={6}
              bg={colors.red}
            >
              <IconX color={colors.white} />
            </IconButton>
          )}
        </FlexWrapper>
      )}

      {!hasMedia && (
        <FileUploadDropzone
          label={<NormalText>Drag and drop here to upload {label}</NormalText>}
          description={description}
          bg={colors.white}
        />
      )}
      {uploading && <ProgressComponent />}
    </FileUploadRoot>
  );
};

export const DropzoneVideo = ({
  maxFiles = 1,
  description = '.mp4 up to 1GB',
  accept,
  label,
  onFileChange,
  maxFileSize = 5000,
  uploading,
  media,
  disable,
}: DropzoneProps) => {
  const videoUrl = useMedia((state) => state.videoUrl);

  const clearVideo = useMedia((state) => state.clearVideo);
  const hasMedia = media || videoUrl;
  return (
    <FileUploadRoot
      maxW="xl"
      alignItems="stretch"
      maxFiles={maxFiles}
      accept={accept}
      bg={'white'}
      onFileChange={onFileChange}
      allowDrop={!hasMedia}
      maxFileSize={maxFileSize}
    >
      <FileUploadLabel
        color={colors.black}
        className="capitalize font-bold text-xl "
      >
        {label}
      </FileUploadLabel>
      {hasMedia && (
        <FlexWrapper
          justify="center"
          maxWidth={'700px'}
          mx="auto"
          position={'relative'}
        >
          <ReactPlayer
            url={hasMedia}
            controls
            width="100%"
            height="100%"
            style={{
              width: '100%',
              height: '100%',
            }}
          />

          {!disable && (
            <IconButton
              position={'absolute'}
              top={-2}
              right={-5}
              onClick={clearVideo}
              zIndex={2}
              boxSize={6}
              bg={colors.red}
              disabled={uploading}
            >
              <IconX color={colors.white} />
            </IconButton>
          )}
        </FlexWrapper>
      )}

      {!hasMedia && (
        <FileUploadDropzone
          label={<NormalText>Drag and drop here to upload {label}</NormalText>}
          description={description}
          bg={colors.white}
        />
      )}
      {uploading && <ProgressComponent />}
    </FileUploadRoot>
  );
};
