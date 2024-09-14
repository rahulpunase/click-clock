import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { MutationCallbacks } from "@/common/hooks/db/types";

import { api } from "@db/_generated/api";

export const useCreateChannel = ({ onError, onSuccess }: MutationCallbacks) => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.channels.create),
    onSuccess,
    onError,
  });

  return { mutate, isPending };
};
