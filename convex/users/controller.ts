import { getAuthUserId } from "@convex-dev/auth/server";

import { query } from "../_generated/server";
import { UserServices } from "./users.services";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return UserServices.getAuthenticatedUser(ctx);
  },
});

export const isLoggedIn = query({
  args: {},
  handler: async (ctx) => {
    return await getAuthUserId(ctx);
  },
});
