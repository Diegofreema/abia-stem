'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { trendingCoursesArray } from '@/dummy_data';
import 'react-multi-carousel/lib/styles.css';
import { TrendingCourseCard } from './TrendingCourseCard';

export const TrendingCoursesCards = (): JSX.Element => {
  return (
    <Carousel
      className="py-10 group"
      opts={{ loop: true, dragFree: true }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="py-10">
        {trendingCoursesArray.map((course, index) => (
          <CarouselItem
            className="sm:basis-1 md:basis-1/2 lg:basis-1/3"
            key={index}
          >
            <TrendingCourseCard course={course} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="group-hover:-translate-x-10" />
      <CarouselNext />
    </Carousel>
  );
};
