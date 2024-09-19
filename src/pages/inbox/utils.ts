import { Doc, Id } from "@db/_generated/dataModel";

export function isAdmin(member: Doc<"channelMembers">) {
  return member.role === "admin";
}

export function isMemberLoggedInUser(
  member: Doc<"channelMembers">,
  userId?: Id<"users">,
) {
  return member.userId === userId;
}

export function isGeneralChannel(channel: Doc<"channels">) {
  return channel.isGeneral;
}
