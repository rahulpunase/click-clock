import { asyncMap } from "convex-helpers";
import { getManyFrom, getOneFrom } from "convex-helpers/server/relationships";

import { Doc, Id } from "./_generated/dataModel";
import { MutationCtx, query, QueryCtx } from "./_generated/server";
import { getCurrentUserData } from "./userData";
import { getAuthenticatedUser } from "./users";

export const getMembers = query({
  args: {},
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
        "members",
        "ind_typeId",
        userData.selectedOrganization,
        "typeId",
      ),
      async (member) => {
        const user = await getOneFrom(
          ctx.db,
          "users",
          "by_id",
          member.userId,
          "_id",
        );
        return { member: member, user: user };
      },
    );
  },
});

export async function _addMemberToOrg(
  ctx: MutationCtx,
  {
    orgId,
    userId,
    role,
    joinedBy,
  }: {
    joinedBy: Id<"users">;
    orgId: Id<"organizations">;
    userId: Id<"users">;
    role: Doc<"members">["role"];
  },
) {
  return await ctx.db.insert("members", {
    joinedBy,
    role,
    userId,
    type: "organizations",
    typeId: orgId,
    isActive: true,
  });
}

export async function _getUserAsMember(ctx: QueryCtx, userId: Id<"users">) {
  return await ctx.db
    .query("members")
    .withIndex("ind_memberId", (q) => q.eq("userId", userId))
    .collect();
}
