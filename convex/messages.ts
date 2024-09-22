import { asyncMap } from "convex-helpers";
import { getOneFrom } from "convex-helpers/server/relationships";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const createMessage = mutation({
  args: {
    channelId: v.id("channels"),
    content: v.string(),
  },
  handler: async (ctx, { channelId, content }) => {
    const user = await getAuthenticatedUser(ctx);
    ctx.db.insert("messages", {
      channelId: channelId,
      content,
      createdByUserId: user._id,
    });
  },
});

export const getAllMessages = query({
  args: {
    channelId: v.optional(v.string()),
  },
  handler: async (ctx, { channelId }) => {
    if (!channelId) {
      return [];
    }

    const normalizedChannelId = ctx.db.normalizeId("channels", channelId);

    if (!normalizedChannelId) {
      return null;
    }
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_channel_id", (q) => q.eq("channelId", normalizedChannelId))
      .order("asc")
      .collect();
    return await asyncMap(messages, async (message) => {
      const user = await getOneFrom(
        ctx.db,
        "users",
        "by_id",
        message?.createdByUserId,
        "_id",
      );
      return {
        ...message,
        user,
      };
    });
  },
});
