import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";

import { DropdownMenu } from "./DropdownMenu";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
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
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalList: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex className="">
        <DropdownMenu modal>
          <DropdownMenu.Trigger asChild>
            <IconButton variant="secondary" size="smallIcon" icon="ellipsis" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <DropdownMenu.Item>
                <DropdownMenu.Item.Label>Team</DropdownMenu.Item.Label>
                <DropdownMenu.Item.LeftIcon icon="panel-right-close" />
              </DropdownMenu.Item>
              <DropdownMenu.Item disabled>
                <DropdownMenu.Item.Label>New Team</DropdownMenu.Item.Label>
                <DropdownMenu.Item.LeftIcon icon="list-plus" />
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <DropdownMenu.Item.Label>Users</DropdownMenu.Item.Label>
                <DropdownMenu.Item.LeftIcon icon="user" />
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <DropdownMenu.Item.Label>Github</DropdownMenu.Item.Label>
              <DropdownMenu.Item.LeftIcon icon="github" />
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <DropdownMenu.Item.Label>LinkedIn</DropdownMenu.Item.Label>
              <DropdownMenu.Item.LeftIcon icon="linkedin" />
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item variant="destructive">
              <DropdownMenu.Item.Label>Delete Profile</DropdownMenu.Item.Label>
              <DropdownMenu.Item.LeftIcon icon="trash" />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </Flex>
    );
  },
};
