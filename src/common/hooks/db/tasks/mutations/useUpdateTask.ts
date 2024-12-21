import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { api } from "@db/_generated/api";
import { Id } from "@db/_generated/dataModel";

type UseUpdateTaskParams = {
  listId: Id<"lists">;
  spaceId: Id<"spaces">;
};
export const useUpdateTask = (params?: UseUpdateTaskParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(
      api.tasks.controller.update,
    ).withOptimisticUpdate((localStore, args) => {
      if (!params) {
        return;
      }

      const currentValue = localStore.getQuery(api.tasks.controller.getTasks, {
        listId: params.listId,
        spaceId: params.spaceId,
      });

      if (!currentValue) {
        return;
      }

      const newTasks = [...currentValue];

      const taskToUpdate = newTasks.find((task) => task._id === args.taskId);

      if (!taskToUpdate) {
        return;
      }

      const keys = Object.keys(args.data) as [keyof typeof args.data];

      keys.forEach((key) => {
        // @ts-expect-error
        taskToUpdate[key] = args.data[key];
      });

      localStore.setQuery(
        api.tasks.controller.getTasks,
        {
          listId: params.listId,
          spaceId: params.spaceId,
        },
        newTasks,
      );
    }),
  });

  return { mutate, isPending };
};
