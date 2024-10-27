import { CellContext } from "@tanstack/react-table";

import DateCalendarDropdownCell from "@/pages/list/components/TaskListTable/Cells/common/DateCalendarDropdownCell";
import { PartialTaskDataObject } from "@/pages/list/components/TaskListTable/defaultColumns";

import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";
import { formatTo } from "@/common/utils/date-utils";

function DateCell<T extends keyof PartialTaskDataObject>({
  cell,
}: CellContext<PartialTaskDataObject, PartialTaskDataObject[T]>) {
  const value = cell.getValue();
  const { mutate: updateTask } = useUpdateTask();
  const taskId = cell.row.original._id;
  const accessorKey = cell.getContext().column.id;

  const onTaskUpdate = (value?: number) => {
    updateTask({
      taskId,
      data: {
        [accessorKey]: value,
      },
    });
  };

  return (
    <DateCalendarDropdownCell
      defaultValue={value ? formatTo(value as string, "MMM dd, yyyy") : "N.A."}
      onSelect={(data) => onTaskUpdate(data?.getTime())}
    />
  );
}

export default DateCell;
