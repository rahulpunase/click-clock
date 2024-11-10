import { Flex } from "@/design-system/layout/Flex/Flex";
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
  return (
    <Card>
      <Card.Content className="p-2">
        <Flex className="rounded-md w-full" direction="flex-col">
          <Flex className="mb-2" direction="flex-col">
            <Text variant="heading-1">{task.name ?? ""}</Text>
            <Text variant="subtext">In {list?.name ?? ""}</Text>
          </Flex>
          <Flex gap="gap-2" direction="flex-col">
            <AssigneeField task={task} />
            <StatusField task={task} statuses={list?.statuses} />
            <PriorityField task={task} priorities={list?.priorities} />
          </Flex>
        </Flex>
      </Card.Content>
    </Card>
  );
};

export default TaskItem;
