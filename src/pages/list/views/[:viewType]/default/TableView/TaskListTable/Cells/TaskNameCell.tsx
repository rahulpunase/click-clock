import { zodResolver } from "@hookform/resolvers/zod";
import { CellContext } from "@tanstack/react-table";
import { Pencil, X } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/design-system/ui/Form/form";
import { Input } from "@/design-system/ui/Input/Input";

import CellWrapper from "@/pages/list/views/[:viewType]/default/TableView/TaskListTable/Cells/CellWrapper";
import { PartialTaskDataObject } from "@/pages/list/views/[:viewType]/default/TableView/TaskListTable/utils";

import { useUpdateTaskById } from "@/common/hooks/db/tasks/mutations/useUpdateTaskById";

const schema = z.object({
  name: z.string().min(1, { message: "Please provide some text value" }),
});

type FormSchema = z.infer<typeof schema>;

const TaskNameCell = ({
  cell,
}: CellContext<PartialTaskDataObject, PartialTaskDataObject["name"]>) => {
  const defaultValue = cell.getValue();
  const taskId = cell.getContext().row.original._id;

  const [isEditing, setIsEditing] = useState(false);

  const { mutate: updateTaskById } = useUpdateTaskById();

  const formId = useId();

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValue,
    },
  });

  const onEditClick = () => {
    form.setValue("name", defaultValue ?? "");
    setIsEditing(true);
  };

  const onSubmit = (value: FormSchema) => {
    updateTaskById(
      {
        name: value.name,
        taskId,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  return (
    <CellWrapper>
      <Flex gap="gap-2" className="w-full">
        {isEditing && (
          <Flex flex="flex-1">
            {
              <Flex className="w-full">
                <Form {...form}>
                  <form
                    className="w-full"
                    id={formId}
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormControl>
                      <FormField
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <Input
                              className="min-w-56"
                              autoFocus
                              size="small"
                              {...field}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormControl>
                  </form>
                </Form>
              </Flex>
            }
          </Flex>
        )}
        {!isEditing && (
          <Flex flex="flex-1">
            {<Flex alignItems="items-center">{defaultValue}</Flex>}
          </Flex>
        )}
        <Flex>
          {!isEditing && (
            <IconButton
              onClick={() => onEditClick()}
              variant="ghost"
              size="xSmallIcon"
              icon={Pencil}
              tooltip="Edit task name"
            />
          )}
          {isEditing && (
            <Flex gap="gap-2">
              <Button
                size="xsm"
                form={formId}
                disabled={!form.formState.isValid}
              >
                Save
              </Button>
              <IconButton
                onClick={() => setIsEditing(false)}
                variant="ghost"
                size="xSmallIcon"
                icon={X}
                tooltip="Cancel"
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </CellWrapper>
  );
};

export default TaskNameCell;
