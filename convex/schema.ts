import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { authTables } from '@convex-dev/auth/server';

const User = defineTable({
  clerkId: v.string(),
  name: v.string(),
  email: v.string(),
  image: v.string(),
  bio: v.optional(v.string()),
  education: v.optional(v.array(v.string())),
  socials: v.optional(v.array(v.string())),
  emailVerificationTime: v.optional(v.number()),
  phone: v.optional(v.string()),
  phoneVerificationTime: v.optional(v.number()),
  isAnonymous: v.optional(v.boolean()),
  numberOfCourses: v.number(),
  numberOfStudents: v.number(),
  rating: v.number(),
  //   roles: v.union(
  //     v.literal('student'),
  //     v.literal('instructor'),
  //     v.literal('admin')
  //   ),
});

const Course = defineTable({
  instructorId: v.id('users'),
  title: v.string(),
  description: v.string(),
  image: v.optional(v.string()),
  price: v.number(),
  category: v.string(),
  attachments: v.array(v.id('attachments')),
  courseLevel: v.union(
    v.literal('beginner'),
    v.literal('intermediate'),
    v.literal('advanced'),
    v.literal('all levels')
  ),
  isPublished: v.boolean(),
  salesCount: v.number(),
  isPaid: v.boolean(),
});

const Category = defineTable({
  name: v.string(),
});
const Attachment = defineTable({
  name: v.string(),
  url: v.string(),
  courseId: v.id('courses'),
});

export default defineSchema({
  users: User.index('by_google_id', ['clerkId']),
  courses: Course.index('by_instructor', ['instructorId']).index('by_count', [
    'salesCount',
    'instructorId',
  ]),
  attachments: Attachment,
  categories: Category,
});
