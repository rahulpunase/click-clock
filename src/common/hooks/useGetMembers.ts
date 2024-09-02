import { useQuery } from "convex/react";

import { api } from "@db/_generated/api";

export const useGetMembers = () => {
  const members = useQuery(api.members.getMembers);
  const isLoading = members === undefined;
  return {
    members,
    isLoading,
  };
};
