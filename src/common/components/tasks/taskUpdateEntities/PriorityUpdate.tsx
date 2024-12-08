import { useCallback, useMemo } from "react";

import FieldComposer from "@/design-system/patterns/FieldComposer";

import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";

import { Doc, Id } from "@db/_generated/dataModel";

type Props = {
  type: "cell" | "datalist";
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
  const { mutate: updateTask } = useUpdateTask();
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
