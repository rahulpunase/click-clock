import { VariantProps } from "class-variance-authority";
import { ChevronDown, ChevronUp, Ellipsis } from "lucide-react";
import React, { ComponentProps, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui//Button/IconButton";
import { DropdownMenu } from "@/design-system/ui//DropdownMenu/DropdownMenu";
import { Badge } from "@/design-system/ui/Badge/Badge";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { List } from "@/design-system/ui/List/List";
import {
  Action,
  Label,
  SmallIcon,
  SubText,
} from "@/design-system/ui/List/List.Components";
import { listItemVariants } from "@/design-system/ui/List/listItemVariants";
import { cn, extractChildren } from "@/design-system/utils/utils";

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
  className?: string;
  href?: string;
} & VariantProps<ReturnType<typeof listItemVariants>>;

const Dropdown = DropdownMenu;

type RefProps =
  | HTMLElement
  | React.ForwardRefExoticComponent<
      ListItemProps & React.RefAttributes<HTMLElement>
    >;

const ListItem = Object.assign(
  React.forwardRef<RefProps, ListItemProps>(function (
    {
      children,
      as = "li",
      icon,
      render,
      variant,
      isSelected = false,
      iconBackgroundColor,
      expandedIcon,
      className,
      href,
      ...props
    },
    ref,
  ) {
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
        className={cn("h-full min-w-0", className)}
      >
        {extractedChildren.label}
        {extractedChildren.subText}
        {extractedChildren.smallIcon}
      </Flex>
    );

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
                    <Icon IconName={expandedIcon} className="size-4" />
                  ) : (
                    <Icon IconName={icon} className="size-4" />
                  )}
                </Flex>
              )}
              {extractedChildren.expandableList && (
                <Flex className="hidden group-hover/list-item:block">
                  <IconButton
                    icon={expanded ? ChevronUp : ChevronDown}
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
            {labelAndWrappedAround}
            {extractedChildren.badge}
          </Flex>
          <Flex className="invisible group-hover/list-item:visible">
            {menuDropDownContentFinal && (
              <Dropdown>
                <Dropdown.Trigger asChild>
                  <IconButton
                    icon={Ellipsis}
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
            {React.cloneElement(extractedChildren.expandableList, {
              ...extractedChildren.expandableList.props,
              className: cn(
                extractedChildren.expandableList.props.className,
                "animate-in fade-in zoom-in",
              ),
            })}
          </div>
        )}
      </>
    );

    let _children = Children;

    if (href) {
      _children = <Link to={href}>{Children}</Link>;
    }

    const ElementWrapper = React.createElement(as, {
      className: "w-full group/item gap-1 flex flex-col",
      children: _children,
      ...props,
      ref,
    });

    return ElementWrapper;
  }),
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
