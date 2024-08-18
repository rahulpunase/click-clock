import { Flex } from "@/design-system/layout/Flex/Flex";
import { ComponentProps, ReactNode } from "react";
import { Text } from "../Text/Text";
import { extractChildren } from "@/design-system/utils/utils";
import { IconButton } from "../Button/IconButton";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";

type ListItemProps = {
  children: ReactNode;
  size?: "sm" | "default";
};

const MenuDropdown = DropdownMenu;

const Label = ({ ...props }: ComponentProps<typeof Text>) => {
  return <Text variant="body-1" {...props} />;
};

Label.displayName = "Label";

const ListItem = ({ size, children }: ListItemProps) => {
  const extractedChildren = extractChildren(children, {
    label: Label,
    menuDropdown: MenuDropdown,
  });

  const menuDropDownContent = extractChildren(
    extractedChildren.menuDropdown?.props.children,
    {
      // DropdownMenuContent comes from DropdownMenuContent from DropdownMenu.tsx
      content: DropdownMenu.Content,
    }
  );

  return (
    <Flex
      className="bg-secondary rounded-md py-1 px-3 w-full group/item"
      alignItems="items-center"
      justifyContent="justify-between"
      gap="gap-8"
    >
      <Flex>{extractedChildren.label}</Flex>
      <Flex className="invisible group-hover/item:visible">
        {menuDropDownContent.content && (
          <MenuDropdown>
            <MenuDropdown.Trigger asChild>
              <IconButton
                icon="Ellipsis"
                small
                variant="secondary"
                className="aria-expanded:visible"
              />
            </MenuDropdown.Trigger>
            {menuDropDownContent.content}
          </MenuDropdown>
        )}
      </Flex>
    </Flex>
  );
};

ListItem.displayName = "ListItem";
ListItem.Label = Label;
ListItem.MenuDropdown = MenuDropdown;

export default ListItem;
