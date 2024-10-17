import { Flex } from "@/design-system/layout/Flex/Flex";

import FieldWrapper from "@/common/components/tasks/EditableFields/FieldWrapper";
import StatusField from "@/common/components/tasks/EditableFields/StatusField";

import { Doc } from "@db/_generated/dataModel";

type EditableFieldsProps = {
  task: Doc<"tasks">;
  list?: Doc<"lists">;
};
const EditableFields = ({ list, task }: EditableFieldsProps) => {
  return (
    <Flex className="py-3 min-w-[40%]">
      <Flex direction="flex-col" gap="gap-2" flex="flex-1">
        <FieldWrapper
          label="Status: "
          child={<StatusField task={task} statuses={list?.statuses} />}
        />
      </Flex>
      <Flex direction="flex-col" gap="gap-2"></Flex>
    </Flex>
  );
};

export default EditableFields;
