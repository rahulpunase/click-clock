import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Card } from "@/design-system/ui/Card/Card";
import { Text } from "@/design-system/ui/Text/Text";

import { Tabs } from "./Tabs";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Tabs",
  component: Tabs,
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
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalBadge: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex gap="gap-4" className="w-[400px]">
        <Tabs defaultValue="account">
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="password">Password</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="account">
            <Card>
              <Card.Header>
                <Card.Header.Title>Account</Card.Header.Title>
                <Card.Header.Subtext>
                  You'll find your information here.
                </Card.Header.Subtext>
              </Card.Header>
              <Card.Content>
                <Text as="p" variant="body-1">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters
                </Text>
              </Card.Content>
            </Card>
          </Tabs.Content>
          <Tabs.Content value="password">
            <Card>
              <Card.Header>
                <Card.Header.Title>Password</Card.Header.Title>
                <Card.Header.Subtext>
                  Enter your password here.
                </Card.Header.Subtext>
              </Card.Header>
              <Card.Content>
                <Text as="p" variant="body-1">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia
                </Text>
              </Card.Content>
              <Card.Footer>
                <Card.Footer.RightButton>Visit</Card.Footer.RightButton>
              </Card.Footer>
            </Card>
          </Tabs.Content>
        </Tabs>
      </Flex>
    );
  },
};
