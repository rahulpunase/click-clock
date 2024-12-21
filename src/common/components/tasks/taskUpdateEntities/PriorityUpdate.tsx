import { ComponentProps, useCallback, useMemo } from "react";

import FieldComposer from "@/design-system/patterns/FieldComposer";
import Field from "@/design-system/patterns/FieldComposer/Field";

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

const PriorityUpdate = ({
  label = "",
  type,
  defaultValue,
  list,
  taskId,
}: Props) => {
  const { contextIds } = useListContext();
  const { mutate: updateTask } = useUpdateTask({
    listId: list?._id as Id<"lists">,
    spaceId: contextIds.spaceId as Id<"spaces">,
  });
  const options = useMemo(
    () =>
      list?.priorities?.map((item) => ({
        label: item.label,
        value: item.label,
      })) ?? [],
    [list?.priorities],
  );

  const defaultLabel = list?.priorities?.find(
    (val) => val.label === defaultValue,
  )?.label;

  const onTaskUpdate = useCallback(
    (value?: string) =>
      updateTask({
        taskId,
        data: {
          priority: value,
        },
      }),
    [updateTask],
  );

  return (
    <FieldComposer>
      <FieldComposer.Field
        label={label}
        type={type}
        editable
        value={defaultLabel}
        valueType="string"
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

export default PriorityUpdate;
