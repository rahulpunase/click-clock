import { defineTable } from "convex/server";
import { v } from "convex/values";

const ActivityTypeEnum = v.union(
  v.literal("create"),
  v.literal("delete"),
  v.literal("soft-delete"),
  v.literal("update"),
);

const ActivitySurfaceEnum = v.union(
  v.literal("space"),
  v.literal("organization"),
);

const activityTable = defineTable({
  createdByUserId: v.id("users"),
  name: v.string(),
  text: v.optional(v.string()),
  surfaceType: ActivitySurfaceEnum,
  type: ActivityTypeEnum,
  additionalData: v.optional(v.object({})),
});

export default activityTable;
