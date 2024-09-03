import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useCreateOrganization = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.organizations.create),
  });

  return { mutate, isPending };
};
