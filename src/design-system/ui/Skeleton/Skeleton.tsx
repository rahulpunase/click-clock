import React from "react";

import { cn } from "@/design-system/utils/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
