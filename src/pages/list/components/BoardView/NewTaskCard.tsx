import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Card } from "@/design-system/ui/Card/Card";
import { Form, FormField } from "@/design-system/ui/Form/form";
import { Input } from "@/design-system/ui/Input/Input";

import { useListContext } from "@/pages/list/context/ListContext";

import AssigneeField from "@/common/components/tasks/EditableFields/AssigneeField";
import PriorityField from "@/common/components/tasks/EditableFields/PriorityField";
import StatusField from "@/common/components/tasks/EditableFields/StatusField";
import { useCreateTask } from "@/common/hooks/db/tasks/mutations/useCreateTask";
import { GroupListBy } from "@/common/types";

import { Id } from "@db/_generated/dataModel";

const schema = z.object({
  name: z.string().min(1, {
    message: "Field is required",
  }),
  assignee: z.string().optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
});

const NewTaskCard = ({ groupKey }: { groupKey?: string }) => {
  const { isAddingTask, list, listUserData, contextIds, setIsAddingTask } =
    useListContext();
  const groupBy = listUserData?.groupBy;
  const { mutate: createTask, isPending: isCreatingNewTask } = useCreateTask();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (groupBy !== undefined) {
      // @ts-expect-error matches with groupBy
      form.setValue(groupBy, groupKey);
    }
  }, [form]);

  if (!isAddingTask) {
    return null;
  }

  if (isAddingTask.groupId !== groupKey) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof schema>) => {
    if (contextIds.spaceId && list?._id) {
      createTask(
        {
          name: values.name,
          listId: list?._id,
          spaceId: contextIds.spaceId as Id<"spaces">,
          status: values.status,
          assignee: values.assignee as Id<"users">,
          priority: values.priority,
        },
        {
          onSettled: () => {
            form.reset();
          },
        },
      );
    }
  };

  return (
    <Card className="flex-none animate-in fade-in">
      <Card.Content className="p-2 relative">
        <Flex className="w-full" direction="flex-col">
          <Form {...form}>
            <form id="newTask" onSubmit={form.handleSubmit(onSubmit)}>
              <Flex className="mb-2" direction="flex-row" gap="gap-1">
                <FormField
                  name="name"
                  render={({ field }) => (
                    <Input
                      placeholder="Add task details"
                      size="small"
                      autoFocus
                      {...field}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsAddingTask({});
                        }
                      }}
                    />
                  )}
                />
                <Button
                  form="newTask"
                  type="submit"
                  size="xsm"
                  disabled={!form.formState.isValid}
                  isLoading={isCreatingNewTask}
                >
                  Save
                </Button>
              </Flex>
              <AssigneeField
                disabled={groupBy === GroupListBy.Assignee}
                defaultValue={
                  groupBy === GroupListBy.Assignee
                    ? groupKey
                    : form.watch("assignee")
                }
                placeholder="Assignee"
                onValChange={(val) => form.setValue("assignee", val)}
              />
              <StatusField
                disabled={groupBy === GroupListBy.Status}
                defaultValue={
                  groupBy === GroupListBy.Status
                    ? groupKey
                    : form.watch("status")
                }
                placeholder="Status"
                statuses={list?.statuses}
                onValChange={(val) => form.setValue("status", val)}
              />
              <PriorityField
                defaultValue={
                  groupBy === GroupListBy.Priority
                    ? groupKey
                    : form.watch("priority")
                }
                placeholder="Priority"
                priorities={list?.priorities}
                disabled={groupBy === GroupListBy.Priority}
                onValChange={(val) => form.setValue("priority", val)}
              />
            </form>
          </Form>
        </Flex>
      </Card.Content>
    </Card>
  );
};

export default NewTaskCard;
