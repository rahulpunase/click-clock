import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn, extractChildren } from "@/design-system/utils/utils";
import { Checkbox } from "../Checkbox/checkbox";
import { IconButton } from "../Button/IconButton";
import { Text } from "../Text/Text";
import { useCardContext } from "./Card.Context";
import { Badge } from "../Badge/badge";

type HeaderProps = {
  children: React.ReactNode;
  isSelectable?: boolean;
  isCollapsible?: boolean;
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
  return <Text as="span" variant="subtext" className="mt-1" {...props} />;
};

Subtext.displayName = "Subtext";

const Header = Object.assign(
  ({
    children,
    isSelectable,
    isCollapsible,
    className,
    ...props
  }: HeaderProps) => {
    const extractedChildren = extractChildren(children, {
      title: Title,
      subtext: Subtext,
      cornerAction: CornerAction,
    });
    console.log({ extractedChildren });

    const { isExpanded, setIsExpanded, setSelected } = useCardContext();
    return (
      <Flex
        direction="flex-col"
        shrink="shrink-0"
        className={cn("space-y-1.5 p-4 w-full", className)}
        {...props}
      >
        <Flex
          alignItems="items-center"
          justifyContent="justify-between"
          gap="gap-4"
        >
          <Flex gap="gap-4" alignItems="items-center">
            {isSelectable && (
              <Checkbox onCheckedChange={(ev) => setSelected(ev as boolean)} />
            )}
            <Flex direction="flex-col">
              {extractedChildren.title}
              {extractedChildren.subtext}
            </Flex>
            <Flex>
              {"inBadgeContent" in props && (
                <Badge variant="secondary">{props.inBadgeContent}</Badge>
              )}
            </Flex>
          </Flex>
          <Flex gap="gap-2" className="ml-4" alignItems="items-center">
            {extractedChildren.cornerAction}
            {isCollapsible && (
              <IconButton
                variant="secondary"
                icon={isExpanded ? "ChevronUp" : "ChevronDown"}
                onClick={() => setIsExpanded(!isExpanded)}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    );
  },
  {
    Title,
    Subtext,
    CornerAction,
    displayName: "Header",
  }
);

export default Header;
