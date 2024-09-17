import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon from "@/design-system/ui/Icon/Icon";
import { Tooltip } from "@/design-system/ui/Tooltip/Tooltip";
import { cn } from "@/design-system/utils/utils";

const badgeVariants = ({ isSelected, isSelectable, stretch }) =>
  cva(
    [
      "inline-flex items-center rounded-full border  text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  h-6",
      !stretch && "max-w-[160px]",
    ],
    {
      variants: {
        variant: {
          default: [
            "border-transparent bg-primary text-primary-foreground",
            isSelectable && "hover:bg-primary-hover hover:shadow-lg",
          ],
          secondary: [
            "border-transparent bg-secondary text-secondary-foreground",
            isSelectable && "hover:bg-secondary-hover",
          ],
          destructive: [
            "border-transparent bg-destructive text-destructive-foreground",
          ],
          outline: [
            "text-foreground border-accent-border",
            isSelectable &&
              "hover:border-primary hover:shadow-lg hover:text-primary",
            isSelected && "border-primary text-primary",
          ],
        },
        size: {
          default: "px-2.5 py-0.5",
          small: "px-2 py-0.3 h-5",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    },
  );

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<ReturnType<typeof badgeVariants>> {
  isDeletable?: boolean;
  isSelectable?: boolean;
  isSelected?: boolean;
  stretch?: boolean;
  onDelete?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  tooltip?: string;
}

function Badge({
  className,
  isDeletable,
  isSelectable,
  isSelected,
  variant,
  onDelete,
  stretch = false,
  size,
  tooltip,
  ...props
}: BadgeProps) {
  const iconClasses = size === "small" ? "size-3" : "size-4";
  return (
    <Tooltip content={tooltip} renderChildren={!tooltip}>
      <Flex
        gap="gap-2"
        className={cn(
          badgeVariants({
            isSelected,
            isSelectable,
            stretch,
          })({ variant, size }),
          className,
          isSelectable && "cursor-pointer",
        )}
        {...props}
      >
        <div className={cn("", !stretch && "text-ellipsis truncate")}>
          {props.children}
        </div>
        {isDeletable && (
          <Icon
            name="x"
            className={cn("cursor-pointer", iconClasses, "shrink-0")}
            onClick={(e) => onDelete?.(e)}
          />
        )}
      </Flex>
    </Tooltip>
  );
}

export { Badge, badgeVariants };
