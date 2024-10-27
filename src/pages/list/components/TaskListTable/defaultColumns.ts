import { ColumnDef } from "@tanstack/react-table";

import DateCell from "@/pages/list/components/TaskListTable/Cells/DateCell";
import PriorityCell from "@/pages/list/components/TaskListTable/Cells/PriorityCell";
import StatusCell from "@/pages/list/components/TaskListTable/Cells/StatusCell";
import TaskNameCell from "@/pages/list/components/TaskListTable/Cells/TaskNameCell";

import { TasksData } from "@/common/hooks/db/tasks/queries/useGetTasks";

export type PartialTaskDataObject = Partial<TasksData[0]>;

export const mapTableData = (data: TasksData): PartialTaskDataObject[] => {
  return data.map((item) => ({
    ...item,
  }));
};

export const defaultColumns: ColumnDef<PartialTaskDataObject>[] = [
  {
    header: "Name",
    // @ts-expect-error
    cell: TaskNameCell,
    accessorKey: "name",
    size: 500,
  },
  {
    header: "Status",
    // @ts-expect-error
    cell: StatusCell,
    accessorKey: "status",
    size: 160,
  },
  {
    header: "Priority",
    // @ts-expect-error
    cell: PriorityCell,
    accessorKey: "priority",
    size: 100,
  },
  {
    header: "Start date",
    cell: DateCell,
    accessorKey: "startDate",
  },
  {
    header: "Due date",
    cell: DateCell,
    accessorKey: "endDate",
  },
];
