import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useUpdateTaskById = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.tasks.updateById),
  });

  return { mutate, isPending };
};
