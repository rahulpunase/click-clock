import { WithoutSystemFields } from "convex/server";

import { Doc } from "@db/_generated/dataModel";

import { MutationCtx } from "../_generated/server";
import { getPriorities, getStatuses } from "../helper";

async function createNewList(
  ctx: MutationCtx,
  data: Omit<
    WithoutSystemFields<Doc<"lists">>,
    "type" | "statuses" | "priorities"
  >,
) {
  return await ctx.db.insert("lists", {
    ...data,
    type: "list",
    statuses: getStatuses("project"),
    priorities: getPriorities(),
  });
}

export const ListServices = {
  createNewList,
};
