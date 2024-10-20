import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { AppConvexError } from "./helper";
import { getCurrentUserData } from "./userData";
import { getAuthenticatedUser } from "./users";

export const create = mutation({
  args: {
    name: v.string(),
    listId: v.id("lists"),
    spaceId: v.id("spaces"),
    status: v.optional(v.string()),
  },
  handler: async (ctx, { name, spaceId, listId, status }) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }

    const userData = await getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      return null;
    }

    await ctx.db.insert("tasks", {
      createdBy: user._id,
      listId,
      orgId: userData.selectedOrganization,
      spaceId,
      name: name,
      status,
    });
  },
});

export const getById = query({
  args: {
    taskId: v.optional(v.string()),
  },
  handler: async (ctx, { taskId }) => {
    if (!taskId) {
      throw AppConvexError("No taskId provided");
    }

    const normalizedTaskId = ctx.db.normalizeId("tasks", taskId);
    if (!normalizedTaskId) {
      throw AppConvexError("Task id provided is incorrect");
    }

    const task = await ctx.db.get(normalizedTaskId);

    return task;
  },
});

export const update = mutation({
  args: {
    taskId: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, { taskId, status }) => {
    if (!taskId) {
      throw AppConvexError("No taskId provided");
    }
    const normalizedTaskId = ctx.db.normalizeId("tasks", taskId);
    if (!normalizedTaskId) {
      throw AppConvexError("Task id provided is incorrect");
    }
    ctx.db.patch(normalizedTaskId, {
      status,
    });
  },
});

export const updateById = mutation({
  args: {
    taskId: v.optional(v.string()),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { taskId, name }) => {
    if (!taskId) {
      throw AppConvexError("No taskId provided");
    }
    const normalizedTaskId = ctx.db.normalizeId("tasks", taskId);
    if (!normalizedTaskId) {
      throw AppConvexError("Task id provided is incorrect");
    }
    ctx.db.patch(normalizedTaskId, {
      name,
    });
  },
});

export const getTasks = query({
  args: {
    listId: v.optional(v.string()),
    spaceId: v.optional(v.string()),
  },
  handler: async (ctx, { spaceId, listId }) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    const userData = await getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      return null;
    }

    if (!listId || !spaceId) {
      throw AppConvexError("List or space id not provided");
    }

    const normalizeListId = ctx.db.normalizeId("lists", listId);
    const normalizedSpaceId = ctx.db.normalizeId("spaces", spaceId);
    const normalizedOrgId = ctx.db.normalizeId(
      "organizations",
      userData.selectedOrganization,
    );

    if (!normalizedSpaceId) {
      throw AppConvexError("Space id incorrect or not provided");
    }

    if (!normalizeListId) {
      throw AppConvexError("List id incorrect or not provided");
    }

    if (!normalizedOrgId) {
      throw AppConvexError("OrgId id incorrect or not provided");
    }

    return await ctx.db
      .query("tasks")
      .withIndex("ind_by_spaceId_listId_orgId", (q) =>
        q
          .eq("spaceId", normalizedSpaceId)
          .eq("listId", normalizeListId)
          .eq("orgId", normalizedOrgId),
      )
      .collect();
  },
});
