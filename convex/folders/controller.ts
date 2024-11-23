import { v } from "convex/values";

import { mutation } from "../_generated/server";
import { UserDataServices } from "../userData/userData.services";
import { UserServices } from "../users/users.services";
import { FolderServices } from "./folders.services";

export const create = mutation({
  args: {
    spaceId: v.id("spaces"),
    parentFolderId: v.optional(v.id("folders")),
    name: v.string(),
  },
  handler: async (ctx, { name, spaceId, parentFolderId }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }

    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      return null;
    }

    await FolderServices.createFolder(ctx, {
      createdByUserId: user._id,
      name,
      spaceId,
      orgId: userData.selectedOrganization,
      parentFolderId: parentFolderId,
    });
  },
});

export const moveToTrash = mutation({
  args: {
    folderId: v.id("folders"),
  },
  handler: async (ctx, {}) => {},
});
