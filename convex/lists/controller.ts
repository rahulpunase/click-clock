import { v } from "convex/values";

import { SpacesServices } from "@db/spaces/spaces.services";

import { mutation, query } from "../_generated/server";
import { AppConvexError } from "../helper";
import { ListServices } from "../lists/lists.services";
import { UserDataServices } from "../userData/userData.services";
import { UserServices } from "../users/users.services";

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

export const createOrUpdateListUserData = mutation({
  args: {
    listId: v.string(),
    sortBy: v.optional(v.string()),
    groupBy: v.optional(v.string()),
  },
  handler: async (ctx, { listId, ...data }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    const normalizedListId = ctx.db.normalizeId("lists", listId);
    if (!normalizedListId) {
      throw AppConvexError("Incorrect list id provided");
    }

    const listUserData = await ctx.db
      .query("listUserData")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!listUserData) {
      // create new
      return await ctx.db.insert("listUserData", {
        listId: normalizedListId,
        userId: user._id,
        ...data,
      });
    } else {
      return await ctx.db.patch(listUserData._id, {
        ...data,
      });
    }
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    shortName: v.string(),
    spaceId: v.id("spaces"),
    isPrivate: v.boolean(),
    parentFolderId: v.optional(v.id("folders")),
    description: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { spaceId, isPrivate, name, parentFolderId, description, shortName },
  ) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }

    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      return null;
    }

    return ListServices.createNewList(ctx, {
      createdBy: user._id,
      orgId: userData.selectedOrganization,
      spaceId,
      name,
      parentFolderId,
      description,
      isPrivate,
      shortName,
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

export const getListUserData = query({
  args: {
    listId: v.optional(v.string()),
  },
  handler: async (ctx, { listId }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    if (!listId) {
      return null;
    }
    const normalizedListId = ctx.db.normalizeId("lists", listId);
    if (!normalizedListId) {
      throw AppConvexError("Incorrect list id provided");
    }
    return await ctx.db
      .query("listUserData")
      .withIndex("by_listId_userId", (q) =>
        q.eq("listId", normalizedListId).eq("userId", user._id),
      )
      .unique();
  },
});
