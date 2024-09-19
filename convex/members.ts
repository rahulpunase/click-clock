import { asyncMap } from "convex-helpers";
import { getManyFrom, getOneFrom } from "convex-helpers/server/relationships";
import { v } from "convex/values";
import differenceBy from "lodash-es/differenceBy";

import { Doc, Id } from "./_generated/dataModel";
import { MutationCtx, query, QueryCtx } from "./_generated/server";
import { _getAllChannelMembers } from "./channelMembers";
import { getCurrentUserData } from "./userData";
import { getAuthenticatedUser } from "./users";

export const getMembers = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }

    const userData = await getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      return null;
    }

    return await asyncMap(
      await _getOrgMembers(ctx, userData.selectedOrganization),
      async (member) => {
        const user = await getOneFrom(
          ctx.db,
          "users",
          "by_id",
          member.userId,
          "_id",
        );
        return { member: member, user: user };
      },
    );
  },
});

export const getMembersWhoCanJoinChannel = query({
  args: {
    channelId: v.optional(v.id("channels")),
  },
  handler: async (ctx, { channelId }) => {
    const user = await getAuthenticatedUser(ctx);
    const userData = await getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      return null;
    }

    if (!channelId) {
      return [];
    }

    const orgMembers = await _getOrgMembers(ctx, userData.selectedOrganization);

    const channelMembers = await _getAllChannelMembers(ctx, { channelId });

    const membersNotPartOfTheChannel = differenceBy(
      orgMembers,
      channelMembers,
      "userId",
    );

    return asyncMap(membersNotPartOfTheChannel, async (member) => {
      const user = await getOneFrom(
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

export async function _addMemberToOrg(
  ctx: MutationCtx,
  {
    orgId,
    userId,
    role,
    joinedBy,
  }: {
    joinedBy: Id<"users">;
    orgId: Id<"organizations">;
    userId: Id<"users">;
    role: Doc<"members">["role"];
  },
) {
  return await ctx.db.insert("members", {
    joinedBy,
    role,
    userId,
    type: "organizations",
    typeId: orgId,
    isActive: true,
  });
}

export async function _getUserAsMember(ctx: QueryCtx, userId: Id<"users">) {
  return await ctx.db
    .query("members")
    .withIndex("ind_memberId", (q) => q.eq("userId", userId))
    .collect();
}

export async function _getOrgMembers(
  ctx: QueryCtx,
  orgId: Id<"organizations">,
) {
  return await getManyFrom(ctx.db, "members", "ind_typeId", orgId, "typeId");
}
