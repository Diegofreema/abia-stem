import { z } from 'zod';

export const courseDetailsValidator = z.object({
  title: z
    .string()
    .min(3, { message: 'Must be 3 or more characters' })
    .max(255, { message: 'Must be 255 or less characters' }),
  description: z
    .string()
    .min(3, { message: 'Must be 3 or more characters' })
    .max(255, { message: 'Must be 255 or less characters' }),
  price: z.string().min(1, { message: 'Price is required' }),
  category: z.string().min(3, { message: 'Select a category' }),
  courseLevel: z.enum(['beginner', 'intermediate', 'advanced', 'all levels']),
  isPaid: z.boolean().default(false),
});

export const courseMediaValidator = z.object({
  courseImage: z.string().url({ message: 'A thumbnail is required' }),
  thumbNailVideo: z
    .string()
    .url({ message: 'A course introduction is required' }),
});

export const chapterValidator = z.object({
  title: z
    .string()
    .min(3, { message: 'Must be 3 or more characters' })
    .max(255, { message: 'Must be 255 or less characters' }),
  description: z
    .string()
    .min(3, { message: 'Must be 3 or more characters' })
    .max(255, { message: 'Must be 255 or less characters' }),
  video: z.string().url({ message: 'A video is required' }),
  isPaid: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});
