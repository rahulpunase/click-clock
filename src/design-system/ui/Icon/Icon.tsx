import { cva, VariantProps } from "class-variance-authority";
import { CircleOff, LucideIcon } from "lucide-react";
import { ComponentProps } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { cn } from "@/design-system/utils/utils";

import { colorIsDarkSimple } from "@/common/utils/misc-utils";

export type IconName = LucideIcon;

type IconProps = {
  IconName?: LucideIcon;
  className?: string;
  backgroundColor?: string;
  withPadding?: boolean;
} & ComponentProps<"svg"> &
  VariantProps<typeof iconVariants>;

const iconVariants = cva("", {
  variants: {
    size: {
      default: "size-4",
      xsm: "size-5",
      sm: "size-6",
      lg: "sie-7",
      xlg: "size-8",
      xxlg: "size-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const Icon = ({
  IconName,
  className,
  backgroundColor,
  withPadding,
  size,
  ...props
}: IconProps) => {
  if (!IconName) {
    return <CircleOff className={className} />;
  }
  const isDark = backgroundColor ? colorIsDarkSimple(backgroundColor) : false;

  const sizeClass = iconVariants({ size, className });

  return (
    <ErrorBoundary fallback={<CircleOff className={className} />}>
      <div
        className={cn(withPadding && "p-1 rounded-sm")}
        style={{
          background: backgroundColor,
        }}
      >
        <IconName
          className={cn(isDark && "stroke-white", sizeClass, className)}
          {...props}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Icon;
