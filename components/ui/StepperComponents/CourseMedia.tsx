import { TitleProps } from '@/types';
import { FileUploadFileChangeDetails, Stack } from '@chakra-ui/react';
import { StepperTitle } from './StepperTitle';

import { FlexWrapper } from '@/components/custom-components/FlexWrapper';
import { colors } from '@/constants';
import { useState } from 'react';
import { Dropzone } from './Dropzone';

export const CourseMedia = ({ title }: TitleProps): JSX.Element => {
  return (
    <Stack>
      <StepperTitle title={title} />
      <CourseMediaDetails />
    </Stack>
  );
};

const CourseMediaDetails = () => {
  const [image, setImage] = useState('');
  const onFileChange = (details: FileUploadFileChangeDetails) => {
    const file = details.acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
    // setImage(details.files[0].)
  };

  return (
    <Stack>
      <FlexWrapper
        justify={'center'}
        borderWidth={1}
        borderColor={colors.textGrey}
        borderRadius={5}
        borderStyle={'dashed'}
        p={{ base: 5, md: 10 }}
      >
        <Dropzone
          onFileChange={onFileChange}
          accept={['image/png', 'image/jpeg']}
          label="course thumbnail"
          image={image}
          clearImage={() => setImage('')}
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
        <Dropzone
          onFileChange={onFileChange}
          accept={['video/mp4']}
          label="course video preview"
          image={image}
          clearImage={() => setImage('')}
        />
      </FlexWrapper>
    </Stack>
  );
};
