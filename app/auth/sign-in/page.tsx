import { AuthForm } from '@/components/auth/AuthForm';
import { AuthImage } from '@/components/auth/AuthImage';
import { GridWrapper } from '@/components/custom-components/GridWrapper';
import React from 'react';

const page = () => {
  return (
    <GridWrapper gap={false}>
      <AuthImage />
      <AuthForm />
    </GridWrapper>
  );
};

export default page;
