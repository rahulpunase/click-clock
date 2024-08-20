import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { List } from "./List";
import { ListItem } from "./List.Item";
import { Flex } from "@/design-system/layout/Flex/Flex";

const { Label, MenuDropdown } = ListItem;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/List",
  component: List,
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
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalList: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex className="w-[300px]">
        <List>
          <ListItem icon="PersonStanding">
            <ListItem.Label>Hello - 1</ListItem.Label>
          </ListItem>
          <ListItem>
            <ListItem.Label>Hello - 2</ListItem.Label>
          </ListItem>
          <ListItem>
            <ListItem.Label>Item with badge</ListItem.Label>
            <ListItem.Badge variant="default">Badge</ListItem.Badge>
          </ListItem>
          <ListItem icon="User">
            <ListItem.Label>With Everything</ListItem.Label>
            <ListItem.Badge variant="outline">Badge</ListItem.Badge>
            <MenuDropdown>
              <MenuDropdown.Content>
                <MenuDropdown.MenuLabel>Board</MenuDropdown.MenuLabel>
                <MenuDropdown.MenuSeparator />
                <MenuDropdown.MenuItem>
                  <MenuDropdown.MenuItem.LeftIcon icon="Plus" />
                  <MenuDropdown.MenuItem.Label>
                    Create board
                  </MenuDropdown.MenuItem.Label>
                </MenuDropdown.MenuItem>
                <MenuDropdown.MenuItem variant="destructive">
                  <MenuDropdown.MenuItem.LeftIcon icon="Trash" />
                  <MenuDropdown.MenuItem.Label>
                    Delete board
                  </MenuDropdown.MenuItem.Label>
                </MenuDropdown.MenuItem>
              </MenuDropdown.Content>
            </MenuDropdown>
          </ListItem>
        </List>
      </Flex>
    );
  },
};

export const NormalListItem: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex className="w-[300px]">
        <ListItem>
          <ListItem.Label>Hello - 1</ListItem.Label>
        </ListItem>
      </Flex>
    );
  },
};

export const ExpandableListItem: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex className="w-[300px]">
        <List>
          <ListItem>
            <ListItem.Label>List 1</ListItem.Label>
            <ListItem.MenuDropdown>
              <ListItem.MenuDropdown.Content></ListItem.MenuDropdown.Content>
            </ListItem.MenuDropdown>
            <ListItem.ExpandableList>
              <ListItem>
                <ListItem.Label>List 1 - Item 1</ListItem.Label>
              </ListItem>
            </ListItem.ExpandableList>
          </ListItem>
          <ListItem icon="Presentation">
            <ListItem.Label>List 2</ListItem.Label>
            <ListItem.ExpandableList>
              <ListItem>
                <ListItem.Label>List 2 - Item 1</ListItem.Label>
              </ListItem>
              <ListItem icon="WholeWord">
                <ListItem.Label>List 2 - Item 2</ListItem.Label>
                <ListItem.ExpandableList>
                  <ListItem>
                    <ListItem.Label>The last expanded</ListItem.Label>
                  </ListItem>
                </ListItem.ExpandableList>
              </ListItem>
            </ListItem.ExpandableList>
          </ListItem>
        </List>
      </Flex>
    );
  },
};

export const ListItemWithMenu: Story = {
  args: {
    variant: "default",
  },
  render: () => {
    return (
      <Flex className="w-[300px]">
        <ListItem as="div">
          <Label>Hello - 1</Label>
          <MenuDropdown>
            <MenuDropdown.Content>
              <MenuDropdown.MenuLabel>Board</MenuDropdown.MenuLabel>
              <MenuDropdown.MenuSeparator />
              <MenuDropdown.MenuItem>
                <MenuDropdown.MenuItem.LeftIcon icon="Plus" />
                <MenuDropdown.MenuItem.Label>
                  Create board
                </MenuDropdown.MenuItem.Label>
              </MenuDropdown.MenuItem>
              <MenuDropdown.MenuItem variant="destructive">
                <MenuDropdown.MenuItem.LeftIcon icon="Trash" />
                <MenuDropdown.MenuItem.Label>
                  Delete board
                </MenuDropdown.MenuItem.Label>
              </MenuDropdown.MenuItem>
            </MenuDropdown.Content>
          </MenuDropdown>
        </ListItem>
      </Flex>
    );
  },
};
