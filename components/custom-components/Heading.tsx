import { Stack } from '@chakra-ui/react';
import { NormalText, Title } from '../typography/Title';
import { colors } from '@/constants';

type Props = {
  title: string;
  description: string;
};

export const Heading = ({ description, title }: Props): JSX.Element => {
  return (
    <Stack gap={5}>
      <Title
        fontSize={{ base: '2xl', md: '5xl' }}
        fontWeight={600}
        color={colors.black}
      >
        {title}
      </Title>
      <NormalText fontSize={{ base: 'md', md: 'lg' }}>{description}</NormalText>
    </Stack>
  );
};
