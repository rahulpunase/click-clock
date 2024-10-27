import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Form, FormField, FormMessage } from "@/design-system/ui/Form/form";

import { StatusItem } from "@/common/types";

type StatusFieldProps = {
  groupKey: string;
  onCancel: () => void;
  onSuccessfullyFieldAdded: (statusKey: string, item: StatusItem) => void;
  error: string | null;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

const StatusField = ({
  onCancel,
  groupKey,
  onSuccessfullyFieldAdded,
  error,
}: StatusFieldProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSuccessfullyFieldAdded(groupKey, {
      color: "#808080",
      icon: "",
      label: values.name,
      type: groupKey,
      deletable: true,
    });
  };

  useEffect(() => {
    if (error) {
      form.setError("name", {
        message: error ?? "",
      });
    }
  }, [error, form]);

  return (
    <Flex gap="gap-2" alignItems="items-center">
      <Form {...form}>
        <form
          className="flex flex-row items-center gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Flex>
            <FormField
              name="name"
              render={({ field }) => (
                <input
                  {...field}
                  autoFocus
                  className="outline-none h-full font-light text-sm w-52"
                  placeholder="Add status"
                />
              )}
            />
            <FormMessage>{error}</FormMessage>
          </Flex>
          <Flex gap="gap-1" alignItems="items-center">
            <Button size="xsm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="xsm" type="submit" disabled={!form.formState.isValid}>
              Save
            </Button>
          </Flex>
        </form>
      </Form>
    </Flex>
  );
};

export default StatusField;
