import { defineTable } from "convex/server";
import { v } from "convex/values";

const userDataTable = defineTable({
  createdByUserId: v.id("users"),
  selectedOrganization: v.optional(v.id("organizations")),
}).index("ind_createdByUserId", ["createdByUserId"]);

export default userDataTable;
