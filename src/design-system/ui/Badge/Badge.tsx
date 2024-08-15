import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/design-system/utils/utils";
import { X } from "lucide-react";
import { Flex } from "@/design-system/layout/Flex/Flex";

const badgeVariants = ({ isSelected, isSelectable }) =>
  cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
      variants: {
        variant: {
          default: [
            "border-transparent bg-primary text-primary-foreground ",
            isSelectable && "hover:bg-primary-hover hover:shadow-lg",
          ],
          secondary: [
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            isSelectable && "hover:bg-secondary-hover hover:shadow-lg",
          ],
          destructive: [
            "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            isSelectable && "hover:bg-primary/80 hover:shadow-lg",
          ],
          outline: [
            "text-foreground",
            isSelectable && "hover:border-primary hover:shadow-lg",
            isSelected && "bg-primary/[0.7]",
          ],
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  );

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<ReturnType<typeof badgeVariants>> {
  isDeletable?: boolean;
  isSelectable?: boolean;
  isSelected?: boolean;
  onDelete?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

function Badge({
  className,
  isDeletable,
  isSelectable,
  isSelected,
  variant,
  onDelete,
  ...props
}: BadgeProps) {
  return (
    <Flex
      gap="gap-2"
      className={cn(
        badgeVariants({
          isSelected,
          isSelectable,
        })({ variant }),
        className,
        isSelectable && "cursor-pointer"
      )}
      {...props}
    >
      {props.children}
      {isDeletable && <X className="size-4" onClick={(e) => onDelete?.(e)} />}
    </Flex>
  );
}

export { Badge, badgeVariants };
