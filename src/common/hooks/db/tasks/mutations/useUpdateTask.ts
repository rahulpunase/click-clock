import { useConvexMutation } from "@convex-dev/react-query";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useUpdateTask = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.tasks.controller.update),
  });

  return { mutate, isPending };
};
