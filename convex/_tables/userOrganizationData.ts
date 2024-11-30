import { defineTable } from "convex/server";
import { v } from "convex/values";

export const userOrganizationData = defineTable({
  createdBy: v.id("users"),
  orgId: v.id("organizations"),
  folderOrder: v.optional(
    v.array(
      v.object({
        order: v.number(),
        folderId: v.id("folders"),
      }),
    ),
  ),
  itemsOrder: v.optional(
    v.array(
      v.object({
        order: v.number(),
        folderId: v.id("folders"),
      }),
    ),
  ),
});

export default userOrganizationData;
