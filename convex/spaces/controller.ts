import { asyncMap } from "convex-helpers";
import { ConvexError, v } from "convex/values";

import { mutation, query } from "../_generated/server";
import { FolderServices } from "../folders/folders.services";
import { AppConvexError } from "../helper";
import { SpacesServices } from "../spaces/spaces.services";
import { UserDataServices } from "../userData/userData.services";
import { UserServices } from "../users/users.services";

export const getSpaces = query({
  handler: async (ctx) => {
    const user = await UserServices.getAuthenticatedUser(ctx);

    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);

    if (userData?.selectedOrganization === undefined) {
      throw AppConvexError("No selected organization");
    }

    const privateSpaces = await SpacesServices.queryWithPrivateSpace(ctx, {
      orgId: userData.selectedOrganization,
      userId: user._id,
    });

    return await asyncMap(privateSpaces, async (space) => {
      const folders = await FolderServices.queryFolders(ctx, {
        spaceId: space._id,
      });

      return {
        ...space,
        folders: folders,
      };
    });
  },
});

export const getPrivateSpaces = query({
  handler: async (ctx) => {
    const user = await UserServices.getAuthenticatedUser(ctx);

    if (!user) {
      return null;
    }

    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      return null;
    }

    return await SpacesServices.querySpace(ctx, userData.selectedOrganization);
  },
});

export const createOrEdit = mutation({
  args: {
    name: v.string(),
    icon: v.string(),
    color: v.string(),
    isPrivate: v.boolean(),
    description: v.optional(v.string()),
    spaceId: v.optional(v.id("spaces")),
  },
  handler: async (
    ctx,
    { name, icon, color, isPrivate, spaceId, description },
  ) => {
    const user = await UserServices.getAuthenticatedUser(ctx);

    if (user === null) {
      return null;
    }

    const userData = await UserDataServices.getCurrentUserData(ctx, user._id);

    if (!userData?.selectedOrganization) {
      return null;
    }

    if (spaceId) {
      // update
      return await SpacesServices.updateSpace(ctx, spaceId, {
        name,
        icon,
        color,
        isPrivate,
        description,
      });
    }

    const space = await SpacesServices.createSpace(ctx, {
      name,
      icon,
      color,
      isPrivate,
      organizationId: userData.selectedOrganization,
      createdByUserId: user._id,
      description,
    });

    return space;
  },
});

export const softDelete = mutation({
  args: {
    spaceId: v.id("spaces"),
  },
  handler: async (ctx, { spaceId }) => {
    const user = await UserServices.getAuthenticatedUser(ctx);
    if (!user) {
      return null;
    }
    const space = await SpacesServices.fetchSpaceById(ctx, {
      spaceId,
    });

    if (space?.createdByUserId !== user._id) {
      return new ConvexError("Do not have deleting permission");
    }
    await SpacesServices.softDeleteSpace(ctx, {
      spaceId,
    });
  },
});
