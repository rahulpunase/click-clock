import { ColumnDef } from "@tanstack/react-table";

import AssigneeCell from "@/pages/list/components/TaskListTable/Cells/AssigneeCell";
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
    id: "name",
  },
  {
    header: "Status",
    // @ts-expect-error
    cell: StatusCell,
    accessorKey: "status",
    size: 160,
    id: "status",
  },
  {
    header: "Priority",
    // @ts-expect-error
    cell: PriorityCell,
    accessorKey: "priority",
    size: 100,
    id: "priority",
  },
  {
    header: "Assignee",
    // @ts-expect-error
    cell: AssigneeCell,
    accessorKey: "assignee",
    id: "assignee",
  },
  {
    header: "Start date",
    // @ts-expect-error
    cell: DateCell,
    accessorKey: "startDate",
    id: "startDate",
  },

  {
    header: "Due date",
    // @ts-expect-error
    cell: DateCell,
    accessorKey: "endDate",
    id: "endDate",
  },
];
