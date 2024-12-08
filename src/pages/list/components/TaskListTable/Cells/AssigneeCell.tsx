import { CellContext } from "@tanstack/react-table";

import { PartialTaskDataObject } from "@/pages/list/components/TaskListTable/defaultColumns";

import AssigneeUpdate from "@/common/components/tasks/taskUpdateEntities/AssigneeUpdate";

import { Id } from "@db/_generated/dataModel";

const AssigneeCell = ({
  cell,
}: CellContext<PartialTaskDataObject, PartialTaskDataObject["assignee"]>) => {
  const defaultValue = cell.getValue();

  const taskId = cell.row.original._id as Id<"tasks">;

  return (
    <AssigneeUpdate
      taskId={taskId}
      type="cell"
      defaultValue={defaultValue}
      label=""
    />
  );
};

export default AssigneeCell;
