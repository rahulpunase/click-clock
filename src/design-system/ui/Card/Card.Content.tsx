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
>(({ className, ...props }, ref) => {
  console.log(className);
  return (
    <div
      ref={ref}
      {...props}
      className={cn("py-2 px-4 overflow-auto w-full", className)}
    />
  );
});

Content.displayName = "Content";

export { Content, Image };
