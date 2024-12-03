import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import { Calendar, CopyCheck, MousePointer, TextCursor } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flex } from "@/design-system/layout/Flex/Flex";
import FieldComposer from "@/design-system/patterns/FieldComposer";
import MultilineInputField from "@/design-system/patterns/FieldComposer/fieldComponents/MultilineInputField";
import SelectField from "@/design-system/patterns/FieldComposer/fieldComponents/SelectField";
import PageLook from "@/design-system/patterns/PageLook";
import { DatePicker } from "@/design-system/ui/DatePicker/DatePicker";
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
      name: "Filled",
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
                <FieldComposer.DataList.Input {...field} placeholder="Empty" />
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

const DataListMultilineInputFieldComponent = () => {
  const schema = z.object({
    name: z.string(),
  });
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: "Filled",
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
        <FieldComposer.DataList.MultilineInput placeholder="Empty" />
      </FieldComposer.DataList>
    </FieldComposer>
  );
};

export const DataListMultilineInput = {
  args: {},
  render: () => {
    return <DataListMultilineInputFieldComponent />;
  },
};

export const DataList = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex direction="flex-col" gap="gap-8">
        <FieldComposer>
          <FieldComposer.DataList label="Input field" icon={TextCursor}>
            <FieldComposer.DataList.Input placeholder="Empty" />
          </FieldComposer.DataList>
        </FieldComposer>

        <FieldComposer>
          <FieldComposer.DataList label="Single select" icon={MousePointer}>
            <FieldComposer.DataList.Select
              placeholder="Empty"
              options={options}
              value="apples"
            />
          </FieldComposer.DataList>
        </FieldComposer>

        <FieldComposer>
          <FieldComposer.DataList label="Multi select" icon={CopyCheck}>
            <MultiSelectCombo options={options} onValueChange={() => {}} />
          </FieldComposer.DataList>
        </FieldComposer>

        <FieldComposer>
          <FieldComposer.DataList label="Date picker" icon={Calendar}>
            <DatePicker />
          </FieldComposer.DataList>
        </FieldComposer>

        <FieldComposer>
          <FieldComposer.DataList label="Date picker" icon={Calendar}>
            <MultilineInputField />
          </FieldComposer.DataList>
        </FieldComposer>
      </Flex>
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
