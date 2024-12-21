import { ComponentProps, useCallback, useMemo } from "react";

import FieldComposer from "@/design-system/patterns/FieldComposer";
import Field from "@/design-system/patterns/FieldComposer/Field";
import Icon from "@/design-system/ui/Icon/Icon";
import { getIconForIconSelector } from "@/design-system/ui/IconSelector/AllIcons";

import { useListContext } from "@/pages/list/context/ListContext";

import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";

import { Doc, Id } from "@db/_generated/dataModel";

type Props = {
  type: ComponentProps<typeof Field>["type"];
  label?: string;
  defaultValue?: string;
  list?: Doc<"lists">;
  taskId?: Id<"tasks">;
};
const StatusUpdate = ({
  type,
  label = "",
  list,
  defaultValue,
  taskId,
}: Props) => {
  const { contextIds } = useListContext();
  const { mutate: updateTask } = useUpdateTask({
    listId: list?._id as Id<"lists">,
    spaceId: contextIds.spaceId as Id<"spaces">,
  });

  const options = useMemo(
    () =>
      list?.statuses?.map((item) => ({
        label: item.label,
        value: item.label,
      })) ?? [],
    [list?.statuses],
  );

  const defaultStatus = list?.statuses?.find(
    (val) => val.label === defaultValue,
  );

  const onTaskUpdate = useCallback(
    (value?: string) => {
      updateTask({
        taskId,
        data: {
          status: value,
        },
      });
    },
    [updateTask],
  );

  return (
    <FieldComposer>
      <FieldComposer.Field
        label={label}
        type={type}
        editable
        value={defaultStatus?.label}
        valueType="string"
        leftContent={
          <Icon
            className="size-4"
            IconName={getIconForIconSelector(defaultStatus?.icon)}
          />
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

export default StatusUpdate;
