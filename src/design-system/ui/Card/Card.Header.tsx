import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn, extractChildren } from "@/design-system/utils/utils";
import { Checkbox } from "@/design-system/ui/Checkbox/checkbox";
import { IconButton } from "@/design-system/ui/Button/IconButton";
import { Text } from "@/design-system/ui/Text/Text";
import { useCardContext } from "@/design-system/ui/Card/Card.Context";
import { Badge } from "@/design-system/ui/Badge/Badge";

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
    const { isExpanded, setIsExpanded, setSelected } = useCardContext();
    return (
      <Flex
        direction="flex-col"
        shrink="shrink-0"
        className={cn("py-2 px-4 w-full border-b", className)}
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
                size="icon"
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
