import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/design-system/utils/utils";

const textVariants = cva("text-inherit", {
  variants: {
    variant: {
      "heading-1": "font-semibold text-sm",
      "heading-2": "font-semibold text-lg",
      "heading-3": "font-semibold text-xl",
      "heading-4": "font-semibold text-2xl",
      "heading-5": "font-semibold text-4xl",
      "body-1": "font-light text-sm",
      "body-2": "font-light text-base",
      "body-3": "font-light text-lg",
      subtext: "font-light text-xs text-text-muted",
      "subtext-1": "font-light text-sm text-text-muted",
    },
    color: {},
    align: {
      center: "text-center",
      left: "text-left",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body-2",
    align: "left",
  },
});

export type TextProps = {
  as?: keyof HTMLElementTagNameMap;
  wrap?: boolean;
  children: JSX.Element | JSX.Element[] | string | string[];
} & VariantProps<typeof textVariants> &
  React.ComponentProps<"div">;

const Text = React.forwardRef<React.ComponentProps<"div">, TextProps>(
  ({ className, variant, color, wrap, align, as = "p", ...props }, ref) => {
    const txtClasses = textVariants({
      color,
      variant,
      align,
      className,
    });
    return React.createElement(as, {
      className: cn(txtClasses, wrap && "truncate"),
      ref,
      ...props,
    });
  },
);
Text.displayName = "Text";

export { Text, textVariants };
