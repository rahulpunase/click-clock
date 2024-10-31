import {
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { List } from "lucide-react";
import { useRef } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Checkbox } from "@/design-system/ui/Checkbox/checkbox";
import { Input } from "@/design-system/ui/Input/Input";
import { Table } from "@/design-system/ui/Table/Table";
import { useToast } from "@/design-system/ui/Toast/useToast";
import { cn } from "@/design-system/utils/utils";

import { defaultColumns } from "@/pages/list/components/TaskListTable/defaultColumns";
import { useListContext } from "@/pages/list/context/ListContext";

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
    selectedTasks,
    setSelectedTasks,
  } = useListContext();

  const onRowSelectionChange = (newSelection) => setSelectedTasks(newSelection);

  const table = useReactTable({
    data: tasks,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    getRowId: (originalRow) => originalRow._id ?? "",
    onRowSelectionChange: onRowSelectionChange,
    enableRowSelection: true,
    state: {
      rowSelection: selectedTasks,
    },
    debugTable: true,
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

  console.log(selectedTasks);

  return (
    <Flex
      className="mt-2 animate-in fade-in w-full"
      flex="flex-1"
      direction="flex-col"
      data-component="TaskListTable"
    >
      <Table
        className="table-fixed"
        style={{
          width: table.getCenterTotalSize(),
        }}
      >
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup, ind) => (
            <Table.Row key={`${headerGroup.id}-${ind}`}>
              {headerGroup.headers.map((header, _ind) => {
                return (
                  <Table.Head
                    key={`${header.id}-${_ind}`}
                    width={header.getSize()}
                    className={cn("overflow-hidden", _ind === 0 && "pl-5")}
                    resizable
                    resizableProps={{
                      onDoubleClick: () => header.column.resetSize(),
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                      style: {
                        transform: "",
                      },
                    }}
                  >
                    <Flex gap="gap-4" alignItems="items-center">
                      {_ind === 0 && (
                        <Checkbox
                          onClick={table.getToggleAllRowsSelectedHandler()}
                          checked={table.getIsAllRowsSelected()}
                        />
                      )}
                      {header.column.columnDef.header?.toString() ?? ""}
                    </Flex>
                  </Table.Head>
                );
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row, ind) => (
            <Table.Row
              key={`${row.id}-${ind}`}
              isSelected={row.getIsSelected()}
              id={`${row.id}-${ind}`}
            >
              {row.getVisibleCells().map((cell, _ind) => (
                <Table.Cell
                  key={`${cell.id}-${_ind}`}
                  width={cell.column.getSize()}
                  className={cn("overflow-hidden", _ind === 0 && "pl-5")}
                >
                  <Flex gap="gap-2" alignItems="items-center">
                    {_ind === 0 && (
                      <Checkbox
                        checked={cell.row.getIsSelected()}
                        onClick={() => cell.row.toggleSelected()}
                        className={cn(
                          !cell.row.getIsSelected() &&
                            "invisible group-hover/row:visible",
                        )}
                      />
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Flex>
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
