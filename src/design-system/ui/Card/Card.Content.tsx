import { cn } from "@/design-system/utils/utils";
import React, { ComponentProps } from "react";

const CardImage = ({
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

CardImage.displayName = "Image";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 pt-0 overflow-auto", className)}
    {...props}
  />
));
CardContent.displayName = "Content";

export { CardContent, CardImage };
