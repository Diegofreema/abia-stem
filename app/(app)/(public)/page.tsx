import { BecomeInstructorBanner } from "@/components/landing/BecomeInstructorBanner";
import { Feedback } from "@/components/landing/Feedback";
import { Hero } from "@/components/landing/Hero";
import { HeroBottom } from "@/components/landing/HeroBottom";
import { PopularCourses } from "@/components/landing/PopularCourses";
import { TrendingCourses } from "@/components/landing/TrendingCourses";
import { Box } from "@chakra-ui/react";
import { withAuth, WithUserDataProps } from "@/components/withAuth";

function Home({ user }: WithUserDataProps) {
  console.log({ user });
  return (
    <Box
      mx={"auto"}
      width={{ base: "90%", md: "80%", lg: "70%" }}
      pt={{ base: "50px", md: "100px" }}
    >
      <Hero />
      <HeroBottom />
      <PopularCourses />
      <BecomeInstructorBanner />
      <TrendingCourses />
      <Feedback />
    </Box>
  );
}

export default withAuth(Home);
