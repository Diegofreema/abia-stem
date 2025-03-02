import { Doc } from '@/convex/_generated/dataModel';
import { Stack } from '@chakra-ui/react';
import { NormalText, Title } from '../typography/Title';
import { colors } from '@/constants';

type Props = {
  faq: Doc<'faqs'>;
};

export const FAQ = ({ faq }: Props): JSX.Element => {
  return (
    <Stack bg={colors.white} borderRadius={8} p={5} width={'100%'} gap={4}>
      <Title fontSize={{ base: 'lg', md: '2xl' }} color={colors.black}>
        {faq.question}
      </Title>
      <NormalText color={colors.textGrey} fontSize={{ base: 'md', md: 'lg' }}>
        {faq.answer}
      </NormalText>
    </Stack>
  );
};
