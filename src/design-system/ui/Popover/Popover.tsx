import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn, extractChildren } from "@/design-system/utils/utils";

import Header from "./Popover.Header";

const Trigger = PopoverPrimitive.Trigger;
const Anchor = PopoverPrimitive.Anchor;
// const Arrow = PopoverPrimitive.Arrow;

type PopoverContentType = React.ComponentProps<typeof PopoverPrimitive.Content>;

const Main = ({ children }: { children: React.ReactNode }) => {
  return children;
};

Main.displayName = "Main";

const Content = Object.assign(
  ({ align, sideOffset = 4, className, children }: PopoverContentType) => {
    const extractedChildren = extractChildren(children, {
      header: Header,
      main: Main,
    });

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "rounded-md border border-accent-border bg-background overflow-hidden box-border shadow-2xl z-[60] pt-2",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            extractedChildren.header && "pt-0",
            className,
          )}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  },
  {
    Header,
    Main,
    displayName: PopoverPrimitive.Content.displayName,
  },
);

const Popover = Object.assign(PopoverPrimitive.Root, {
  Trigger,
  Content,
  Anchor,
  displayName: PopoverPrimitive.Root.displayName,
});

export { Popover };
