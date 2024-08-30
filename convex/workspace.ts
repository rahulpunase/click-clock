import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("createdBy"), userId))
      .collect();
  },
});

export const selectOrganization = mutation({
  args: {
    orgId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    const workSpace = await ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("createdBy"), userId))
      .first();

    if (!workSpace) {
      return null;
    }

    return await ctx.db.patch(workSpace?._id, {
      selectedOrganization: args.orgId,
    });
  },
});
