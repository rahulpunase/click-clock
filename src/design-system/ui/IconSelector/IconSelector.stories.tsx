import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { Text } from "../Text/Text";
import IconSelector from "@/design-system/ui/IconSelector/IconSelector";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/IconSelector",
  component: IconSelector,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const NormalIconSelector: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex>
        <IconSelector />
      </Flex>
    );
  },
};
