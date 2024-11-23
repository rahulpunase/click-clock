import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useCreateEditFolder = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.folders.controller.create),
  });

  return { mutate, isPending };
};
