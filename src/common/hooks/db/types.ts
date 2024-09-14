import type { useMutation } from "@tanstack/react-query";

export type MutationCallbacks = {
  onSuccess?: Parameters<typeof useMutation>["0"]["onSuccess"];
  onError?: Parameters<typeof useMutation>["0"]["onError"];
};
