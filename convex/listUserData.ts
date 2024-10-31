import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { AppConvexError } from "./helper";
import { getAuthenticatedUser } from "./users";

export const createOrUpdate = mutation({
  args: {
    listId: v.string(),
    sortBy: v.optional(v.string()),
    groupBy: v.optional(v.string()),
  },
  handler: async (ctx, { listId, ...data }) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    const normalizedListId = ctx.db.normalizeId("lists", listId);
    if (!normalizedListId) {
      throw AppConvexError("Incorrect list id provided");
    }

    const listUserData = await ctx.db
      .query("listUserData")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!listUserData) {
      // create new
      return await ctx.db.insert("listUserData", {
        listId: normalizedListId,
        userId: user._id,
        ...data,
      });
    } else {
      return await ctx.db.patch(listUserData._id, {
        ...data,
      });
    }
  },
});

export const get = query({
  args: {
    listId: v.optional(v.string()),
  },
  handler: async (ctx, { listId }) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    if (!listId) {
      return null;
    }
    const normalizedListId = ctx.db.normalizeId("lists", listId);
    if (!normalizedListId) {
      throw AppConvexError("Incorrect list id provided");
    }
    return await ctx.db
      .query("listUserData")
      .withIndex("by_listId_userId", (q) =>
        q.eq("listId", normalizedListId).eq("userId", user._id),
      )
      .unique();
  },
});
