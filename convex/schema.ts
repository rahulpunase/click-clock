import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const OrganizationPersona = v.union(
  v.literal("work"),
  v.literal("personal"),
  v.literal("others"),
);

const schema = defineSchema({
  ...authTables,
  // Your other tables...
  organizations: defineTable({
    name: v.string(),
    createdByUserId: v.id("users"),
    ownedBy: v.id("users"),
    isActive: v.boolean(),
    isPrivate: v.optional(v.boolean()),
    inviteLink: v.optional(v.string()), // not in use
    inviteLinkCipher: v.optional(v.string()),
    persona: v.optional(OrganizationPersona),
    orgMemberCount: v.optional(v.number()),
    managementStyle: v.optional(v.string()),
  }).index("ind_by_inviteLinkCipher", ["inviteLinkCipher"]),

  // used for preference
  userData: defineTable({
    createdByUserId: v.id("users"),
    selectedOrganization: v.optional(v.id("organizations")),
  }).index("ind_createdByUserId", ["createdByUserId"]),

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

  spaces: defineTable({
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
  }),

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

  members: defineTable({
    userId: v.id("users"),
    joinedBy: v.id("users"),
    typeId: v.string(),
    type: v.string(),
    role: v.union(v.literal("admin"), v.literal("member"), v.literal("guest")),
    isActive: v.optional(v.boolean()),
    orgRole: v.optional(v.string()),
  })
    .index("ind_typeId", ["typeId"])
    .index("ind_memberId", ["userId"]),

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

  documents: defineTable({
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
    .index("ind_by_orgId", ["orgId"]),

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

  lists: defineTable({
    orgId: v.id("organizations"),
    spaceId: v.id("spaces"),
    createdBy: v.id("users"),
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
  }).index("by_spaceId", ["spaceId"]),

  listUserData: defineTable({
    userId: v.id("users"),
    listId: v.id("lists"),
    groupBy: v.optional(v.string()),
    sortBy: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_listId_userId", ["listId", "userId"]),

  tasks: defineTable({
    orgId: v.id("organizations"),
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
  }).index("ind_by_spaceId_listId_orgId", ["spaceId", "listId", "orgId"]),

  activities: defineTable({
    createdByUserId: v.id("users"),
    name: v.string(),
    text: v.optional(v.string()),
    type: v.union(
      v.literal("create"),
      v.literal("delete"),
      v.literal("soft-delete"),
      v.literal("update"),
    ),
  }),

  presence: defineTable({
    userId: v.id("users"),
    lastOnlineTime: v.number(),
  }).index("ind_by_userId", ["userId"]),
});

export default schema;
