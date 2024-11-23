import { asyncMap } from "convex-helpers";
import { v } from "convex/values";

import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import {
  action,
  internalQuery,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";
import { _addMemberToChannel, _getAllChannelMembers } from "./channelMembers";
import { AppConvexError } from "./helper";
import { UserDataServices } from "./userData/userData.services";
import { UserServices } from "./users/users.services";

export const getOrgChannels = query({
  args: {},
  handler: async (ctx) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      throw AppConvexError("No organization found", 429);
    }
    return await _getOrgChannels(ctx, {
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

    const channel = await _getChannelById(ctx, {
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

    return await _createChannel(ctx, {
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
    const data = await ctx.runQuery(internal.channels.matchName, {
      name,
    });
    if (data.length) {
      return "Failed";
    }
    // optionally return a value
    return "success";
  },
});

export async function _createChannel(
  ctx: MutationCtx,
  {
    name,
    createdByUserId,
    orgId,
    type,
    description,
    isPrivate,
    isGeneral,
  }: {
    name: string;
    orgId: Id<"organizations">;
    createdByUserId: Id<"users">;
    type: Doc<"channels">["type"];
    description?: string;
    isPrivate?: boolean;
    isGeneral: boolean;
  },
) {
  const channelId = await ctx.db.insert("channels", {
    createdByUserId,
    name,
    orgId,
    type,
    description,
    isPrivate,
    isGeneral,
  });

  // add admin as member
  await _addMemberToChannel(ctx, {
    channelId,
    joinedBy: createdByUserId,
    role: "admin",
    userId: createdByUserId,
  });
}

export async function _getOrgChannels(
  ctx: QueryCtx,
  {
    orgId,
    userId,
  }: {
    orgId: Id<"organizations">;
    userId: Id<"users">;
  },
) {
  const channels = await ctx.db
    .query("channels")
    .withIndex("ind_by_orgId", (q) => q.eq("orgId", orgId))
    .collect();

  const channelsToReturn: ((typeof channels)[number] & {
    isCurrentUserAdmin: boolean;
  })[] = [];
  await asyncMap(channels, async (channel) => {
    const members = await _getAllChannelMembers(ctx, {
      channelId: channel._id,
    });
    const isUserPartOfChannel = members.find(
      (member) => member.userId === userId,
    );
    if (isUserPartOfChannel) {
      channelsToReturn.push({
        ...channel,
        isCurrentUserAdmin:
          isUserPartOfChannel?.role === "admin" &&
          isUserPartOfChannel?.userId === userId,
      });
    }
  });

  return channelsToReturn;
}

/**
 * Retrieves a channel by its ID.
 *
 * @param ctx - The query context.
 * @param channelId - The ID of the channel to retrieve.
 * @param orgId - The ID of the organization to which the channel belongs.
 * @returns The channel object with additional information about the user who created the channel, or null if the channel is not found.
 */
export async function _getChannelById(
  ctx: QueryCtx,
  {
    channelId,
    orgId,
  }: {
    channelId: Id<"channels">;
    orgId: Id<"organizations">;
  },
) {
  const channel = await ctx.db
    .query("channels")
    .withIndex("ind_by_orgId", (q) => q.eq("orgId", orgId))
    .filter((q) => q.eq(q.field("_id"), channelId))
    .unique();

  if (!channel) {
    return null;
  }

  const user = await ctx.db.get(channel.createdByUserId);

  return {
    ...channel,
    createdByUser: user,
  };
}
