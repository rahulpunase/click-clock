import { PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Content from "@/design-system/patterns/PageLook/Content";
import Header from "@/design-system/patterns/PageLook/Header";
import { cn, extractChildren } from "@/design-system/utils/utils";

const PageLook = Object.assign(
  ({ children, ...props }: PropsWithChildren) => {
    const extractedChildren = extractChildren(children, {
      header: Header,
      content: Content,
    });
    return (
      <Flex
        className={cn(
          "rounded-lg border border-accent-border bg-background shadow-sm",
          "overflow-clip box-border min-h-0 w-full",
          "animate-in fade-in-0",
        )}
        data-component="page-look-content"
        grow="grow"
        direction="flex-col"
        {...props}
      >
        {extractedChildren.header}
        {extractedChildren.content}
      </Flex>
    );
  },
  {
    Header,
    Content,
    displayName: "PageLookPattern",
  },
);

export default PageLook;
