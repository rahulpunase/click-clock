import { getManyFrom } from "convex-helpers/server/relationships";
import { WithoutSystemFields } from "convex/server";

import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { ActivitiesServices } from "../activities/activities.services";
import { makeRandomId } from "../helper";

type AddMemberToOrgParams = {
  joinedBy: Id<"users">;
  orgId: Id<"organizations">;
  userId: Id<"users">;
  role: Doc<"members">["role"];
};

async function addMemberToOrg(
  ctx: MutationCtx,
  { orgId, userId, role, joinedBy }: AddMemberToOrgParams,
) {
  return await ctx.db.insert("members", {
    joinedBy,
    role,
    userId,
    type: "organizations",
    orgId,
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

async function createOrganization(
  ctx: MutationCtx,
  data: WithoutSystemFields<Doc<"organizations">>,
) {
  await ActivitiesServices.log(ctx, {
    createdByUserId: data.createdByUserId,
    name: "Organization is created",
    type: "create",
    surfaceType: "organization",
  });
  return await ctx.db.insert("organizations", {
    ...data,
    isActive: true,
  });
}

function generateCipher() {
  return makeRandomId(32);
}

export const OrganizationServices = {
  getOrgMembers,
  getUserAsMember,
  addMemberToOrg,
  generateCipher,
  createOrganization,
};
