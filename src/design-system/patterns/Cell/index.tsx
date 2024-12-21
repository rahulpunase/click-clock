import { Pencil } from "lucide-react";
import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";
import { cn, extractChildren } from "@/design-system/utils/utils";

import styles from "./Cell.module.scss";

// const DefaultValue = ({ children, ...props }: ComponentProps<typeof Text>) => (
//   <Text variant="body-1" {...props} wrap>
//     {children}
//   </Text>
// );

// DefaultValue.displayName = "DefaultValue";

const EditingContent = ({ children }: PropsWithChildren) => (
  <Flex className="w-full">{children}</Flex>
);

EditingContent.displayName = "EditingContent";

type CellProps = {
  name: string;
  isEditable?: boolean;
  isEditing?: boolean;
  setIsEditing?: (value: boolean) => void;
  icon?: IconName;
  defaultValue?: string;
  defaultRender?: JSX.Element;
  iconColor?: string;
  link?: string;
  moreActions?: JSX.Element;
} & PropsWithChildren;

const Cell = Object.assign(
  ({
    children,
    isEditable,
    defaultValue,
    isEditing,
    setIsEditing,
    icon,
    iconColor,
    defaultRender,
    link,
    moreActions,
  }: CellProps) => {
    const { editingContent } = extractChildren(children, {
      editingContent: EditingContent,
    });

    const location = useLocation();

    const actions = (
      <Flex className="invisible group-hover/statusCell:visible">
        {moreActions}
        {isEditable && (
          <IconButton
            onClick={() => setIsEditing?.(true)}
            variant="ghost"
            size="xs"
            icon={Pencil}
            tooltip="Edit task name"
          />
        )}
      </Flex>
    );

    const _children = (
      <Flex gap="gap-2" alignItems="items-center" className="truncate">
        {icon && (
          <Icon
            className="size-4 shrink-0"
            style={{
              fill: iconColor ?? "",
            }}
            IconName={icon}
          />
        )}
        {defaultRender ?? (
          <Text wrap variant="body-1">
            {defaultValue ?? "N.A."}
          </Text>
        )}
      </Flex>
    );

    const withChildren = link ? (
      <>
        <Link
          className="flex w-full items-center justify-between"
          to={link}
          state={{
            location,
          }}
        >
          {_children}
        </Link>
        {actions}
      </>
    ) : (
      <Flex
        className="w-full"
        alignItems="items-center"
        justifyContent="justify-between"
      >
        {_children}
        {actions}
      </Flex>
    );

    return (
      <Flex
        data-component="cell-wrapper"
        className={cn(
          "py-1 px-2 pr-2 w-full h-full border border-transparent rounded-sm group/statusCell overflow-hidden",
          styles.cell,
        )}
        gap="gap-1"
      >
        {!isEditing ? withChildren : editingContent}
      </Flex>
    );
  },
  {
    EditingContent,
    displayName: "Cell",
  },
);

export default Cell;
