import { isEmpty } from "lodash-es";
import groupBy from "lodash-es/groupBy";

import { Flex } from "@/design-system/layout/Flex/Flex";

import { useListContext } from "@/pages/list/context/ListContext";
import GroupedBy from "@/pages/list/views/[:viewType]/default/TableView/GroupedBy";
import NoTasksYet from "@/pages/list/views/[:viewType]/default/TableView/NoTasksYet";

import { useGetTasks } from "@/common/hooks/db/tasks/queries/useGetTasks";

const TableView = () => {
  const { contextIds } = useListContext();
  const { data: tasks } = useGetTasks({
    listId: contextIds.listId,
    spaceId: contextIds.spaceId,
  });

  const groupedByKey = "status";

  const tasksToRender = groupBy(tasks, groupedByKey);

  if (isEmpty(tasksToRender)) {
    return <NoTasksYet />;
  }

  return (
    <Flex className="pt-2 px-2" flex="flex-1">
      {Object.keys(tasksToRender).map((key) => {
        return (
          <GroupedBy
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
