import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Text } from "@/design-system/ui/Text/Text";

import { Popover } from "./Popover";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Popover",
  component: Popover,
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
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalPopover: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex gap="gap-4">
        <Popover>
          <Popover.Trigger asChild>
            <Button size="sm">Open me</Button>
          </Popover.Trigger>
          <Popover.Content avoidCollisions side="top">
            <Popover.Content.Header>
              <Popover.Content.Header.Title>
                I am a popover heading
              </Popover.Content.Header.Title>
              <Popover.Content.Header.SubText>
                Some popover are good, some are bad
              </Popover.Content.Header.SubText>
            </Popover.Content.Header>
            <Popover.Content.Main>
              <Text as="p" variant="body-1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </Text>
            </Popover.Content.Main>
          </Popover.Content>
        </Popover>
      </Flex>
    );
  },
};

export const WithAnchorPopover: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex gap="gap-4">
        <Popover open>
          <Popover.Anchor
            style={{
              left: 100 + "px",
            }}
            className="size-4 fixed bg-fuchsia-600"
          ></Popover.Anchor>
          <Popover.Content avoidCollisions side="top">
            <Popover.Content.Header>
              <Popover.Content.Header.Title>
                I am a popover heading
              </Popover.Content.Header.Title>
              <Popover.Content.Header.SubText>
                Some popover are good, some are bad
              </Popover.Content.Header.SubText>
            </Popover.Content.Header>
            <Popover.Content.Main>
              <Text as="p" variant="body-1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </Text>
            </Popover.Content.Main>
          </Popover.Content>
        </Popover>
      </Flex>
    );
  },
};
