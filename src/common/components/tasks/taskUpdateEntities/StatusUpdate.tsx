import { useCallback } from "react";

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
const StatusUpdate = ({
  type,
  label = "",
  list,
  defaultValue,
  taskId,
}: Props) => {
  const { mutate: updateTask } = useUpdateTask();

  const options =
    list?.statuses?.map((item) => ({
      label: item.label,
      value: item.label,
    })) ?? [];

  const defaultLabel = list?.statuses?.find(
    (val) => val.label === defaultValue,
  )?.label;

  const onTaskUpdate = useCallback(
    (value?: string) =>
      updateTask({
        taskId,
        data: {
          status: value,
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

export default StatusUpdate;
