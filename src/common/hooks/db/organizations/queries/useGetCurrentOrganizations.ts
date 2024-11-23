import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetCurrentOrganizations = () => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.organizations.controller.current, {}),
  );

  return { data: data ?? [], isLoading, error };
};
