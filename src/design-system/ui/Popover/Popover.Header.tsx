import * as PopoverPrimitive from "@radix-ui/react-popover";

import { Flex } from "@/design-system/layout/Flex/Flex";
import { Badge } from "@/design-system/ui/Badge/Badge";
import { cn, extractChildren } from "@/design-system/utils/utils";

import { IconButton } from "../Button/IconButton";
import { Text } from "../Text/Text";

const Close = PopoverPrimitive.Close;

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
  inBadgeContent?: string;
};

const Title = ({
  ...props
}: Omit<React.ComponentProps<typeof Text>, "variant">) => {
  return <Text variant="heading-1" {...props} />;
};
Title.displayName = "Title";

const CornerAction = ({
  ...props
}: Omit<React.ComponentProps<typeof IconButton>, "variant">) => {
  return <IconButton variant="ghost" {...props} />;
};
CornerAction.displayName = "CornerAction";

const Subtext = ({
  ...props
}: Omit<React.ComponentProps<typeof Text>, "variant">) => {
  return <Text as="span" variant="subtext" {...props} />;
};
Subtext.displayName = "Subtext";

const Header = ({ children, className, ...props }: HeaderProps) => {
  const extractedChildren = extractChildren(children, {
    title: Title,
    subtext: Subtext,
    cornerAction: CornerAction,
  });
  return (
    <Flex
      direction="flex-col"
      shrink="shrink-0"
      className={cn("space-y-1 p-3 w-full", className)}
      {...props}
    >
      <Flex direction="flex-col" className="relative">
        {extractedChildren.title}
        {extractedChildren.subtext}
        <Close className="absolute right-[-6px] top-[-6px]" asChild>
          <IconButton size="xSmallIcon" icon="x" variant="ghost" />
        </Close>
      </Flex>
      <Flex>
        {"inBadgeContent" in props && (
          <Badge variant="secondary">{props.inBadgeContent}</Badge>
        )}
      </Flex>
    </Flex>
  );
};

Header.Title = Title;
Header.SubText = Subtext;
Header.CornerAction = CornerAction;

Header.displayName = "PopoverHeader";

export default Header;
