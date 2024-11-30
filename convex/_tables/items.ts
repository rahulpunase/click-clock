import { defineTable } from "convex/server";
import { v } from "convex/values";

export const itemsTable = defineTable({
  createdBy: v.id("users"),
  type: v.union(v.literal("document"), v.literal("list"), v.literal("chart")),
  itemId: v.union(v.id("lists"), v.id("documents")),
  parentFolderId: v.optional(v.id("folders")),
  spaceId: v.optional(v.id("spaces")),
  isActive: v.optional(v.boolean()),
}).index("ind_by_spaceId", ["spaceId"]);

export default itemsTable;
