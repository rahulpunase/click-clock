import { WithoutSystemFields } from "convex/server";

import { Doc } from "../_generated/dataModel";
import { MutationCtx } from "../_generated/server";

async function log(
  ctx: MutationCtx,
  data: WithoutSystemFields<Doc<"activities">>,
) {
  return await ctx.db.insert("activities", {
    ...data,
  });
}

export const ActivitiesServices = {
  log,
};
