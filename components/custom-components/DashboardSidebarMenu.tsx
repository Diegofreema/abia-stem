"use client";

import { FlexWrapper } from "@/components/custom-components/FlexWrapper";
import { NormalText } from "@/components/typography/Title";
import { colors } from "@/constants";
import { SideBarMenu } from "@/components/custom-components/SIdeBarMenu";

export const DashboardSidebarMenu = () => {
  return (
    <FlexWrapper
      className={"sm:block md:hidden"}
      justifyContent="space-between"
      alignItems={"center"}
      mt={4}
    >
      <NormalText color={colors.black}>Menu</NormalText>
      <SideBarMenu />
    </FlexWrapper>
  );
};
