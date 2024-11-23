import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetCurrentUserData = () => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.userData.controller.current, {}),
  );
  return { data, isLoading, error };
};
