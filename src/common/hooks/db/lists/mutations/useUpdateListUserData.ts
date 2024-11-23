import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useUpdateListUserData = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(
      api.lists.controller.createOrUpdateListUserData,
    ),
  });

  return { mutate, isPending };
};
