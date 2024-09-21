import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useUpdateProfile = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.profile.update),
  });
  return { mutate, isPending };
};
