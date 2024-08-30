import { useGetCurrentOrganizations } from "@/common/hooks/useGetCurrentOrganizations";
import { useGetCurrentWorkspace } from "@/common/hooks/useGetCurrentWorkspace";

export const useGetSelectedOrganization = () => {
  const { organizations } = useGetCurrentOrganizations();
  const { workspace } = useGetCurrentWorkspace();

  return organizations?.find(
    (org) => org._id === workspace?.[0].selectedOrganization
  );
};
