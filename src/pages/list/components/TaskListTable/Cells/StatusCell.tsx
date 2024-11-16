import { CellContext } from "@tanstack/react-table";
import { Circle } from "lucide-react";

import { AllSelectorIcons } from "@/design-system/ui/IconSelector/AllIcons";

import MultiSelectComboCell from "@/pages/list/components/TaskListTable/Cells/common/MultiSelectComboCell";
import { PartialTaskDataObject } from "@/pages/list/components/TaskListTable/defaultColumns";
import { useListContext } from "@/pages/list/context/ListContext";

import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";

const StatusCell = ({
  cell,
}: CellContext<PartialTaskDataObject, PartialTaskDataObject["status"]>) => {
  const { list } = useListContext();
  const defaultValue = cell.getValue();
  const taskId = cell.row.original._id;
  const { mutate: updateTask } = useUpdateTask();

  const statusObj = list?.statuses?.find((val) => val.label === defaultValue);

  const onTaskUpdate = (value: string) => {
    updateTask({
      taskId,
      data: {
        status: value,
      },
    });
  };

  return (
    <MultiSelectComboCell
      cellName="status"
      mappedData={
        list?.statuses?.map((item) => ({
          label: item.label,
          value: item.label,
        })) ?? []
      }
      icon={
        AllSelectorIcons[statusObj?.icon as keyof typeof AllSelectorIcons]
          ?.icon ?? Circle
      }
      iconColor={statusObj?.color}
      onUpdate={(value) => onTaskUpdate(value)}
      defaultValue={defaultValue}
    />
  );
};

export default StatusCell;
