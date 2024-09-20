import { asyncMap } from "convex-helpers";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const getOnlineUsers = query({
  args: {
    userIds: v.array(v.string()),
  },
  handler: async (ctx, { userIds }) => {
    if (!userIds.length) {
      return null;
    }

    return await asyncMap(userIds, async (userId) => {
      const normalizeId = ctx.db.normalizeId("users", userId);
      if (!normalizeId) {
        return null;
      }
      const presenceData = await ctx.db
        .query("presence")
        .withIndex("ind_by_userId", (q) => q.eq("userId", normalizeId))
        .unique();

      if (!presenceData) {
        return {
          status: "offline",
          lastOnline: 0,
          diff: 0,
          userId,
        };
      }

      const diff =
        new Date().getTime() -
        (presenceData.lastOnlineTime ?? new Date().getTime());
      const online = diff > 10000 ? "offline" : "online";
      return {
        status: online,
        lastOnline: presenceData.lastOnlineTime,
        diff,
        userId,
      };
    });
  },
});

export const updateLastOnline = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);

    const alreadyThere = await ctx.db
      .query("presence")
      .withIndex("ind_by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (alreadyThere) {
      return await ctx.db.patch(alreadyThere._id, {
        lastOnlineTime: new Date().getTime(),
      });
    }

    await ctx.db.insert("presence", {
      lastOnlineTime: new Date().getTime(),
      userId: user._id,
    });
  },
});
