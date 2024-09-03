import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetCurrentUser = () => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.users.current, {}),
  );
  return { data, isLoading, error };
};
