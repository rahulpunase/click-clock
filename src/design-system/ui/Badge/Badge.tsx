import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn } from "@/design-system/utils/utils";

const badgeVariants = ({ isSelected, isSelectable, stretch }) =>
  cva(
    [
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  h-6",
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
      },
      defaultVariants: {
        variant: "default",
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
}

function Badge({
  className,
  isDeletable,
  isSelectable,
  isSelected,
  variant,
  onDelete,
  stretch = false,
  ...props
}: BadgeProps) {
  return (
    <Flex
      gap="gap-2"
      className={cn(
        badgeVariants({
          isSelected,
          isSelectable,
          stretch,
        })({ variant }),
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
          className="size-4 cursor-pointer"
          onClick={(e) => onDelete?.(e)}
        />
      )}
    </Flex>
  );
}

export { Badge, badgeVariants };
