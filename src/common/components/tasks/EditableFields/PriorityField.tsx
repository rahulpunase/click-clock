import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";

import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";

import { Doc } from "@db/_generated/dataModel";

type PriorityFieldType = {
  task: Doc<"tasks">;
  priorities: Doc<"lists">["priorities"];
};
const PriorityField = ({ task, priorities }: PriorityFieldType) => {
  const { mutate: mutateUpdateStatus } = useUpdateTask();

  const onChange = (values: string[]) => {
    mutateUpdateStatus({
      taskId: task._id,
      data: {
        priority: values[0],
      },
    });
  };
  return (
    <Flex className="w-full">
      <Flex className="rounded-sm hover:bg-secondary-hover">
        <MultiSelectCombo
          data={
            priorities?.map((item) => ({
              label: item.label,
              value: item.label,
            })) ?? []
          }
          selected={[task.priority ?? ""]}
          setSelected={onChange}
          isSingleSelect
          placeholder="No status available"
        />
      </Flex>
    </Flex>
  );
};

export default PriorityField;
