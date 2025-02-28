'use client'; // Error boundaries must be Client Components

import { Title } from '@/components/typography/Title';
import { Button } from '@/components/ui/button';
import { colors } from '@/constants';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col h-full min-h-[300px] justify-center items-center space-y-2">
      <Title color={colors.black} mb={5}>
        Something went wrong!
      </Title>
      <Button
        bg={colors.blue}
        color={colors.white}
        p={4}
        _hover={{
          opacity: 0.5,
        }}
        className="transition"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
