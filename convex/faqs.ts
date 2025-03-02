import { ConvexError, v } from 'convex/values';
import { Id } from './_generated/dataModel';
import { mutation, QueryCtx } from './_generated/server';

// mutations

export const createFAQ = mutation({
  args: {
    courseId: v.id('courses'),
    question: v.string(),
    answer: v.string(),
    loggedInUser: v.id('users'),
  },
  handler: async (ctx, { courseId, loggedInUser, ...rest }) => {
    const courseOwner = await ctx.db
      .query('courses')
      .withIndex('by_instructor', (q) => q.eq('instructorId', loggedInUser))
      .filter((q) => q.eq(q.field('_id'), courseId))
      .first();

    if (!courseOwner) {
      throw new ConvexError({
        code: 401,
        message: 'Unauthorized',
      });
    }

    await ctx.db.insert('faqs', {
      ...rest,
      courseId,
    });
  },
});

// helper

export const getFAQSFromCourseId = async (
  ctx: QueryCtx,
  courseId: Id<'courses'>
) => {
  return await ctx.db
    .query('faqs')
    .withIndex('by_course_id', (q) => q.eq('courseId', courseId))
    .collect();
};
