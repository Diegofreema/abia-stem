'use client';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthImage } from '@/components/auth/AuthImage';
import { GridWrapper } from '@/components/custom-components/GridWrapper';
import { useAuth } from '@clerk/clerk-react';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = () => {
  const { isSignedIn, isLoaded } = useAuth();
  if (isLoaded && isSignedIn) {
    return redirect('/');
  }
  return (
    <GridWrapper gap={false}>
      <AuthImage />
      <AuthForm />
    </GridWrapper>
  );
};

export default Page;
