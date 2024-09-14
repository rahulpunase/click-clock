import { v } from "convex/values";

import { Doc, Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
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
      createdBy: user._id,
      name,
      orgId: userData.selectedOrganization,
      type: "channel",
      description,
      isPrivate,
    });
  },
});

export async function _createChannel(
  ctx: MutationCtx,
  {
    name,
    createdBy,
    orgId,
    type,
    description,
    isPrivate,
    members,
  }: {
    name: string;
    orgId: Id<"organizations">;
    createdBy: Id<"users">;
    type: Doc<"channels">["type"];
    description?: string;
    isPrivate?: boolean;
    members?: Doc<"channels">["members"];
  },
) {
  return await ctx.db.insert("channels", {
    createdBy,
    name,
    orgId,
    type,
    description,
    isPrivate,
    members,
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
  return await ctx.db
    .query("channels")
    .withIndex("ind_by_orgId", (q) => q.eq("orgId", orgId))
    .filter((q) => q.eq(q.field("_id"), channelId))
    .unique();
}
