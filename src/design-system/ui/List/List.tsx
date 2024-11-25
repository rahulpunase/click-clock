import { PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn } from "@/design-system/utils/utils";

const List = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <Flex
      as="ul"
      direction="flex-col"
      gap="gap-1"
      className={cn("w-full", className)}
      aria-label="list"
    >
      {children}
    </Flex>
  );
};

List.displayName = "List";

export { List };
