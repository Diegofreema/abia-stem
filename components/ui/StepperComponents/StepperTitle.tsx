import { Title } from '@/components/typography/Title';
import { colors } from '@/constants';
import { Stack } from '@chakra-ui/react';

type Props = {
  title: string;
};

export const StepperTitle = ({ title }: Props): JSX.Element => {
  return (
    <Stack borderBottom={'1px solid #E5E5E5'} pb={2} mb={5}>
      <Title fontSize={{ base: 20, md: 25 }} color={colors.black}>
        {title}
      </Title>
    </Stack>
  );
};
