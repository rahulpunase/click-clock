import { useRef } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Input } from "@/design-system/ui/Input/Input";
import { Table } from "@/design-system/ui/Table/Table";
import { useToast } from "@/design-system/ui/Toast/useToast";

import { useListContext } from "@/pages/list/context/ListContext";

import { useCreateTask } from "@/common/hooks/db/tasks/mutations/useCreateTask";

import { Id } from "@db/_generated/dataModel";

const NoTasksYet = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setIsAddingTask, contextIds } = useListContext();
  const { mutate: createTask } = useCreateTask();
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
    <Flex className="px-2 w-full">
      <Table>
        <Table.Header>
          <Table.Head>Name</Table.Head>
          <Table.Head>Due date</Table.Head>
          <Table.Head>Priority</Table.Head>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Flex gap="gap-3">
                <Input
                  ref={inputRef}
                  autoFocus
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
        </Table.Body>
      </Table>
    </Flex>
  );
};

export default NoTasksYet;
