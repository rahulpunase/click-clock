import { isEmpty } from "lodash-es";
import groupBy from "lodash-es/groupBy";

import { Flex } from "@/design-system/layout/Flex/Flex";

import { useListContext } from "@/pages/list/context/ListContext";
import DefaultViewLoading from "@/pages/list/views/[:viewType]/default/DefaultViewLoading";
import GroupedBy from "@/pages/list/views/[:viewType]/default/TableView/GroupedBy";
import NoTasksYet from "@/pages/list/views/[:viewType]/default/TableView/NoTasksYet";

import { useGetTasks } from "@/common/hooks/db/tasks/queries/useGetTasks";

const TableView = () => {
  const { contextIds } = useListContext();
  const { data: tasks, isLoading } = useGetTasks({
    listId: contextIds.listId,
    spaceId: contextIds.spaceId,
  });

  const groupedByKey = "status";

  const tasksToRender = groupBy(tasks, groupedByKey);

  if (isLoading) {
    return <DefaultViewLoading />;
  }

  if (isEmpty(tasksToRender)) {
    return <NoTasksYet />;
  }

  return (
    <Flex className="pt-2 px-2" gap="gap-8" flex="flex-1" direction="flex-col">
      {Object.keys(tasksToRender).map((key) => {
        return (
          <GroupedBy
            key={key}
            groupKey={key}
            tasks={tasksToRender[key]}
            groupedByKey={groupedByKey}
          />
        );
      })}
    </Flex>
  );
};

export default TableView;
