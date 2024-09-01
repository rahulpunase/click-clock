import { asyncMap } from "convex-helpers";
import { Id, Doc } from "./_generated/dataModel";
import { MutationCtx, query, QueryCtx } from "./_generated/server";
import { getAuthenticatedUser } from "./users";
import { getManyFrom, getOneFrom } from "convex-helpers/server/relationships";
import { getCurrentUserData } from "./userData";

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
        "typeId"
      ),
      async (member) => {
        const user = await getOneFrom(
          ctx.db,
          "users",
          "by_id",
          member.memberId,
          "_id"
        );
        return { member: member, user: user };
      }
    );
  },
});

export async function _addMemberToOrg(
  ctx: MutationCtx,
  {
    orgId,
    memberId,
    role,
    joinedBy,
  }: {
    joinedBy: Id<"users">;
    orgId: Id<"organizations">;
    memberId: Id<"users">;
    role: Doc<"members">["role"];
  }
) {
  return await ctx.db.insert("members", {
    joinedBy,
    role,
    memberId,
    type: "organizations",
    typeId: orgId,
    isActive: true,
  });
}

export async function _getUserAsMember(ctx: QueryCtx, userId: Id<"users">) {
  return await ctx.db
    .query("members")
    .withIndex("ind_memberId", (q) => q.eq("memberId", userId))
    .collect();
}
