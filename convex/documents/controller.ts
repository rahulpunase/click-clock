import { asyncMap } from "convex-helpers";
import { getOneFromOrThrow } from "convex-helpers/server/relationships";
import { v } from "convex/values";

import { DataModel } from "../_generated/dataModel";
import { mutation, query } from "../_generated/server";
import { AppConvexError } from "../helper";
import { UserDataServices } from "../userData/userData.services";
import { UserServices } from "../users/users.services";
import { DocumentsServices } from "./documents.services";

export const create = mutation({
  args: {
    spaceId: v.id("spaces"),
    parentFolderId: v.optional(v.id("folders")),
  },
  handler: async (ctx, { spaceId, parentFolderId }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
    if (userData?.selectedOrganization === undefined) {
      throw AppConvexError("No selected organization");
    }
    const document = await DocumentsServices.createDocument(ctx, {
      orgId: userData.selectedOrganization,
      spaceId,
      createdByUserId: user._id,
      parentFolderId,
      name: "",
    });

    return document;
  },
});

export const getById = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, { documentId }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    const document = await DocumentsServices.getDocumentById(ctx, documentId);

    if (!document) {
      throw AppConvexError("No document found");
    }

    if (document.createdByUserId !== user._id) {
      throw AppConvexError("You don't have permission to see this document");
    }
    return document;
  },
});

export const updateContent = mutation({
  args: {
    documentId: v.id("documents"),
    content: v.optional(v.string()),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { documentId, content, name }) => {
    await ctx.db.patch(documentId, {
      content,
      name,
    });
  },
});

export const getDocumentsBySpaceId = query({
  args: { spaceId: v.id("spaces") },
  handler: async (ctx, { spaceId }) => {
    return await DocumentsServices.getDocumentsBySpaceId(ctx, {
      spaceId,
    });
  },
});

type RecentDocument = DataModel["documents"]["document"] & {
  in: string;
};

export const getRecentDocuments = query({
  handler: async (ctx) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);
    if (!userData?.selectedOrganization) {
      throw AppConvexError("No organization found", 403);
    }
    const documents = await ctx.db
      .query("documents")
      .withIndex("ind_by_orgId", (q) =>
        // @ts-expect-error selectedOrganization exists
        q.eq("orgId", userData.selectedOrganization),
      )
      .collect();

    const nonPrivateOrganizationDocuments: RecentDocument[] = [];

    await asyncMap(documents, async (document) => {
      const space = await getOneFromOrThrow(
        ctx.db,
        "spaces",
        "by_id",
        document.spaceId,
        "_id",
      );

      if (!space?.isPrivate) {
        nonPrivateOrganizationDocuments.push({
          ...document,
          in: space.name ?? "",
        });
      }
    });

    return nonPrivateOrganizationDocuments.sort((a, b) =>
      a._creationTime < b._creationTime
        ? 1
        : a._creationTime > b._creationTime
          ? -1
          : 0,
    );
  },
});
