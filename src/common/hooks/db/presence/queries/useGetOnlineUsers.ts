import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetOnlineUsers = ({ userIds }: { userIds: string[] }) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.presence.getOnlineUsers, {
      userIds: userIds,
    }),
  );
  return { data, isLoading, error };
};
