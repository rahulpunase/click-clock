import { defineTable } from "convex/server";
import { v } from "convex/values";

const tasksTable = defineTable({
  orgId: v.id("organizations"),
  taskId: v.string(),
  spaceId: v.id("spaces"),
  createdBy: v.id("users"),
  name: v.optional(v.string()),
  listId: v.id("lists"),
  sectionId: v.optional(v.id("sections")),
  startDate: v.optional(v.number()),
  endDate: v.optional(v.number()),
  subTasks: v.optional(v.array(v.id("tasks"))),
  type: v.optional(
    v.union(v.literal("task"), v.literal("epic"), v.literal("bug")),
  ),
  assignee: v.optional(v.id("users")),
  priority: v.optional(v.string()),
  status: v.optional(v.string()),
  content: v.optional(v.string()),
  tags: v.optional(
    v.array(
      v.object({
        id: v.string(),
        title: v.string(),
      }),
    ),
  ),
}).index("ind_by_spaceId_listId_orgId", ["spaceId", "listId", "orgId"]);

export default tasksTable;
