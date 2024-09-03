import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetSpaces = () => {
  const { data, isLoading, error } = useQuery({
    ...convexQuery(api.spaces.getSpaces, {}),
    initialData: [],
  });
  return { data: data ?? [], isLoading, error };
};
