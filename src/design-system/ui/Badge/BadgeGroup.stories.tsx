import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { BadgeGroup } from "./BadgeGroup";
import { Badge } from "./badge";
import { Flex } from "@/design-system/layout/Flex/Flex";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/BadgeGroup",
  component: BadgeGroup,
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
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const NormalBadgeGroup: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <BadgeGroup>
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
      </BadgeGroup>
    );
  },
};

export const ExpandableBadgeGroup: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex>
        <BadgeGroup limit={4}>
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
        </BadgeGroup>
      </Flex>
    );
  },
};
