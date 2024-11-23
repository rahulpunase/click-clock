import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useSelectOrganization = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.userData.controller.selectOrganization),
  });

  return { mutate, isPending };
};
