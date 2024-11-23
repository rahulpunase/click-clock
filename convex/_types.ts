import { Infer, v } from "convex/values";

import { Id } from "./_generated/dataModel";

export const OrganizationPersona = v.union(
  v.literal("work"),
  v.literal("personal"),
  v.literal("others"),
);

export type OrganizationPersona = Infer<typeof OrganizationPersona>;
