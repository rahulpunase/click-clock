import { cn } from "@/design-system/utils/utils";
import { ComponentProps } from "react";
import { type Tailwindest } from "tailwindest";

type FlexProps = {
  justifyContent?: Tailwindest["justifyContent"];
  alignItems?: Tailwindest["alignItems"];
  direction?: Tailwindest["flexDirection"];
  gap?: Tailwindest["gap"];
  flex?: Tailwindest["flex"];
  shrink?: Tailwindest["flexShrink"];
  wrap?: Tailwindest["flexWrap"];
  grow?: Tailwindest["flexGrow"];
};

const Flex = ({
  justifyContent,
  direction = "flex-row",
  alignItems,
  className,
  gap,
  shrink,
  flex,
  wrap,
  grow,
  ...props
}: FlexProps & ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex",
        flex,
        justifyContent,
        direction,
        alignItems,
        gap,
        shrink,
        wrap,
        grow,
        className
      )}
      {...props}
    />
  );
};

export { Flex };
