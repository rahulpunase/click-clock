import { groupBy, orderBy } from "lodash-es";

import { Flex } from "@/design-system/layout/Flex/Flex";

import CardGroup from "@/pages/list/components/BoardView/CardGroup";
import BoardViewLoading from "@/pages/list/components/BoardViewLoading";
import { useListContext } from "@/pages/list/context/ListContext";

import { useGetTasks } from "@/common/hooks/db/tasks/queries/useGetTasks";
import { SortBy } from "@/common/types";

const BoardView = () => {
  const { contextIds, listUserData } = useListContext();
  const { data: tasks, isLoading } = useGetTasks({
    listId: contextIds.listId,
    spaceId: contextIds.spaceId,
  });

  const groupedByValue = listUserData?.groupBy;

  const sortBy = listUserData?.sortBy ?? SortBy.Ascending;

  const tasksToRender = groupBy(tasks, groupedByValue);

  const sortedTaskToRenderKeys = orderBy(
    Object.keys(tasksToRender),
    [],
    sortBy as "asc" | "desc",
  );

  if (isLoading) {
    return <BoardViewLoading />;
  }

  return (
    <Flex
      className="pl-4 min-w-0 animate-in fade-in max-h-full pb-2"
      gap="gap-4"
      flex="flex-1"
      direction="flex-row"
      data-component="BoardView"
    >
      <Flex className="max-h-full h-full" gap="gap-3">
        {sortedTaskToRenderKeys.map((groupKey) => {
          return (
            <CardGroup
              key={groupKey}
              groupKey={groupKey}
              tasks={tasksToRender[groupKey]}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default BoardView;
