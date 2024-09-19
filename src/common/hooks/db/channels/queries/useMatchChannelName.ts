import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useMatchChannelName = ({ name }: { name: string }) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.channels.matchName, {
      name,
    }),
  );

  return { data: data ?? [], isLoading, error };
};
