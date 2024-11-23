import { asyncMap } from "convex-helpers";
import { getManyFrom } from "convex-helpers/server/relationships";
import { WithoutSystemFields } from "convex/server";

import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";

async function getOrgChannels(
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
    const members = await getAllChannelMembers(ctx, {
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

async function addMemberToChannel(
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

async function addMultipleMembersToChannel(
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

async function getAllChannelMembers(
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

async function createChannel(
  ctx: MutationCtx,
  data: WithoutSystemFields<Doc<"channels">>,
) {
  const channelId = await ctx.db.insert("channels", {
    ...data,
  });

  // add admin as member
  await addMemberToChannel(ctx, {
    channelId,
    joinedBy: data.createdByUserId,
    role: "admin",
    userId: data.createdByUserId,
  });
}

export async function getChannelById(
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

export const ChannelsServices = {
  getOrgChannels,
  addMemberToChannel,
  addMultipleMembersToChannel,
  getAllChannelMembers,
  getChannelById,
  createChannel,
};
