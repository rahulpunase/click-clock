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

  return folders;
}

export const FolderServices = {
  createFolder,
  queryFolders,
};
