import { asyncMap } from "convex-helpers";
import { getOneFrom } from "convex-helpers/server/relationships";
import { v } from "convex/values";

import { mutation, query } from "../_generated/server";
import { OrganizationPersona } from "../_tables/organizations";
import { logActivity } from "../activities";
import { ChannelsServices } from "../channels/channels.services";
import { MemberServices } from "../members/members.services";
import { OrganizationServices } from "../organizations/organizations.services";
import { UserDataServices } from "../userData/userData.services";
import { UserServices } from "../users/users.services";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (user === null) {
      // console.log
      return console.log("No user");
    }
    return asyncMap(
      await MemberServices.getUserAsMember(ctx, user._id),
      async (member) => {
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
      },
    );
  },
});

export const organizationUserIsPartOf = query({
  args: {},
  handler: async (ctx) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
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
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (user === null) {
      return console.log("No user");
    }

    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);

    const orgId = await OrganizationServices.createOrganization(ctx, {
      name: args.name,
      createdByUserId: user._id,
      managementStyle: args.managementStyle,
      orgMemberCount: args.orgMemberCount,
      persona: args.persona,
      isActive: true,
      ownedBy: user._id,
    });

    // also add member

    await MemberServices.addMemberToOrg(ctx, orgId, {
      joinedBy: user._id,
      userId: user._id,
      role: "admin",
    });

    // create general channel

    await ChannelsServices.createChannel(ctx, {
      createdByUserId: user._id,
      name: "General",
      orgId: orgId,
      type: "channel",
      isGeneral: true,
    });

    if (!userData) {
      // create userData and add selected organization to it
      await UserDataServices.createUserData(ctx, {
        userId: user._id,
        orgId: orgId,
      });
    } else {
      await UserDataServices.updateUserData(ctx, {
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
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (user === null) {
      // console.log
      return console.log("No user");
    }
    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      return null;
    }
    const inviteLinkCipher = OrganizationServices.generateCipher();
    await ctx.db.patch(userData.selectedOrganization, {
      inviteLinkCipher,
    });
    return inviteLinkCipher;
  },
});
