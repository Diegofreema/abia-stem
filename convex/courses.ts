import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

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
