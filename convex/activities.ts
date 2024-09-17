import { Doc, Id } from "./_generated/dataModel";
import { MutationCtx } from "./_generated/server";

export type ActivityType = Doc<"activities">["type"];

export async function logActivity(
  ctx: MutationCtx,
  {
    userId,
    activityName,
    text,
    type,
  }: {
    userId: Id<"users">;
    activityName: string;
    text: string;
    type: ActivityType;
  },
) {
  await ctx.db.insert("activities", {
    createdByUserId: userId,
    name: activityName,
    type,
    text: text,
  });
}
