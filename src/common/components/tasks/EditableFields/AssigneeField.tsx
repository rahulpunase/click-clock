import { User } from "lucide-react";
import { useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Select } from "@/design-system/ui/Select/Select";

import FieldTrigger from "@/common/components/tasks/FieldTrigger";
import { useGetMembers } from "@/common/hooks/db/organizations/queries/useGetMembers";
import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";
import { EditableFieldsAdditionalProps } from "@/common/types";
import { getNameCaps } from "@/common/utils/misc-utils";

import { Doc, Id } from "@db/_generated/dataModel";

type AssigneeFieldType = {
  task?: Doc<"tasks">;
} & EditableFieldsAdditionalProps;
const AssigneeField = ({
  task,
  defaultValue,
  disabled,
  placeholder,
  onValChange,
}: AssigneeFieldType) => {
  const { data: orgMembers } = useGetMembers();
  const { mutate: updateTask } = useUpdateTask();

  const onChange = (assignee: Id<"users">) => {
    if (onValChange) {
      return onValChange?.(assignee);
    }
    if (!task) {
      return;
    }
    updateTask({
      taskId: task?._id,
      data: {
        assignee,
      },
    });
  };

  const assignee = task?.assignee ?? defaultValue;

  const selectedUser = orgMembers.find(({ user }) => user?._id === assignee);

  return (
    <Flex className="w-full">
      <Select onValueChange={onChange} name="assignee" disabled={disabled}>
        <Select.Trigger className="border-none p-0 h-auto">
          <FieldTrigger
            placeholder={placeholder}
            icon={User}
            value={selectedUser?.user?.name}
            avatar={{
              image: "",
              fallback: getNameCaps(selectedUser?.user?.name),
            }}
          />
        </Select.Trigger>
        <Select.Content>
          {orgMembers?.map(({ user }) => (
            <Select.Item value={user?._id ?? ""}>{user?.name}</Select.Item>
          )) ?? []}
        </Select.Content>
      </Select>
    </Flex>
  );
};

export default AssigneeField;
