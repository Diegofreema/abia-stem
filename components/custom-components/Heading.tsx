import { Stack } from '@chakra-ui/react';
import { NormalText } from '../typography/Title';
import BlurText from './BluredText';
import { FlexWrapper } from './FlexWrapper';

type Props = {
  title: string;
  description: string;
};

export const Heading = ({ description, title }: Props): JSX.Element => {
  return (
    <Stack>
      <FlexWrapper justifyContent={'center'}>
        <BlurText
          text={title}
          delay={100}
          animateBy="letters"
          direction="top"
          className="sm:text-2xl md:text-5xl mb-8 font-bold text-black text-center"
        />
      </FlexWrapper>
      <NormalText fontSize={{ base: 'md', md: 'lg' }}>{description}</NormalText>
    </Stack>
  );
};
