import { useGetSelectedOrganization } from "@/common/hooks/db/organizations/useGetSelectedOrganization";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";

export const useIsAdmin = () => {
  const selectedOrg = useGetSelectedOrganization();
  const { data: currentUser } = useGetCurrentUser();
  if (!selectedOrg) {
    return false;
  }
  return currentUser?._id === selectedOrg.createdByUserId;
};
