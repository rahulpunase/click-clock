import { WithoutSystemFields } from "convex/server";

import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";

async function createDocument(
  ctx: MutationCtx,
  data: Omit<WithoutSystemFields<Doc<"documents">>, "type">,
) {
  return await ctx.db.insert("documents", {
    ...data,
    type: "document",
  });
}

type GetDocumentsBySpaceIdParams = { spaceId: Id<"spaces"> };
async function getDocumentsBySpaceId(
  ctx: QueryCtx,
  { spaceId }: GetDocumentsBySpaceIdParams,
) {
  return await ctx.db
    .query("documents")
    .withIndex("ind_by_spaceId", (q) => q.eq("spaceId", spaceId))
    .collect();
}

export const DocumentsServices = {
  createDocument,
  getDocumentsBySpaceId,
};
