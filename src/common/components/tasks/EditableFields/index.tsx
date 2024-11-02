import { PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Text } from "@/design-system/ui/Text/Text";

import AssigneeField from "@/common/components/tasks/EditableFields/AssigneeField";
import PriorityField from "@/common/components/tasks/EditableFields/PriorityField";
import StatusField from "@/common/components/tasks/EditableFields/StatusField";

import { Doc } from "@db/_generated/dataModel";

const TableAsWrapper = (props: PropsWithChildren) => (
  <table className="w-full">
    <tbody>{props.children}</tbody>
  </table>
);

const RowAsWrapper = ({
  label,
  children,
}: PropsWithChildren<{
  label: string;
}>) => (
  <tr>
    <td className="w-full">
      <Text variant="body-1">{label}</Text>
    </td>
    <td className="py-1">{children}</td>
  </tr>
);

type EditableFieldsProps = {
  task: Doc<"tasks">;
  list?: Doc<"lists">;
};
const EditableFields = ({ list, task }: EditableFieldsProps) => {
  return (
    <Flex className="py-3 min-w-[60%]">
      <Flex
        direction="flex-row"
        gap="gap-8"
        flex="flex-1"
        justifyContent="justify-between"
      >
        <TableAsWrapper>
          <RowAsWrapper label="Status: ">
            <StatusField task={task} statuses={list?.statuses} />
          </RowAsWrapper>
          <RowAsWrapper label="Priority: ">
            <PriorityField task={task} priorities={list?.priorities} />
          </RowAsWrapper>
        </TableAsWrapper>

        <TableAsWrapper>
          <RowAsWrapper label="Assignee: ">
            <AssigneeField task={task} />
          </RowAsWrapper>
        </TableAsWrapper>
      </Flex>
    </Flex>
  );
};

export default EditableFields;
