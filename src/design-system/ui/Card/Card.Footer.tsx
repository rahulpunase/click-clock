import { ComponentProps, PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { cn, extractChildren } from "@/design-system/utils/utils";

const LeftButton = (props: ComponentProps<typeof Button>) => {
  return <Button size="sm" variant="secondary" {...props} />;
};

LeftButton.displayName = "LeftButton";

const RightButton = (props: ComponentProps<typeof Button>) => {
  return <Button size="sm" {...props} />;
};

RightButton.displayName = "RightButton";

const Footer = Object.assign(
  ({ children, ...props }: PropsWithChildren) => {
    const extractedChildren = extractChildren(children, {
      leftButton: LeftButton,
      rightButton: RightButton,
    });
    return (
      <div
        className={cn(
          "flex items-center py-2 px-4 border-t border-t-accent-border min-h-[50px]",
        )}
        {...props}
      >
        <Flex className="w-full">
          <Flex flex="flex-1"></Flex>
          <Flex gap="gap-2">
            {extractedChildren.leftButton}
            {extractedChildren.rightButton}
          </Flex>
        </Flex>
      </div>
    );
  },
  {
    LeftButton,
    RightButton,
    displayName: "Footer",
  },
);

export default Footer;
