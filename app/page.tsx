import { Hero } from '@/components/landing/Hero';
import { HeroBottom } from '@/components/landing/HeroBottom';
import { PopularCourses } from '@/components/landing/PopularCourses';

export default function Home() {
  return (
    <div>
      <Hero />
      <HeroBottom />
      <PopularCourses />
    </div>
  );
}
