import React, { ComponentProps } from "react";
import { type Tailwindest } from "tailwindest";

import { cn } from "@/design-system/utils/utils";

type FlexProps = {
  justifyContent?: Tailwindest["justifyContent"];
  alignItems?: Tailwindest["alignItems"];
  direction?: Tailwindest["flexDirection"];
  gap?: Tailwindest["gap"];
  flex?: Tailwindest["flex"];
  shrink?: Tailwindest["flexShrink"];
  wrap?: Tailwindest["flexWrap"];
  grow?: Tailwindest["flexGrow"];
  as?: keyof HTMLElementTagNameMap;
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
  as = "div",
  ...props
}: FlexProps & ComponentProps<"div">) => {
  return React.createElement(as, {
    className: cn(
      "flex",
      flex,
      justifyContent,
      direction,
      alignItems,
      gap,
      shrink,
      wrap,
      grow,
      className,
    ),
    ...props,
  });
};

export { Flex };
