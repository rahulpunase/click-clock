import { asyncMap } from "convex-helpers";
import { ConvexError, v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { _queryFolders } from "./folders";
import { AppConvexError } from "./helper";
import { getCurrentUserData } from "./userData";
import { getAuthenticatedUser } from "./users";

export const getSpaces = query({
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);

    const userData = await getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      throw AppConvexError("No selected organization");
    }

    const privateSpaces = await _queryWithPrivateSpace(ctx, {
      orgId: userData.selectedOrganization,
      userId: user._id,
    });
    // return privateSpaces;
    return asyncMap(privateSpaces, async (space) => {
      const folders = await _queryFolders(ctx, {
        spaceId: space._id,
      });
      return {
        ...space,
        folders,
      };
    });
  },
});

export const getPrivateSpaces = query({
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);

    if (!user) {
      return null;
    }

    const userData = await getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      return null;
    }

    return await _querySpace(ctx, userData.selectedOrganization);
  },
});

export const createOrEdit = mutation({
  args: {
    name: v.string(),
    icon: v.string(),
    color: v.string(),
    isPrivate: v.boolean(),
    description: v.optional(v.string()),
    spaceId: v.optional(v.id("spaces")),
  },
  handler: async (
    ctx,
    { name, icon, color, isPrivate, spaceId, description },
  ) => {
    const user = await getAuthenticatedUser(ctx);

    if (user === null) {
      return null;
    }

    const userData = await getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      return null;
    }

    if (spaceId) {
      // update
      return await _updateSpace(ctx, {
        name,
        icon,
        color,
        spaceId,
        isPrivate,
        description,
      });
    }

    const space = await _createSpace(ctx, {
      name,
      icon,
      color,
      isPrivate,
      orgId: userData.selectedOrganization,
      userId: user._id,
      description,
    });

    return space;
  },
});

export const softDelete = mutation({
  args: {
    spaceId: v.id("spaces"),
  },
  handler: async (ctx, { spaceId }) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    const space = await _fetchSpaceById(ctx, {
      spaceId,
    });

    if (space?.createdBy !== user._id) {
      return new ConvexError("Do not have deleting permission");
    }
    await _softDeleteSpace(ctx, {
      spaceId,
    });
  },
});

async function _querySpace(ctx: QueryCtx, orgId: Id<"organizations">) {
  return await ctx.db
    .query("spaces")
    .filter(
      (q) =>
        q.eq(q.field("organizationId"), orgId) &&
        q.eq(q.field("isPrivate"), false),
    )
    .collect();
}

async function _queryWithPrivateSpace(
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
    !space.isPrivate ? true : space.createdBy === userId,
  );
}

async function _createSpace(
  ctx: MutationCtx,
  {
    name,
    orgId,
    userId,
    icon,
    color,
    isPrivate,
    description,
  }: {
    name: string;
    orgId: Id<"organizations">;
    userId: Id<"users">;
    icon: string;
    color: string;
    isPrivate: boolean;
    description?: string;
  },
) {
  return await ctx.db.insert("spaces", {
    name: name,
    organizationId: orgId,
    createdBy: userId,
    icon,
    color,
    isPrivate,
    description,
  });
}

async function _updateSpace(
  ctx: MutationCtx,
  {
    name,
    icon,
    color,
    isPrivate,
    spaceId,
    description,
  }: {
    spaceId: Id<"spaces">;
    name: string;
    icon: string;
    color: string;
    isPrivate: boolean;
    description?: string;
  },
) {
  return await ctx.db.patch(spaceId, {
    name,
    icon,
    color,
    isPrivate,
    description,
  });
}

async function _softDeleteSpace(
  ctx: MutationCtx,
  { spaceId }: { spaceId: Id<"spaces"> },
) {
  return await ctx.db.patch(spaceId, {
    isDeleted: true,
  });
}

async function _fetchSpaceById(
  ctx: MutationCtx,
  { spaceId }: { spaceId: Id<"spaces"> },
) {
  return await ctx.db.get(spaceId);
}
