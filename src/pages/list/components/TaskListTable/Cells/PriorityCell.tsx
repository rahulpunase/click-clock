import { CellContext } from "@tanstack/react-table";

import { PartialTaskDataObject } from "@/pages/list/components/TaskListTable/defaultColumns";
import { useListContext } from "@/pages/list/context/ListContext";

import PriorityUpdate from "@/common/components/tasks/taskUpdateEntities/PriorityUpdate";

const PriorityCell = ({
  cell,
}: CellContext<PartialTaskDataObject, PartialTaskDataObject["status"]>) => {
  const { list } = useListContext();
  const defaultValue = cell.getValue();
  const taskId = cell.row.original._id;

  if (!list) {
    return null;
  }
  return (
    <PriorityUpdate
      label=""
      type="cell"
      defaultValue={defaultValue}
      list={list}
      taskId={taskId}
    />
  );
};

export default PriorityCell;
