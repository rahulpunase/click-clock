import { Flex } from "@/design-system/layout/Flex/Flex";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";

import { useGetMembers } from "@/common/hooks/db/organizations/queries/useGetMembers";
import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";

import { Doc, Id } from "@db/_generated/dataModel";

type AssigneeFieldType = {
  task: Doc<"tasks">;
};
const AssigneeField = ({ task }: AssigneeFieldType) => {
  const { data: orgMembers } = useGetMembers();
  const { mutate: updateTask } = useUpdateTask();

  //   const defaultLabel = orgMembers.find(
  //     (memberItem) => memberItem.user?._id === task.assignee,
  //   );

  const onChange = (assignees: string[]) => {
    updateTask({
      taskId: task._id,
      data: {
        assignee: assignees[0] as Id<"users">,
      },
    });
  };
  return (
    <Flex className="w-full">
      <Flex className="rounded-sm hover:bg-secondary-hover">
        <MultiSelectCombo
          data={
            orgMembers?.map(({ user }) => ({
              label: user?.name ?? "N.A.",
              value: user?._id ?? "",
            })) ?? []
          }
          selected={[task.assignee ?? ""]}
          setSelected={onChange}
          isSingleSelect
          placeholder="No status available"
        />
      </Flex>
    </Flex>
  );
};

export default AssigneeField;
