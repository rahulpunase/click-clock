import { defineTable } from "convex/server";
import { v } from "convex/values";

export const spaceTable = defineTable({
  name: v.string(),
  organizationId: v.id("organizations"),
  createdByUserId: v.id("users"),
  icon: v.optional(v.string()),
  color: v.optional(v.string()),
  description: v.optional(v.string()),
  isDeleted: v.optional(v.boolean()),
  isFavorite: v.optional(v.boolean()),
  isHidden: v.optional(v.boolean()),
  isArchived: v.optional(v.boolean()),
  isPrivate: v.optional(v.boolean()),
});

export default spaceTable;
