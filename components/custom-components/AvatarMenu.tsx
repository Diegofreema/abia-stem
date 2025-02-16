import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
  MenuItemGroup,
} from '@/components/ui/menu';
import { Box } from '@chakra-ui/react';
import { IconPower, IconSettings, IconUser } from '@tabler/icons-react';
import { Avatar } from '../ui/avatar';
import { colors } from '@/constants';
import { FlexWrapper } from './FlexWrapper';
import { NormalText } from '../typography/Title';
type Props = {
  image: string;
  name: string;
  email: string;
};
const menuItems = [
  {
    value: 'edit',
    label: 'Edit Profile',
    icon: IconUser,
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: IconSettings,
  },
  {
    value: 'sign-out',
    label: 'Sign Out',
    icon: IconPower,
  },
];
export const AvatarMenu = ({ image, email, name }: Props): JSX.Element => {
  return (
    <MenuRoot>
      <MenuTrigger>
        <Avatar src={image || '/boy.png'} />
      </MenuTrigger>
      <MenuContent backgroundColor={colors.white}>
        <MenuItem value="profile">
          <Avatar src={image || '/boy.png'} />
          <FlexWrapper flex={1} flexDir={'column'}>
            <NormalText color={colors.black} fontSize={'md'} fontWeight={600}>
              {name}
            </NormalText>
            <NormalText color={colors.black} fontSize={'md'} fontWeight={500}>
              {email}
            </NormalText>
          </FlexWrapper>
        </MenuItem>
        <MenuSeparator borderColor={colors.textGrey} />
        <MenuItemGroup>
          {menuItems.map(({ icon: Icon, label, value }) => (
            <MenuItem
              value={value}
              key={value}
              className="group hover:bg-['#E7F0FA']"
            >
              <Icon className="text-[#747579] group-hover:text-['#0760c9']" />
              <Box
                flex={1}
                className="group-hover:text-['#0760c9'] text-[#747579]"
              >
                {label}
              </Box>
            </MenuItem>
          ))}
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  );
};
