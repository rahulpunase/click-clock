import { useQuery } from "convex/react";

import { api } from "@db/_generated/api";

export const useGetCurrentUser = () => {
  const currentUser = useQuery(api.users.current);
  const isLoading = currentUser === undefined;
  return {
    currentUser,
    isLoading,
  };
};
