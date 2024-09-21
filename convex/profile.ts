import { v } from "convex/values";
import omit from "lodash-es/omit";

import { Doc, Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query } from "./_generated/server";
import schema from "./schema";
import { getAuthenticatedUser } from "./users";

export const fetch = query({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, { userId }) => {
    if (!userId) {
      const user = await getAuthenticatedUser(ctx);
      return ctx.db
        .query("profile")
        .withIndex("id_userId", (q) => q.eq("userId", user._id))
        .unique();
    }
    const normalize = ctx.db.normalizeId("users", userId);
    if (!normalize) {
      return null;
    }
    return ctx.db
      .query("profile")
      .withIndex("id_userId", (q) => q.eq("userId", normalize))
      .unique();
  },
});

export const update = mutation({
  args: {
    ...omit(schema.tables.profile.validator["fields"], ["userId"]),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);
    await _editProfile(ctx, user._id, args);
  },
});

export async function _createUserProfile(
  ctx: MutationCtx,
  {
    userId,
    name,
    email,
    avatarImage,
  }: {
    userId: Id<"users">;
    name: string;
  } & Partial<Doc<"profile">>,
) {
  await ctx.db.insert("profile", {
    userId,
    name,
    email,
    avatarImage,
  });
}

export async function _editProfile(
  ctx: MutationCtx,
  userId: Id<"users">,
  data: Partial<Doc<"profile">>,
) {
  const fetchProfileFirst = await ctx.db
    .query("profile")
    .withIndex("id_userId", (q) => q.eq("userId", userId))
    .unique();

  if (fetchProfileFirst) {
    return await ctx.db.patch(fetchProfileFirst._id, {
      ...data,
    });
  }

  await ctx.db.insert("profile", {
    userId: userId,
    name: data.name ?? "",
    ...data,
  });
}
