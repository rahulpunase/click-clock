import React, { useCallback, useMemo } from "react";

import FieldComposer from "@/design-system/patterns/FieldComposer";
import { Avatar } from "@/design-system/ui/Avatar/Avatar";

import { useGetMembers } from "@/common/hooks/db/organizations/queries/useGetMembers";
import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";
import { getNameCaps } from "@/common/utils/misc-utils";

import { Id } from "@db/_generated/dataModel";

type Props = {
  defaultValue?: string;
  taskId: Id<"tasks">;
  label?: string;
  type: "cell" | "datalist";
};
const AssigneeUpdate = ({ defaultValue, taskId, label = "", type }: Props) => {
  const { data: orgMembers } = useGetMembers();

  const { mutate: updateTask } = useUpdateTask();

  const defaultLabel = orgMembers.find(
    (memberItem) => memberItem.user?._id === defaultValue,
  )?.user?.name;

  const onTaskUpdate = useCallback(
    (value?: string) =>
      updateTask({
        taskId,
        data: {
          assignee: value as Id<"users">,
        },
      }),
    [updateTask],
  );

  const options = useMemo(
    () =>
      orgMembers.map((memberItem) => ({
        label: memberItem.user?.name ?? "N.A.",
        value: memberItem.member.userId,
      })) ?? [],
    [orgMembers],
  );

  return (
    <FieldComposer>
      <FieldComposer.Field
        label={label}
        type={type}
        editable
        value={defaultLabel}
        valueType="string"
        leftContent={
          <Avatar>
            <Avatar.AvatarImage />
            <Avatar.AvatarFallback className="size-6 text-xs bg-secondary">
              {getNameCaps(defaultLabel)}
            </Avatar.AvatarFallback>
          </Avatar>
        }
      >
        <FieldComposer.Select
          onValueChange={onTaskUpdate}
          value={defaultValue}
          options={options}
          placeholder="No status"
          name="status"
        />
      </FieldComposer.Field>
    </FieldComposer>
  );
};

export default AssigneeUpdate;
