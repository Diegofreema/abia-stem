import { ConvexError, v } from 'convex/values';
import { mutation, MutationCtx, query, QueryCtx } from './_generated/server';
import { Id } from './_generated/dataModel';
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
      .filter((q) => q.eq(q.field('instructorId'), instructor._id))
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

    const imageUrl = await ctx.storage.getUrl(course?.image as Id<'_storage'>);
    const videoUrl = await ctx.storage.getUrl(
      course?.videoPreview as Id<'_storage'>
    );

    const attachments = await getAttachment(ctx, course?._id as Id<'courses'>);

    return {
      ...course,
      imageUrl,
      videoUrl,
      attachments,
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
    return await ctx.db.insert('courses', {
      ...args,
      isPublished: false,
      salesCount: 0,
    });
  },
});
export const editCourse = mutation({
  args: {
    courseId: v.id('courses'),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.union(v.string(), v.id('_storage'))),
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
    return await ctx.db.patch(courseId, {
      ...rest,
    });
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
