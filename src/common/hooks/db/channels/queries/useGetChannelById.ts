import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetChannelById = ({ channelId }: { channelId: string }) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.channels.controller.getChannelById, {
      channelId,
    }),
  );

  return { data: data, isLoading, error };
};
