import { MostSellingCourseTable } from '@/components/tables/MostSellingCourseTable';
import { DashboardCard } from './_component/DashboardCard';
import { Suspense } from 'react';

const dashboard = async () => {
  return (
    <div>
      <Suspense>
        <DashboardCard />
      </Suspense>
      <Suspense>
        <MostSellingCourseTable />
      </Suspense>
    </div>
  );
};

export default dashboard;
