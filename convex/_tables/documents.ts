import { defineTable } from "convex/server";
import { v } from "convex/values";

const documentsTable = defineTable({
  name: v.string(),
  createdByUserId: v.id("users"),
  type: v.literal("document"),
  content: v.optional(v.string()),
  parentFolderId: v.optional(v.id("folders")),
  spaceId: v.id("spaces"),
  orgId: v.id("organizations"),
  isDeleted: v.optional(v.boolean()),
  isFavorite: v.optional(v.boolean()),
  isHidden: v.optional(v.boolean()),
  isArchived: v.optional(v.boolean()),
  isPrivate: v.optional(v.boolean()),
  visibleOnlyTo: v.optional(v.array(v.id("users"))),
  haveEditingPermission: v.optional(v.array(v.id("users"))),
  sharedWith: v.optional(v.array(v.id("users"))),
  isPublic: v.optional(v.boolean()),
})
  .index("ind_by_spaceId", ["spaceId"])
  .index("ind_by_orgId", ["orgId"]);

export default documentsTable;
