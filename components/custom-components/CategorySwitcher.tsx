import { IconLayoutDashboard } from '@tabler/icons-react';
import { FlexWrapper } from './FlexWrapper';
import { Title } from '../typography/Title';
import { colors } from '@/constants';

export const CategorySwitcher = (): JSX.Element => {
  return (
    <FlexWrapper
      gap={3}
      alignItems={'center'}
      bg={colors.skyBlue}
      p={2}
      borderRadius={5}
      cursor={'pointer'}
    >
      <IconLayoutDashboard color={colors.blue} />
      <Title color={colors.blue} fontWeight={600}>
        Category
      </Title>
    </FlexWrapper>
  );
};
