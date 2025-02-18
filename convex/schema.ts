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
  //   roles: v.union(
  //     v.literal('student'),
  //     v.literal('instructor'),
  //     v.literal('admin')
  //   ),
});

const Course = defineTable({
  id: v.id('courses'),
  title: v.string(),
  description: v.optional(v.string()),
  image: v.optional(v.string()),
  price: v.optional(v.number()),
  categoryId: v.optional(v.id('categories')),
  attachments: v.optional(v.array(v.id('attachments'))),
  isPublished: v.boolean(),
});

const Category = defineTable({
  id: v.id('categories'),
  name: v.string(),
  courses: v.optional(v.array(v.id('courses'))),
});
const Attachment = defineTable({
  name: v.string(),
  url: v.string(),
  courseId: v.id('courses'),
});

export default defineSchema({
  ...authTables,
  users: User.index('by_google_id', ['clerkId']),
  courses: Course,
  attachments: Attachment,
  categories: Category,
});
