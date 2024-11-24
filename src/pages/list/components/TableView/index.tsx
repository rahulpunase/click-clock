import { isEmpty, orderBy } from "lodash-es";
import groupBy from "lodash-es/groupBy";

import { Flex } from "@/design-system/layout/Flex/Flex";

import DefaultViewLoading from "@/pages/list/components/loading/DefaultViewLoading";
import ListViewGroup from "@/pages/list/components/TableView/ListViewGroup";
import NoTasksYet from "@/pages/list/components/TableView/NoTasksYet";
import { useListContext } from "@/pages/list/context/ListContext";

import { useGetTasks } from "@/common/hooks/db/tasks/queries/useGetTasks";
import { SortBy } from "@/common/types";

const TableView = () => {
  const { contextIds, listUserData } = useListContext();
  const { data: tasks, isLoading } = useGetTasks({
    listId: contextIds.listId,
    spaceId: contextIds.spaceId,
  });

  const groupedByValue = listUserData?.groupBy;

  const sortBy = listUserData?.sortBy ?? SortBy.Ascending;

  const tasksToRender = groupBy(tasks, groupedByValue);

  if (isLoading) {
    return <DefaultViewLoading />;
  }

  if (isEmpty(tasksToRender)) {
    return <NoTasksYet />;
  }

  const sortedTaskToRenderKeys = orderBy(
    Object.keys(tasksToRender),
    [],
    sortBy as "asc" | "desc",
  );

  return (
    <Flex
      className="pt-2 min-w-0"
      gap="gap-4"
      flex="flex-1"
      direction="flex-col"
      data-component="TableView"
    >
      {sortedTaskToRenderKeys.map((groupKey) => {
        return (
          <ListViewGroup
            key={groupKey}
            groupKey={groupKey}
            tasks={tasksToRender[groupKey]}
          />
        );
      })}
    </Flex>
  );
};

export default TableView;
