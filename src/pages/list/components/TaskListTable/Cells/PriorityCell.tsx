import { CellContext } from "@tanstack/react-table";
import { Flag } from "lucide-react";

import MultiSelectComboCell from "@/pages/list/components/TaskListTable/Cells/common/MultiSelectComboCell";
import { PartialTaskDataObject } from "@/pages/list/components/TaskListTable/defaultColumns";
import { useListContext } from "@/pages/list/context/ListContext";

import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";

const PriorityCell = ({
  cell,
}: CellContext<PartialTaskDataObject, PartialTaskDataObject["status"]>) => {
  const { list } = useListContext();
  const defaultValue = cell.getValue();
  const taskId = cell.row.original._id;
  const { mutate: updateTask } = useUpdateTask();

  const priorityObj = list?.priorities?.find(
    (val) => val.label === defaultValue,
  );

  const onTaskUpdate = (value: string) => {
    updateTask({
      taskId,
      data: {
        priority: value,
      },
    });
  };

  return (
    <MultiSelectComboCell
      cellName="status"
      mappedData={
        list?.priorities?.map((item) => ({
          label: item.label,
          value: item.label,
        })) ?? []
      }
      iconColor={priorityObj?.color}
      icon={Flag}
      onUpdate={(valueSet) => onTaskUpdate(valueSet[0])}
      defaultValue={defaultValue}
    />
  );
};

export default PriorityCell;
