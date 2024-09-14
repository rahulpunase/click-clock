import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";
import { Id } from "@db/_generated/dataModel";

export const useGetAllMessages = ({
  channelId,
}: {
  channelId: Id<"channels">;
}) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.messages.getAllMessages, {
      channelId,
    }),
  );

  return { data: data ?? [], isLoading, error };
};
