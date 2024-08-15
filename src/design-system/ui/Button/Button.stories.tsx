import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Button";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "./IconButton";
import { Text } from "../Text/Text";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalButtons: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex gap="gap-8" direction="flex-col">
        <Flex gap="gap-6" direction="flex-col">
          <Text variant="heading-1">Normal buttons</Text>
          <Flex gap="gap-8">
            <Button variant="default">Default Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
            <Button variant="outline">Outline Button</Button>
          </Flex>
        </Flex>

        <Flex gap="gap-6" direction="flex-col">
          <Text variant="heading-1">Button with icons</Text>
          <Flex gap="gap-8">
            <Button variant="default" icon="AlignVerticalDistributeEnd">
              Default Button
            </Button>
            <Button variant="secondary" icon="Airplay">
              Secondary Button
            </Button>
            <Button
              variant="destructive"
              icon="AlignHorizontalDistributeCenter"
            >
              Destructive Button
            </Button>
            <Button variant="ghost" icon="Ghost">
              Ghost Button
            </Button>
            <Button variant="link" icon="Link">
              Link Button
            </Button>
            <Button variant="outline" icon="BookMarked">
              Outline Button
            </Button>
          </Flex>
        </Flex>

        <Flex gap="gap-6" direction="flex-col">
          <Text variant="heading-1">Small Buttons</Text>
          <Flex gap="gap-8">
            <Button
              size="sm"
              variant="default"
              icon="AlignVerticalDistributeEnd"
            >
              Default Button
            </Button>
            <Button size="sm" variant="secondary" icon="Airplay">
              Secondary Button
            </Button>
            <Button
              size="sm"
              variant="destructive"
              icon="AlignHorizontalDistributeCenter"
            >
              Destructive Button
            </Button>
            <Button size="sm" variant="ghost" icon="Ghost">
              Ghost Button
            </Button>
            <Button size="sm" variant="link" icon="Link">
              Link Button
            </Button>
            <Button size="sm" variant="outline" icon="BookMarked">
              Outline Button
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  },
};

export const IconButtons: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex gap="gap-8">
        <IconButton icon="AlignVerticalDistributeEnd" variant="default" />
        <IconButton icon="AlignVerticalDistributeEnd" variant="secondary" />
        <IconButton icon="AlignVerticalDistributeEnd" variant="destructive" />
        <IconButton icon="AlignVerticalDistributeEnd" variant="ghost" />
        <IconButton icon="AlignVerticalDistributeEnd" variant="link" />
        <IconButton icon="AlignVerticalDistributeEnd" variant="outline" />
      </Flex>
    );
  },
};
