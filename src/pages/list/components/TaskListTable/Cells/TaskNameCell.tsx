import { zodResolver } from "@hookform/resolvers/zod";
import { CellContext } from "@tanstack/react-table";
import { Copy, Link2, SquareArrowOutUpRight, X } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Cell from "@/design-system/patterns/Cell";
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

import { PartialTaskDataObject } from "@/pages/list/components/TaskListTable/defaultColumns";

import { useUpdateTaskById } from "@/common/hooks/db/tasks/mutations/useUpdateTaskById";

const schema = z.object({
  name: z.string().min(1, { message: "Please provide some text value" }),
});

type FormSchema = z.infer<typeof schema>;

const TaskNameCell = ({
  cell,
}: CellContext<PartialTaskDataObject, PartialTaskDataObject["name"]>) => {
  const defaultValue = cell.getValue();
  const taskId = cell.getContext().row.original.taskId;

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
    <Cell
      name="name"
      isEditable
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      defaultValue={defaultValue}
      link={`task/${taskId}`}
      moreActions={
        <>
          <IconButton
            variant="ghost"
            size="xs"
            icon={Link2}
            tooltip="Copy task link"
          />
          <Link to={`/task/${taskId}`}>
            <IconButton
              variant="ghost"
              size="xs"
              icon={SquareArrowOutUpRight}
              tooltip="Open task in new page"
            />
          </Link>
        </>
      }
    >
      <Cell.EditingContent>
        <Flex className="w-full" gap="gap-2">
          <Flex flex="flex-1">
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
                      <FormItem className="flex-1">
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
          <Flex gap="gap-2">
            <Button size="xsm" form={formId} disabled={!form.formState.isValid}>
              Save
            </Button>
            <IconButton
              onClick={() => setIsEditing(false)}
              variant="ghost"
              size="xs"
              icon={X}
              tooltip="Cancel"
            />
          </Flex>
        </Flex>
      </Cell.EditingContent>
    </Cell>
  );
};

export default TaskNameCell;
