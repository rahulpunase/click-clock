import { CellContext } from "@tanstack/react-table";
import { Pencil } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";

import { useListContext } from "@/pages/list/context/ListContext";
import CellWrapper from "@/pages/list/views/[:viewType]/default/TableView/TaskListTable/Cells/CellWrapper";
import { PartialTaskDataObject } from "@/pages/list/views/[:viewType]/default/TableView/TaskListTable/utils";

import { useUpdateTask } from "@/common/hooks/db/tasks/mutations/useUpdateTask";

const StatusCell = ({
  cell,
}: CellContext<PartialTaskDataObject, PartialTaskDataObject["status"]>) => {
  const { list } = useListContext();
  const defaultValue = cell.getValue();
  const taskId = cell.row.original._id;
  const { mutate: updateTask } = useUpdateTask();

  const onTaskUpdate = (value: string[]) => {
    updateTask({
      taskId,
      status: value[0],
    });
  };
  return (
    <MultiSelectCombo
      data={
        list?.statuses?.map((item) => ({
          label: item.label,
          value: item.label,
        })) ?? []
      }
      selected={[defaultValue ?? ""]}
      setSelected={onTaskUpdate}
      trigger={
        <CellWrapper>
          <Flex
            className="group/statusCell"
            alignItems="items-center"
            gap="gap-2"
          >
            {defaultValue}
            <IconButton
              className="invisible group-hover/statusCell:visible"
              variant="ghost"
              size="xSmallIcon"
              icon={Pencil}
            />
          </Flex>
        </CellWrapper>
      }
      isSingleSelect
    />
  );
};

export default StatusCell;
