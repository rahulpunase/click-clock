import {
  CirclePlus,
  Ellipsis,
  EllipsisVertical,
  Pencil,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Card } from "@/design-system/ui/Card/Card";
import { Text } from "@/design-system/ui/Text/Text";

import { useListContext } from "@/pages/list/context/ListContext";

import AssigneeField from "@/common/components/tasks/EditableFields/AssigneeField";
import PriorityField from "@/common/components/tasks/EditableFields/PriorityField";
import StatusField from "@/common/components/tasks/EditableFields/StatusField";

import { Doc } from "@db/_generated/dataModel";

type TaskItemProps = {
  task: Doc<"tasks">;
};
const TaskItem = ({ task }: TaskItemProps) => {
  const { list } = useListContext();
  const location = useLocation();
  return (
    <Link to={`task/${task._id}`} state={{ location }}>
      <Card className="flex-none">
        <Card.Content className="p-2 relative group/task-card">
          <Flex className="w-full" direction="flex-col">
            <Flex className="mb-2" direction="flex-col">
              <Text variant="heading-1">{task.name ?? ""}</Text>
              <Text variant="subtext">In {list?.name ?? ""}</Text>
            </Flex>
            <Flex gap="gap-1" direction="flex-col">
              <AssigneeField task={task} />
              <StatusField task={task} statuses={list?.statuses} />
              <PriorityField task={task} priorities={list?.priorities} />
            </Flex>
          </Flex>
          <Flex className="absolute border border-accent-border z-20 p-1 rounded-sm top-2 shadow-md right-2 bg-background invisible group-hover/task-card:visible">
            <IconButton
              variant="ghost"
              size="xSmallIcon"
              icon={SquareArrowOutUpRight}
            />
            <IconButton variant="ghost" size="xSmallIcon" icon={CirclePlus} />
            <IconButton variant="ghost" size="xSmallIcon" icon={Pencil} />
            <IconButton variant="ghost" size="xSmallIcon" icon={Ellipsis} />
          </Flex>
        </Card.Content>
      </Card>
    </Link>
  );
};

export default TaskItem;
