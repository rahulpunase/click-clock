import { Flex } from "@/design-system/layout/Flex/Flex";
import React, {
  ComponentProps,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";
import { cn, extractChildren } from "@/design-system/utils/utils";
import { IconButton } from "@/design-system/ui//Button/IconButton";
import { DropdownMenu } from "@/design-system/ui//DropdownMenu/DropdownMenu";
import { icons } from "lucide-react";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { List } from "@/design-system/ui/List/List";
import { cva, VariantProps } from "class-variance-authority";

const listItemVariants = ({ isSelected }: { isSelected: boolean }) =>
  cva("h-[36px] px-2 rounded-md group/list-item cursor-pointer", {
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
  render?: (props: PropsWithChildren) => JSX.Element;
  isSelected?: boolean;
  iconBackgroundColor?: string;
} & VariantProps<ReturnType<typeof listItemVariants>>;

const MenuDropdown = DropdownMenu;

const Label = ({ ...props }: ComponentProps<"div">) => {
  return <div className="text-sm" {...props} />;
};

Label.displayName = "Label";

const Action = ({ ...props }: ComponentProps<"div">) => {
  return <div className="invisible group-hover/list-item:visible" {...props} />;
};

Action.displayName = "Action";

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
      menuDropdown: MenuDropdown,
      expandableList: List,
      badge: Badge,
      action: Action,
    });

    const menuDropDownContent = extractChildren(
      extractedChildren.menuDropdown?.props.children,
      {
        // DropdownMenuContent comes from DropdownMenuContent from DropdownMenu.tsx
        content: DropdownMenu.Content,
      }
    );

    const LucidIcon = icon ? icons[icon] : null;

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
          <Flex gap="gap-2" alignItems="items-center">
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
                    size="xSmallIcon"
                    variant="secondary"
                    className="aria-expanded:visible"
                  />
                </MenuDropdown.Trigger>
                {menuDropDownContent.content}
              </MenuDropdown>
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

    if (render) {
      return React.createElement(as, {
        className: "w-full group/item gap-1 flex flex-col",
        children: render({
          children: Children,
        }),
        ...props,
      });
    }

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
    Action,
  }
);

export { ListItem };
