import { useGetCurrentOrganizations } from "@/common/hooks/db/organizations/queries/useGetCurrentOrganizations";
import { useGetCurrentUserData } from "@/common/hooks/db/user/queries/useGetCurrentUserData";

export const useGetSelectedOrganization = () => {
  const { data: organizations, isLoading: currentOrganizationsLoading } =
    useGetCurrentOrganizations();
  const { data: userData, isLoading: currentDataLoading } =
    useGetCurrentUserData();

  const selectedOrg = organizations.find(
    (org) => org?._id === userData?.selectedOrganization,
  );

  if (currentOrganizationsLoading || currentDataLoading) {
    return {
      selectedOrg: null,
      isLoading: true,
    };
  }

  if (!selectedOrg) {
    return {
      selectedOrg: null,
      isLoading: false,
    };
  }

  return {
    selectedOrg,
    isLoading: currentOrganizationsLoading || currentDataLoading,
  };
};
