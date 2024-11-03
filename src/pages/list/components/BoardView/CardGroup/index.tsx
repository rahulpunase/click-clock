import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Text } from "@/design-system/ui/Text/Text";

import { useListContext } from "@/pages/list/context/ListContext";

import { useGetTasks } from "@/common/hooks/db/tasks/queries/useGetTasks";

type GroupByProps = {
  tasks: ReturnType<typeof useGetTasks>["data"];
  groupKey: string | undefined;
};

const CardGroup = ({ groupKey, tasks }: GroupByProps) => {
  const { isAddingTask, setIsAddingTask, list, listUserData } =
    useListContext();
  const statusFromKey = list?.statuses?.find((item) => item.label === groupKey);

  const color = `${statusFromKey?.color}10`;
  const borderColor = `${statusFromKey?.color}30`;
  const tagBackground = `${statusFromKey?.color}30`;

  return (
    <Flex
      className="min-w-[320px] shrink-0 rounded-md p-1"
      gap="gap-2"
      direction="flex-col"
      style={{
        background: color,
        border: `1px solid ${borderColor}`,
      }}
    >
      <Flex
        direction="flex-col"
        className="h-full"
        justifyContent="justify-between"
      >
        <Flex className="flex-col">
          <Flex>
            <Flex
              className="rounded-sm p-1"
              style={{
                background: tagBackground,
              }}
            >
              <Text variant="heading-1">{groupKey ?? "N.A."}</Text>
            </Flex>
          </Flex>

          <Flex direction="flex-col" className="mt-1" gap="gap-1">
            {tasks.map((task) => (
              <Text variant="body-1">{task.name ?? ""}</Text>
            ))}
          </Flex>
        </Flex>

        <Button variant="outline" size="sm">
          Add tasks
        </Button>
      </Flex>
    </Flex>
  );
};

export default CardGroup;
