"use client";
import { colors } from "@/constants";
import { For, Stack } from "@chakra-ui/react";
import { IconRosetteDiscountCheck } from "@tabler/icons-react";
import Image from "next/image";
import { FlexWrapper } from "../custom-components/FlexWrapper";
import { GridWrapper } from "../custom-components/GridWrapper";
import Magnet from "../custom-components/Magnet";
import RotatingText from "../custom-components/RotatingText";
import { NormalText } from "../typography/Title";
import { FloatingImages } from "./FloatingImages";
import { HeroActionBtns } from "./HeroActionBtns";
import { HoverAvatarCard } from "./HoverAvatarCard";

const text = ["Learn with experts", "Get certificate", "Get membership"];

export const Hero = () => {
  return (
    <GridWrapper placeItems={"center"} width={"100%"}>
      <LeftHero />
      <RightHero />
    </GridWrapper>
  );
};

const LeftHero = () => {
  return (
    <Stack gap={7}>
      <FlexWrapper
        gap={2}
        alignItems={"center"}
        justifyContent={{ base: "center", md: "flex-start" }}
        className={"sm:text-2xl"}
      >
        <RotatingText
          texts={["at your fingertips", "that is self paced"]}
          mainClassName="px-2 sm:px-2  md:px-3 bg-cyan-300 text-black text-3xl font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
        />
      </FlexWrapper>

      <NormalText fontSize={{ base: "md", md: "xl" }} color={colors.textGrey}>
        Online learning and teaching marketplace with 5K+ courses & 10M
        students. Taught by experts to help you acquire new skills.
      </NormalText>
      <FlexWrapper gap={5} flexWrap={"wrap"}>
        <For each={text}>
          {(item, index) => (
            <FlexWrapper
              key={index}
              gap={1}
              className={"sm:basis-1/2 md:basis-1/3"}
            >
              <IconRosetteDiscountCheck fill={colors.black} />
              <NormalText
                fontSize={{ base: "sm", md: "md" }}
                color={colors.textGrey}
                whiteSpace={"nowrap"}
              >
                {item}
              </NormalText>
            </FlexWrapper>
          )}
        </For>
      </FlexWrapper>
      <HeroActionBtns />
    </Stack>
  );
};

const RightHero = () => {
  return (
    <FlexWrapper
      justifyContent={"center"}
      width={"100%"}
      height={"100%"}
      position={"relative"}
    >
      <Magnet padding={5} disabled={false}>
        <Image
          src={"/hero.png"}
          width={500}
          height={500}
          alt="hero"
          objectFit="cover"
        />
      </Magnet>

      <FloatingImages src="./download.svg" top="50%" left={0} />
      <FloatingImages
        src="./figma.svg"
        top="80%"
        right={0}
        width={30}
        height={30}
      />
      <FloatingImages
        src="./angular.svg"
        top="10%"
        right={0}
        width={35}
        height={35}
      />
      <HoverAvatarCard />
    </FlexWrapper>
  );
};
