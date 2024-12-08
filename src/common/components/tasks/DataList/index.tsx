import { Flex } from "@/design-system/layout/Flex/Flex";

import StatusUpdate from "@/common/components/tasks/taskUpdateEntities/StatusUpdate";

import { Doc } from "@db/_generated/dataModel";

type Props = {
  listDetails: Doc<"lists">;
  taskDetails: Doc<"tasks">;
};

const TaskItemDataList = ({ listDetails, taskDetails }: Props) => {
  return (
    <Flex>
      <StatusUpdate
        type="datalist"
        label="Status"
        list={listDetails}
        defaultValue={taskDetails.status}
        taskId={taskDetails._id}
      />
    </Flex>
  );
};

export default TaskItemDataList;
