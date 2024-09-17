import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "@/design-system/utils/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TooltipRoot = Object.assign(TooltipPrimitive.Root, {
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  displayName: "Tooltip",
});

const Tooltip = ({
  children,
  content,
  renderChildren,
}: React.PropsWithChildren & {
  content: React.ReactNode;
  renderChildren?: boolean;
}) => {
  if (renderChildren) {
    return children;
  }
  return (
    <TooltipRoot.TooltipProvider delayDuration={100}>
      <TooltipRoot>
        <TooltipRoot.TooltipTrigger asChild>
          {children}
        </TooltipRoot.TooltipTrigger>
        <TooltipContent>
          <TooltipPrimitive.Arrow />
          {content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipRoot.TooltipProvider>
  );
};

export { Tooltip };
