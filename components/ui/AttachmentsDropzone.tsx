import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '@/components/ui/file-upload';
import {
  FileUploadFileAcceptDetails,
  FileUploadFileRejectDetails,
} from '@chakra-ui/react';

type Props = {
  onFileReject: (detail: FileUploadFileRejectDetails) => void;
  onFileAccept: (details: FileUploadFileAcceptDetails) => void;
};
export const AttachmentsDropzone = ({ onFileAccept, onFileReject }: Props) => {
  return (
    <FileUploadRoot
      maxW="100%"
      alignItems="stretch"
      maxFiles={1}
      onFileAccept={onFileAccept}
      onFileReject={onFileReject}
      maxFileSize={1_000_000_000}
      accept={['audio/*', 'image/*', 'video/*', 'application/pdf']}
    >
      <FileUploadDropzone
        label="Drag and drop here to upload"
        description=".png, .jpg, .mp4, .mp3, .pdf up to 1gb"
      />
    </FileUploadRoot>
  );
};
