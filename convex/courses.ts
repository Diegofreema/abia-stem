import { v } from 'convex/values';
import { query } from './_generated/server';

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
