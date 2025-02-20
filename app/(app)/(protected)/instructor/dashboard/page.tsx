import { MostSellingCourseTable } from '@/components/tables/MostSellingCourseTable';
import { DashboardCard } from './_component/DashboardCard';
import { Suspense } from 'react';
import { DataCardSkeleton } from '@/components/ui/Skeletons';
import { Spinner } from '@chakra-ui/react';

const dashboard = async () => {
  return (
    <div>
      <Suspense fallback={<DataCardSkeleton />}>
        <DashboardCard />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-full w-full">
            <Spinner size="xl" />
          </div>
        }
      >
        <MostSellingCourseTable />
      </Suspense>
    </div>
  );
};

export default dashboard;
