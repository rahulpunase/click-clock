import { getAuthUserId } from "@convex-dev/auth/server";

import { QueryCtx } from "../_generated/server";
import { AppConvexError } from "../helper";

async function getAuthenticatedUser(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx);

  if (userId === null) {
    throw AppConvexError("Forbidden: Unauthorized", 403);
  }

  const user = await ctx.db.get(userId);

  if (user === null) {
    throw AppConvexError("Forbidden: Unauthorized", 403);
  }

  return user;
}

export const UserServices = {
  getAuthenticatedUser,
};
