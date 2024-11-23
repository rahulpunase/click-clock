import { v } from "convex/values";

import { mutation, MutationCtx, query } from "./_generated/server";
import { CreateNewListPayload } from "./_types";
import { AppConvexError, getPriorities, getStatuses } from "./helper";
import { UserDataServices } from "./userData/userData.services";
import { UserServices } from "./users/users.services";

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
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }

    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
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

export const updateListStatuses = mutation({
  args: {
    statuses: v.array(
      v.object({
        type: v.string(),
        label: v.string(),
        color: v.string(),
        icon: v.string(),
        deletable: v.boolean(),
      }),
    ),
    listId: v.string(),
  },
  handler: async (ctx, { listId, statuses }) => {
    const normalizedListId = ctx.db.normalizeId("lists", listId);
    if (!normalizedListId) {
      throw AppConvexError("Incorrect list id provided");
    }
    await ctx.db.patch(normalizedListId, {
      statuses,
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

export const getById = query({
  args: {
    listId: v.optional(v.string()),
  },
  handler: async (ctx, { listId }) => {
    if (!listId) {
      return null;
    }

    const normalizedListId = ctx.db.normalizeId("lists", listId);

    if (!normalizedListId) {
      throw AppConvexError("Incorrect list id provided");
    }

    return await ctx.db.get(normalizedListId);
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
    priorities: getPriorities(),
  });
};
