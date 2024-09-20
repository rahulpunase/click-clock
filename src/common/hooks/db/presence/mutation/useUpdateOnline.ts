import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useUpdateOnline = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.presence.updateLastOnline),
  });
  return { mutate, isPending };
};
