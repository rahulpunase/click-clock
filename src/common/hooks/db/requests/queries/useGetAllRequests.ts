import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetAllRequests = () => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.requests.getOrgRequests, {}),
  );

  return { data: data ?? [], isLoading, error };
};
