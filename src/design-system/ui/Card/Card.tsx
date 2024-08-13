import React, { createContext, useContext, useState } from "react";

import { cn, extractChildren } from "@/design-system/utils/utils";
import { Text } from "../Text/Text";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { Checkbox } from "../Checkbox/checkbox";
import { IconButton } from "../Button/IconButton";

type CardProps = {
  children: JSX.Element[];
  isSelectable?: boolean;
  isCollapsible?: boolean;
};

type CardContext =
  | {
      isExpanded: boolean;
      isSelected: boolean;
      setSelected: (isSelected: boolean) => void;
      setIsExpanded: (isExpanded: boolean) => void;
    }
  | undefined;

const CardContext = createContext<CardContext>(undefined);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw Error("Use useCardContext inside CardProvider");
  }
  return context;
};

const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSelected, setSelected] = useState(false);
  return (
    <CardContext.Provider
      value={{
        isExpanded,
        isSelected,
        setIsExpanded,
        setSelected,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

const Card = ({ ...props }: CardProps) => {
  return (
    <CardProvider>
      <CardWrapper {...props} />
    </CardProvider>
  );
};

const CardWrapper = ({
  children,
  isSelectable,
  isCollapsible,
  ...props
}: CardProps) => {
  const extractedChildren = extractChildren(children, {
    header: "Header",
    content: "Content",
  });
  const { isExpanded, isSelected } = useCardContext();
  return (
    <div
      className={cn(
        "rounded-lg border bg-card shadow-sm min-w-20",
        isSelected && "border-primary shadow-md"
      )}
      {...props}
    >
      {extractedChildren.header &&
        React.cloneElement(extractedChildren.header, {
          ...extractedChildren.header.props,
          isSelectable,
          isCollapsible,
        })}
      {isExpanded && extractedChildren.content}
    </div>
  );
};

CardWrapper.displayName = "CardWrapper";

type HeaderProps = {
  children: JSX.Element[];
  isSelectable?: boolean;
  isCollapsible?: boolean;
};
const Header = ({
  children,
  isSelectable,
  isCollapsible,
  ...props
}: HeaderProps) => {
  const extractedChildren = extractChildren(children, {
    title: "Title",
    subtext: "SubText",
  });
  const { isExpanded, setIsExpanded, setSelected } = useCardContext();
  return (
    <Flex direction="flex-col" className={cn("space-y-1.5 p-4")} {...props}>
      <Flex
        alignItems="items-center"
        justifyContent="justify-between"
        gap="gap-4"
      >
        {isSelectable && (
          <Checkbox onCheckedChange={(ev) => setSelected(ev as boolean)} />
        )}
        <Flex direction="flex-col">
          {extractedChildren.title}
          {extractedChildren.subtext}
        </Flex>
        {isCollapsible && (
          <Flex gap="gap-2" className="ml-4" alignItems="items-center">
            {isCollapsible && (
              <IconButton
                variant="secondary"
                icon={isExpanded ? "ChevronUp" : "ChevronDown"}
                onClick={() => setIsExpanded(!isExpanded)}
              />
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
Header.displayName = "Header";

const Title = ({
  ...props
}: Omit<React.ComponentProps<typeof Text>, "variant">) => {
  return <Text variant="heading-1" {...props} />;
};

Title.displayName = "Title";

const SubText = ({
  ...props
}: Omit<React.ComponentProps<typeof Text>, "variant">) => {
  return <Text as="span" variant="subtext" {...props} />;
};
SubText.displayName = "SubText";

Header.Title = Title;
Header.SubText = SubText;

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 pt-0", className)} {...props} />
));
CardContent.displayName = "Content";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

Card.Header = Header;
Card.Footer = CardFooter;
Card.Description = CardDescription;
Card.Content = CardContent;

export { Card };
