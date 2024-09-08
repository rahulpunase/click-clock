import { v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { AppConvexError } from "./helper";
import { getCurrentUserData } from "./userData";
import { getAuthenticatedUser } from "./users";

export const create = mutation({
  args: {
    spaceId: v.id("spaces"),
    parentFolderId: v.optional(v.id("folders")),
  },
  handler: async (ctx, { spaceId, parentFolderId }) => {
    const user = await getAuthenticatedUser(ctx);
    const userData = await getCurrentUserData(ctx, user._id);
    if (!userData.selectedOrganization) {
      throw AppConvexError("No organization selected", 401);
    }
    const document = await _createDocument(ctx, {
      orgId: userData.selectedOrganization,
      spaceId,
      userId: user._id,
      parentFolderId,
    });

    console.log({ document });

    return document;
  },
});

export const getDocument = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, { documentId }) => {
    const user = await getAuthenticatedUser(ctx);
    const document = await ctx.db.get(documentId);

    if (!document) {
      throw AppConvexError("No document found");
    }

    if (document.createdBy !== user._id) {
      throw AppConvexError("You don't have permission to see this document");
    }
    return document;
  },
});

export const updateContent = mutation({
  args: {
    documentId: v.id("documents"),
    content: v.string(),
  },
  handler: async (ctx, { documentId, content }) => {
    const user = await getAuthenticatedUser(ctx);
    await ctx.db.patch(documentId, {
      content,
    });
  },
});

export const getDocumentsBySpaceId = query({
  args: { spaceId: v.id("spaces") },
  handler: async (ctx, { spaceId }) => {
    return await _getDocumentsBySpaceId(ctx, {
      spaceId,
    });
  },
});

async function _createDocument(
  ctx: MutationCtx,
  {
    userId,
    orgId,
    spaceId,
    parentFolderId,
  }: {
    userId: Id<"users">;
    orgId: Id<"organizations">;
    spaceId: Id<"spaces">;
    parentFolderId?: Id<"folders">;
  },
) {
  return await ctx.db.insert("documents", {
    createdBy: userId,
    name: "Doc",
    orgId,
    spaceId,
    type: "document",
    parentFolderId,
  });
}

export async function _getDocumentsBySpaceId(
  ctx: QueryCtx,
  {
    spaceId,
  }: {
    spaceId: Id<"spaces">;
  },
) {
  return await ctx.db
    .query("documents")
    .withIndex("ind_by_spaceId", (q) => q.eq("spaceId", spaceId))
    .collect();
}

export async function _getDocumentsWithInFolder(
  ctx: QueryCtx,
  {
    spaceId,
    parentFolderId,
  }: {
    spaceId: Id<"spaces">;
    parentFolderId: Id<"folders">;
  },
) {
  console.log({ parentFolderId });
  return await ctx.db
    .query("documents")
    .withIndex("ind_by_spaceId", (q) => q.eq("spaceId", spaceId))
    .collect();
}
