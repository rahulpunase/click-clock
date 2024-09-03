import { useGetCurrentOrganizations } from "@/common/hooks/db/organizations/queries/useGetCurrentOrganizations";
import { useGetCurrentUserData } from "@/common/hooks/db/user/queries/useGetCurrentUserData";

export const useGetSelectedOrganization = () => {
  const { data: organizations } = useGetCurrentOrganizations();
  const { data: userData } = useGetCurrentUserData();

  const selectedOrg = organizations.find(
    (org) => org?._id === userData?.selectedOrganization,
  );

  if (!selectedOrg) {
    return null;
  }

  return selectedOrg;
};
