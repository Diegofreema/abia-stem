import { BecomeInstructorBanner } from '@/components/landing/BecomeInstructorBanner';
import { Hero } from '@/components/landing/Hero';
import { HeroBottom } from '@/components/landing/HeroBottom';
import { PopularCourses } from '@/components/landing/PopularCourses';
import { TrendingCourses } from '@/components/landing/TrendingCourses';

export default function Home() {
  return (
    <div>
      <Hero />
      <HeroBottom />
      <PopularCourses />
      <BecomeInstructorBanner />
      <TrendingCourses />
    </div>
  );
}
