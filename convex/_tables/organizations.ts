import { defineTable } from "convex/server";
import { v } from "convex/values";

export const OrganizationPersona = v.union(
  v.literal("work"),
  v.literal("personal"),
  v.literal("others"),
);

const organizationsTable = defineTable({
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
}).index("ind_by_inviteLinkCipher", ["inviteLinkCipher"]);

export default organizationsTable;
