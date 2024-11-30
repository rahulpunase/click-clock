import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetSpaces = () => {
  const { data, isLoading, error } = useQuery({
    ...convexQuery(api.spaces.controller.getAll, {}),
    initialData: [],
  });
  return { data: data ?? [], isLoading, error };
};

export type SpaceItem = Space["items"][number];
export type SpaceItems = SpaceItem[];

export type Space = ReturnType<typeof useGetSpaces>["data"][number];
export type Spaces = Space[];
