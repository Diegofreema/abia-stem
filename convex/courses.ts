import { ConvexError, v } from 'convex/values';
import { Id } from './_generated/dataModel';
import { mutation, query, QueryCtx } from './_generated/server';
import { getFAQSFromCourseId } from './faqs';
// queries
export const getCourses = query({
  args: {
    clerkId: v.optional(v.string()),
  },
  handler: async (ctx, { clerkId }) => {
    if (!clerkId) {
      return [];
    }
    const instructor = await ctx.db
      .query('users')
      .withIndex('by_google_id', (q) => q.eq('clerkId', clerkId))
      .first();
    if (!instructor) {
      return [];
    }
    return await ctx.db
      .query('courses')
      .withIndex('by_count')
      .filter((q) =>
        q.and(
          q.eq(q.field('instructorId'), instructor._id),
          q.eq(q.field('isPublished'), true)
        )
      )
      .order('desc')
      .take(10);
  },
});
export const getCourse = query({
  args: {
    courseId: v.union(v.id('courses'), v.null()),
  },
  handler: async (ctx, { courseId }) => {
    if (!courseId) {
      return null;
    }
    const course = await ctx.db.get(courseId);

    const videoUrl = await ctx.storage.getUrl(
      course?.videoPreview as Id<'_storage'>
    );

    const attachments = await getAttachment(ctx, course?._id as Id<'courses'>);
    const chapters = await ctx.db
      .query('chapters')
      .withIndex('by_course_id', (q) => q.eq('courseId', courseId))
      .collect();
    const faqs = await getFAQSFromCourseId(ctx, courseId);
    return {
      course,
      videoUrl,
      attachments,
      chapters,
      faqs,
    };
  },
});

export const getCategory = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('categories').collect();
  },
});

// mutations

export const createCourse = mutation({
  args: {
    instructorId: v.id('users'),
    title: v.string(),
    description: v.string(),
    price: v.number(),
    category: v.string(),
    courseLevel: v.union(
      v.literal('beginner'),
      v.literal('intermediate'),
      v.literal('advanced'),
      v.literal('all levels')
    ),
    isPaid: v.boolean(),
  },
  handler: async (ctx, args) => {
    const courseId = await ctx.db.insert('courses', {
      ...args,
      isPublished: false,
      salesCount: 0,
    });
    if (courseId) {
      const instructor = await ctx.db.get(args.instructorId);
      await ctx.db.patch(args.instructorId, {
        numberOfCourses: (instructor?.numberOfCourses ?? 0) + 1,
      });
    }

    return courseId;
  },
});
export const editCourse = mutation({
  args: {
    courseId: v.id('courses'),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.id('_storage')),
    videoPreview: v.optional(v.union(v.string(), v.id('_storage'))),
    price: v.optional(v.number()),
    category: v.optional(v.string()),
    attachments: v.optional(v.array(v.id('attachments'))),
    courseLevel: v.optional(
      v.union(
        v.literal('beginner'),
        v.literal('intermediate'),
        v.literal('advanced'),
        v.literal('all levels')
      )
    ),
    isPublished: v.optional(v.boolean()),
    salesCount: v.optional(v.number()),
    isPaid: v.optional(v.boolean()),
  },
  handler: async (ctx, { courseId, ...rest }) => {
    const imageUrl = (await getMediaUrl(ctx, rest.image)) ?? '';
    return await ctx.db.patch(courseId, {
      imageUrl,
      imageStorageId: rest.image,
      ...rest,
    });
  },
});
export const publishCourse = mutation({
  args: {
    courseId: v.id('courses'),
    loggedInUser: v.id('users'),
  },
  handler: async (ctx, { courseId, loggedInUser }) => {
    const course = await ctx.db
      .query('courses')
      .withIndex('by_id', (q) => q.eq('_id', courseId))
      .filter((q) => q.eq(q.field('instructorId'), loggedInUser))
      .first();
    if (!course) {
      throw new ConvexError({
        message: 'Unauthorized',
        code: 401,
      });
    }

    await ctx.db.patch(course._id, {
      isPublished: true,
    });
    if (courseId) {
      const instructor = await ctx.db.get(loggedInUser);
      await ctx.db.patch(loggedInUser, {
        numberOfPublishedCourses:
          (instructor?.numberOfPublishedCourses ?? 0) + 1,
      });
    }
  },
});
export const createAttachment = mutation({
  args: {
    courseId: v.id('courses'),
    userId: v.id('users'),
    storageId: v.id('_storage'),
  },
  handler: async (ctx, { courseId, storageId, userId }) => {
    const courseOwner = await ctx.db
      .query('courses')
      .filter((q) =>
        q.and(
          q.eq(q.field('_id'), courseId),
          q.eq(q.field('instructorId'), userId)
        )
      )
      .first();

    if (!courseOwner) {
      throw new ConvexError({
        message: 'Unauthorized',
        code: 401,
      });
    }
    const url = await ctx.storage.getUrl(storageId);
    if (!url) {
      throw new ConvexError({
        message: 'Unauthorized',
        code: 401,
      });
    }
    await ctx.db.insert('attachments', {
      courseId,
      storageId,
      url,
      name: url.split('/').pop() as string,
    });
  },
});
// create chapters

export const createChapter = mutation({
  args: {
    courseId: v.id('courses'),
    loggedInUserId: v.id('users'),
    videoStorageId: v.id('_storage'),
    title: v.string(),
    description: v.string(),
    isPaid: v.boolean(),
    isPublished: v.boolean(),
  },
  handler: async (
    ctx,
    { courseId, loggedInUserId, videoStorageId, ...rest }
  ) => {
    const courseOwner = await ctx.db
      .query('courses')
      .withIndex('by_instructor', (q) => q.eq('instructorId', loggedInUserId))
      .filter((q) => q.eq(q.field('_id'), courseId))
      .first();

    if (!courseOwner) {
      throw new ConvexError({
        message: 'Unauthorized',
        code: 401,
      });
    }
    const videoUrl = (await ctx.storage.getUrl(videoStorageId)) || '';

    const newChapterId = await ctx.db.insert('chapters', {
      courseId,
      videoStorageId,
      videoUrl,
      ...rest,
    });
    const prevChaptersId = courseOwner.chapterId ?? [];
    if (newChapterId) {
      await ctx.db.patch(courseOwner._id, {
        chapterId: [...prevChaptersId, newChapterId],
      });
    }
  },
});
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// helpers

const getAttachment = async (ctx: QueryCtx, courseId: Id<'courses'>) => {
  return await ctx.db
    .query('attachments')
    .withIndex('by_course_id', (q) => q.eq('courseId', courseId))
    .collect();
};

const getMediaUrl = async (
  ctx: QueryCtx,
  storageId: Id<'_storage'> | undefined
) => {
  if (!storageId) return '';
  return await ctx.storage.getUrl(storageId);
};
