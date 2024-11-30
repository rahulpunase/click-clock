import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

import activityTable from "./_tables/activities";
import documentsTable from "./_tables/documents";
import itemsTable from "./_tables/items";
import listTable from "./_tables/lists";
import membersTable from "./_tables/members";
import organizationsTable from "./_tables/organizations";
import spaceTable from "./_tables/spaces";
import tasksTable from "./_tables/tasks";
import userDataTable from "./_tables/userData";

const schema = defineSchema({
  ...authTables,
  // Your other tables...
  organizations: organizationsTable,

  // used for preference
  userData: userDataTable,

  // used for profile data
  profile: defineTable({
    userId: v.id("users"),
    name: v.string(),
    orgRole: v.optional(v.string()),
    nickName: v.optional(v.string()),
    email: v.optional(v.string()),
    bio: v.optional(v.string()),
    phone: v.optional(v.string()),
    city: v.optional(v.string()),
    timezone: v.optional(v.string()),
    language: v.optional(v.string()),
    avatarColor: v.optional(v.string()),
    avatarImage: v.optional(v.string()),
  }).index("id_userId", ["userId"]),

  spaces: spaceTable,

  requests: defineTable({
    createdByUserId: v.id("users"),
    requestType: v.string(),
    typeId: v.string(), // e.g. organizationId of the organization for which the request is sent.
    cipher: v.optional(v.string()),
    isApproved: v.optional(v.boolean()),
    isDenied: v.optional(v.boolean()),
  })
    .index("ind_by_createdByUserId_typeId", ["createdByUserId", "typeId"])
    .index("ind_by_cipher", ["cipher"])
    .index("ind_by_typeId", ["typeId"]),

  members: membersTable,

  folders: defineTable({
    name: v.string(),
    createdByUserId: v.id("users"),
    type: v.literal("folder"),
    orgId: v.id("organizations"),
    spaceId: v.id("spaces"),
    isDeleted: v.boolean(),
    isHidden: v.boolean(),
    parentFolderId: v.optional(v.id("folders")),
    visibleOnlyTo: v.optional(v.array(v.id("users"))),
  })
    .index("ind_spaceId", ["spaceId"])
    .index("ind_parentFolder", ["parentFolderId"]),

  items: itemsTable,

  documents: documentsTable,

  channels: defineTable({
    name: v.string(),
    createdByUserId: v.id("users"),
    orgId: v.id("organizations"),
    description: v.optional(v.string()),
    isPrivate: v.optional(v.boolean()),
    type: v.union(v.literal("channel"), v.literal("directMessage")),
    isGeneral: v.boolean(),
    isFavorite: v.optional(v.boolean()),
  })
    .index("ind_by_orgId", ["orgId"])
    .searchIndex("search_by_name", {
      searchField: "name",
      filterFields: ["orgId"],
    }),

  channelMembers: defineTable({
    userId: v.id("users"),
    channelId: v.id("channels"),
    joinedBy: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("member"), v.literal("guest")),
  })
    .index("ind_by_channelMemberId_channelId", ["channelId", "userId"])
    .index("ind_by_userId", ["userId"])
    .index("ind_channelId", ["channelId"]),

  messages: defineTable({
    content: v.string(),
    createdByUserId: v.id("users"),
    channelId: v.id("channels"),
    isDeleted: v.optional(v.boolean()),
    lastEditedTime: v.optional(v.number()),
  }).index("by_channel_id", ["channelId"]),

  lists: listTable,

  listUserData: defineTable({
    userId: v.id("users"),
    listId: v.id("lists"),
    groupBy: v.optional(v.string()),
    sortBy: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_listId_userId", ["listId", "userId"]),

  tasks: tasksTable,

  activities: activityTable,

  presence: defineTable({
    userId: v.id("users"),
    lastOnlineTime: v.number(),
  }).index("ind_by_userId", ["userId"]),
});

export default schema;
