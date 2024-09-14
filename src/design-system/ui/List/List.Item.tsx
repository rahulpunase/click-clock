import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps, ReactNode, useState } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui//Button/IconButton";
import { DropdownMenu } from "@/design-system/ui//DropdownMenu/DropdownMenu";
import { Badge } from "@/design-system/ui/Badge/Badge";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { List } from "@/design-system/ui/List/List";
import { cn, extractChildren } from "@/design-system/utils/utils";

const listItemVariants = ({ isSelected }: { isSelected: boolean }) =>
  cva("h-[34px] px-2 rounded-md group/list-item cursor-pointer", {
    variants: {
      variant: {
        default: ["bg-secondary"],
        nav: [
          "bg-transparent hover:bg-secondary",
          isSelected &&
            "bg-primary-light hover:bg-primary-light text-primary-dark font-medium",
        ],
        secondary: ["text-text-muted bg-transparent hover:bg-accent"],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });

type ListItemProps = {
  children?: ReactNode;
  size?: "sm" | "default";
  as?: keyof Pick<HTMLElementTagNameMap, "a" | "div" | "li">;
  icon?: IconName;
  render?: (props: ComponentProps<"a">) => JSX.Element;
  isSelected?: boolean;
  iconBackgroundColor?: string;
  bubbleText?: string;
  expandedIcon?: IconName;
} & VariantProps<ReturnType<typeof listItemVariants>>;

const Dropdown = DropdownMenu;

const Label = ({ ...props }: ComponentProps<"div">) => {
  return <div className="text-sm text-ellipsis truncate" {...props} />;
};

Label.displayName = "Label";

const SubText = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div
      className="text-xs text-ellipsis truncate text-text-muted"
      {...props}
    />
  );
};

SubText.displayName = "SubText";

const Action = ({ ...props }: ComponentProps<"div">) => {
  return <div className="invisible group-hover/list-item:visible" {...props} />;
};

Action.displayName = "Action";

const SmallIcon = ({ icon }: { icon: IconName }) => {
  return <Icon className="size-3" name={icon} />;
};

SmallIcon.displayName = SmallIcon;

const ListItem = Object.assign(
  function ({
    children,
    as = "li",
    icon,
    render,
    variant,
    isSelected = false,
    iconBackgroundColor,
    expandedIcon,
    ...props
  }: ListItemProps) {
    const [expanded, setExpanded] = useState(false);
    const extractedChildren = extractChildren(children, {
      label: Label,
      menuDropdown: Dropdown,
      expandableList: List,
      badge: Badge,
      action: Action,
      smallIcon: SmallIcon,
      subText: SubText,
    });

    const menuDropDownContent = extractChildren(
      extractedChildren.menuDropdown?.props.children,
      {
        // DropdownMenuContent comes from DropdownMenuContent from DropdownMenu.tsx
        content: DropdownMenu.Content,
        portal: Dropdown.Portal,
      },
    );

    const menuDropDownContentFinal =
      menuDropDownContent.portal ?? menuDropDownContent.content;

    const labelAndWrappedAround = (
      <Flex
        alignItems="items-center"
        gap="gap-1"
        flex="flex-1"
        className="h-full min-w-0"
      >
        {extractedChildren.label}
        {extractedChildren.subText}
        {extractedChildren.smallIcon}
      </Flex>
    );

    const toWrap = render
      ? render({
          children: labelAndWrappedAround,
          className: "flex flex-1 h-full min-w-0",
        })
      : labelAndWrappedAround;

    const Children = (
      <>
        <Flex
          alignItems="items-center"
          justifyContent="justify-between"
          className={cn(
            listItemVariants({
              isSelected,
            })({ variant }),
          )}
          aria-label="list-item"
        >
          <Flex
            gap="gap-2"
            alignItems="items-center"
            flex="flex-1"
            className="h-full min-w-0"
          >
            <div>
              {icon && (
                <Flex
                  className={cn(
                    "size-6 rounded-md ",
                    extractedChildren.expandableList &&
                      "group-hover/list-item:hidden",
                    iconBackgroundColor && "text-white",
                  )}
                  justifyContent="justify-center"
                  alignItems="items-center"
                  style={{
                    background: iconBackgroundColor,
                  }}
                >
                  {expanded && expandedIcon ? (
                    <Icon name={expandedIcon} className="size-4" />
                  ) : (
                    <Icon name={icon} className="size-4" />
                  )}
                </Flex>
              )}
              {extractedChildren.expandableList && (
                <Flex className="hidden group-hover/list-item:block">
                  <IconButton
                    icon={expanded ? "chevron-up" : "chevron-down"}
                    size="xSmallIcon"
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setExpanded(!expanded);
                    }}
                  />
                </Flex>
              )}
            </div>
            {toWrap}
            {extractedChildren.badge}
          </Flex>
          <Flex className="invisible group-hover/list-item:visible">
            {menuDropDownContentFinal && (
              <Dropdown>
                <Dropdown.Trigger asChild>
                  <IconButton
                    icon="ellipsis"
                    size="xSmallIcon"
                    variant="secondary"
                    className="aria-expanded:visible"
                  />
                </Dropdown.Trigger>
                {menuDropDownContentFinal}
              </Dropdown>
            )}
          </Flex>
          {extractedChildren.action}
        </Flex>

        {/* Next list starts here */}
        {expanded && extractedChildren.expandableList && (
          <div className="ml-2 border-l border-accent-border">
            {extractedChildren.expandableList}
          </div>
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
    Dropdown,
    displayName: "ListItem",
    Badge,
    ExpandableList: List,
    Action,
    SmallIcon,
    SubText,
  },
);

export { ListItem };
