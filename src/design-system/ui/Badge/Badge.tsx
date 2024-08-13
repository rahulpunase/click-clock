import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/design-system/utils/utils";
import { X } from "lucide-react";
import { Flex } from "@/design-system/layout/Flex/Flex";

const badgeVariants = (isSelectable?: boolean) =>
  cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
      variants: {
        variant: {
          default: [
            "border-transparent bg-primary text-primary-foreground ",
            isSelectable && "hover:bg-primary/80 hover:shadow-lg",
          ],
          secondary:
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
          destructive:
            "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
          outline: "text-foreground",
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
  onDelete?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

function Badge({
  className,
  isDeletable,
  isSelectable,
  variant,
  onDelete,
  ...props
}: BadgeProps) {
  return (
    <Flex
      gap="gap-2"
      className={cn(
        badgeVariants(isSelectable)({ variant }),
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
