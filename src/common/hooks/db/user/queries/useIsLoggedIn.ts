import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useIsLoggedIn = () => {
  const { data, isLoading, error } = useQuery({
    ...convexQuery(api.users.controller.isLoggedIn, {}),
    staleTime: 0,
  });
  return { data, isLoading, error };
};
