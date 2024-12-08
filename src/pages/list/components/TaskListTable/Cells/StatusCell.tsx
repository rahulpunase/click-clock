import { CellContext } from "@tanstack/react-table";

import { PartialTaskDataObject } from "@/pages/list/components/TaskListTable/defaultColumns";
import { useListContext } from "@/pages/list/context/ListContext";

import StatusUpdate from "@/common/components/tasks/taskUpdateEntities/StatusUpdate";

const StatusCell = ({
  cell,
}: CellContext<PartialTaskDataObject, PartialTaskDataObject["status"]>) => {
  const { list } = useListContext();

  const defaultValue = cell.getValue();

  const taskId = cell.row.original._id;

  if (!list) {
    return null;
  }

  return (
    <StatusUpdate
      type="cell"
      label=""
      defaultValue={defaultValue}
      list={list}
      taskId={taskId}
    />
  );
};

export default StatusCell;
