import { ChevronDown, Ellipsis, Plus } from "lucide-react";
import { useToggle } from "react-use";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Text } from "@/design-system/ui/Text/Text";
import { cn } from "@/design-system/utils/utils";

import TaskListTable from "@/pages/list/components/TaskListTable";
import { useListContext } from "@/pages/list/context/ListContext";
import useGroupKeySpecific from "@/pages/list/hooks/useGroupKeySpecific";

import StatusIconUpdater from "@/common/components/tasks/StatusIconUpdater";
import { useGetTasks } from "@/common/hooks/db/tasks/queries/useGetTasks";

type GroupByProps = {
  tasks: ReturnType<typeof useGetTasks>["data"];
  groupKey: string | undefined;
};

const TaskGroup = ({ tasks, groupKey }: GroupByProps) => {
  const [expanded, setExpanded] = useToggle(true);

  const { label } = useGroupKeySpecific(groupKey);

  const { isAddingTask, setIsAddingTask, list, listUserData } =
    useListContext();

  const groupBy = listUserData?.groupBy;

  const statusFromKey = list?.statuses?.find((item) => item.label === groupKey);

  return (
    <Flex direction="flex-col" alignItems="items-center" className="w-full">
      <Flex gap="gap-2" className="self-start px-4">
        <IconButton
          variant="ghost"
          size="xSmallIcon"
          icon={ChevronDown}
          onClick={() => setExpanded()}
          className={cn("transition-transform", !expanded && "-rotate-90")}
        />

        <Flex
          direction="flex-col"
          flex="flex-1"
          className={cn("slide-in-from-top-2 min-w-0")}
        >
          <Flex gap="gap-2">
            <Flex alignItems="items-center" gap="gap-2">
              {list && groupBy === "status" && (
                <StatusIconUpdater
                  defaultStatus={statusFromKey}
                  labelKey={groupKey}
                  list={list}
                />
              )}
              <Text>{label}</Text>
            </Flex>

            <Flex alignItems="items-center">
              <IconButton variant="ghost" size="xSmallIcon" icon={Ellipsis} />
              {!isAddingTask.groupId && (
                <Button
                  size="xsm"
                  variant="ghost"
                  icon={Plus}
                  className="animate-in fade-in"
                  onClick={() =>
                    setIsAddingTask({
                      groupId: groupKey,
                    })
                  }
                >
                  Add tasks
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {expanded && <TaskListTable tasks={tasks} groupKey={groupKey} />}
    </Flex>
  );
};

export default TaskGroup;