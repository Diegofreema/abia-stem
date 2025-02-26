"use client";
import { IRoutes } from "@/types";
import { For, Stack } from "@chakra-ui/react";
import { NavigatorLink } from "./NavigatorLink";
import { colors } from "@/constants";
import { usePathname } from "next/navigation";

type Props = {
  routes: IRoutes[];
  transparent?: boolean;
};

export const SideNav = ({ routes, transparent }: Props): JSX.Element | null => {
  const pathname = usePathname();

  if (pathname === "/instructor/courses/create-course") {
    return null;
  }
  return (
    <Stack
      gap={4}
      backgroundColor={transparent ? "transparent" : colors.dark}
      p={5}
      borderRadius={5}
      flexBasis={"30%"}
    >
      <For each={routes}>
        {(route, index) => {
          const isActive = pathname.includes(route.path);
          return (
            <NavigatorLink route={route} key={index} isActive={isActive} />
          );
        }}
      </For>
    </Stack>
  );
};
