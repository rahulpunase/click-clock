import { useQuery } from "convex/react";

import { api } from "@db/_generated/api";

export const useGetCurrentOrganizations = () => {
  const organizations = useQuery(api.organizations.current);

  const isLoading = organizations === undefined;

  return {
    organizations,
    isLoading,
  };
};
