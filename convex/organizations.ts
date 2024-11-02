import { asyncMap } from "convex-helpers";
import { getOneFrom } from "convex-helpers/server/relationships";
import { v } from "convex/values";

import { Doc, Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { logActivity } from "./activities";
import { _createChannel } from "./channels";
import { makeRandomId } from "./helper";
import { _addMemberToOrg, _getUserAsMember } from "./members";
import { OrganizationPersona } from "./schema";
import {
  _createUserData,
  _updateUserData,
  getCurrentUserData,
} from "./userData";
import { getAuthenticatedUser } from "./users";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);
    if (user === null) {
      // console.log
      return console.log("No user");
    }
    return asyncMap(await _getUserAsMember(ctx, user._id), async (member) => {
      const orgId = ctx.db.normalizeId("organizations", member.typeId);

      if (!orgId) {
        return null;
      }

      const orgs = await getOneFrom(
        ctx.db,
        "organizations",
        "by_id",
        orgId,
        "_id",
      );

      if (!orgs) {
        return null;
      }

      return orgs;
    });
  },
});

export const organizationUserIsPartOf = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);
    if (user === null) {
      // console.log
      return console.log("No user");
    }
    return asyncMap(await _getUserAsMember(ctx, user._id), async (member) => {
      const orgId = ctx.db.normalizeId("organizations", member.typeId);
      if (!orgId) {
        return null;
      }
      const orgs = await getOneFrom(
        ctx.db,
        "organizations",
        "by_id",
        orgId,
        "_id",
      );
      return {
        ...orgs,
      };
    });
  },
});

export const getById = query({
  args: {
    orgId: v.union(v.string(), v.null()),
    cipher: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    if (!args.orgId) {
      return null;
    }

    if (!args.cipher) {
      return null;
    }

    const organization = await _getOrganizationById(ctx, args.orgId);
    if (organization?.inviteLinkCipher === args.cipher) {
      return organization;
    }
    return null;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    managementStyle: v.optional(v.string()),
    orgMemberCount: v.optional(v.number()),
    persona: v.optional(OrganizationPersona),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);
    if (user === null) {
      // console.log
      return console.log("No user");
    }

    const userData = await getCurrentUserData(ctx, user._id);

    const orgId = await createOrganization(ctx, {
      name: args.name,
      userId: user._id,
      managementStyle: args.managementStyle,
      orgMemberCount: args.orgMemberCount,
      persona: args.persona,
    });

    // also add member

    await _addMemberToOrg(ctx, {
      joinedBy: user._id,
      userId: user._id,
      orgId,
      role: "admin",
    });

    // create general channel

    await _createChannel(ctx, {
      createdByUserId: user._id,
      name: "General",
      orgId: orgId,
      type: "channel",
      isGeneral: true,
    });

    if (!userData) {
      // create userData and add selected organization to it
      await _createUserData(ctx, {
        userId: user._id,
        orgId: orgId,
      });
    } else {
      await _updateUserData(ctx, {
        userDataId: userData._id,
        data: {
          selectedOrganization: orgId,
        },
      });
    }

    await logActivity(ctx, {
      activityName: "Org created",
      text: `{{user}} created an organization ${args.name}.`,
      type: "create",
      userId: user._id,
    });
  },
});

export const generateInviteLink = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);
    if (user === null) {
      // console.log
      return console.log("No user");
    }
    const userData = await getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      return null;
    }
    const inviteLinkCipher = _generateCipher();
    await ctx.db.patch(userData.selectedOrganization, {
      inviteLinkCipher,
    });
    return inviteLinkCipher;
  },
});

/** HELPER FUNCTIONS */

// async function getAllOrganizations(ctx: QueryCtx, userId: Id<"users">) {
//   return await ctx.db
//     .query("organizations")
//     .filter((q) => q.eq(q.field("createdByUserId"), userId))
//     .collect();
// }

async function createOrganization(
  ctx: MutationCtx,
  {
    name,
    userId,
    managementStyle,
    orgMemberCount,
    persona,
  }: {
    name: string;
    userId: Id<"users">;
    managementStyle?: string;
    orgMemberCount?: number;
    persona?: Doc<"organizations">["persona"];
  },
) {
  return await ctx.db.insert("organizations", {
    createdByUserId: userId,
    isActive: true,
    name: name,
    ownedBy: userId,
    managementStyle,
    orgMemberCount,
    persona,
  });
}

async function _getOrganizationById(ctx: QueryCtx, orgId: string | null) {
  if (!orgId) {
    return null;
  }
  const validOrgId = ctx.db.normalizeId("organizations", orgId);

  if (!validOrgId) {
    return null;
  }
  return await ctx.db
    .query("organizations")
    .withIndex("by_id", (q) => q.eq("_id", validOrgId))
    .unique();
}

function _generateCipher() {
  return makeRandomId(32);
}
