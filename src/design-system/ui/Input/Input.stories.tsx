import type { Meta, StoryObj } from "@storybook/react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import IconSelector from "@/design-system/ui/IconSelector/IconSelector";
import { Input } from "@/design-system/ui/Input/Input";
import { Textarea } from "@/design-system/ui/Textarea/Textarea";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const NormalInputs: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex direction="flex-col" gap="gap-2">
        <Input />
        <Input icon="mail" />
        <Input icon="mail" placeholder="Enter mail id" />
        <Input icon="mail" placeholder="Enter mail id" loading />
        <Textarea />
      </Flex>
    );
  },
};
