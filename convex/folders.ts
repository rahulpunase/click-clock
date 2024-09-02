import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, MutationCtx, QueryCtx } from "./_generated/server";
import { getAuthenticatedUser } from "./users";
import { getCurrentUserData } from "./userData";
import { asyncMap } from "convex-helpers";

export const create = mutation({
  args: {
    spaceId: v.id("spaces"),
    name: v.string(),
  },
  handler: async (ctx, { name, spaceId }) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    const userData = await getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      return null;
    }

    await _createFolder(ctx, {
      createdBy: user._id,
      name,
      spaceId,
      orgId: userData.selectedOrganization,
    });
  },
});

type CreateFolderArgs = {
  name: string;
  createdBy: Id<"users">;
  orgId: Id<"organizations">;
  spaceId: Id<"spaces">;
};

export async function _createFolder(
  ctx: MutationCtx,
  { name, createdBy, orgId, spaceId }: CreateFolderArgs
) {
  return ctx.db.insert("folders", {
    name,
    createdBy,
    orgId,
    spaceId,
    isDeleted: false,
    isHidden: false,
    visibleOnlyTo: [],
  });
}

export async function _queryFolders(
  ctx: QueryCtx,
  {
    spaceId,
  }: {
    spaceId: Id<"spaces">;
  }
) {
  const folders = await ctx.db
    .query("folders")
    .withIndex("ind_spaceId", (q) => q.eq("spaceId", spaceId))
    .collect();
  return folders;
}
