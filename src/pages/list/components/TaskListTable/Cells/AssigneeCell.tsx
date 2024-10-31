import { CellContext } from "@tanstack/react-table";
import { User2 } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Avatar } from "@/design-system/ui/Avatar/Avatar";
import Icon from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";

import MultiSelectComboCell from "@/pages/list/components/TaskListTable/Cells/common/MultiSelectComboCell";
import { PartialTaskDataObject } from "@/pages/list/components/TaskListTable/defaultColumns";

import { useGetMembers } from "@/common/hooks/db/organizations/queries/useGetMembers";
import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";

import { Id } from "@db/_generated/dataModel";

const AssigneeCell = ({
  cell,
}: CellContext<PartialTaskDataObject, PartialTaskDataObject["assignee"]>) => {
  const defaultValue = cell.getValue();
  const { data: orgMembers } = useGetMembers();
  const { mutate: updateTask } = useUpdateTask();

  const defaultLabel = orgMembers.find(
    (memberItem) => memberItem.user?._id === defaultValue,
  );
  const taskId = cell.row.original._id;

  const onTaskUpdate = (value: string) => {
    updateTask({
      taskId,
      data: {
        assignee: value as Id<"users">,
      },
    });
  };

  return (
    <MultiSelectComboCell
      cellName="status"
      mappedData={
        orgMembers.map((memberItem) => ({
          label: memberItem.user?.name ?? "N.A.",
          value: memberItem.member.userId,
        })) ?? []
      }
      onUpdate={(valueSet) => onTaskUpdate(valueSet[0])}
      defaultValue={defaultLabel?.user?._id}
      defaultRender={
        <Flex alignItems="items-center" gap="gap-2" className="max-w-full">
          <Avatar className="size-4">
            <Avatar.AvatarFallback>
              <Icon className="size-4" IconName={User2} />
            </Avatar.AvatarFallback>
          </Avatar>
          <Text wrap variant="body-1">
            {defaultLabel?.user?.name ?? "NA"}
          </Text>
        </Flex>
      }
    />
  );
};

export default AssigneeCell;
