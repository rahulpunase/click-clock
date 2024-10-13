import { ListTodo } from "lucide-react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import EmptyState from "@/design-system/patterns/EmptyState";
import PageLook from "@/design-system/patterns/PageLook";
import { Text } from "@/design-system/ui/Text/Text";

import EditableFields from "@/common/components/tasks/EditableFields";
import { useGetTaskById } from "@/common/hooks/db/tasks/queries/useGetTaskById";

const TaskDetails = ({ taskId }: { taskId: string | undefined }) => {
  const { data: taskDetails } = useGetTaskById({
    taskId,
  });

  if (!taskDetails) {
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
            <Flex></Flex>
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
            <Flex>
              <EditableFields list={taskDetails.list} />
            </Flex>
          </Flex>
        </PageLook.Content.Main>
      </PageLook.Content>
    </PageLook>
  );
};

export default TaskDetails;
