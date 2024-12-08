import { Flex } from "@/design-system/layout/Flex/Flex";

import PriorityUpdate from "@/common/components/tasks/taskUpdateEntities/PriorityUpdate";
import StatusUpdate from "@/common/components/tasks/taskUpdateEntities/StatusUpdate";

import { Doc } from "@db/_generated/dataModel";

type Props = {
  listDetails: Doc<"lists">;
  taskDetails: Doc<"tasks">;
};

const TaskItemDataList = ({ listDetails, taskDetails }: Props) => {
  return (
    <Flex direction="flex-col" gap="gap-2">
      <StatusUpdate
        type="datalist"
        label="Status"
        list={listDetails}
        defaultValue={taskDetails.status}
        taskId={taskDetails._id}
      />
      <PriorityUpdate
        type="datalist"
        label="Priority"
        list={listDetails}
        defaultValue={taskDetails.priority}
        taskId={taskDetails._id}
      />
    </Flex>
  );
};

export default TaskItemDataList;
