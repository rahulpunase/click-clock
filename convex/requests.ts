import { asyncMap } from "convex-helpers";
import { getManyFrom, getOneFrom } from "convex-helpers/server/relationships";
import { ConvexError, v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { _addMemberToOrg } from "./members";
import { getCurrentUserData } from "./userData";
import { getAuthenticatedUser } from "./users";

export const sendRequest = mutation({
  args: {
    typeId: v.string(),
    cipher: v.string(),
    requestType: v.string(),
  },
  handler: async (ctx, { requestType, typeId, cipher }) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }

    const getRequest = await ctx.db
      .query("requests")
      .withIndex("ind_by_createdByUserId_typeId", (q) =>
        q.eq("createdByUserId", user._id).eq("typeId", typeId),
      )
      .collect();

    if (getRequest.length) {
      return new ConvexError(
        "Request already exists. Wait for admin to accept it.",
      );
    }

    await ctx.db.insert("requests", {
      createdByUserId: user._id,
      requestType,
      typeId,
      cipher,
    });
  },
});

export const alreadySentRequest = query({
  args: {
    orgId: v.union(v.string(), v.null()),
  },
  handler: async (ctx, { orgId }) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    if (!orgId) {
      return null;
    }
    const getRequest = await ctx.db
      .query("requests")
      .withIndex("ind_by_createdByUserId_typeId", (q) =>
        q.eq("createdByUserId", user._id).eq("typeId", orgId),
      )
      .unique();
    return getRequest;
  },
});

export const getOrgRequests = query({
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    const userData = await getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      return null;
    }

    return await asyncMap(
      await getManyFrom(
        ctx.db,
        "requests",
        "ind_by_typeId",
        userData.selectedOrganization,
        "typeId",
      ),
      async (requests) => {
        const users = await getOneFrom(
          ctx.db,
          "users",
          "by_id",
          requests.createdByUserId,
          "_id",
        );
        return { req: requests, user: users };
      },
    );
  },
});

/**
 * Mutation function to accept a request by updating its status and adding the requesting user as a member to the organization.
 *
 * @param ctx - The query context object.
 * @param requestId - The ID of the request to be accepted.
 * @returns A Promise that resolves to null if the user is not authenticated or if the request does not exist.
 */
export const acceptRequest = mutation({
  args: {
    requestId: v.id("requests"),
  },
  handler: async (ctx, { requestId }) => {
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    const request = await ctx.db.get(requestId);

    if (!request) {
      return null;
    }

    await ctx.db.patch(requestId, {
      isApproved: true,
    });

    await _addMemberToOrg(ctx, {
      joinedBy: user._id,
      userId: request.createdByUserId,
      orgId: request.typeId as Id<"organizations">,
      role: "member",
    });
  },
});
