import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetTasks = ({
  listId,
  spaceId,
}: {
  listId?: string;
  spaceId?: string;
}) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.tasks.getTasks, {
      listId,
      spaceId,
    }),
  );

  return { data: data ?? [], isLoading, error };
};

export type TasksData = ReturnType<typeof useGetTasks>["data"];
