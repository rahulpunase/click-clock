import { useGetCurrentUser } from "@/common/hooks/useGetCurrentUser";
import { useGetSelectedOrganization } from "@/common/hooks/useGetSelectedOrganization";

export const useIsAdmin = () => {
  const selectedOrg = useGetSelectedOrganization();
  const { currentUser } = useGetCurrentUser();
  if (!selectedOrg) {
    return false;
  }
  return currentUser?._id === selectedOrg.createdBy;
};
