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
            extractedChildren.header && "pt-0",
            className,
          )}
        >
          <Flex direction="flex-col">
            {extractedChildren.header}
            <div className="space-y-1 p-2 pt-0 max-h-[300px] overflow-auto min-h-0">
              {extractedChildren.main}
            </div>
          </Flex>
          {/* <Arrow /> */}
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
