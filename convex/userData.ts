import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { Doc, Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { AppConvexError } from "./helper";
import { getAuthenticatedUser } from "./users";

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

export const selectOrganization = mutation({
  args: {
    orgId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    if (user === null) {
      throw new Error("403");
    }

    const userData = await ctx.db
      .query("userData")
      .withIndex("ind_createdBy", (q) => q.eq("createdBy", user._id))
      .unique();

    if (!userData) {
      return await _createUserData(ctx, {
        orgId: args.orgId,
        userId: user._id,
      });
    }

    return await _updateUserData(ctx, {
      userDataId: userData._id,
      data: {
        selectedOrganization: args.orgId,
      },
    });
  },
});

/** HELPER FUNCTIONS */

/**
 * Retrieves the current user's data based on the provided user ID.
 *
 * @param ctx The query context used to access the database.
 * @param userId The ID of the user for whom the data is being retrieved.
 * @returns A promise that resolves to the current user's data.
 */
export async function getCurrentUserData(ctx: QueryCtx, userId: Id<"users">) {
  const userData = await ctx.db
    .query("userData")
    .withIndex("ind_createdBy", (q) => q.eq("createdBy", userId))
    .unique();

  if (userData === null) {
    throw AppConvexError("Forbidden: User data not found", 403);
  }

  return userData;
}

/**
 * Updates the user data with the specified user data ID and organization ID.
 *
 * @param ctx The mutation context for interacting with the database.
 * @param userDataId The ID of the user data to be updated.
 * @param orgId The ID of the organization to associate with the user data.
 * @returns A promise that resolves when the user data is successfully updated.
 */
export async function _updateUserData(
  ctx: MutationCtx,
  {
    userDataId,
    data,
  }: {
    userDataId: Id<"userData">;
    data: Omit<Partial<Doc<"userData">>, "_id" | "_creationTime" | "createdBy">;
  },
) {
  return await ctx.db.patch(userDataId, {
    ...data,
  });
}

/**
 * Creates a new user data entry in the database.
 *
 * @param ctx - The mutation context object.
 * @param userId - The ID of the user associated with the data.
 * @returns A promise that resolves with the created user data entry.
 */
export async function _createUserData(
  ctx: MutationCtx,
  { userId, orgId }: { userId: Id<"users">; orgId: Id<"organizations"> },
) {
  return await ctx.db.insert("userData", {
    createdBy: userId,
    selectedOrganization: orgId,
  });
}
