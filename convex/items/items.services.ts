import { asyncMap } from "convex-helpers";
import { WithoutSystemFields } from "convex/server";

import {
  ActualItem,
  FolderMapObject,
  ItemWithActualItem,
} from "@/common/types";

import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { DocumentsServices } from "../documents/documents.services";
import { FolderServices } from "../folders/folders.services";
import { ListServices } from "../lists/lists.services";

async function createItem(
  ctx: MutationCtx,
  data: WithoutSystemFields<Doc<"items">>,
) {
  return await ctx.db.insert("items", {
    ...data,
  });
}

async function getAllItemsFromSpace(
  ctx: QueryCtx,
  {
    spaceId,
  }: {
    spaceId: Id<"spaces">;
  },
) {
  return await ctx.db
    .query("items")
    .withIndex("ind_by_spaceId", (q) => q.eq("spaceId", spaceId))
    .collect();
}

async function createFolderListWithItems(
  ctx: QueryCtx,
  {
    spaceId,
  }: {
    spaceId: Id<"spaces">;
  },
) {
  const getAllFolders = await FolderServices.queryFolders(ctx, { spaceId });
  const getAllItems = await getAllItemsFromSpace(ctx, { spaceId });

  const folders = getAllFolders.map((folder) => ({
    ...folder,
    items: [],
  }));

  const folderMap = new Map<string, any>();

  const rootFolders: FolderMapObject[] = [];
  const directlyToSpace: ItemWithActualItem[] = [];

  folders.forEach((folder) => {
    folderMap.set(folder._id, { ...folder, items: [] });
  });

  const allItems = await asyncMap(getAllItems, async (item) => {
    let actualItem: ActualItem = null;
    if (item.type === "document") {
      actualItem = await DocumentsServices.getDocumentById(
        ctx,
        item.itemId as Id<"documents">,
      );
    }
    if (item.type === "list") {
      actualItem = await ListServices.getListById(
        ctx,
        item.itemId as Id<"lists">,
      );
    }
    if (!actualItem) {
      return null;
    }
    return {
      ...item,
      actualItem,
    };
  });

  allItems.forEach((item) => {
    if (!item) {
      return null;
    }
    if (item.parentFolderId) {
      const folder = folderMap.get(item.parentFolderId);
      if (folder) {
        folder.items.push(item);
      }
    } else {
      directlyToSpace.push(item);
    }
  });

  folders.forEach((folder) => {
    const currentFolder = folderMap.get(folder._id);
    if (!currentFolder) {
      return;
    }
    if (folder.parentFolderId) {
      const parentFolder = folderMap.get(folder.parentFolderId);
      if (parentFolder) {
        parentFolder.items.push(currentFolder);
      }
    } else {
      rootFolders.push(currentFolder);
    }
  });

  return [...rootFolders, ...directlyToSpace];
}

export const ItemsServices = {
  createFolderListWithItems,
  createItem,
};
