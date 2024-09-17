import { v } from "convex/values";

import { Doc, Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { _addMemberToChannel } from "./channelMembers";
import { AppConvexError } from "./helper";
import { getCurrentUserData } from "./userData";
import { getAuthenticatedUser } from "./users";

export const getOrgChannels = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);
    const userData = await getCurrentUserData(ctx, user._id);
    if (!userData.selectedOrganization) {
      throw AppConvexError("No organization found", 429);
    }
    return await _getOrgChannels(ctx, {
      orgId: userData.selectedOrganization,
    });
  },
});

export const getChannelById = query({
  args: {
    channelId: v.id("channels"),
  },
  handler: async (ctx, { channelId }) => {
    const user = await getAuthenticatedUser(ctx);
    const userData = await getCurrentUserData(ctx, user._id);
    if (!userData.selectedOrganization) {
      throw AppConvexError("No organization found", 429);
    }
    return _getChannelById(ctx, {
      channelId,
      orgId: userData.selectedOrganization,
    });
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    isPrivate: v.optional(v.boolean()),
  },
  handler: async (ctx, { name, description, isPrivate }) => {
    const user = await getAuthenticatedUser(ctx);
    const userData = await getCurrentUserData(ctx, user._id);
    if (!userData.selectedOrganization) {
      throw AppConvexError("No organization found");
    }

    return await _createChannel(ctx, {
      createdByUserId: user._id,
      name,
      orgId: userData.selectedOrganization,
      type: "channel",
      description,
      isPrivate,
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
    const user = await getAuthenticatedUser(ctx);
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

export async function _createChannel(
  ctx: MutationCtx,
  {
    name,
    createdByUserId,
    orgId,
    type,
    description,
    isPrivate,
  }: {
    name: string;
    orgId: Id<"organizations">;
    createdByUserId: Id<"users">;
    type: Doc<"channels">["type"];
    description?: string;
    isPrivate?: boolean;
  },
) {
  const channelId = await ctx.db.insert("channels", {
    createdByUserId,
    name,
    orgId,
    type,
    description,
    isPrivate,
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
  }: {
    orgId: Id<"organizations">;
  },
) {
  return await ctx.db
    .query("channels")
    .withIndex("ind_by_orgId", (q) => q.eq("orgId", orgId))
    .collect();
}

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
