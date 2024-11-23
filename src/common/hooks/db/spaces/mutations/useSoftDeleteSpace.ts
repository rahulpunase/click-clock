import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useSoftDeleteSpace = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.spaces.controller.softDelete),
  });

  return { mutate, isPending };
};
