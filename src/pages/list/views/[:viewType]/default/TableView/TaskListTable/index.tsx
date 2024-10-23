import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { List } from "lucide-react";
import { useRef } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Input } from "@/design-system/ui/Input/Input";
import { Table } from "@/design-system/ui/Table/Table";
import { useToast } from "@/design-system/ui/Toast/useToast";

import { useListContext } from "@/pages/list/context/ListContext";
import {
  defaultColumns,
  mapTableData,
} from "@/pages/list/views/[:viewType]/default/TableView/TaskListTable/utils";

import { useCreateTask } from "@/common/hooks/db/tasks/mutations/useCreateTask";
import { TasksData } from "@/common/hooks/db/tasks/queries/useGetTasks";

import { Id } from "@db/_generated/dataModel";

type TaskListTableProps = {
  tasks: TasksData;
  groupKey?: string;
};

const TaskListTable = ({ tasks, groupKey }: TaskListTableProps) => {
  const {
    isAddingTask: { groupId },
    setIsAddingTask,
    contextIds,
    list,
  } = useListContext();

  const table = useReactTable({
    data: tasks,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { mutate: createTask } = useCreateTask();
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const onSaveTaskClicked = () => {
    if (!contextIds.listId || !contextIds.spaceId) {
      return;
    }
    createTask(
      {
        listId: contextIds.listId as Id<"lists">,
        spaceId: contextIds.spaceId as Id<"spaces">,
        name: inputRef.current?.value ?? "Task",
        status: groupKey,
      },
      {
        onSuccess: () => {
          setIsAddingTask({ groupId: undefined });
          toast.toast({
            variant: "default",
            title: "Task created",
          });
        },
      },
    );
  };

  return (
    <Flex
      className="mt-2 animate-in fade-in w-full"
      flex="flex-1"
      direction="flex-col"
    >
      <Table className="table-fixed">
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Head
                  key={headerGroup.id}
                  width={header.getSize()}
                  className="overflow-hidden"
                >
                  {header.id}
                </Table.Head>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id} width={cell.column.getSize()}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {groupId === groupKey && (
        <Flex className="w-[500px]" gap="gap-2">
          <Input
            icon={List}
            ref={inputRef}
            autoFocus
            onBlur={(e) => {
              if (!e.target.value) {
                setIsAddingTask({ groupId: "" });
              }
            }}
            size="small"
            placeholder="Task name"
          />
          <Flex gap="gap-1">
            <Button variant="outline" size="xsm">
              Cancel
            </Button>
            <Button variant="default" size="xsm" onClick={onSaveTaskClicked}>
              Save
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default TaskListTable;
