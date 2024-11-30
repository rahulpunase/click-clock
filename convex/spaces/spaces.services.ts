import { WithoutSystemFields } from "convex/server";

import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { ActivitiesServices } from "../activities/activities.services";

async function querySpace(ctx: QueryCtx, orgId: Id<"organizations">) {
  return await ctx.db
    .query("spaces")
    .filter(
      (q) =>
        q.eq(q.field("organizationId"), orgId) &&
        q.eq(q.field("isPrivate"), false) &&
        q.eq(q.field("isDeleted"), false),
    )
    .collect();
}

async function queryWithPrivateSpace(
  ctx: QueryCtx,
  { orgId, userId }: { orgId: Id<"organizations">; userId: Id<"users"> },
) {
  const spaces = await ctx.db
    .query("spaces")
    .filter((q) => {
      return q.and(
        q.eq(q.field("organizationId"), orgId),
        q.neq(q.field("isDeleted"), true),
      );
    })
    .collect();

  return spaces.filter((space) =>
    !space.isPrivate ? true : space.createdByUserId === userId,
  );
}

async function createSpace(
  ctx: MutationCtx,
  {
    name,
    organizationId,
    createdByUserId,
    icon,
    color,
    isPrivate,
    description,
  }: WithoutSystemFields<Doc<"spaces">>,
) {
  ActivitiesServices.log(ctx, {
    createdByUserId,
    name: "Space is created",
    type: "create",
    surfaceType: "space",
  });
  return await ctx.db.insert("spaces", {
    name: name,
    organizationId,
    createdByUserId,
    icon,
    color,
    isPrivate,
    description,
  });
}

async function updateSpace(
  ctx: MutationCtx,
  spaceId: Id<"spaces">,
  {
    name,
    icon,
    color,
    isPrivate,
    description,
  }: Omit<
    WithoutSystemFields<Doc<"spaces">>,
    "createdByUserId" | "organizationId"
  >,
) {
  return await ctx.db.patch(spaceId, {
    name,
    icon,
    color,
    isPrivate,
    description,
  });
}

async function softDeleteSpace(
  ctx: MutationCtx,
  { spaceId }: { spaceId: Id<"spaces"> },
) {
  return await ctx.db.patch(spaceId, {
    isDeleted: true,
  });
}

async function fetchSpaceById(
  ctx: MutationCtx,
  { spaceId }: { spaceId: Id<"spaces"> },
) {
  return await ctx.db.get(spaceId);
}

export const SpacesServices = {
  querySpace,
  queryWithPrivateSpace,
  createSpace,
  softDeleteSpace,
  fetchSpaceById,
  updateSpace,
};
