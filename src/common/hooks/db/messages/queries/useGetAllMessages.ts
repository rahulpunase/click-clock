import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetAllMessages = ({ channelId }: { channelId?: string }) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.messages.controller.getAll, {
      channelId,
    }),
  );

  return { data: data ?? [], isLoading, error };
};
