import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetMembers = () => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.members.getMembers, {}),
  );
  return { data, isLoading, error };
};
