import { getAuthSessionId } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import { internalMutation, query } from './_generated/server';

export const currentUser = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query('users')
      .withIndex('by_google_id', (q) => q.eq('clerkId', userId))
      .first();
  },
});

export const currentSession = query({
  args: {},
  handler: async (ctx) => {
    const sessionId = await getAuthSessionId(ctx);
    if (sessionId === null) {
      return null;
    }
    return await ctx.db.get(sessionId);
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('users', {
      ...args,
    });
  },
});
