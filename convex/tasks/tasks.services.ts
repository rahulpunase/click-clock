import { WithoutSystemFields } from "convex/server";

import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";

async function createTask(
  ctx: MutationCtx,
  data: WithoutSystemFields<Doc<"tasks">>,
) {
  return await ctx.db.insert("tasks", {
    ...data,
  });
}

async function getTaskCount(
  ctx: QueryCtx,
  {
    listId,
  }: {
    listId: Id<"lists">;
  },
) {
  return await ctx.db
    .query("tasks")
    .withIndex("ind_by_listId", (q) => q.eq("listId", listId))
    .collect();
}

async function getTaskByTaskId(ctx: QueryCtx, taskId: string) {
  return await ctx.db
    .query("tasks")
    .withIndex("ind_by_taskId", (q) => q.eq("taskId", taskId))
    .unique();
}

export const TaskServices = {
  createTask,
  getTaskCount,
  getTaskByTaskId,
};
