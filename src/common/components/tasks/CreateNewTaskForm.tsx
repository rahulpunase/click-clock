import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/design-system/ui/Form/form";
import { Input } from "@/design-system/ui/Input/Input";

import { useCreateTask } from "@/common/hooks/db/tasks/mutations/useCreateTask";

import { Id } from "@db/_generated/dataModel";

type CreateNewTaskFormProps = {
  listId: Id<"lists">;
  spaceId: Id<"spaces">;
};
const CreateNewTaskForm = ({ listId, spaceId }: CreateNewTaskFormProps) => {
  const form = useForm();

  const { mutate, isPending } = useCreateTask();

  const onSubmit = useCallback(() => {
    mutate({
      listId,
      name: "",
      spaceId,
    });
  }, [mutate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CreateNewTaskForm;
