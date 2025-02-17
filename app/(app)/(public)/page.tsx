import { BecomeInstructorBanner } from '@/components/landing/BecomeInstructorBanner';
import { Feedback } from '@/components/landing/Feedback';
import { Hero } from '@/components/landing/Hero';
import { HeroBottom } from '@/components/landing/HeroBottom';
import { PopularCourses } from '@/components/landing/PopularCourses';
import { TrendingCourses } from '@/components/landing/TrendingCourses';
import { Box } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box mx={'auto'} width={{ base: '90%', md: '80%', lg: '70%' }}>
      <Hero />
      <HeroBottom />
      <PopularCourses />
      <BecomeInstructorBanner />
      <TrendingCourses />
      <Feedback />
    </Box>
  );
}
