import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { getCurrentUserData } from "./userData";
import { getAuthenticatedUser } from "./users";

export const getSpaces = query({
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);

    if (!user) {
      return null;
    }

    const userData = await getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      return null;
    }

    return await querySpace(ctx, userData.selectedOrganization);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    icon: v.string(),
    color: v.string(),
    isPrivate: v.boolean(),
  },
  handler: async (ctx, { name, icon, color, isPrivate }) => {
    const user = await getAuthenticatedUser(ctx);

    if (user === null) {
      return null;
    }

    const userData = await getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      return null;
    }

    const space = await createSpace(ctx, {
      name,
      icon,
      color,
      isPrivate,
      orgId: userData.selectedOrganization,
      userId: user._id,
    });

    return space;
  },
});

async function querySpace(ctx: QueryCtx, orgId: Id<"organizations">) {
  return await ctx.db
    .query("spaces")
    .filter((q) => q.eq(q.field("organizationId"), orgId))
    .collect();
}

async function createSpace(
  ctx: MutationCtx,
  {
    name,
    orgId,
    userId,
    icon,
    color,
    isPrivate,
  }: {
    name: string;
    orgId: Id<"organizations">;
    userId: Id<"users">;
    icon: string;
    color: string;
    isPrivate: boolean;
  }
) {
  return await ctx.db.insert("spaces", {
    name: name,
    organizationId: orgId,
    createdBy: userId,
    icon,
    color,
    isPrivate,
  });
}
