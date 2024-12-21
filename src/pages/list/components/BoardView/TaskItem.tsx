import {
  CirclePlus,
  Ellipsis,
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
import AssigneeUpdate from "@/common/components/tasks/taskUpdateEntities/AssigneeUpdate";
import PriorityUpdate from "@/common/components/tasks/taskUpdateEntities/PriorityUpdate";
import StatusUpdate from "@/common/components/tasks/taskUpdateEntities/StatusUpdate";

import { Doc } from "@db/_generated/dataModel";

type TaskItemProps = {
  task: Doc<"tasks">;
};
const TaskItem = ({ task }: TaskItemProps) => {
  const { list } = useListContext();
  const location = useLocation();
  return (
    <Card className="flex-none">
      <Card.Content className="p-2 relative group/task-card">
        <Flex className="w-full" direction="flex-col">
          <Link to={`task/${task._id}`} state={{ location }}>
            <Flex className="mb-2" direction="flex-col">
              <Text variant="heading-1">{task.name ?? ""}</Text>
              <Text variant="subtext">In {list?.name ?? ""}</Text>
            </Flex>
          </Link>
          <Flex gap="gap-1" direction="flex-col">
            <AssigneeUpdate
              type="field"
              taskId={task._id}
              defaultValue={task.assignee}
            />
            {list && (
              <StatusUpdate
                type="field"
                defaultValue={task.status}
                list={list}
                taskId={task._id}
              />
            )}
            {list && (
              <PriorityUpdate
                type="field"
                defaultValue={task.priority}
                list={list}
                taskId={task._id}
              />
            )}
          </Flex>
        </Flex>
        <Flex className="absolute border border-accent-border z-20 p-1 rounded-sm top-2 shadow-md right-2 bg-background invisible group-hover/task-card:visible">
          <IconButton variant="ghost" size="xs" icon={SquareArrowOutUpRight} />
          <IconButton variant="ghost" size="xs" icon={CirclePlus} />
          <IconButton variant="ghost" size="xs" icon={Pencil} />
          <IconButton variant="ghost" size="xs" icon={Ellipsis} />
        </Flex>
      </Card.Content>
    </Card>
  );
};

export default TaskItem;
