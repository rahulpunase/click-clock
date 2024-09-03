import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useAcceptRequest = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.requests.acceptRequest),
  });

  return { mutate, isPending };
};
