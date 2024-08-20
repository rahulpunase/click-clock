import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Badge } from "./Badge";
import { Flex } from "@/design-system/layout/Flex/Flex";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Badge",
  component: Badge,
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
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalBadge: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex gap="gap-4">
        <Badge>Click me</Badge>
        <Badge variant="secondary">Click me</Badge>
        <Badge variant="outline">Click me</Badge>
        <Badge variant="destructive">Click me</Badge>
      </Flex>
    );
  },
};

export const SelectableBadge: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex gap="gap-4">
        <Badge isSelectable>Click me</Badge>
        <Badge variant="outline" isSelectable>
          I am not selected
        </Badge>
        <Badge variant="outline" isSelectable isSelected>
          I am selected
        </Badge>
      </Flex>
    );
  },
};

export const DeletableBadge: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex gap="gap-4">
        <Badge isDeletable>Click me</Badge>
        <Badge variant="secondary" isDeletable>
          Click me
        </Badge>
        <Badge variant="outline" isDeletable>
          Click me
        </Badge>
        <Badge variant="destructive" isDeletable>
          I am a badge with long text
        </Badge>
        <Badge variant="destructive" isDeletable stretch>
          I am a badge with long text
        </Badge>
      </Flex>
    );
  },
};
