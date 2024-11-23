import { DataModel, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";

type CreateFolderArgs = {
  name: string;
  createdByUserId: Id<"users">;
  orgId: Id<"organizations">;
  spaceId: Id<"spaces">;
  parentFolderId?: Id<"folders">;
};

async function createFolder(
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

async function queryFolders(
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

export const FolderServices = {
  createFolder,
  queryFolders,
};
