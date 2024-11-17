import { Flag } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Select } from "@/design-system/ui/Select/Select";

import FieldTrigger from "@/common/components/tasks/FieldTrigger";
import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";
import { EditableFieldsAdditionalProps } from "@/common/types";

import { Doc } from "@db/_generated/dataModel";

type PriorityFieldType = {
  task?: Doc<"tasks">;
  priorities: Doc<"lists">["priorities"];
} & EditableFieldsAdditionalProps;
const PriorityField = ({
  task,
  priorities,
  defaultValue,
  disabled,
  placeholder,
  onValChange,
}: PriorityFieldType) => {
  const { mutate: mutateUpdateStatus } = useUpdateTask();

  const onChange = (priority: string) => {
    if (onValChange) {
      return onValChange(priority);
    }
    if (!task) {
      return;
    }
    mutateUpdateStatus({
      taskId: task._id,
      data: {
        priority,
      },
    });
  };

  const selectedValue = task?.priority ?? defaultValue;

  return (
    <Flex className="w-full">
      <Select
        onValueChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
      >
        <Select.Trigger className="border-none p-0 h-auto">
          <FieldTrigger
            placeholder={placeholder}
            value={selectedValue}
            icon={Flag}
          />
        </Select.Trigger>
        <Select.Content>
          {priorities?.map((priority) => (
            <Select.Item value={priority.label}>{priority?.label}</Select.Item>
          )) ?? []}
        </Select.Content>
      </Select>
    </Flex>
  );
};

export default PriorityField;
