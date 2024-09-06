import { asyncMap } from "convex-helpers";
import { getManyFrom } from "convex-helpers/server/relationships";
import { v } from "convex/values";
import groupBy from "lodash-es/groupBy";

import { DataModel, Id } from "./_generated/dataModel";
import { mutation, MutationCtx, QueryCtx } from "./_generated/server";
import { getCurrentUserData } from "./userData";
import { getAuthenticatedUser } from "./users";

export const create = mutation({
  args: {
    spaceId: v.id("spaces"),
    parentFolderId: v.optional(v.id("folders")),
    name: v.string(),
  },
  handler: async (ctx, { name, spaceId, parentFolderId }) => {
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
      parentFolder: parentFolderId,
    });
  },
});

type CreateFolderArgs = {
  name: string;
  createdBy: Id<"users">;
  orgId: Id<"organizations">;
  spaceId: Id<"spaces">;
  parentFolder?: Id<"folders">;
};

export async function _createFolder(
  ctx: MutationCtx,
  { name, createdBy, orgId, spaceId, parentFolder }: CreateFolderArgs,
) {
  return ctx.db.insert("folders", {
    name,
    createdBy,
    orgId,
    spaceId,
    isDeleted: false,
    isHidden: false,
    visibleOnlyTo: [],
    parentFolder,
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
};

const buildFolderTree = (folders: FolderReturnType[]): FolderReturnType[] => {
  const folderMap = new Map();

  const rootFolders: FolderReturnType[] = [];

  folders.forEach((folder) => {
    folderMap.set(folder._id, { ...folder, childFolders: [] });
  });

  folders.forEach((folder) => {
    const currentFolder = folderMap.get(folder._id);
    if (folder.parentFolder) {
      const parentFolder = folderMap.get(folder.parentFolder);
      if (parentFolder) {
        parentFolder.childFolders.push(currentFolder);
      }
    } else {
      rootFolders.push(currentFolder);
    }
  });

  return rootFolders;
};
