import { groupBy, orderBy } from "lodash-es";

import { Flex } from "@/design-system/layout/Flex/Flex";

import CardGroup from "@/pages/list/components/BoardView/CardGroup";
import BoardViewLoading from "@/pages/list/components/loading/BoardViewLoading";
import { useListContext } from "@/pages/list/context/ListContext";

import { SortBy } from "@/common/types";

const BoardView = () => {
  const { listUserData, tasksLoading, tasks } = useListContext();

  const groupedByValue = listUserData?.groupBy;

  const sortBy = listUserData?.sortBy ?? SortBy.Ascending;

  const tasksToRender = groupBy(tasks, groupedByValue);

  const sortedTaskToRenderKeys = orderBy(
    Object.keys(tasksToRender),
    [],
    sortBy as "asc" | "desc",
  );

  if (tasksLoading) {
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
