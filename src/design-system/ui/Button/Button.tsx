import { cva, type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Tooltip } from "@/design-system/ui/Tooltip/Tooltip";
import { cn } from "@/design-system/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-light ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80 shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-text hover:bg-primary-hover",
        destructive:
          "bg-destructive text-destructive-text hover:bg-destructive-hover",
        outline:
          "border border-accent-border bg-background hover:bg-accent hover:text-accent-text",
        secondary: "bg-secondary text-secondary-text hover:bg-secondary-hover",
        ghost: "hover:bg-accent hover:text-accent-text",
        link: "text-text-link underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-1",
        icon: "h-10 w-10",
        sm: "h-8 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xsm: "h-6 rounded-md px-2 text-xs",
        s: "size-8",
        xs: "size-6",
        xxs: "size-5",
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
  href?: string;
  state?: object;
}

type RefProps =
  | HTMLButtonElement
  | React.ForwardRefExoticComponent<
      LinkProps & React.RefAttributes<HTMLAnchorElement>
    >;

const Button = React.forwardRef<RefProps, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      isLoading = false,
      block = false,
      tooltip,
      href,
      state,
      ...props
    },
    ref,
  ) => {
    const comp = href ? "a" : "button";

    const Children = (
      <Flex gap="gap-1.5" alignItems="items-center" className="relative">
        <>
          <Flex
            className={cn("w-full", isLoading && "invisible")}
            alignItems="items-center"
            gap="gap-2"
          >
            {icon && <Icon IconName={icon} className="size-4" />}
            {props.children}
          </Flex>
          <div className="absolute left-[50%] translate-x-[-50%]">
            <Icon
              IconName={Loader}
              className={cn("animate-spin size-4 ", !isLoading && "invisible")}
            />
          </div>
        </>
      </Flex>
    );

    const button = React.createElement(comp, {
      ...props,
      ref,
      disabled: props.disabled || isLoading,
      className: cn(buttonVariants({ variant, size, className })),
    });

    return (
      <Tooltip content={tooltip} renderChildren={!tooltip}>
        {href ? (
          <Link
            className={cn(buttonVariants({ variant, size, className }))}
            to={href}
            state={state}
          >
            {Children}
          </Link>
        ) : (
          button
        )}
      </Tooltip>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
