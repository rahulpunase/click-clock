import { ChevronDown, Plus } from "lucide-react";
import { useCallback } from "react";
import { useToggle } from "react-use";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Text } from "@/design-system/ui/Text/Text";
import { cn } from "@/design-system/utils/utils";

import TaskListTable from "@/pages/list/components/TaskListTable";
import {
  ListContextType,
  useListContext,
} from "@/pages/list/context/ListContext";
import useListViewGroupKeySpecific from "@/pages/list/hooks/useListViewGroupKeySpecific";

type GroupByProps = {
  tasks: ListContextType["tasks"];
  groupKey: string | undefined;
};

const ListViewGroup = ({ tasks, groupKey }: GroupByProps) => {
  const [expanded, setExpanded] = useToggle(true);

  const { isAddingTask, setIsAddingTask, setSelectedTasks } = useListContext();

  const selectAll = useCallback(() => {
    const obj = tasks.reduce((obj, acc) => {
      return {
        ...obj,
        [acc._id]: true,
      };
    }, {});
    setSelectedTasks(obj);
  }, [setSelectedTasks, tasks]);

  const { label, iconUpdater, dropDownMenu } = useListViewGroupKeySpecific({
    groupedKey: groupKey,
    expanded,
    setExpanded,
    selectAll,
  });

  return (
    <Flex direction="flex-col" alignItems="items-center" className="w-full">
      <Flex gap="gap-2" className="self-start px-4">
        <IconButton
          variant="ghost"
          size="xs"
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
              {iconUpdater}
              <Text>{label || "No status"}</Text>
            </Flex>

            <Flex alignItems="items-center">
              {dropDownMenu}
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

export default ListViewGroup;
