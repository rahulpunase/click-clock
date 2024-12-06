import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import { CopyCheck, TextCursor } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import FieldComposer from "@/design-system/patterns/FieldComposer";
import SelectField from "@/design-system/patterns/FieldComposer/fieldComponents/SelectField";
import PageLook from "@/design-system/patterns/PageLook";
import { Card } from "@/design-system/ui/Card/Card";
import { Form, FormField } from "@/design-system/ui/Form/form";
import { Input } from "@/design-system/ui/Input/Input";
import MultiSelectCombo from "@/design-system/ui/MultiSelectCombo/MultiSelectCombo";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Patterns/FieldComposer",
  component: FieldComposer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  //   argTypes: {
  //     variant: "input"
  //     size: "default"
  //   },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn(), children: <span>Button</span> },
} satisfies Meta<typeof PageLook>;

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

export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

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
        <FieldComposer.TextField>
          <Form {...form}>
            <form className="w-full">
              <FormField
                name="name"
                render={({ field }) => (
                  <FieldComposer.DataList.Input
                    {...field}
                    placeholder="Empty"
                  />
                )}
              />
            </form>
          </Form>
        </FieldComposer.TextField>
      </FieldComposer.DataList>
    </FieldComposer>
  );
};

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
                <FieldComposer.DataList.Select
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

export const DataListInput = {
  args: {},
  render: () => {
    return <DataListInputComponent />;
  },
};

export const DataList = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Card>
        <Card.Content className="w-[500px]">
          <Flex direction="flex-col" gap="gap-8" className="w-full">
            <DataListInputComponent />
            {/* <DataListSelectComponent />

            <FieldComposer>
              <FieldComposer.DataList label="Multi select" icon={CopyCheck}>
                <MultiSelectCombo options={options} onValueChange={() => {}} />
              </FieldComposer.DataList>
            </FieldComposer> */}
          </Flex>
        </Card.Content>
      </Card>
    );
  },
};

export const Cell = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex direction="flex-row" gap="gap-8">
        <FieldComposer>
          <FieldComposer.Cell>
            <SelectField options={options} />
          </FieldComposer.Cell>
        </FieldComposer>

        <FieldComposer>
          <FieldComposer.Cell>
            <Input />
          </FieldComposer.Cell>
        </FieldComposer>
      </Flex>
    );
  },
};
