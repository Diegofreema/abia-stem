import { Input } from '@chakra-ui/react';
import { FlexWrapper } from './FlexWrapper';
import { Avatar } from '../ui/avatar';
import { IconSearch } from '@tabler/icons-react';

export const HeaderLeft = () => {
  return (
    <FlexWrapper gap={3} alignItems={'center'}>
      <FlexWrapper
        borderColor={'#E5E5E5'}
        borderStyle={'solid'}
        borderWidth={1}
        borderRadius={5}
        alignItems={'center'}
        gap={2}
        px={1}
      >
        <Input border={0} focusRing={'none'} placeholder="Search" p={3} />
        <IconSearch color="black" size={25} />
      </FlexWrapper>
      <Avatar src="/avatar.jpg" />
    </FlexWrapper>
  );
};
