import { MostSellingCourseTable } from '@/components/tables/MostSellingCourseTable';
import { DashboardCard } from './_component/DashboardCard';

const dashboard = async () => {
  return (
    <div>
      <DashboardCard />
      <MostSellingCourseTable />
    </div>
  );
};

export default dashboard;
