import { v } from "convex/values";

import { mutation, MutationCtx, query } from "./_generated/server";
import { CreateNewListPayload } from "./_types";
import { getStatuses } from "./helper";
import { getCurrentUserData } from "./userData";
import { getAuthenticatedUser } from "./users";

export const create = mutation({
  args: {
    name: v.string(),
    spaceId: v.id("spaces"),
    isPrivate: v.boolean(),
    parentFolderId: v.optional(v.id("folders")),
    description: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { spaceId, isPrivate, name, parentFolderId, description },
  ) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }

    const userData = await getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      return null;
    }

    return _createNewList(ctx, {
      userId: user._id,
      isPrivate,
      orgId: userData.selectedOrganization,
      spaceId,
      name,
      parentFolderId,
      description,
    });
  },
});

export const getBySpaceId = query({
  args: {
    spaceId: v.id("spaces"),
  },

  handler: async (ctx, { spaceId }) => {
    return await ctx.db
      .query("lists")
      .withIndex("by_spaceId", (q) => q.eq("spaceId", spaceId))
      .collect();
  },
});

const _createNewList = async (
  ctx: MutationCtx,
  {
    userId,
    orgId,
    spaceId,
    isPrivate,
    name,
    parentFolderId,
    description,
  }: CreateNewListPayload,
) => {
  return await ctx.db.insert("lists", {
    name,
    createdBy: userId,
    orgId: orgId,
    spaceId: spaceId,
    isPrivate: isPrivate,
    parentFolderId,
    description,
    type: "list",
    statuses: getStatuses("project"),
  });
};
