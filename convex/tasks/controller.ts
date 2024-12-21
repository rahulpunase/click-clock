import { v } from "convex/values";

import { mutation, query } from "../_generated/server";
import { AppConvexError } from "../helper";
import { TaskServices } from "../tasks/tasks.services";
import { UserDataServices } from "../userData/userData.services";
import { UserServices } from "../users/users.services";

export const create = mutation({
  args: {
    name: v.string(),
    listId: v.id("lists"),
    spaceId: v.id("spaces"),
    status: v.optional(v.string()),
    assignee: v.optional(v.id("users")),
    priority: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { name, spaceId, listId, status, assignee, priority },
  ) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }

    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      return null;
    }

    const list = await ctx.db.get(listId);

    if (!list) {
      throw AppConvexError("List is already deleted");
    }

    const taskCount = await TaskServices.getTaskCount(ctx, {
      listId,
    });

    const taskId = `${list?.shortName}-${taskCount.length + 1}`;

    return await TaskServices.createTask(ctx, {
      createdBy: user._id,
      listId,
      orgId: userData.selectedOrganization,
      spaceId,
      name: name,
      status,
      assignee,
      priority,
      taskId,
    });
  },
});

export const getByTaskId = query({
  args: {
    taskId: v.optional(v.string()),
  },
  handler: async (ctx, { taskId }) => {
    if (!taskId) {
      throw AppConvexError("No taskId provided");
    }

    const task = await TaskServices.getTaskByTaskId(ctx, taskId);

    return task;
  },
});

export const getById = query({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, { id }) => {
    const task = await ctx.db.get(id);
    return task;
  },
});

export const update = mutation({
  args: {
    taskId: v.optional(v.string()),
    data: v.object({
      status: v.optional(v.string()),
      priority: v.optional(v.string()),
      endDate: v.optional(v.number()),
      startDate: v.optional(v.number()),
      assignee: v.optional(v.id("users")),
    }),
  },
  handler: async (ctx, { taskId, data }) => {
    if (!taskId) {
      throw AppConvexError("No taskId provided");
    }
    const normalizedTaskId = ctx.db.normalizeId("tasks", taskId);

    if (data.assignee) {
      const normalizedUserId = ctx.db.normalizeId("users", data.assignee);
      if (!normalizedUserId) {
        throw AppConvexError("Wrong userId provided");
      }
    }
    if (!normalizedTaskId) {
      throw AppConvexError("Task id provided is incorrect");
    }

    return ctx.db.patch(normalizedTaskId, {
      ...data,
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
    return ctx.db.patch(normalizedTaskId, {
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
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
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
