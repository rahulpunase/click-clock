import {
  getOneFrom,
  getOneFromOrThrow,
} from "convex-helpers/server/relationships";

import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";

/**
 * Retrieves the current user's data based on the provided user ID.
 *
 * @param ctx The query context used to access the database.
 * @param userId The ID of the user for whom the data is being retrieved.
 * @returns A promise that resolves to the current user's data.
 */
async function getCurrentUserData(ctx: QueryCtx, userId: Id<"users">) {
  const userData = await getOneFromOrThrow(
    ctx.db,
    "userData",
    "ind_createdByUserId",
    userId,
    "createdByUserId",
  );

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
async function updateUserData(
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
async function createUserData(
  ctx: MutationCtx,
  { userId, orgId }: { userId: Id<"users">; orgId: Id<"organizations"> },
) {
  return await ctx.db.insert("userData", {
    createdByUserId: userId,
    selectedOrganization: orgId,
  });
}

async function createUserDataAfterSignInOrSignUp(
  ctx: MutationCtx,
  userId: Id<"users">,
) {
  const userData = await ctx.db
    .query("userData")
    .filter((q) => q.eq(q.field("createdByUserId"), userId))
    .unique();

  if (userData) {
    return userData._id;
  }
  return await ctx.db.insert("userData", {
    createdByUserId: userId,
  });
}

async function getUserDataByCreatedById(ctx: QueryCtx, userId: Id<"users">) {
  return await getOneFrom(
    ctx.db,
    "userData",
    "ind_createdByUserId",
    userId,
    "createdByUserId",
  );
}

export const UserDataServices = {
  getCurrentUserData,
  updateUserData,
  createUserData,
  getUserDataByCreatedById,
  createUserDataAfterSignInOrSignUp,
};
