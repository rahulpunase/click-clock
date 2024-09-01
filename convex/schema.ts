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
    isPrivate: v.optional(v.boolean()),
    inviteLink: v.optional(v.string()), // not in use
    inviteLinkCipher: v.optional(v.string()),
  }).index("ind_by_inviteLinkCipher", ["inviteLinkCipher"]),

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

  requests: defineTable({
    createdBy: v.id("users"),
    requestType: v.string(),
    typeId: v.string(), // e.g. organizationId of the organization for which the request is sent.
    cipher: v.optional(v.string()),
    isApproved: v.optional(v.boolean()),
    isDenied: v.optional(v.boolean()),
  })
    .index("ind_by_createdBy_typeId", ["createdBy", "typeId"])
    .index("ind_by_cipher", ["cipher"])
    .index("ind_by_typeId", ["typeId"]),

  members: defineTable({
    memberId: v.id("users"),
    joinedBy: v.id("users"),
    typeId: v.string(),
    type: v.string(),
    role: v.union(v.literal("admin"), v.literal("member"), v.literal("guest")),
    isActive: v.optional(v.boolean()),
  })
    .index("ind_typeId", ["typeId"])
    .index("ind_memberId", ["memberId"]),

  folders: defineTable({
    name: v.string(),
    createdBy: v.id("users"),
    orgId: v.id("organizations"),
    spaceId: v.id("spaces"),
    isDeleted: v.boolean(),
    isHidden: v.boolean(),
    folder: v.optional(v.id("folders")),
    visibleOnlyTo: v.optional(v.array(v.id("users"))),
  }),
});

export default schema;
