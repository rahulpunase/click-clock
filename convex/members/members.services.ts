import { getManyFrom } from "convex-helpers/server/relationships";
import { WithoutSystemFields } from "convex/server";

import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";

async function addMemberToOrg(
  ctx: MutationCtx,
  orgId: Id<"organizations">,
  data: Omit<WithoutSystemFields<Doc<"members">>, "type" | "orgId">,
) {
  return await ctx.db.insert("members", {
    ...data,
    type: "organizations",
    orgId: orgId,
    isActive: true,
  });
}

async function getUserAsMember(ctx: QueryCtx, userId: Id<"users">) {
  return await ctx.db
    .query("members")
    .withIndex("ind_memberId", (q) => q.eq("userId", userId))
    .collect();
}

async function getOrgMembers(ctx: QueryCtx, orgId: Id<"organizations">) {
  return await getManyFrom(ctx.db, "members", "ind_orgId", orgId, "orgId");
}

export const MemberServices = {
  getOrgMembers,
  getUserAsMember,
  addMemberToOrg,
};
