import { Flex } from "@/design-system/layout/Flex/Flex";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";
import { Select } from "@/design-system/ui/Select/Select";

import FieldTrigger from "@/common/components/tasks/EditableFields/FieldTrigger";
import { useGetMembers } from "@/common/hooks/db/organizations/queries/useGetMembers";
import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";

import { Doc, Id } from "@db/_generated/dataModel";

type AssigneeFieldType = {
  task: Doc<"tasks">;
};
const AssigneeField = ({ task }: AssigneeFieldType) => {
  const { data: orgMembers } = useGetMembers();
  const { mutate: updateTask } = useUpdateTask();

  const onChange = (assignee: Id<"users">) => {
    updateTask({
      taskId: task._id,
      data: {
        assignee,
      },
    });
  };

  const selectedUser = orgMembers.find(
    ({ user }) => user?._id === task.assignee,
  );

  console.log({ selectedUser });

  return (
    <Flex className="w-full">
      <Select onValueChange={onChange}>
        <Select.Trigger className="border-none p-0 h-auto">
          <Select.Value>
            <FieldTrigger value={selectedUser?.user?.name} />
          </Select.Value>
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
