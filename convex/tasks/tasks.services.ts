import { WithoutSystemFields } from "convex/server";

import { Doc } from "../_generated/dataModel";
import { MutationCtx } from "../_generated/server";

async function createTask(
  ctx: MutationCtx,
  data: WithoutSystemFields<Doc<"tasks">>,
) {
  return await ctx.db.insert("tasks", {
    ...data,
  });
}

export const TaskServices = {
  createTask,
};
