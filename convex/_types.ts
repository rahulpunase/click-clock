import { Infer, v } from "convex/values";

export const OrganizationPersona = v.union(
  v.literal("work"),
  v.literal("personal"),
  v.literal("others"),
);

export type OrganizationPersona = Infer<typeof OrganizationPersona>;
