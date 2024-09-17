import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Tooltip } from "@/design-system/ui/Tooltip/Tooltip";
import { cn } from "@/design-system/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-light ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover",
        outline:
          "border border-accent-border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-text-link underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-1",
        xsm: "h-6 rounded-md px-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        smallIcon: "h-8 w-8",
        xSmallIcon: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: IconName;
  isLoading?: boolean;
  block?: boolean;
  tooltip?: React.ReactNode;
  render?: (
    props: React.PropsWithChildren & { className?: string },
  ) => JSX.Element;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      asChild = false,
      isLoading = false,
      render,
      block = false,
      tooltip,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const Children = (
      <Flex gap="gap-1.5" alignItems="items-center">
        {!isLoading ? (
          <>
            {icon && <Icon name={icon} className="size-4" />}
            {props.children}
          </>
        ) : (
          <Icon name="loader" className="animate-spin size-4" />
        )}
      </Flex>
    );

    if (render) {
      return render({
        children: Children,
        className: cn(
          buttonVariants({ variant, size, className }),
          !block && "w-full",
        ),
      });
    }

    return (
      <Tooltip content={tooltip} renderChildren={!tooltip}>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={isLoading}
          {...props}
        >
          {Children}
        </Comp>
      </Tooltip>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
