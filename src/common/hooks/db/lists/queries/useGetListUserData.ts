import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetListUserData = ({ listId }: { listId?: string }) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.lists.controller.getListUserData, {
      listId,
    }),
  );

  return { data: data, isLoading, error };
};
