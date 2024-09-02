import { useQuery } from "convex/react";

import { api } from "@db/_generated/api";

export const useGetSpaces = () => {
  const spaces = useQuery(api.spaces.getSpaces);
  const isLoading = spaces === undefined;
  return { spaces: spaces ?? [], isLoading };
};
