import { defineTable } from "convex/server";
import { v } from "convex/values";

const membersTable = defineTable({
  userId: v.id("users"),
  joinedBy: v.id("users"),
  orgId: v.string(),
  type: v.string(),
  role: v.union(v.literal("admin"), v.literal("member"), v.literal("guest")),
  isActive: v.optional(v.boolean()),
  orgRole: v.optional(v.string()),
})
  .index("ind_orgId", ["orgId"])
  .index("ind_memberId", ["userId"]);

export default membersTable;
