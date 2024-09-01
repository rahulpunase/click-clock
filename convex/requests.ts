import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";
import { getCurrentUserData } from "./userData";
import { getManyFrom, getOneFrom } from "convex-helpers/server/relationships";
import { asyncMap } from "convex-helpers";

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
      .withIndex("ind_by_createdBy_typeId", (q) =>
        q.eq("createdBy", user._id).eq("typeId", typeId)
      )
      .collect();

    if (getRequest.length) {
      return new ConvexError(
        "Request already exists. Wait for admin to accept it."
      );
    }

    await ctx.db.insert("requests", {
      createdBy: user._id,
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
      .withIndex("ind_by_createdBy_typeId", (q) =>
        q.eq("createdBy", user._id).eq("typeId", orgId)
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
        "typeId"
      ),
      async (requests) => {
        const users = await getOneFrom(
          ctx.db,
          "users",
          "by_id",
          requests.createdBy,
          "_id"
        );
        return { ...requests, ...users };
      }
    );
  },
});
