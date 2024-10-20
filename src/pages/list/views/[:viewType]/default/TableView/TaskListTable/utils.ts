import { ColumnDef } from "@tanstack/react-table";

import PriorityCell from "@/pages/list/views/[:viewType]/default/TableView/TaskListTable/Cells/PriorityCell";
import StatusCell from "@/pages/list/views/[:viewType]/default/TableView/TaskListTable/Cells/StatusCell";
import TaskNameCell from "@/pages/list/views/[:viewType]/default/TableView/TaskListTable/Cells/TaskNameCell";

import { TasksData } from "@/common/hooks/db/tasks/queries/useGetTasks";

export type PartialTaskDataObject = Partial<TasksData[0]>;

export const mapTableData = (data: TasksData): PartialTaskDataObject[] => {
  return data.map((item) => ({
    ...item,
  }));
};

export const defaultColumns: ColumnDef<PartialTaskDataObject>[] = [
  {
    header: "name",
    cell: TaskNameCell,
    accessorKey: "name",
    size: 500,
  },
  {
    header: "status",
    cell: StatusCell,
    accessorKey: "status",
    size: 400,
  },
  {
    header: "priority",
    cell: PriorityCell,
    accessorKey: "priority",
    size: 100,
  },
];
