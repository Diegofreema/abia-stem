import { StepperForm } from '@/components/ui/StepperComponents/StepperForm';
import { withAuth, WithUserDataProps } from '@/components/withAuth';
import React from 'react';

const page = ({ user }: WithUserDataProps) => {
  return <StepperForm userId={user.id} />;
};

export default withAuth(page);
