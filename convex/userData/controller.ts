import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation, query } from "../_generated/server";
import { ChannelsServices } from "../channels/channels.services";
import { UserServices } from "../users/users.services";
import { UserDataServices } from "./userData.services";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    return await UserDataServices.getUserDataByCreatedById(ctx, userId);
  },
});

export const create = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await UserServices.getAuthenticatedUser(ctx);

    const userData = await UserDataServices.getUserDataByCreatedById(
      ctx,
      user._id,
    );

    if (userData) {
      return userData._id;
    }
    return await ctx.db.insert("userData", {
      createdByUserId: user._id,
    });
  },
});

export const selectOrganization = mutation({
  args: {
    orgId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const user = await UserServices.getAuthenticatedUser(ctx);

    if (user === null) {
      throw new Error("403");
    }

    const userData = await ctx.db
      .query("userData")
      .withIndex("ind_createdByUserId", (q) =>
        q.eq("createdByUserId", user._id),
      )
      .unique();

    const generalChannel = await ctx.db
      .query("channels")
      .withIndex("ind_by_orgId", (q) => q.eq("orgId", args.orgId))
      .filter((q) => q.eq(q.field("isGeneral"), true))
      .unique();

    if (generalChannel) {
      // add member
      await ChannelsServices.addMultipleMembersToChannel(ctx, {
        channelId: generalChannel._id,
        joinedBy: user._id,
        users: [user._id],
      });
    }

    if (!userData) {
      return await UserDataServices.createUserData(ctx, {
        orgId: args.orgId,
        userId: user._id,
      });
    }

    // add this user to be part of general channel

    return await UserDataServices.updateUserData(ctx, {
      userDataId: userData._id,
      data: {
        selectedOrganization: args.orgId,
      },
    });
  },
});
