import { Flex } from "@/design-system/layout/Flex/Flex";
import React, { ComponentProps, ReactNode, useState } from "react";
import { Text } from "../Text/Text";
import { cn, extractChildren } from "@/design-system/utils/utils";
import { IconButton } from "../Button/IconButton";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { icons } from "lucide-react";
import { List } from "./List";
import { Badge } from "../Badge/badge";

type ConditionalType<T extends keyof Pick<HTMLElementTagNameMap, "a" | "div">> =
  T extends "a"
    ? ComponentProps<"a">
    : T extends "div"
      ? ComponentProps<"div">
      : never;

type ListItemProps<T extends keyof Pick<HTMLElementTagNameMap, "a" | "div">> = {
  children: ReactNode;
  size?: "sm" | "default";
  as?: keyof Pick<HTMLElementTagNameMap, "a" | "div">;
  icon?: keyof typeof icons;
} & ConditionalType<T>;

const MenuDropdown = DropdownMenu;

const Label = ({ ...props }: ComponentProps<typeof Text>) => {
  return <Text variant="body-1" {...props} />;
};

Label.displayName = "Label";

const ListItem = Object.assign(
  function <T extends keyof Pick<HTMLElementTagNameMap, "a" | "div">>({
    children,
    as = "div",
    icon,
    ...props
  }: ListItemProps<T>) {
    const [expanded, setExpanded] = useState(false);
    const extractedChildren = extractChildren(children, {
      label: Label,
      menuDropdown: MenuDropdown,
      expandableList: List,
      badge: Badge,
    });

    const menuDropDownContent = extractChildren(
      extractedChildren.menuDropdown?.props.children,
      {
        // DropdownMenuContent comes from DropdownMenuContent from DropdownMenu.tsx
        content: DropdownMenu.Content,
      }
    );

    const LucidIcon = icon ? icons[icon] : null;

    const Children = React.cloneElement(
      <>
        <Flex
          alignItems="items-center"
          justifyContent="justify-between"
          className="w-full h-[40px] py-2 px-3 rounded-md bg-secondary group/list-item"
          aria-label="list-item"
        >
          <Flex gap="gap-2" alignItems="items-center">
            <div>
              {LucidIcon && (
                <Flex
                  className={cn(
                    "size-6",
                    extractedChildren.expandableList &&
                      "group-hover/list-item:hidden"
                  )}
                  justifyContent="justify-center"
                  alignItems="items-center"
                >
                  <LucidIcon className="size-4" />
                </Flex>
              )}
              {extractedChildren.expandableList && (
                <Flex className="hidden group-hover/list-item:block">
                  <IconButton
                    icon={expanded ? "ChevronUp" : "ChevronDown"}
                    small
                    variant="secondary"
                    onClick={() => setExpanded(!expanded)}
                  />
                </Flex>
              )}
            </div>
            <Flex>{extractedChildren.label}</Flex>
            {extractedChildren.badge}
          </Flex>
          <Flex className="invisible group-hover/list-item:visible">
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

        {/* Next list starts here */}
        {expanded && extractedChildren.expandableList && (
          <div className="ml-2">{extractedChildren.expandableList}</div>
        )}
      </>
    );

    const ElementWrapper = React.createElement(as, {
      className: "w-full group/item gap-1 flex flex-col",
      children: Children,
      ...props,
    });

    return ElementWrapper;
  },
  {
    Label,
    MenuDropdown,
    displayName: "ListItem",
    Badge,
    ExpandableList: List,
  }
);

export { ListItem };
