import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useUpdateTask = () => {
  const updateStatus = useMutation({
    mutationFn: useConvexMutation(api.tasks.updateStatus),
  });

  // ... other mutations

  return { updateStatus };
};
