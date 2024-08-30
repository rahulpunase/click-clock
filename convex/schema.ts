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

  workspace: defineTable({
    createdBy: v.id("users"),
    selectedOrganization: v.id("organizations"),
  }),
});

export default schema;
