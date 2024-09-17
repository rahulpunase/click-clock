import { v } from "convex/values";

import { Doc, Id } from "./_generated/dataModel";
import { mutation, MutationCtx } from "./_generated/server";
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
      );
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
