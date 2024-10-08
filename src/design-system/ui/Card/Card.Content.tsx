import React, { ComponentProps } from "react";

import { cn } from "@/design-system/utils/utils";

const Image = ({
  orientation = "vertical",
  ...props
}: ComponentProps<"img"> & {
  orientation?: "vertical" | "horizontal";
}) => {
  return (
    <img
      className={cn(
        "w-full pb-4",
        orientation === "horizontal" && "pb-0 h-full",
      )}
      {...props}
    />
  );
};

Image.displayName = "Image";

const Content = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("py-4 px-4 overflow-auto w-full", className)}
    {...props}
  />
));

Content.displayName = "Content";

export { Content, Image };
