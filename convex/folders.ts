import { v } from "convex/values";

import { DataModel, Id } from "./_generated/dataModel";
import { mutation, MutationCtx, QueryCtx } from "./_generated/server";
import { UserDataServices } from "./userData/userData.services";
import { UserServices } from "./users/users.services";

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

    await _createFolder(ctx, {
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

type CreateFolderArgs = {
  name: string;
  createdByUserId: Id<"users">;
  orgId: Id<"organizations">;
  spaceId: Id<"spaces">;
  parentFolderId?: Id<"folders">;
};

export async function _createFolder(
  ctx: MutationCtx,
  { name, createdByUserId, orgId, spaceId, parentFolderId }: CreateFolderArgs,
) {
  return ctx.db.insert("folders", {
    name,
    createdByUserId,
    orgId,
    spaceId,
    isDeleted: false,
    isHidden: false,
    visibleOnlyTo: [],
    parentFolderId,
    type: "folder",
  });
}

export async function _queryFolders(
  ctx: QueryCtx,
  {
    spaceId,
  }: {
    spaceId: Id<"spaces">;
  },
) {
  const folders = await ctx.db
    .query("folders")
    .withIndex("ind_spaceId", (q) => q.eq("spaceId", spaceId))
    .collect();

  return buildFolderTree(folders);
}

type FolderReturnType = DataModel["folders"]["document"] & {
  childFolders?: FolderReturnType[];
  items?: DataModel["documents"]["document"][];
};

const buildFolderTree = (folders: FolderReturnType[]): FolderReturnType[] => {
  const folderMap = new Map();

  const rootFolders: FolderReturnType[] = [];

  folders.forEach((folder) => {
    folderMap.set(folder._id, { ...folder, childFolders: [], items: [] });
  });

  folders.forEach((folder) => {
    const currentFolder = folderMap.get(folder._id);
    if (folder.parentFolderId) {
      const parentFolder = folderMap.get(folder.parentFolderId);
      if (parentFolder) {
        parentFolder.childFolders.push(currentFolder);
      }
    } else {
      rootFolders.push(currentFolder);
    }
  });

  return rootFolders;
};
