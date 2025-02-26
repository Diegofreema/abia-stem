import { FlexWrapper } from '@/components/custom-components/FlexWrapper';
import { NormalText } from '@/components/typography/Title';
import {
  FileUploadDropzone,
  FileUploadRoot,
  FileUploadLabel,
} from '@/components/ui/file-upload';
import { colors } from '@/constants';
import { Box, FileUploadFileChangeDetails, IconButton } from '@chakra-ui/react';
import { IconX } from '@tabler/icons-react';
import { FileMimeType } from '@zag-js/file-utils';
type DropzoneProps = {
  maxFiles?: number;
  description?: string;
  accept?: Record<string, string[]> | FileMimeType | FileMimeType[];
  label: string;
  onFileChange: (details: FileUploadFileChangeDetails) => void;
  image: string;
  clearImage: () => void;
};
export const Dropzone = ({
  maxFiles = 1,
  description = '.png, .jpg up to 5MB',
  accept,
  label,
  onFileChange,
  image,
  clearImage,
}: DropzoneProps) => {
  return (
    <FileUploadRoot
      maxW="xl"
      alignItems="stretch"
      maxFiles={maxFiles}
      accept={accept}
      bg={'white'}
      onFileChange={onFileChange}
      allowDrop={!image}
    >
      <FileUploadLabel
        color={colors.black}
        className="capitalize font-bold text-xl "
      >
        {label}
      </FileUploadLabel>
      {image ? (
        <FlexWrapper
          justify="center"
          maxWidth={'500px'}
          mx="auto"
          position={'relative'}
        >
          <img
            src={image}
            alt="Course thumbnail"
            style={{
              maxWidth: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          ˝
          <IconButton
            position={'absolute'}
            top={-2}
            right={-5}
            onClick={clearImage}
            zIndex={2}
            boxSize={6}
            bg={colors.red}
          >
            <IconX color={colors.white} />
          </IconButton>
        </FlexWrapper>
      ) : (
        <FileUploadDropzone
          label={<NormalText>Drag and drop here to upload {label}</NormalText>}
          description={description}
          bg={colors.white}
        />
      )}
    </FileUploadRoot>
  );
};
