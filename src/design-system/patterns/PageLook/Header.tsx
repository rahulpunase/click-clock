import { ComponentProps, PropsWithChildren } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Separator } from "@/design-system/ui/Separator/Separator";
import { Text } from "@/design-system/ui/Text/Text";
import { extractChildren } from "@/design-system/utils/utils";

type HeaderProps = {
  icon?: IconName;
} & PropsWithChildren;

export const Heading = ({ ...props }: ComponentProps<typeof Text>) => {
  return <Text variant="body-1" {...props} />;
};
Heading.displayName = "Heading";

export const RightMostActions = ({ ...props }: PropsWithChildren) => {
  return <Flex gap="gap-2" {...props} />;
};
RightMostActions.displayName = "RightMostActions";

export const LeftMostActions = ({ ...props }: PropsWithChildren) => {
  return <Flex gap="gap-2" {...props} />;
};
LeftMostActions.displayName = "LeftMostActions";

const Header = Object.assign(
  ({ icon, children }: HeaderProps) => {
    const extractedChildren = extractChildren(children, {
      heading: Heading,
      rightMostActions: RightMostActions,
      leftMostActions: LeftMostActions,
    });
    return (
      <Flex
        direction="flex-row"
        className="border-b border-accent-border py-1 sticky shadow-header"
        alignItems="items-center"
      >
        <Flex className="pr-0 pl-3 py-2" alignItems="items-center">
          {icon && <Icon IconName={icon} className="size-4" />}
          <Flex className="px-3">{extractedChildren.heading}</Flex>
        </Flex>
        <Separator orientation="vertical" />
        <Flex
          direction="flex-row"
          flex="flex-1"
          justifyContent="justify-between"
          className=""
        >
          <Flex
            flex="flex-1"
            justifyContent="justify-start"
            alignItems="items-center"
            className="px-3"
          >
            {extractedChildren.leftMostActions}
          </Flex>
          <Flex
            flex="flex-1"
            justifyContent="justify-end"
            alignItems="items-center"
            className="pr-3"
          >
            {extractedChildren.rightMostActions}
          </Flex>
        </Flex>
      </Flex>
    );
  },
  {
    Heading,
    RightMostActions,
    LeftMostActions,
    displayName: "Header",
  },
);

export default Header;
