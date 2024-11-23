import { asyncMap } from "convex-helpers";
import { getOneFromOrThrow } from "convex-helpers/server/relationships";
import { v } from "convex/values";

import { internal } from "../_generated/api";
import { action, internalQuery, mutation, query } from "../_generated/server";
import { AppConvexError } from "../helper";
import { UserDataServices } from "../userData/userData.services";
import { UserServices } from "../users/users.services";
import { ChannelsServices } from "./channels.services";

export const getOrgChannels = query({
  args: {},
  handler: async (ctx) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      throw AppConvexError("No organization found", 429);
    }
    return await ChannelsServices.getOrgChannels(ctx, {
      orgId: userData.selectedOrganization,
      userId: user._id,
    });
  },
});

export const getChannelById = query({
  args: {
    channelId: v.string(),
  },
  handler: async (ctx, { channelId }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      throw AppConvexError("No organization found", 429);
    }

    const normalizeId = ctx.db.normalizeId("channels", channelId);

    if (!normalizeId) {
      return null;
    }

    const channel = await ChannelsServices.getChannelById(ctx, {
      channelId: normalizeId,
      orgId: userData.selectedOrganization,
    });

    const isUserMemberOfTheChannel = await ctx.db
      .query("channelMembers")
      .withIndex("ind_by_channelMemberId_channelId", (q) =>
        q.eq("channelId", normalizeId).eq("userId", user._id),
      )
      .unique();

    if (!isUserMemberOfTheChannel) {
      return null;
    }

    return {
      ...channel,
      isCurrentUserAdmin:
        isUserMemberOfTheChannel.userId === user._id &&
        isUserMemberOfTheChannel.role === "admin",
    };
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    isPrivate: v.optional(v.boolean()),
  },
  handler: async (ctx, { name, description, isPrivate }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      throw AppConvexError("No organization found");
    }

    return await ChannelsServices.createChannel(ctx, {
      createdByUserId: user._id,
      name,
      orgId: userData.selectedOrganization,
      type: "channel",
      description,
      isPrivate,
      isGeneral: false,
    });
  },
});

export const matchName = internalQuery({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      throw AppConvexError("No organization found");
    }
    console.log(name);
    return await ctx.db
      .query("channels")
      .withSearchIndex("search_by_name", (q) =>
        // @ts-expect-error Error
        q.search("name", name).eq("orgId", userData.selectedOrganization),
      )
      .collect();
  },
});

export const matchNameAction = action({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    // do something with `args.a` and `args.b`
    const data = await ctx.runQuery(internal.channels.controller.matchName, {
      name,
    });
    if (data.length) {
      return "Failed";
    }
    // optionally return a value
    return "success";
  },
});

export const update = mutation({
  args: {
    channelId: v.id("channels"),
    isFavorite: v.optional(v.boolean()),
    description: v.optional(v.string()),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { channelId, isFavorite, description, name }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    const channel = await ctx.db.get(channelId);

    if (channel?.createdByUserId !== user._id) {
      return AppConvexError("No permission to edit the channel", 403);
    }

    const payload = {};
    if (name) {
      Object.assign(payload, {
        name,
      });
    }

    await ctx.db.patch(channelId, {
      isFavorite: isFavorite ? !channel.isFavorite : channel.isFavorite,
      description,
      ...payload,
    });
  },
});

export const addMembersToChannel = mutation({
  args: {
    channelId: v.id("channels"),
    users: v.array(v.id("users")),
  },
  handler: async (ctx, { channelId, users }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    await ChannelsServices.addMultipleMembersToChannel(ctx, {
      channelId,
      joinedBy: user._id,
      users,
    });
  },
});

export const removeMemberFromChannel = mutation({
  args: {
    channelId: v.optional(v.string()),
    memberToRemoveId: v.id("users"),
  },
  handler: async (ctx, { channelId, memberToRemoveId }) => {
    if (!channelId) {
      throw AppConvexError("No channel found");
    }
    const normalizedChannelId = ctx.db.normalizeId("channels", channelId);
    if (!normalizedChannelId) {
      throw AppConvexError("No channel found");
    }
    const member = await ctx.db
      .query("channelMembers")
      .withIndex("ind_by_channelMemberId_channelId", (q) =>
        q.eq("channelId", normalizedChannelId).eq("userId", memberToRemoveId),
      )
      .unique();

    if (member?._id) {
      await ctx.db.delete(member._id);
    }
  },
});

export const allChannelMembers = query({
  args: {
    channelId: v.optional(v.id("channels")),
  },
  handler: async (ctx, { channelId }) => {
    if (!channelId) {
      throw AppConvexError("Channel id is required to fetch channels", 403);
    }

    const members = await ChannelsServices.getAllChannelMembers(ctx, {
      channelId,
    });

    return asyncMap(members, async (member) => {
      const user = await getOneFromOrThrow(
        ctx.db,
        "users",
        "by_id",
        member.userId,
        "_id",
      );
      return {
        ...member,
        user,
      };
    });
  },
});
