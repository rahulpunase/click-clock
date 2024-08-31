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

/**
 * Creates a new userData for the authenticated user.
 * Retrieves the user ID from the context, checks if the user is authenticated,
 * and then either returns the existing userData ID if found or creates a new userData
 * associated with the user and returns its ID.
 *
 * @returns The ID of the existing or newly created userData, or null if the user is not authenticated or an error occurs.
 */
export const create = internalMutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const userData = await ctx.db
      .query("userData")
      .filter((q) => q.eq(q.field("createdBy"), userId))
      .first();

    if (userData) {
      return userData._id;
    }

    const newUserData = await ctx.db.insert("userData", {
      createdBy: userId,
    });

    return newUserData;
  },
});

export const updateUserData = internalMutation({
  args: {
    userDataId: v.id("userData"),
    selectedOrganization: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.userDataId, {
      selectedOrganization: args.selectedOrganization,
    });
  },
});

export const get = internalQuery({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    return await ctx.db
      .query("userData")
      .filter((q) => q.eq(q.field("createdBy"), userId))
      .first();
  },
});

/**
 * Retrieves the current userData based on the authenticated user.
 * - Fetches the user ID from the context using 'getAuthUserId'.
 * - Filters the userData query based on the user ID.
 * - Returns the userData data collected after filtering.
 */
export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db
      .query("userData")
      .filter((q) => q.eq(q.field("createdBy"), userId))
      .first();
  },
});

/**
 * Action to select an organization for the current user.
 *
 * @param {object} ctx - The context object.
 * @param {object} args - The arguments object containing the organization ID.
 * @returns {string | null} The selected organization ID or null if the user is not authenticated or userData creation fails.
 */
export const selectOrganization = action({
  args: {
    orgId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new Error("403");
    }

    const userData = await ctx.runMutation(internal.userData.create);

    if (!userData) {
      return null;
    }

    await ctx.runMutation(internal.userData.updateUserData, {
      userDataId: userData,
      selectedOrganization: args.orgId,
    });

    return args.orgId;
  },
});

export async function getCurrentUserData(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx);

  if (userId === null) {
    return null;
  }
  return await ctx.db
    .query("userData")
    .filter((q) => q.eq(q.field("createdBy"), userId))
    .first();
}
