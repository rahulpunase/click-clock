import { Flex } from "@/design-system/layout/Flex/Flex";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";

import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";

import { Doc } from "@db/_generated/dataModel";

type StatusProps = {
  task: Doc<"tasks">;
  statuses?: Doc<"lists">["statuses"];
};
const StatusField = ({ statuses, task }: StatusProps) => {
  const { mutate: updateTask } = useUpdateTask();

  const onChange = (values: string[]) => {
    updateTask({
      taskId: task._id,
      data: {
        status: values[0],
      },
    });
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
          selected={[task.status ?? ""]}
          setSelected={onChange}
          isSingleSelect
          placeholder="No status available"
        />
      </Flex>
    </Flex>
  );
};

export default StatusField;
