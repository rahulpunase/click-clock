import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "@db/_generated/api";

export const useGetTaskById = ({ taskId }: { taskId?: string }) => {
  const { data, isLoading, error } = useQuery(
    convexQuery(api.tasks.getById, {
      taskId,
    }),
  );

  return { data: data, isLoading, error };
};
