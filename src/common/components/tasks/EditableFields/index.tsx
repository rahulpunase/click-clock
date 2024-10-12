import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";

import FieldWrapper from "@/common/components/tasks/EditableFields/FieldWrapper";
import Status from "@/common/components/tasks/EditableFields/Status";

const EditableFields = () => {
  return (
    <Flex className="py-3 min-w-[40%]">
      <Flex direction="flex-col" gap="gap-2" flex="flex-1">
        <FieldWrapper label="Status: " child={<Status />} />
      </Flex>
      <Flex direction="flex-col" gap="gap-2"></Flex>
    </Flex>
  );
};

export default EditableFields;
