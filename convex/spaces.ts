import { v } from "convex/values";
import {
  action,
  internalMutation,
  internalQuery,
  query,
  QueryCtx,
} from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { getCurrentUserData } from "./userData";

export const createSpace = internalMutation({
  args: {
    name: v.string(),
    icon: v.string(),
    color: v.string(),
    isPrivate: v.boolean(),
    orgId: v.id("organizations"),
    userId: v.id("users"),
  },
  handler: async (ctx, { name, icon, color, isPrivate, orgId, userId }) => {
    return await ctx.db.insert("spaces", {
      name: name,
      organizationId: orgId,
      createdBy: userId,
      icon,
      color,
      isPrivate,
    });
  },
});

export const querySpaces = internalQuery({
  args: {
    orgId: v.id("organizations"),
  },
  handler: async (ctx, { orgId }) => {
    return await ctx.db
      .query("spaces")
      .filter((q) => q.eq(q.field("organizationId"), orgId));
  },
});

export const getSpaces = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const userData = await getCurrentUserData(ctx);

    if (!userData?.selectedOrganization) {
      return null;
    }

    return await querySpace(ctx, userData.selectedOrganization);
  },
});

export const create = action({
  args: {
    name: v.string(),
    icon: v.string(),
    color: v.string(),
    isPrivate: v.boolean(),
  },
  handler: async (ctx, { name, icon, color, isPrivate }) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const userData = await ctx.runQuery(internal.userData.get);

    if (!userData?.selectedOrganization) {
      return null;
    }

    const space = await ctx.runMutation(internal.spaces.createSpace, {
      name,
      icon,
      color,
      isPrivate,
      userId,
      orgId: userData.selectedOrganization,
    });
  },
});

async function querySpace(ctx: QueryCtx, orgId: Id<"organizations">) {
  return await ctx.db
    .query("spaces")
    .filter((q) => q.eq(q.field("organizationId"), orgId))
    .collect();
}
