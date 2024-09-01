import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const useGetCurrentOrganizations = () => {
  const organizations = useQuery(api.organizations.current);

  const isLoading = organizations === undefined;

  return {
    organizations,
    isLoading,
  };
};
