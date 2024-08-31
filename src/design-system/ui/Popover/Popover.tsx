import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn, extractChildren } from "@/design-system/utils/utils";
import Header from "./Popover.Header";

const Trigger = PopoverPrimitive.Trigger;

type PopoverContentType = React.ComponentProps<typeof PopoverPrimitive.Content>;

const Description = ({ children }: { children: React.ReactNode }) => {
  return children;
};

Description.displayName = "Description";

const Content = Object.assign(
  ({
    align = "center",
    sideOffset = 4,
    className,
    children,
  }: PopoverContentType) => {
    const extractedChildren = extractChildren(children, {
      header: Header,
      description: Description,
    });

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "rounded-lg border border-card-border bg-card overflow-hidden box-border max-w-[360px] shadow-sm",
            className
          )}
        >
          <Flex direction="flex-col">
            {extractedChildren.header}
            <div className="space-y-1 p-4 pt-0 max-h-[300px] overflow-auto min-h-0">
              {extractedChildren.description}
            </div>
          </Flex>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  },
  {
    Header,
    Description,
    displayName: PopoverPrimitive.Content.displayName,
  }
);

const Popover = Object.assign(PopoverPrimitive.Root, {
  Trigger,
  Content,
});

export { Popover };
