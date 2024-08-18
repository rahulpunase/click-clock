import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { DropdownMenu } from "./DropdownMenu";
import { IconButton } from "../Button/IconButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/DropdownMenu",
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
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <IconButton variant="secondary" small icon="Ellipsis" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.MenuLabel>My Account</DropdownMenu.MenuLabel>
            <DropdownMenu.MenuSeparator />
            <DropdownMenu.MenuGroup>
              <DropdownMenu.MenuItem>
                <DropdownMenu.MenuItem.Label>Team</DropdownMenu.MenuItem.Label>
                <DropdownMenu.MenuItem.LeftIcon icon="PanelRightClose" />
              </DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem disabled>
                <DropdownMenu.MenuItem.Label>
                  New Team
                </DropdownMenu.MenuItem.Label>
                <DropdownMenu.MenuItem.LeftIcon icon="ListPlus" />
              </DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem>
                <DropdownMenu.MenuItem.Label>Users</DropdownMenu.MenuItem.Label>
                <DropdownMenu.MenuItem.LeftIcon icon="User" />
              </DropdownMenu.MenuItem>
            </DropdownMenu.MenuGroup>
            <DropdownMenu.MenuSeparator />
            <DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem.Label>Github</DropdownMenu.MenuItem.Label>
              <DropdownMenu.MenuItem.LeftIcon icon="Github" />
            </DropdownMenu.MenuItem>
            <DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem.Label>
                LinkedIn
              </DropdownMenu.MenuItem.Label>
              <DropdownMenu.MenuItem.LeftIcon icon="Linkedin" />
            </DropdownMenu.MenuItem>
            <DropdownMenu.MenuSeparator />
            <DropdownMenu.MenuItem variant="destructive">
              <DropdownMenu.MenuItem.Label>
                Delete Profile
              </DropdownMenu.MenuItem.Label>
              <DropdownMenu.MenuItem.LeftIcon icon="Trash" />
            </DropdownMenu.MenuItem>
          </DropdownMenu.Content>
        </DropdownMenu>
      </Flex>
    );
  },
};
