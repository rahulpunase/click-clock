import { Unlink } from "lucide-react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import Icon from "@/design-system/ui/Icon/Icon";
import { Input } from "@/design-system/ui/Input/Input";
import { Table } from "@/design-system/ui/Table/Table";
import { useToast } from "@/design-system/ui/Toast/useToast";

import { useListContext } from "@/pages/list/context/ListContext";

import StatusField from "@/common/components/tasks/EditableFields/StatusField";
import { useCreateTask } from "@/common/hooks/db/tasks/mutations/useCreateTask";
import { type useGetTasks } from "@/common/hooks/db/tasks/queries/useGetTasks";

import { Id } from "@db/_generated/dataModel";

type TaskListTableProps = {
  tasks: ReturnType<typeof useGetTasks>["data"];
};

const TaskListTable = ({ tasks }: TaskListTableProps) => {
  const location = useLocation();
  const {
    isAddingTask: { groupId },
    setIsAddingTask,
    contextIds,
    list,
  } = useListContext();

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
      },
      {
        onSuccess: () => {
          setIsAddingTask({ groupId: "" });
          toast.toast({
            variant: "default",
            title: "Task created",
          });
        },
      },
    );
  };

  return (
    <Flex className="mt-2 animate-in fade-in-" flex="flex-1">
      <Table>
        <Table.Header>
          <Table.Head className="w-[50%]">Name</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Due date</Table.Head>
          <Table.Head>Priority</Table.Head>
        </Table.Header>
        <Table.Body>
          {groupId && (
            <Table.Row>
              <Table.Cell>
                <Flex gap="gap-3">
                  <Input
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
                    <Button
                      variant="default"
                      size="xsm"
                      onClick={onSaveTaskClicked}
                    >
                      Save
                    </Button>
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          )}
          {tasks.map((taskItem) => (
            <Table.Row className="animate-in fade-in">
              <Table.Cell>
                <Flex alignItems="items-center" gap="gap-3">
                  <Link
                    to={`task/${taskItem._id}`}
                    state={{
                      previousLocation: location,
                    }}
                  >
                    {taskItem.name}
                  </Link>
                  <Link to={`/task/${taskItem._id}`}>
                    <Icon IconName={Unlink} className="size-4" />
                  </Link>
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <StatusField task={taskItem} statuses={list?.statuses} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Flex>
  );
};

export default TaskListTable;
