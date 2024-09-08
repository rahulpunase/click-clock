import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useCreateDocument = ({
  onSuccess,
  onError,
}: {
  onSuccess?: Parameters<typeof useMutation>["0"]["onSuccess"];
  onError?: Parameters<typeof useMutation>["0"]["onError"];
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.documents.create),
    onSuccess,
    onError,
  });

  return { mutate, isPending };
};
