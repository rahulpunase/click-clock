import { Plus } from "lucide-react";
import { useToggle } from "react-use";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Text } from "@/design-system/ui/Text/Text";

import TaskItem from "@/pages/list/components/BoardView/TaskItem";
import useBoardViewGroupKeySpecific from "@/pages/list/hooks/useBoardViewGroupKeySpecific";

import { useGetTasks } from "@/common/hooks/db/tasks/queries/useGetTasks";

type GroupByProps = {
  tasks: ReturnType<typeof useGetTasks>["data"];
  groupKey: string | undefined;
};

const CardGroup = ({ groupKey, tasks }: GroupByProps) => {
  const [expanded, setExpanded] = useToggle(true);

  const { colors, dropDown, label } = useBoardViewGroupKeySpecific({
    groupedKey: groupKey,
    expanded,
    setExpanded,
    selectAll: () => {},
  });

  return (
    <Flex
      className="min-w-[280px] max-w-[280px] shrink-0 rounded-md min-h-0 h-full max-h-full pb-1 bg-secondary-hover"
      direction="flex-col"
      data-component="CardGroup"
      style={{
        background: colors?.background,
        border: `1px solid ${colors?.borderColor}`,
      }}
    >
      <Flex justifyContent="justify-between">
        <Flex
          justifyContent="justify-between"
          className="p-1"
          alignItems="items-center"
          gap="gap-2"
        >
          <Flex
            className="rounded-sm p-1"
            style={{
              background: colors?.tagBackground,
            }}
          >
            <Text variant="heading-1" style={{ color: colors?.textColor }}>
              {label ?? "N.A."}
            </Text>
          </Flex>
          <Text variant="subtext">{tasks.length}</Text>
        </Flex>
        <Flex className="">{dropDown}</Flex>
      </Flex>

      <Flex
        direction="flex-col"
        className="mt-1 overflow-y-auto px-1"
        gap="gap-1"
      >
        <Flex direction="flex-col" gap="gap-2">
          {tasks.map((task) => (
            <TaskItem task={task} />
          ))}
          <Button variant="outline" size="sm" icon={Plus}>
            Add task
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardGroup;
