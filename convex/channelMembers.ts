import { asyncMap } from "convex-helpers";
import {
  getManyFrom,
  getOneFrom,
  getOneFromOrThrow,
} from "convex-helpers/server/relationships";
import { v } from "convex/values";

import { Doc, Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { AppConvexError } from "./helper";
import { getAuthenticatedUser } from "./users";

export const addMembersToChannel = mutation({
  args: {
    channelId: v.id("channels"),
    users: v.array(v.id("users")),
  },
  handler: async (ctx, { channelId, users }) => {
    const user = await getAuthenticatedUser(ctx);
    await _addMultipleMembersToChannel(ctx, {
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

    const members = await _getAllChannelMembers(ctx, {
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

export async function _addMemberToChannel(
  ctx: MutationCtx,
  {
    channelId,
    joinedBy,
    role,
    userId,
  }: {
    userId: Id<"users">;
    channelId: Id<"channels">;
    joinedBy: Id<"users">;
    role: Doc<"channelMembers">["role"];
  },
) {
  return await ctx.db.insert("channelMembers", {
    userId: userId,
    channelId,
    joinedBy,
    role,
  });
}

export async function _addMultipleMembersToChannel(
  ctx: MutationCtx,
  {
    channelId,
    joinedBy,
    users,
  }: {
    channelId: Id<"channels">;
    joinedBy: Id<"users">;
    users: Id<"users">[];
  },
) {
  const memberFunctions = users.map(async (userId) => {
    const member = await ctx.db
      .query("channelMembers")
      .withIndex("ind_by_channelMemberId_channelId", (q) =>
        q.eq("channelId", channelId).eq("userId", userId),
      )
      .unique();
    if (member) {
      return Promise.resolve();
    }
    await ctx.db.insert("channelMembers", {
      channelId,
      joinedBy,
      role: "member",
      userId,
    });
  });
  await Promise.all(memberFunctions);
}

export async function _getAllChannelMembers(
  ctx: QueryCtx,
  { channelId }: { channelId: Id<"channels"> },
) {
  return await getManyFrom(
    ctx.db,
    "channelMembers",
    "ind_channelId",
    channelId,
    "channelId",
  );
}
