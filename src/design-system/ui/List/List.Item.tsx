import { Flex } from "@/design-system/layout/Flex/Flex";
import React, { ComponentProps, ReactNode, useState } from "react";
import { cn, extractChildren } from "@/design-system/utils/utils";
import { IconButton } from "@/design-system/ui//Button/IconButton";
import { DropdownMenu } from "@/design-system/ui//DropdownMenu/DropdownMenu";
import { icons } from "lucide-react";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { List } from "@/design-system/ui/List/List";
import { cva, VariantProps } from "class-variance-authority";
import { Icons } from "@/design-system/ui/types";

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
  icon?: keyof typeof icons;
  render?: (props: ComponentProps<"a">) => JSX.Element;
  isSelected?: boolean;
  iconBackgroundColor?: string;
} & VariantProps<ReturnType<typeof listItemVariants>>;

const Dropdown = DropdownMenu;

const Label = ({ ...props }: ComponentProps<"div">) => {
  return <div className="text-sm text-ellipsis truncate" {...props} />;
};

Label.displayName = "Label";

const Action = ({ ...props }: ComponentProps<"div">) => {
  return <div className="invisible group-hover/list-item:visible" {...props} />;
};

Action.displayName = "Action";

const SmallIcon = ({ icon }: { icon: Icons }) => {
  const Lucid = icons[icon];
  return <Lucid className="size-3" />;
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
    });

    const menuDropDownContent = extractChildren(
      extractedChildren.menuDropdown?.props.children,
      {
        // DropdownMenuContent comes from DropdownMenuContent from DropdownMenu.tsx
        content: DropdownMenu.Content,
        portal: Dropdown.Portal,
      }
    );

    const menuDropDownContentFinal =
      menuDropDownContent.portal ?? menuDropDownContent.content;

    const LucidIcon = icon ? icons[icon] : null;

    const labelAndWrappedAround = (
      <Flex
        alignItems="items-center"
        gap="gap-1"
        flex="flex-1"
        className="h-full min-w-0"
      >
        {extractedChildren.label}
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
            })({ variant })
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
              {LucidIcon && (
                <Flex
                  className={cn(
                    "size-6 rounded-md ",
                    extractedChildren.expandableList &&
                      "group-hover/list-item:hidden",
                    iconBackgroundColor && "text-white"
                  )}
                  justifyContent="justify-center"
                  alignItems="items-center"
                  style={{
                    background: iconBackgroundColor,
                  }}
                >
                  <LucidIcon className="size-4" />
                </Flex>
              )}
              {extractedChildren.expandableList && (
                <Flex className="hidden group-hover/list-item:block">
                  <IconButton
                    icon={expanded ? "ChevronUp" : "ChevronDown"}
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
                    icon="Ellipsis"
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
          <div className="ml-2">{extractedChildren.expandableList}</div>
        )}
      </>
    );

    // if (render) {
    //   const ren = render({
    //     children: Children,
    //   });
    //   return React.createElement(as, {
    //     className: "w-full group/item gap-1 flex flex-col",
    //     children: (
    //       <>
    //         {ren}
    //         {expanded && extractedChildren.expandableList && (
    //           <div className="ml-2">{extractedChildren.expandableList}</div>
    //         )}
    //       </>
    //     ),
    //     ...props,
    //   });
    // }

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
  }
);

export { ListItem };
