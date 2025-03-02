import { withAuth, WithUserDataProps } from '@/components/withAuth';
import { Id } from '@/convex/_generated/dataModel';
import React from 'react';

type Props = {
  params: { courseId: Id<'courses'> };
};

const page = async ({ params }: WithUserDataProps & Props) => {
  return <div className="text-black">{params.courseId}</div>;
};

export default withAuth(page);
