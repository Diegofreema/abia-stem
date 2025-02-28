import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDuration, intervalToDuration } from 'date-fns';
import { ReactMutation } from 'convex/react';
import { EmptyObject } from 'react-hook-form';
import { Id } from '@/convex/_generated/dataModel';

const formatTimeDuration = (seconds: number): string => {
  // Convert seconds to milliseconds
  const milliseconds = seconds * 1000;

  // Get the current date
  const now = new Date();

  // Calculate the future date by adding the duration to the current date
  const futureDate = new Date(now.getTime() + milliseconds);

  // Get the duration between now and the future date
  const duration = intervalToDuration({
    start: now,
    end: futureDate,
  });

  // Format the duration into a human-readable string
  const formattedDuration = formatDuration(duration, {
    format: ['months', 'weeks', 'days'],
    zero: false, // Exclude zero values
    delimiter: ', ', // Add a comma and space between units
  });

  return formattedDuration;
};

export default formatTimeDuration;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateStorageId = async (
  generateUploadUrl: any,
  selectedFile: File
): Promise<Id<'_storage'>> => {
  const fileUrl = await generateUploadUrl();
  const result = await fetch(fileUrl, {
    method: 'POST',
    headers: { 'Content-Type': selectedFile!.type },
    body: selectedFile,
  });
  const { storageId } = await result.json();
  return storageId;
};
