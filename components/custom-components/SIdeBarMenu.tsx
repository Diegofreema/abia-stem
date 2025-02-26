"use client";

import { IconButton } from "@chakra-ui/react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { colors } from "@/constants";
import { IconMenu4 } from "@tabler/icons-react";
import { instructorRoutes } from "@/routes";
import { SideNav } from "@/components/custom-components/SideNav";
import React, { useState } from "react";

export const SideBarMenu = () => {
  const [open, setOpen] = useState(false);
  console.log({ open });
  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton bg={colors.blue} color={colors.white}>
          <IconMenu4 />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerBody>
          <SideNav routes={instructorRoutes} transparent />
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
