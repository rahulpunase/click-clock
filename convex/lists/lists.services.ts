import { getOneFrom } from "convex-helpers/server/relationships";
import { WithoutSystemFields } from "convex/server";

import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";
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

async function getListById(ctx: QueryCtx, listId: Id<"lists">) {
  return await getOneFrom(ctx.db, "lists", "by_id", listId, "_id");
}

export const ListServices = {
  createNewList,
  getListById,
};
