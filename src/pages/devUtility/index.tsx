import { zodResolver } from "@hookform/resolvers/zod";
import { TextCursor } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import FieldComposer from "@/design-system/patterns/FieldComposer";
import { Form, FormField } from "@/design-system/ui/Form/form";

const DataListInputComponent = () => {
  const schema = z.object({
    name: z.string(),
  });
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
  });
  return (
    <FieldComposer>
      <FieldComposer.DataList
        label="Input field"
        icon={TextCursor}
        value={form.watch("name")}
      >
        <Form {...form}>
          <form className="w-full">
            <FormField
              name="name"
              render={({ field }) => (
                <FieldComposer.Input {...field} placeholder="Empty" />
              )}
            />
          </form>
        </Form>
      </FieldComposer.DataList>
    </FieldComposer>
  );
};

const options = [
  {
    label: "Apples",
    value: "apples",
  },
  {
    label: "Oranges",
    value: "oranges",
  },
  {
    label: "Pineapple",
    value: "pineapple",
  },
  {
    label: "Kiwi",
    value: "kiwi",
  },
];

const DataListSelectComponent = () => {
  const schema = z.object({
    fruits: z.string(),
  });
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      fruits: "",
    },
    resolver: zodResolver(schema),
  });

  const displayValue = options.find(
    (item) => item.value === form.watch("fruits"),
  );

  return (
    <FieldComposer>
      <FieldComposer.DataList
        label="Select field"
        value={displayValue?.label ?? ""}
      >
        <Form {...form}>
          <form className="w-full">
            <FormField
              name="fruits"
              render={({ field }) => (
                <FieldComposer.Select
                  onValueChange={field.onChange}
                  value={field.value}
                  placeholder="Empty"
                  options={options}
                  name="fruits"
                />
              )}
            />
          </form>
        </Form>
      </FieldComposer.DataList>
    </FieldComposer>
  );
};

const DevUtilityPage = () => {
  return (
    <Flex gap="gap-4" direction="flex-col" className="p-4">
      <DataListInputComponent />
      {/* <DataListSelectComponent /> */}
    </Flex>
  );
};

export default DevUtilityPage;
