import { asyncMap } from "convex-helpers";
import { getOneFrom } from "convex-helpers/server/relationships";
import { v } from "convex/values";

import { mutation, query } from "../_generated/server";
import { AppConvexError } from "../helper";
import { UserServices } from "../users/users.services";

export const create = mutation({
  args: {
    channelId: v.id("channels"),
    content: v.string(),
  },
  handler: async (ctx, { channelId, content }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    ctx.db.insert("messages", {
      channelId: channelId,
      content,
      createdByUserId: user._id,
    });
  },
});

export const deleteMessage = mutation({
  args: {
    messageId: v.id("messages"),
  },
  handler: async (ctx, { messageId }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    const message = await ctx.db.get(messageId);
    if (message?.createdByUserId !== user._id) {
      throw AppConvexError(
        "You don't have permission to delete this message",
        403,
      );
    }
    return await ctx.db.delete(messageId);
  },
});

export const edit = mutation({
  args: {
    messageId: v.id("messages"),
    content: v.string(),
  },
  handler: async (ctx, { messageId, content }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    const message = await ctx.db.get(messageId);
    if (message?.createdByUserId !== user._id) {
      throw AppConvexError(
        "You don't have permission to edit this message",
        403,
      );
    }
    return await ctx.db.patch(messageId, {
      content,
      lastEditedTime: Date.now(),
    });
  },
});

export const getAll = query({
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
