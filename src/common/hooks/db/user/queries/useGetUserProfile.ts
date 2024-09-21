import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetUserProfile = (userId?: string) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.profile.fetch, {
      userId,
    }),
  );
  return { data, isLoading, error };
};
