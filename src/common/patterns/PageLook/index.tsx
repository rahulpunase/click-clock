import Content from "@/common/patterns/PageLook/Content";
import Header from "@/common/patterns/PageLook/Header";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn, extractChildren } from "@/design-system/utils/utils";
import { PropsWithChildren } from "react";

const PageLook = Object.assign(
  ({ children }: PropsWithChildren) => {
    const extractedChildren = extractChildren(children, {
      header: Header,
      content: Content,
    });
    return (
      <Flex
        className={cn(
          "rounded-lg border border-accent-border bg-card shadow-sm",
          "overflow-clip box-border min-h-0 w-full"
        )}
        grow="grow"
        direction="flex-col"
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
  }
);

export default PageLook;
