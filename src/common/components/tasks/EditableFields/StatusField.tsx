import { update } from "lodash-es";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { AllSelectorIcons } from "@/design-system/ui/IconSelector/AllIcons";
import { Select } from "@/design-system/ui/Select/Select";

import FieldTrigger from "@/common/components/tasks/FieldTrigger";
import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";
import { EditableFieldsAdditionalProps } from "@/common/types";

import { Doc } from "@db/_generated/dataModel";

type StatusProps = {
  task?: Doc<"tasks">;
  statuses?: Doc<"lists">["statuses"];
} & EditableFieldsAdditionalProps;
const StatusField = ({
  statuses,
  task,
  disabled,
  defaultValue,
  placeholder,
  onValChange,
}: StatusProps) => {
  const { mutate: mutateUpdateStatus } = useUpdateTask();

  const selectedTask = task?.status ?? defaultValue;
  const statusSelector = statuses?.find((item) => item.label === selectedTask);

  const onChange = (status: string) => {
    if (onValChange) {
      return onValChange(status);
    }
    if (!task) {
      return;
    }
    mutateUpdateStatus({
      taskId: task._id,
      data: {
        status: status,
      },
    });
  };

  return (
    <Flex className="w-full">
      <Select onValueChange={onChange} disabled={disabled}>
        <Select.Trigger className="border-none p-0 h-auto">
          <FieldTrigger
            icon={
              AllSelectorIcons[
                statusSelector?.icon as keyof typeof AllSelectorIcons
              ]?.icon
            }
            value={selectedTask}
            placeholder={placeholder}
          />
        </Select.Trigger>
        <Select.Content clearable onClear={() => onChange("")}>
          {statuses?.map((status) => (
            <Select.Item value={status.label}>{status?.label}</Select.Item>
          )) ?? []}
        </Select.Content>
      </Select>
    </Flex>
  );
};

export default StatusField;
