import { useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";

import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";

import { Doc } from "@db/_generated/dataModel";

type StatusProps = {
  task: Doc<"tasks">;
  statuses?: Doc<"lists">["statuses"];
};
const StatusField = ({ statuses, task }: StatusProps) => {
  const [selected, setSelected] = useState<string[]>([task.status ?? ""]);

  const {
    updateStatus: { mutate: mutateUpdateStatus },
  } = useUpdateTask();

  const onStatusChange = (statuses: string[]) => {
    mutateUpdateStatus({
      taskId: task._id,
      status: statuses[0],
    });

    setSelected(statuses);
  };

  return (
    <Flex className="w-full">
      <Flex className="rounded-sm hover:bg-secondary-hover">
        <MultiSelectCombo
          data={
            statuses?.map((item) => ({
              label: item.label,
              value: item.label,
            })) ?? []
          }
          selected={selected}
          setSelected={onStatusChange}
          isSingleSelect
        />
      </Flex>
    </Flex>
  );
};

export default StatusField;
