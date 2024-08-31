import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  // Your other tables...
  organizations: defineTable({
    name: v.string(),
    createdBy: v.id("users"),
    ownedBy: v.id("users"),
    isActive: v.boolean(),
  }),

  userData: defineTable({
    createdBy: v.id("users"),
    selectedOrganization: v.optional(v.id("organizations")),
  }).index("ind_createdBy", ["createdBy"]),

  spaces: defineTable({
    name: v.string(),
    organizationId: v.id("organizations"),
    createdBy: v.id("users"),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
    description: v.optional(v.string()),
    isDeleted: v.optional(v.boolean()),
    isFavorite: v.optional(v.boolean()),
    isHidden: v.optional(v.boolean()),
    isArchived: v.optional(v.boolean()),
    isPrivate: v.optional(v.boolean()),
  }),
});

export default schema;
