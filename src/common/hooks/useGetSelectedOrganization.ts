import { useGetCurrentOrganizations } from "@/common/hooks/useGetCurrentOrganizations";
import { useGetCurrentUserData } from "@/common/hooks/useGetCurrentUserData";

export const useGetSelectedOrganization = () => {
  const { organizations } = useGetCurrentOrganizations();
  const { userData } = useGetCurrentUserData();

  const selectedOrg = organizations?.find(
    (org) => org._id === userData?.selectedOrganization
  );

  if (!selectedOrg) {
    return null;
  }

  return selectedOrg;
};
