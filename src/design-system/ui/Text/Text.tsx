import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const g = () => <div className="font-light text-lg "></div>;

const textVariants = cva("", {
  variants: {
    variant: {
      "heading-1": " font-semibold text-sm",
      "heading-2": " font-semibold text-lg",
      "heading-3": " font-semibold text-xl",
      "heading-4": " font-semibold text-2xl",
      "body-1": " font-light text-sm",
      "body-2": " font-light text-base",
      "body-3": " font-light text-lg",
      subtext: "font-light text-xs text-text-muted",
    },
    size: {},
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
  children: JSX.Element | JSX.Element[] | string;
} & VariantProps<typeof textVariants> &
  Partial<Omit<HTMLElement, "children">>;

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, size, align, as = "p", ...props }, ref) => {
    const txtClasses = textVariants({
      className,
      size,
      variant,
      align,
    });
    return React.createElement(as, {
      className: txtClasses,
      ref,
      ...props,
    });
  }
);
Text.displayName = "Text";

export { Text, textVariants };
