import { capitalize } from "lodash-es";
import { ChevronDown, CircleDot, Ellipsis, Plus } from "lucide-react";
import { useToggle } from "react-use";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import Icon from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";
import { cn } from "@/design-system/utils/utils";

import { useListContext } from "@/pages/list/context/ListContext";
import TaskListTable from "@/pages/list/views/[:viewType]/default/TableView/TaskListTable";

import { useGetTasks } from "@/common/hooks/db/tasks/queries/useGetTasks";
import { GroupListBy } from "@/common/types";

type GroupByProps = {
  tasks: ReturnType<typeof useGetTasks>["data"];
  groupedByKey: GroupListBy;
  groupKey: string | undefined;
};

const GroupedBy = ({ tasks, groupKey }: GroupByProps) => {
  const [expanded, setExpanded] = useToggle(true);
  const { isAddingTask, setIsAddingTask } = useListContext();

  const keyItem = groupKey === "undefined" ? "No status" : capitalize(groupKey);
  return (
    <Flex
      direction="flex-row"
      justifyContent="justify-start"
      alignItems="items-center"
      gap="gap-2"
      className="w-full"
    >
      <Flex className="self-start">
        <IconButton
          variant="ghost"
          size="xSmallIcon"
          icon={ChevronDown}
          onClick={() => setExpanded()}
          className={cn("transition-transform", !expanded && "-rotate-90")}
        />
      </Flex>
      <Flex
        direction="flex-col"
        flex="flex-1"
        className={cn("slide-in-from-top-2")}
      >
        <Flex gap="gap-2">
          <Flex alignItems="items-center" gap="gap-2">
            <Icon className="size-4" IconName={CircleDot} />
            <Text>{keyItem}</Text>
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

        {expanded && <TaskListTable tasks={tasks} groupKey={groupKey} />}
      </Flex>
    </Flex>
  );
};

export default GroupedBy;
