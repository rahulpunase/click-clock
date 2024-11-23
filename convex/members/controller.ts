import { asyncMap } from "convex-helpers";
import { getManyFrom, getOneFrom } from "convex-helpers/server/relationships";
import { v } from "convex/values";
import differenceBy from "lodash-es/differenceBy";

import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, query, QueryCtx } from "../_generated/server";
import { ChannelsServices } from "../channels/channels.services";
import { UserDataServices } from "../userData/userData.services";
import { UserServices } from "../users/users.services";
import { MemberServices } from "./members.services";

export const getMembers = query({
  args: {},
  handler: async (ctx) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }

    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      return null;
    }

    return await asyncMap(
      await MemberServices.getOrgMembers(ctx, userData.selectedOrganization),
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
    const user = await UserServices.getAuthenticatedUser(ctx);
    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      return null;
    }

    if (!channelId) {
      return [];
    }

    const orgMembers = await MemberServices.getOrgMembers(
      ctx,
      userData.selectedOrganization,
    );

    const channelMembers = await ChannelsServices.getAllChannelMembers(ctx, {
      channelId,
    });

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
