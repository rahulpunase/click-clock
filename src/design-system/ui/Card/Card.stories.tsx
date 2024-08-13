import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Card } from "./Card";
import { Flex } from "@/design-system/layout/Flex/Flex";

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
            <Card.Header.SubText>
              Deploy your new project in one-click.
            </Card.Header.SubText>
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
      <Flex>
        <Card isCollapsible isSelectable>
          <Card.Header>
            <Card.Header.Title>Create project</Card.Header.Title>
            <Card.Header.SubText>
              Deploy your new project in one-click.
            </Card.Header.SubText>
          </Card.Header>
          <Card.Content>Awesome content</Card.Content>
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
            <Card.Header.SubText>
              Deploy your new project in one-click.
            </Card.Header.SubText>
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
            <Card.Header.SubText>
              Deploy your new project in one-click.
            </Card.Header.SubText>
          </Card.Header>
          <Card.Content>Awesome content</Card.Content>
        </Card>
      </Flex>
    );
  },
};
