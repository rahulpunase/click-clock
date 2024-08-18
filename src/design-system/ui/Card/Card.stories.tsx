import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Card } from "./Card";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { Text } from "../Text/Text";
import { Tabs } from "../Tabs/Tabs";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Card",
  component: Card,
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
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const NormalCard: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex>
        <Card>
          <Card.Header>
            <Card.Header.Title>Create project</Card.Header.Title>
            <Card.Header.Subtext>
              Deploy your new project in one-click, right?
            </Card.Header.Subtext>
          </Card.Header>
          <Card.Content>Awesome content</Card.Content>
        </Card>
      </Flex>
    );
  },
};

export const WithEverythingCard: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Card isCollapsible isSelectable>
        <Card.Header inBadgeContent="Badge">
          <Card.Header.Title>Create project</Card.Header.Title>
          <Card.Header.Subtext>
            Deploy your new project in one-click.
          </Card.Header.Subtext>
          <Card.Header.CornerAction icon="X" />
        </Card.Header>
        <Card.Image src="https://placehold.co/600x400" />
        <Card.Content>
          <Text variant="heading-1">UI/UX Review Check</Text>
          <Text variant="body-1" className="pt-2">
            Because it's about motivating the doers. Because I'm here to follow
            my dreams and inspire others.
          </Text>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.LeftButton>Cancel</Card.Footer.LeftButton>
          <Card.Footer.RightButton>Active</Card.Footer.RightButton>
        </Card.Footer>
      </Card>
    );
  },
};

export const WithEverythingHorizontalCard: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex>
        <Card isCollapsible isSelectable orientation="horizontal">
          <Card.Header inBadgeContent="Badge">
            <Card.Header.Title>Create project</Card.Header.Title>
            <Card.Header.Subtext>
              Deploy your new project in one-click.
            </Card.Header.Subtext>
          </Card.Header>
          <Card.Image src="https://placehold.co/200x300" />
          <Card.Content>
            <Text variant="heading-1">UI/UX Review Check</Text>
            <Text variant="body-1" className="pt-2">
              Because it's about motivating the doers. Because I'm here to
              follow my dreams and inspire others.
            </Text>
            <Text variant="body-1" className="pt-2">
              Because it's about motivating the doers. Because I'm here to
              follow my dreams and inspire others.
            </Text>
          </Card.Content>
          <Card.Footer>
            <Card.Footer.LeftButton>Cancel</Card.Footer.LeftButton>
            <Card.Footer.RightButton>Active</Card.Footer.RightButton>
          </Card.Footer>
        </Card>
      </Flex>
    );
  },
};

export const SelectableCard: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex>
        <Card isSelectable>
          <Card.Header>
            <Card.Header.Title>Create project</Card.Header.Title>
            <Card.Header.Subtext>
              Deploy your new project in one-click.
            </Card.Header.Subtext>
          </Card.Header>
          <Card.Content>Awesome content</Card.Content>
        </Card>
      </Flex>
    );
  },
};

export const CollapsibleCard: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex>
        <Card isCollapsible>
          <Card.Header>
            <Card.Header.Title>Create project</Card.Header.Title>
            <Card.Header.Subtext>
              Deploy your new project in one-click.
            </Card.Header.Subtext>
          </Card.Header>
          <Card.Content>Awesome content</Card.Content>
        </Card>
      </Flex>
    );
  },
};

export const CardWithTabs: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex>
        <Card isCollapsible>
          <Card.Content>
            <Tabs defaultValue="account">
              <Tabs.List>
                <Tabs.Trigger value="account" className="pt-0">
                  Account
                </Tabs.Trigger>
                <Tabs.Trigger value="password" className="pt-0">
                  Password
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="account">
                <Text as="p" variant="body-1">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters
                </Text>
              </Tabs.Content>
              <Tabs.Content value="password">
                <Text as="p" variant="body-1">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia
                </Text>
              </Tabs.Content>
            </Tabs>
          </Card.Content>
        </Card>
      </Flex>
    );
  },
};
