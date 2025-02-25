import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { colors } from "@/constants";
import { Box, Icon } from "@chakra-ui/react";
import { useAuth } from "@clerk/clerk-react";
import { IconPower, IconSettings, IconUser } from "@tabler/icons-react";
import { NormalText } from "../typography/Title";
import { Avatar } from "../ui/avatar";
import { FlexWrapper } from "./FlexWrapper";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const menuItems = [
  {
    value: "edit",
    label: "Edit Profile",
    icon: IconUser,
  },
  {
    value: "settings",
    label: "Settings",
    icon: IconSettings,
  },
  {
    value: "sign-out",
    label: "Sign Out",
    icon: IconPower,
  },
];
type Value = "edit" | "settings" | "sign-out";
export const AvatarMenu = (): JSX.Element | null => {
  const { signOut, userId } = useAuth();
  const user = useQuery(api.users.currentUser, { userId: userId! });
  const onClick = (value: Value) => {
    if (value === "sign-out") {
      signOut({ redirectUrl: "/" });
    }
  };
  // const user = { image: '', email: '', name: '' };
  if (!user) return null;

  return (
    <MenuRoot>
      <MenuTrigger>
        <Avatar src={user?.image || "/boy.png"} />
      </MenuTrigger>
      <MenuContent backgroundColor={colors.white}>
        <MenuItem value="profile" _hover={{ backgroundColor: "transparent" }}>
          <Avatar src={user?.image || "/boy.png"} />
          <FlexWrapper flex={1} flexDir={"column"}>
            <NormalText color={colors.black} fontSize={"md"} fontWeight={600}>
              {user.name.split(" ")[0]}
            </NormalText>
            <NormalText color={colors.black} fontSize={"md"} fontWeight={500}>
              {user.email}
            </NormalText>
          </FlexWrapper>
        </MenuItem>
        <MenuSeparator borderColor={colors.textGrey} mb={3} />
        <MenuItemGroup>
          {menuItems.map(({ icon: UserIcon, label, value }) => (
            <MenuItem
              value={value}
              key={value}
              role="group"
              className="group hover:bg-['#E7F0FA']"
              _hover={{
                backgroundColor:
                  value === "sign-out"
                    ? "rgba(225, 0,0 , 0.1)"
                    : colors.skyBlue,
              }}
              onClick={() => onClick(value as Value)}
            >
              <Icon
                as={UserIcon}
                boxSize={4}
                _groupHover={{
                  color: value === "sign-out" ? "red" : "#0760c9",
                }}
                color={colors.textGrey}
              />
              <Box
                flex={1}
                _groupHover={{
                  color: value === "sign-out" ? "red" : "#0760c9",
                }}
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
