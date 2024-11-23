import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetChannels = () => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.channels.controller.getOrgChannels, {}),
  );

  return { data: data ?? [], isLoading, error };
};
