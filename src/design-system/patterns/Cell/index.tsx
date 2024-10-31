import { Pencil } from "lucide-react";
import { PropsWithChildren } from "react";

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
  }: CellProps) => {
    const { editingContent } = extractChildren(children, {
      editingContent: EditingContent,
    });

    return (
      <Flex
        data-component="cell-wrapper"
        className={cn(
          "py-1 px-2 pr-2 w-full h-full border border-transparent rounded-sm group/statusCell overflow-hidden",
          styles.cell,
        )}
        gap="gap-1"
      >
        {!isEditing ? (
          <Flex
            className="w-full"
            alignItems="items-center"
            justifyContent="justify-between"
          >
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
            <Flex className="invisible group-hover/statusCell:visible">
              {isEditable && (
                <IconButton
                  onClick={() => setIsEditing?.(true)}
                  variant="ghost"
                  size="xSmallIcon"
                  icon={Pencil}
                  tooltip="Edit task name"
                />
              )}
            </Flex>
          </Flex>
        ) : (
          editingContent
        )}
      </Flex>
    );
  },
  {
    EditingContent,
    displayName: "Cell",
  },
);

export default Cell;
