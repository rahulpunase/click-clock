import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      // console.log
      return console.log("No user");
    }
    return await ctx.db
      .query("organizations")
      .filter((q) => q.eq(q.field("createdBy"), userId))
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      // console.log
      return console.log("No user");
    }

    const userData = await ctx.db
      .query("userData")
      .filter((q) => q.eq(q.field("createdBy"), userId))
      .first();

    const organizations = await ctx.db.insert("organizations", {
      createdBy: userId,
      isActive: true,
      name: args.name,
      ownedBy: userId,
    });

    if (!userData) {
      // create userData
      await ctx.db.insert("userData", {
        createdBy: userId,
        selectedOrganization: organizations,
      });
    } else {
      ctx.db.patch(userData._id, {
        selectedOrganization: organizations,
      });
    }
  },
});
