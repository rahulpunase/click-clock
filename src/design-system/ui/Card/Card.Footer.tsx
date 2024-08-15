import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn, extractChildren } from "@/design-system/utils/utils";
import { Button } from "../Button/Button";
import { ComponentProps } from "react";

const LeftFooterButton = (props: ComponentProps<typeof Button>) => {
  return <Button size="sm" variant="secondary" {...props} />;
};

LeftFooterButton.displayName = "LeftFooterButton";

const RightFooterButton = (props: ComponentProps<typeof Button>) => {
  return <Button size="sm" {...props} />;
};

RightFooterButton.displayName = "RightFooterButton";

const CardFooter = ({ children, ...props }) => {
  const extractedChildren = extractChildren(children, {
    leftButton: "LeftFooterButton",
    rightButton: "RightFooterButton",
  });
  return (
    <div
      className={cn(
        "flex items-center py-2 px-4 border-t border-t-card-border min-h-[50px]"
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
};

CardFooter.displayName = "Footer";

CardFooter.LeftButton = LeftFooterButton;
CardFooter.RightButton = RightFooterButton;

export default CardFooter;
