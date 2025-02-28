import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

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
  numberOfPublishedCourses: v.optional(v.number()),
  numberOfStudents: v.number(),
  rating: v.number(),
});

const Course = defineTable({
  instructorId: v.id('users'),
  title: v.string(),
  description: v.string(),
  image: v.optional(v.union(v.string(), v.id('_storage'))),
  videoPreview: v.optional(v.union(v.string(), v.id('_storage'))),
  price: v.number(),
  category: v.string(),
  chapterId: v.optional(v.array(v.id('chapters'))),
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
const Chapters = defineTable({
  title: v.string(),
  description: v.string(),
  videoStorageId: v.string(),
  videoUrl: v.string(),
  isPublished: v.boolean(),
  isPaid: v.boolean(),
  courseId: v.id('courses'),
});
const Category = defineTable({
  name: v.string(),
});
const Attachment = defineTable({
  name: v.string(),
  url: v.string(),
  storageId: v.id('_storage'),
  courseId: v.id('courses'),
});

const MuxData = defineTable({
  assetId: v.string(),
  chapterId: v.string(),
  playbackId: v.optional(v.string()),
});

const UserProgress = defineTable({
  userId: v.id('users'),
  chapterId: v.id('chapters'),
  isCompleted: v.boolean(),
});

export default defineSchema({
  users: User.index('by_google_id', ['clerkId']),
  courses: Course.index('by_instructor', ['instructorId']).index('by_count', [
    'salesCount',
    'instructorId',
  ]),
  attachments: Attachment.index('by_course_id', ['courseId']),
  categories: Category,
  muxData: MuxData,
  userProgress: UserProgress,
  chapters: Chapters.index('by_course_id', ['courseId']),
});
