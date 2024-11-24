import { defineTable } from "convex/server";
import { v } from "convex/values";

const listTable = defineTable({
  orgId: v.id("organizations"),
  spaceId: v.id("spaces"),
  createdBy: v.id("users"),
  shortName: v.string(),
  name: v.optional(v.string()),
  parentFolderId: v.optional(v.id("folders")),
  isActive: v.optional(v.boolean()),
  isPrivate: v.optional(v.boolean()),
  isPublished: v.optional(v.boolean()),
  isFavorite: v.optional(v.boolean()),
  isArchived: v.optional(v.boolean()),
  type: v.literal("list"),
  description: v.optional(v.string()),
  templateId: v.optional(v.string()),
  color: v.optional(v.string()),
  icon: v.optional(v.string()),
  assignee: v.optional(v.id("users")),
  status: v.optional(v.string()),
  statuses: v.optional(
    v.array(
      v.object({
        type: v.string(),
        label: v.string(),
        color: v.string(),
        icon: v.string(),
        deletable: v.boolean(),
      }),
    ),
  ),
  priorities: v.optional(
    v.array(
      v.object({
        label: v.string(),
        color: v.string(),
        icon: v.string(),
        deletable: v.boolean(),
      }),
    ),
  ),
}).index("by_spaceId", ["spaceId"]);

export default listTable;
