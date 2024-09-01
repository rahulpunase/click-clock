import { query, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export async function getAuthenticatedUser(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    return null;
  }
  return await ctx.db.get(userId);
}

export const current = query({
  args: {},
  handler: async (ctx) => {
    return getAuthenticatedUser(ctx);
  },
});
