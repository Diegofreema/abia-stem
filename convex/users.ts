import { v } from 'convex/values';
import { internalMutation, query } from './_generated/server';

export const currentUser = query({
  args: { userId: v.optional(v.union(v.string(), v.null())) },
  handler: async (ctx, { userId }) => {
    if (!userId) {
      return null;
    }
    return await ctx.db
      .query('users')
      .withIndex('by_google_id', (q) => q.eq('clerkId', userId))
      .first();
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    image: v.string(),
    numberOfCourses: v.number(),
    numberOfStudents: v.number(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('users', {
      ...args,
    });
  },
});
