import { ListTodo } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import EmptyState from "@/design-system/patterns/EmptyState";
import PageLook from "@/design-system/patterns/PageLook";
import { Text } from "@/design-system/ui/Text/Text";

import DataList from "@/common/components/tasks/DataList";
import EditableFields from "@/common/components/tasks/EditableFields";
import { useGetListById } from "@/common/hooks/db/lists/queries/useGetListById";
import { useGetTaskById } from "@/common/hooks/db/tasks/queries/useGetTaskById";

const TaskDetails = ({ taskId }: { taskId: string | undefined }) => {
  const { data: taskDetails } = useGetTaskById({
    taskId,
  });

  const { data: listDetails } = useGetListById({
    listId: taskDetails?.listId,
  });

  if (!taskDetails || !listDetails) {
    return <EmptyState />;
  }

  return (
    <PageLook>
      <PageLook.Header icon={ListTodo}>
        <PageLook.Header.Heading>Task Details</PageLook.Header.Heading>
      </PageLook.Header>
      <PageLook.Content>
        <PageLook.Content.Main noPadding className="p-4 w-full">
          <Flex direction="flex-col" gap="gap-2">
            <Flex>
              <Text
                as="div"
                contentEditable
                className="outline-none"
                variant="heading-4"
              >
                {taskDetails.name ?? ""}
              </Text>
            </Flex>
            <DataList listDetails={listDetails} taskDetails={taskDetails} />
          </Flex>
        </PageLook.Content.Main>
      </PageLook.Content>
    </PageLook>
  );
};

export default TaskDetails;
