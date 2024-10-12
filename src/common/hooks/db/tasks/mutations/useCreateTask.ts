import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useCreateTask = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.tasks.create),
  });

  return { mutate, isPending };
};
