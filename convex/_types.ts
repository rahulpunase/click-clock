import { Id } from "./_generated/dataModel";

export type CreateNewListPayload = {
  orgId: Id<"organizations">;
  userId: Id<"users">;
  spaceId: Id<"spaces">;
  isPrivate: boolean;
  name: string;
  parentFolderId?: Id<"folders">;
  description?: string;
};
