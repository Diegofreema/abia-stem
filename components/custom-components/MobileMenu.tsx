import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "@/components/ui/menu";
import { IconMenu } from "@tabler/icons-react";
import { colors } from "@/constants";
import { accountLinks } from "@/dummy_data";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

export const MobileMenu = () => {
  const pathname = usePathname();
  const activeColor = (path: string) => {
    const isActive = pathname === path.toLowerCase();
    return isActive ? colors.skyBlue : "transparent";
  };
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconMenu color={colors.black} />
      </MenuTrigger>
      <MenuContent bg={colors.white}>
        {accountLinks.map((link, index) => (
          <MenuRoot
            positioning={{ placement: "right-start", gutter: 2 }}
            key={index}
          >
            <MenuTriggerItem
              value={link.account}
              color={colors.black}
              backgroundColor={
                pathname.includes(link.account.toLowerCase())
                  ? colors.skyBlue
                  : "transparent"
              }
            >
              {link.account}
            </MenuTriggerItem>
            <MenuContent bg={colors.white}>
              {link.links.map((l, i) => (
                <MenuItem
                  key={i}
                  value={l.label}
                  bg={activeColor(l.link)}
                  color={colors.textGrey}
                >
                  <Link href={l.link}>{l.label}</Link>
                </MenuItem>
              ))}
            </MenuContent>
          </MenuRoot>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};
