import { cn } from "@/design-system/utils/utils";
import React, { ComponentProps } from "react";

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
        orientation === "horizontal" && "pb-0 h-full"
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
    className={cn("p-4 pt-0 overflow-auto", className)}
    {...props}
  />
));

Content.displayName = "Content";

export { Content, Image };
