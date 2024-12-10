import { useCallback, useMemo, useRef, useState } from "react";

import FieldComposer from "@/design-system/patterns/FieldComposer";
import Icon from "@/design-system/ui/Icon/Icon";
import { getIconForIconSelector } from "@/design-system/ui/IconSelector/AllIcons";

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
  const [state, setStatus] = useState(defaultValue);
  const ref = useRef(defaultValue);

  const options = useMemo(
    () =>
      list?.statuses?.map((item) => ({
        label: item.label,
        value: item.label,
      })) ?? [],
    [list?.statuses],
  );

  const defaultStatus = list?.statuses?.find((val) => val.label === state);

  const onTaskUpdate = useCallback(
    (value?: string) => {
      setStatus(value);
      updateTask(
        {
          taskId,
          data: {
            status: value,
          },
        },
        {
          onSuccess: () => {
            ref.current = value;
          },
          onError: () => {
            setStatus(ref.current);
          },
        },
      );
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
