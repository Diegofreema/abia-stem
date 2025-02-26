"use client";

import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { FlexWrapper } from "./FlexWrapper";
import { Avatar } from "../ui/avatar";
import { Stack } from "@chakra-ui/react";
import { NormalText, Title } from "../typography/Title";
import { colors } from "@/constants";
import { IconBook, IconStar, IconUser } from "@tabler/icons-react";
import { Button } from "../ui/button";
import NumberFormatter from "./NumberFormatter";
import { usePathname, useRouter } from "next/navigation";

export const ProfilePreview = () => {
  const { userId } = useAuth();
  const user = useQuery(api.users.currentUser, { userId: userId! });
  const router = useRouter();
  const pathname = usePathname();
  const onNavigate = () => {
    router.push("/instructor/courses/create-course");
  };
  if (pathname === "/instructor/courses/create-course") return null;
  const ratingText =
    user?.rating === 0 ? "No rating yet" : `${user?.rating.toFixed(1) || 0}/5`;
  return (
    <FlexWrapper
      width={"100%"}
      alignItems={{ base: "flex-start", md: "center" }}
      justifyContent={{ base: "flex-start", md: "space-between" }}
      flexDirection={{ base: "column", md: "row" }}
      gap={2}
    >
      <FlexWrapper gap={5} alignItems={{ md: "center" }}>
        <Avatar
          src={user?.image}
          width={{ base: 70, md: 150 }}
          height={{ base: 70, md: 150 }}
          mt={-10}
        />
        <Stack>
          <Title color={colors.black} fontSize={{ base: "xl", md: "3xl" }}>
            {user?.name}
          </Title>
          <FlexWrapper
            gap={{ base: 1, md: 4 }}
            alignItems={{ md: "center" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <FlexWrapper alignItems={"center"} gap={1}>
              <IconStar size={20} fill="#FFD700" />{" "}
              <NormalText color={colors.black} fontSize={18}>
                {ratingText}
              </NormalText>
            </FlexWrapper>
            <FlexWrapper alignItems={"center"} gap={1}>
              <IconUser size={20} fill={colors.orange} color={colors.orange} />
              <NumberFormatter
                number={user?.numberOfStudents}
                text="enrolled students"
              />
            </FlexWrapper>
            <FlexWrapper alignItems={"center"} gap={1}>
              <IconBook size={20} fill={colors.purple} color={colors.purple} />
              <NumberFormatter number={user?.numberOfCourses} text="courses" />
            </FlexWrapper>
          </FlexWrapper>
        </Stack>
      </FlexWrapper>
      <Button
        color={colors.white}
        onClick={onNavigate}
        bg={colors.green}
        px={5}
        ml={5}
        _hover={{ opacity: 0.5 }}
        className="transition duration-300"
        alignSelf={{ base: "center", md: "flex-end" }}
      >
        Create a course
      </Button>
    </FlexWrapper>
  );
};
