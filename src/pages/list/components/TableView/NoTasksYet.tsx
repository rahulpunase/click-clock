import { useRef } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Input } from "@/design-system/ui/Input/Input";
import { Table } from "@/design-system/ui/Table/Table";
import { useToast } from "@/design-system/ui/Toast/useToast";

import CreateNewTaskButton from "@/pages/list/components/CreateNewTaskButton";
import { useListContext } from "@/pages/list/context/ListContext";

import { useCreateTask } from "@/common/hooks/db/tasks/mutations/useCreateTask";

import { Id } from "@db/_generated/dataModel";

import NoTasks from "@/assets/no-tasks.svg";

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
      <Flex className="w-full mt-20" justifyContent="justify-center">
        <Flex direction="flex-col" gap="gap-4">
          <img className="opacity-80 aspect-video w-[600px]" src={NoTasks} />
          <Flex justifyContent="justify-center">
            <CreateNewTaskButton />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NoTasksYet;
